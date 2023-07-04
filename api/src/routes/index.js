const axios = require("axios");
const { Router } = require("express");
const { recipe } = require("../db");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// const { API_KEY } = process.env;
// const API_KEY = "cc1af01257594a209c1e10a3462c5216";
const API_KEY = "384bedc0979b4c47852047559c1f0b13";
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;

    if (!idRecipe)
      throw new Error(
        "Se necesita una identificador para iniciar una búsqueda"
      );

    if (idRecipe.includes("-")) {
      const findRecipe = await recipe.findByPk(idRecipe);
      // const findRecipe = await recipe.findOne({ where: { id: idRecipe } });
      res.status(200).json(findRecipe);
    } else {
      const { data } = await axios(
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`
      );

      const { id, title, image, summary, healthScore, analyzedInstructions } =
        data;

      const result = {
        id,
        title,
        image: null,
        summary: null,
        healthScore: null,
        steps: undefined,
      };

      if (image) result.image = image;
      if (summary) result.summary = summary;
      if (healthScore) result.healthScore = healthScore;
      if (
        analyzedInstructions &&
        analyzedInstructions.length &&
        analyzedInstructions[0].hasOwnProperty("steps")
      ) {
        const { steps } = analyzedInstructions[0];
        result.steps = steps;
      }

      res.status(200).json(result);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      const { data } = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=4&addRecipeInformation=true`
      );

      let finalDataApi = data.results.filter((val) =>
        val.title.toLowerCase().includes(name.toLowerCase())
      );

      if (finalDataApi.length)
        finalDataApi = finalDataApi.map((val) => {
          const { id, title, image, diets, healthScore } = val;

          const result = {
            id,
            title,
            image: null,
            diets: null,
            healthScore: null,
          };

          if (image) result.image = image;
          if (healthScore) result.healthScore = healthScore;
          if (diets && diets.length) {
            result.diets = diets;
          }

          return result;
        });

      const finalDataDb = await recipe.findAll({
        where: { title: { [Op.iLike]: `%${name}%` } },
      });

      if (!finalDataApi.length && !finalDataDb.length)
        throw new Error(
          `La búsqueda por '${name}' no se encontró en la api ni en la base de datos`
        );

      res.status(200).json([...finalDataApi, ...finalDataDb]);
    } else {
      const { data } = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=4&addRecipeInformation=true`
      );

      const finalDataApi = data.results.map((val) => {
        const { id, title, image, diets, healthScore } = val;

        const result = {
          id,
          title,
          image: null,
          diets: null,
          healthScore: null,
        };

        if (image) result.image = image;
        if (healthScore) result.healthScore = healthScore;
        if (diets && diets.length) result.diets = diets;

        return result;
      });

      res.status(200).json(finalDataApi);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// router.get("/recipes", async (req, res) => {
//   const { name } = req.query;
//   // res.status(200).json(name);

//   const finalDataDb = await recipe.findAll({
//     where: { title: { [Op.iLike]: `%${name}%` } },
//   });

//   res.status(200).json(finalDataDb);
// });

router.post("/recipes", async (req, res) => {
  try {
    const { title, image, summary, healthScore, steps, diets } = req.body;

    if (!title) throw new Error(`Falta un título`);
    if (!image) throw new Error(`Falta una imagen`);
    if (!summary) throw new Error(`Falta un resumen`);
    if (!healthScore) throw new Error(`Falta una puntaje de salud entre 1-100`);
    if (!steps?.length) throw new Error(`Faltan los pasos`);
    if (!diets) throw new Error(`Faltan las dietas`);

    const newRecipe = await recipe.create({
      title,
      image,
      summary,
      healthScore,
      steps,
      diets,
    });

    // res.status(200).json(newRecipe);
    // res.status(200).send("successful registration");
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/diets", async (req, res) => {
  try {
    const { data } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );

    const dataResult = {};

    data.results.forEach((val) => {
      if (val.vegetarian) dataResult.vegetarian = true;
      val.diets.forEach((value) => {
        if (!dataResult[value]) {
          dataResult[value] = true;
        }
      });
    });

    res.status(200).json(Object.keys(dataResult));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

// async function get() {
//   const { data } = await axios(
//     `https://api.spoonacular.com/recipes/782585/information?apiKey=${API_KEY}`
//   );

//   const { id, title, image, summary, healthScore, analyzedInstructions } = data;
//   const { steps } = analyzedInstructions[0];

//   console.log({ id, title, image, healthScore });
// }
// get();

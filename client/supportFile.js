const steps = [
  {
    number: 1,
    step: "To a large dutch oven or soup pot, heat the olive oil over medium heat.",
    ingredients: [
      {
        id: 4053,
        name: "olive oil",
        localizedName: "olive oil",
        image: "olive-oil.jpg",
      },
      {
        id: 0,
        name: "soup",
        localizedName: "soup",
        image: "",
      },
    ],
    equipment: [
      {
        id: 404667,
        name: "dutch oven",
        localizedName: "dutch oven",
        image: "dutch-oven.jpg",
      },
    ],
  },
  {
    number: 2,
    step: "Add the onion, carrots and celery and cook for 8-10 minutes or until tender, stirring occasionally.",
    ingredients: [
      {
        id: 11124,
        name: "carrot",
        localizedName: "carrot",
        image: "sliced-carrot.png",
      },
      {
        id: 11143,
        name: "celery",
        localizedName: "celery",
        image: "celery.jpg",
      },
      {
        id: 11282,
        name: "onion",
        localizedName: "onion",
        image: "brown-onion.png",
      },
    ],
    equipment: [],
    length: {
      number: 10,
      unit: "minutes",
    },
  },
  {
    number: 3,
    step: "Add the garlic and cook for an additional 2 minutes, or until fragrant. Season conservatively with a pinch of salt and black pepper.To the pot, add the tomatoes, turnip and red lentils. Stir to combine. Stir in the vegetable stock and increase the heat on the stove to high. Bring the soup to a boil and then reduce to a simmer. Simmer for 20 minutes or until the turnips are tender and the lentils are cooked through.",
    ingredients: [
      {
        id: 1102047,
        name: "salt and pepper",
        localizedName: "salt and pepper",
        image: "salt-and-pepper.jpg",
      },
      {
        id: 6615,
        name: "vegetable stock",
        localizedName: "vegetable stock",
        image: "chicken-broth.png",
      },
      {
        id: 10016069,
        name: "red lentils",
        localizedName: "red lentils",
        image: "red-lentils.png",
      },
      {
        id: 11529,
        name: "tomato",
        localizedName: "tomato",
        image: "tomato.png",
      },
      {
        id: 10316069,
        name: "lentils",
        localizedName: "lentils",
        image: "lentils-brown.jpg",
      },
      {
        id: 11564,
        name: "turnip",
        localizedName: "turnip",
        image: "turnips.png",
      },
      {
        id: 11215,
        name: "garlic",
        localizedName: "garlic",
        image: "garlic.png",
      },
      {
        id: 0,
        name: "soup",
        localizedName: "soup",
        image: "",
      },
    ],
    equipment: [
      {
        id: 404794,
        name: "stove",
        localizedName: "stove",
        image: "oven.jpg",
      },
      {
        id: 404752,
        name: "pot",
        localizedName: "pot",
        image: "stock-pot.jpg",
      },
    ],
    length: {
      number: 22,
      unit: "minutes",
    },
  },
  {
    number: 4,
    step: "Add the chicken breast and parsley. Cook for an additional 5 minutes. Adjust seasoning to taste.",
    ingredients: [
      {
        id: 5062,
        name: "chicken breast",
        localizedName: "chicken breast",
        image: "chicken-breasts.png",
      },
      {
        id: 1042027,
        name: "seasoning",
        localizedName: "seasoning",
        image: "seasoning.png",
      },
      {
        id: 11297,
        name: "parsley",
        localizedName: "parsley",
        image: "parsley.jpg",
      },
    ],
    equipment: [],
    length: {
      number: 5,
      unit: "minutes",
    },
  },
  {
    number: 5,
    step: "Serve the soup immediately garnished with fresh parsley and any additional toppings. Enjoy!",
    ingredients: [
      {
        id: 10511297,
        name: "fresh parsley",
        localizedName: "fresh parsley",
        image: "parsley.jpg",
      },
      {
        id: 0,
        name: "soup",
        localizedName: "soup",
        image: "",
      },
    ],
    equipment: [],
  },
];

let stringSteps = "Pasos a seguir:";

steps?.forEach((element) => {
  let stringIngredients = "";
  element.ingredients.forEach((anyIngredient) => {
    stringIngredients += ` ✅${anyIngredient.name}`;
  });

  let stringEquipment = "";
  element.equipment.forEach((anyEquipment) => {
    stringEquipment += ` 🫕${anyEquipment.name}`;
  });

  stringSteps += `
Paso ${element.number} - ${element.step}
         Ingredientes:${stringIngredients}
         Equipamento:${stringEquipment}`;
});

console.log(stringSteps);

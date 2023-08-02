import m from "./Detail.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import urlServer from "../../server";

export default function Detail(props) {
  const { id } = useParams();

  let [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`${urlServer}recipes/${id}`).then(({ data }) => {
      setCharacter(data);
    });
  }, [id]);

  const { title, image, healthScore, summary, steps } = character;

  let stringSteps = "Pasos a seguir:";

  if (!id.includes("-")) {
    steps?.forEach((element) => {
      let stringIngredients = "";
      element?.ingredients?.forEach((anyIngredient) => {
        stringIngredients += ` ✅${anyIngredient.name}`;
      });

      let stringEquipment = "";
      element?.equipment?.forEach((anyEquipment) => {
        stringEquipment += ` 🫕${anyEquipment.name}`;
      });

      stringSteps += `
Paso ${element.number} - ${element.step}
         Ingredientes:${stringIngredients}
         Equipamiento:${stringEquipment}`;
    });
  } else {
    steps?.forEach((element) => {
      stringSteps += `
    ✅ ${element}`;
    });
  }

  return (
    <div className={m.mainDiv}>
      <Link to="/Home">
        <button>Volver</button>
      </Link>

      <div className={m.div2}>
        <h1 className={m.h1}>{title}</h1>
        <img src={image} alt="No hay una imagen para mostar 😕" />
        <h2>Que tan saludable es ? ➡️{healthScore}❤️‍🩹</h2>
        <h3 dangerouslySetInnerHTML={{ __html: summary }} />
        <p />
        <span className={m.cadena}>{stringSteps}</span>
      </div>
    </div>
  );
}

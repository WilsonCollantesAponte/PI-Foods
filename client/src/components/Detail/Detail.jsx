import m from "./Detail.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail(props) {
  const { id } = useParams();

  let [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/recipes/${id}`).then(({ data }) => {
      setCharacter(data);
    });
  }, []);

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
      <h1>{title}</h1>
      <img src={image} alt="No hay una imagen para mostar :/" />
      <h1>Que tan saludable es ? ➡️{healthScore}❤️‍🩹</h1>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
      <p />
      <span className={m.k}>{stringSteps}</span>
    </div>
  );
}

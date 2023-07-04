import m from "./Card.module.css";

import { Link } from "react-router-dom";

export default function Card(props) {
  const { id, title, image, diets, healthScore } = props;

  const dietsParsed =
    diets?.length &&
    diets?.reduce((acc, val) => {
      return val + ", " + acc;
    });

  return (
    <Link to={`/Detail/${id}`}>
      <button>
        <div className={m.div}>
          <h1>{id}</h1>
          <h1>{title}</h1>
          {diets && diets.length ? (
            <div>
              {/* <label>Diets: </label>  */}
              <h2>{dietsParsed}</h2>
            </div>
          ) : (
            <h2>Para esta receta no hay dietas que mostrar</h2>
          )}
          <h1>{healthScore}</h1>
          <img src={image} alt="No hay una imagen disponible" />
        </div>
      </button>
    </Link>
  );
}

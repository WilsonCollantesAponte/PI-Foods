import m from "./FormCompleted.module.css";
import { Link } from "react-router-dom";

export default function FormCompleted() {
  return (
    <div className={m.mainDiv}>
      <Link to="/Home">
        <button className={m.button}>Volver</button>
      </Link>
      <div className={m.div}></div>
      <h1 className={m.h1}>
        Se ha guardado y creado una nueva receta con la información que se ha
        proporcionado
      </h1>
    </div>
  );
}

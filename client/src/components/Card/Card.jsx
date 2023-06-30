import m from "./Card.module.css";

export default function Card(props) {
  const { id, title, image, diets } = props;

  const dietsParsed =
    diets.length &&
    diets?.reduce((acc, val) => {
      return val + ", " + acc;
    });

  return (
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
      <img src={image} alt="No hay una imagen disponible" />
    </div>
  );
}

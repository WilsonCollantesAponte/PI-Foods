import { useState } from "react";
import validations from "./validations";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Form() {
  const navigate = useNavigate();

  const [area, setArea] = useState("");
  const [arrArea, setArrArea] = useState([]);
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState([]);

  const [checkDiets, setCheckDiets] = useState({
    vegetarian: false,
    "gluten free": false,
    "dairy free": false,
    "lacto ovo vegetarian": false,
    vegan: false,
    paleolithic: false,
    primal: false,
    "whole 30": false,
    pescatarian: false,
    ketogenic: false,
    "fodmap friendly": false,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const arrDiets = [];
    for (let key in checkDiets) {
      if (checkDiets[key]) arrDiets.push(key);
    }

    axios.post("http://localhost:3001/recipes", {
      ...formData,
      healthScore: +formData.healthScore,
      diets: arrDiets,
      steps: arrArea,
    });

    navigate("/FormCompleted");
  }

  function handleTextArea(event) {
    const { value } = event.target;
    setArea(value);
  }

  function handlePush(event) {
    event.preventDefault();

    if (!area) alert("No se guardará un paso vacío");
    else {
      const copyArray = [...arrArea];
      copyArray[count] = area;
      setArrArea(copyArray);

      if (copyArray[count + 1]) {
        setArea(copyArray[count + 1]);
        setCount(count + 1);
      } else {
        setArea("");
        setCount(count + 1);
      }
    }
  }

  function handleUpdate(event) {
    event.preventDefault();

    setArea(arrArea[count - 1]);
    setCount(count - 1);
  }

  function handleFormData(event) {
    const { name } = event.target;
    const { value } = event.target;

    setFormData({ ...formData, [name]: value });
    setFormErrors(validations({ ...formData, [name]: value }));
  }

  function handleCheck(event) {
    const { name } = event.target;

    const copyCheckDiets = { ...checkDiets };

    copyCheckDiets[name]
      ? (copyCheckDiets[name] = false)
      : (copyCheckDiets[name] = true);

    setCheckDiets(copyCheckDiets);
  }

  // function handleHome() {
  //   navigate("/home");
  // }

  return (
    <form onSubmit={handleSubmit}>
      {/* <Link to="/Home">
        <button onClick={handleHome}>Cancelar y volver a Home</button>
      </Link> */}

      <div>
        <label>Título</label>
        <input type="text" name="title" onChange={handleFormData} />
        {formErrors.title ? <div>{formErrors.title}</div> : null}
        <br />

        <label>Resumen</label>
        <textarea
          name="summary"
          id=""
          cols="30"
          rows="10"
          onChange={handleFormData}
        ></textarea>
        {formErrors.summary ? <div>{formErrors.summary}</div> : null}
        <br />

        <label>Imagen</label>
        <input
          type="url"
          name="image"
          onChange={handleFormData}
          placeholder="url..."
        />
        <br />

        <label>Puntuacion de comida saludable</label>
        <input
          type="number"
          placeholder="                <1-100>"
          name="healthScore"
          onChange={handleFormData}
        />
        {formErrors.healthScore ? <div>{formErrors.healthScore}</div> : null}
        <br />

        <div>Selecciona tipos de dieta</div>
        <label>vegetarian</label>
        <input type="checkbox" name="vegetarian" onChange={handleCheck} />
        <br />

        <label>gluten free</label>
        <input type="checkbox" name="gluten free" onChange={handleCheck} />
        <br />

        <label>dairy free</label>
        <input type="checkbox" name="dairy free" onChange={handleCheck} />
        <br />

        <label>lacto ovo vegetarian</label>
        <input
          type="checkbox"
          name="lacto ovo vegetarian"
          onChange={handleCheck}
        />
        <br />

        <label>vegan</label>
        <input type="checkbox" name="vegan" onChange={handleCheck} />
        <br />

        <label>paleolithic</label>
        <input type="checkbox" name="paleolithic" onChange={handleCheck} />
        <br />

        <label>primal</label>
        <input type="checkbox" name="primal" onChange={handleCheck} />
        <br />

        <label>whole 30</label>
        <input type="checkbox" name="whole 30" onChange={handleCheck} />
        <br />

        <label>pescatarian</label>
        <input type="checkbox" name="pescatarian" onChange={handleCheck} />
        <br />

        <label>ketogenic</label>
        <input type="checkbox" name="ketogenic" onChange={handleCheck} />
        <br />

        <label>fodmap friendly</label>
        <input type="checkbox" name="fodmap friendly" onChange={handleCheck} />
        <br />

        <label>Pasos</label>
        <textarea
          name="textArea"
          id=""
          cols="30"
          rows="10"
          onChange={handleTextArea}
          value={area}
        ></textarea>
        <br />
        {count ? <button onClick={handleUpdate}>⬅️</button> : <span>😁</span>}
        <span>Paso {count + 1}</span>
        <button onClick={handlePush}>
          Pulse para un nuevo paso ➡️ o para guardar el paso actual ✅
        </button>
        {arrArea.length === 0 ? (
          <div>
            No se ha registrado ningun paso por ahora, este campo es obligatorio
          </div>
        ) : arrArea.length === 1 ? (
          <div>Se ha registrado un paso escrito</div>
        ) : (
          <div>Se han registrado los {arrArea.length} pasos escritos</div>
        )}

        <br />
        <button
          type="submit"
          disabled={
            Object.keys(formErrors).length ||
            !(
              arrArea.length &&
              formData.title &&
              formData.summary &&
              formData.healthScore
            )
          }
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

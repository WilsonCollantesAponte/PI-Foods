import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import validations from "./validations";
import axios from "axios";

import m from "./Form.module.css";
import { posted_diets } from "../../redux/actions/actions";

export default function Form() {
  const dispatch = useDispatch();
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

  async function handleSubmit(event) {
    event.preventDefault();

    const arrDiets = [];
    for (let key in checkDiets) {
      if (checkDiets[key]) arrDiets.push(key);
    }

    const dietToSend = {
      ...formData,
      healthScore: +formData.healthScore,
      diets: arrDiets,
      steps: arrArea,
    };

    const { data } = await axios.post(
      "http://localhost:3001/recipes",
      dietToSend
    );

    dispatch(posted_diets(data));

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

  return (
    <form onSubmit={handleSubmit}>
      <Link to="/Home">
        <button>Cancelar y volver</button>
      </Link>

      <div className={m.mainDiv}>
        <label>Título</label>
        <input type="text" name="title" onChange={handleFormData} />
        {formErrors.title ? (
          <div className={m.error}>{formErrors.title}</div>
        ) : null}
        <br />

        <label>Resumen</label>
        <textarea
          name="summary"
          id=""
          cols="30"
          rows="10"
          onChange={handleFormData}
        ></textarea>
        {formErrors.summary ? (
          <div className={m.error}>{formErrors.summary}</div>
        ) : null}
        <br />

        <label>Imagen</label>
        <input
          type="text"
          name="image"
          onChange={handleFormData}
          placeholder="                   url..."
        />
        {formErrors.image ? (
          <div className={m.error}>{formErrors.image}</div>
        ) : null}
        <br />

        <label>Puntuacion de comida saludable</label>
        <input
          type="number"
          placeholder="                <1-100>"
          name="healthScore"
          onChange={handleFormData}
        />
        {formErrors.healthScore ? (
          <div className={m.error}>{formErrors.healthScore}</div>
        ) : null}
        <br />

        <div>Selecciona tipos de dieta</div>

        <div className={m.dietsTypes}>
          <label>vegetarian</label>
          <input type="checkbox" name="vegetarian" onChange={handleCheck} />

          <label>gluten free</label>
          <input type="checkbox" name="gluten free" onChange={handleCheck} />

          <label>dairy free</label>
          <input type="checkbox" name="dairy free" onChange={handleCheck} />

          <label className={m.indentifier}>lacto ovo vegetarian</label>
          <input
            className={m.indentifier}
            type="checkbox"
            name="lacto ovo vegetarian"
            onChange={handleCheck}
          />

          <label>vegan</label>
          <input type="checkbox" name="vegan" onChange={handleCheck} />

          <label>paleolithic</label>
          <input type="checkbox" name="paleolithic" onChange={handleCheck} />

          <label>primal</label>
          <input type="checkbox" name="primal" onChange={handleCheck} />

          <label>whole 30</label>
          <input type="checkbox" name="whole 30" onChange={handleCheck} />

          <label>pescatarian</label>
          <input type="checkbox" name="pescatarian" onChange={handleCheck} />

          <label>ketogenic</label>
          <input type="checkbox" name="ketogenic" onChange={handleCheck} />

          <label>fodmap friendly</label>
          <input
            type="checkbox"
            name="fodmap friendly"
            onChange={handleCheck}
          />
        </div>

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

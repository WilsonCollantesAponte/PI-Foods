import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import m from "./Cards.module.css";

import {
  add_character,
  filterByDiets,
  orderByHealthScore,
  orderByTitle,
  pager,
} from "../../redux/actions/actions";

import axios from "axios";

import Card from "../Card/Card";

export default function Cards() {
  const dispatch = useDispatch();

  const { allCharacters, postedDiets } = useSelector((state) => state);

  const [searchInput, setSearchInput] = useState("");
  const [selectDiet, setSelectDiet] = useState("");
  const [seelctTitle, setSelectTitle] = useState("");
  const [selectHealthScore, setSelectHealthScore] = useState("");
  const [page, setPage] = useState(1);

  //🗽

  function handleFilterByDiet(event) {
    const { value, name } = event.target;
    if (name === "diets") {
      setSelectDiet(value);
      dispatch(filterByDiets(value));
    }
    if (name === "titles") {
      setSelectTitle(value);
      dispatch(orderByTitle(value));
    }
    if (name === "healthScore") {
      setSelectHealthScore(value);
      dispatch(orderByHealthScore(value));
    }

    if (name === "inputSearch") setSearchInput(value);

    if (name === "right") setPage(page + 1);

    if (name === "left") setPage(page - 1);
  }

  function handleButton() {
    setSelectDiet("Por defecto");
    setSelectHealthScore("Por defecto");
    setSelectTitle("Por defecto");

    axios(`http://localhost:3001/recipes?name=${searchInput}`).then(
      ({ data }) => {
        dispatch(add_character(data));
      }
    );
  }

  useEffect(() => {
    axios(`http://localhost:3001/recipes`).then(({ data }) => {
      dispatch(add_character([...data, ...postedDiets]));

      dispatch(pager(page));
    });
  }, [page]);

  console.log(allCharacters);

  return (
    <div>
      <div className={m.bar}>
        <label className={m.label}>Tipo de dieta</label>
        <select value={selectDiet} onChange={handleFilterByDiet} name="diets">
          <option value="Por defecto">Por defecto</option>
          <option value="vegetarian">vegetarian</option>
          <option value="gluten free">gluten free</option>
          <option value="dairy free">dairy free</option>
          <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
          <option value="vegan">vegan</option>
          <option value="paleolithic">paleolithic</option>
          <option value="primal">primal</option>
          <option value="whole 30">whole 30</option>
          <option value="pescatarian">pescatarian</option>
          <option value="ketogenic">ketogenic</option>
          <option value="fodmap friendly">fodmap friendly</option>
        </select>

        <label className={m.label}>Ordenar títulos por</label>
        <select name="titles" value={seelctTitle} onChange={handleFilterByDiet}>
          <option value="Por defecto">Por defecto</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>

        <label className={m.label}>Ordenar por puntuación de salubridad</label>
        <select
          name="healthScore"
          value={selectHealthScore}
          onChange={handleFilterByDiet}
        >
          <option value="Por defecto">Por defecto</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
      </div>

      <div className={m.searchBar}>
        <label className={m.label}>Busca la receta aquí ➡️</label>
        <input name="inputSearch" type="search" onChange={handleFilterByDiet} />
        <button onClick={handleButton}>Buscar</button>
        <NavLink to="/Form">
          <button>Agregar nueva receta</button>
        </NavLink>

        <NavLink to="/">
          <button>Volver a la entreda</button>
        </NavLink>
      </div>

      <div>
        {!(page - 1) ? (
          <span>🐬</span>
        ) : (
          <button name="left" onClick={handleFilterByDiet}>
            ⬅
          </button>
        )}
        <span className={m.middle}>{page}</span>

        {allCharacters.length ? (
          <button name="right" onClick={handleFilterByDiet}>
            ➡
          </button>
        ) : (
          <span>🐬</span>
        )}
      </div>

      <div className={m.cards}>
        {allCharacters?.length ? (
          allCharacters.map((val) => {
            return (
              <Card
                className={m.card}
                key={val.id}
                id={val?.id}
                title={val?.title}
                image={val?.image}
                diets={val?.diets}
                healthScore={val?.healthScore}
              />
            );
          })
        ) : (
          <div className={m.notFoundRecipes}>
            <span className={m.span}>
              No se han encontrado recetas, prueba buscar otras 😕
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

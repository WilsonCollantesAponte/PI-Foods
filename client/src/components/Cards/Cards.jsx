import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { add_character, filterByDiets } from "../../redux/actions/actions";

import axios from "axios";

import Card from "../Card/Card";

export default function Cards() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios(`http://localhost:3001/recipes`).then(({ data }) => {
      dispatch(add_character(data));
    });
  }, []);

  const { allCharacters } = useSelector((state) => state);

  const [searchInput, setSearchInput] = useState("");

  const [select, setSelect] = useState("");

  //🗽

  function handleFilterByDiet(event) {
    const { value } = event.target;
    setSelect(value);
    dispatch(filterByDiets(value));
  }

  function handleInput(event) {
    const { value } = event.target;
    setSearchInput(value);
  }

  function handleButton() {
    setSelect("Por defecto");

    axios(`http://localhost:3001/recipes?name=${searchInput}`).then(
      ({ data }) => {
        dispatch(add_character(data));
      }
    );
  }

  return (
    <div>
      <select value={select} onChange={handleFilterByDiet}>
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

      <label>Busca la receta aquí ➡️</label>
      <input name="inputSearch" type="search" onChange={handleInput} />
      <button onClick={handleButton}>Buscar</button>
      <NavLink to="/Form">
        <button>Agregar nueva receta</button>
      </NavLink>

      {allCharacters.length ? (
        allCharacters.map((val) => {
          return (
            <Card
              key={val.id}
              id={val.id}
              title={val.title}
              image={val.image}
              diets={val.diets}
            />
          );
        })
      ) : (
        <div>No se han podido identificar dietas con ese tipo de receta</div>
      )}
    </div>
  );
}

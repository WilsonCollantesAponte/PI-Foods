import { ADD_CHARACTER, FILTER_BY_DIETS } from "../actions-types/action-types";

export function add_character(characters) {
  return {
    type: ADD_CHARACTER,
    payload: characters,
  };
}

export function filterByDiets(filter) {
  return {
    type: FILTER_BY_DIETS,
    payload: filter,
  };
}

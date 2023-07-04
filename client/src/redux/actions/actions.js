import {
  ADD_CHARACTER,
  FILTER_BY_DIETS,
  ORDER_BY_HEALTHSCORE,
  ORDER_BY_TITLE,
  PAGER,
} from "../actions-types/action-types";

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

export function orderByTitle(order) {
  return {
    type: ORDER_BY_TITLE,
    payload: order,
  };
}

export function orderByHealthScore(score) {
  return {
    type: ORDER_BY_HEALTHSCORE,
    payload: score,
  };
}

export function pager(page) {
  return {
    type: PAGER,
    payload: page,
  };
}

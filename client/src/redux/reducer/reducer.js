import { ADD_CHARACTER, FILTER_BY_DIETS } from "../actions-types/action-types";

const initialState = {
  allCharacters: [],
  supportAllCharacters: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_CHARACTER:
      return {
        allCharacters: payload,
        supportAllCharacters: payload,
      };

    case FILTER_BY_DIETS:
      return payload !== "Por defecto"
        ? {
            ...state,
            allCharacters: state.supportAllCharacters.filter((val) =>
              val.diets?.includes(payload)
            ),
          }
        : {
            ...state,
            allCharacters: state.supportAllCharacters,
          };

    default:
      return state;
  }
}

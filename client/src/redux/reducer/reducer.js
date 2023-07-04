import {
  ADD_CHARACTER,
  FILTER_BY_DIETS,
  ORDER_BY_HEALTHSCORE,
  ORDER_BY_TITLE,
  PAGER,
} from "../actions-types/action-types";

const initialState = {
  supportAllCharacters: [],
  allCharacters: [],
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
            allCharacters: [...state.supportAllCharacters].filter((val) =>
              val.diets?.includes(payload)
            ),
          }
        : {
            ...state,
            allCharacters: [...state.supportAllCharacters],
          };

    case ORDER_BY_TITLE:
      return payload === "Por defecto"
        ? { ...state, allCharacters: [...state.supportAllCharacters] }
        : payload === "A"
        ? {
            ...state,
            allCharacters: [...state.allCharacters].sort((a, b) => {
              if (a.title > b.title) return 1;
              if (a.title < b.title) return -1;
              return 0;
            }),
          }
        : {
            ...state,
            allCharacters: [...state.allCharacters].sort((a, b) => {
              if (a.title > b.title) return -1;
              if (a.title < b.title) return 1;
              return 0;
            }),
          };

    case ORDER_BY_HEALTHSCORE:
      if (payload === "Por defecto")
        return { ...state, allCharacters: [...state.supportAllCharacters] };
      if (payload === "A")
        return {
          ...state,
          allCharacters: [...state.allCharacters].sort((a, b) => {
            if (a.healthScore > b.healthScore) return 1;
            if (a.healthScore < b.healthScore) return -1;
            return 0;
          }),
        };
      // if (payload === "D")
      return {
        ...state,
        allCharacters: [...state.allCharacters].sort((a, b) => {
          if (a.healthScore > b.healthScore) return -1;
          if (a.healthScore < b.healthScore) return 1;
          return 0;
        }),
      };

    case PAGER: {
      let currentPage = [];
      for (let index = 9; index > 0; index--) {
        currentPage.push(state.supportAllCharacters[payload * 9 - index]);
      }
      return {
        ...state,
        allCharacters: currentPage,
      };
    }

    default:
      return state;
  }
}

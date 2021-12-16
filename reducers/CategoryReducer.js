import { LOAD_CATEGORIES, LOAD_CATEGORY } from "./store";

export const CategoryReducer = (state, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case LOAD_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

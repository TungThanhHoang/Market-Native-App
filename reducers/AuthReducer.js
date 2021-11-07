import { LOAD_USER } from "./store";

export const AuthReducer = (state, action) => {
  const {
    type,
    payload: { isAuth, user, ward },
  } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isLoading: false,
        isAuth,
        user,
        ward,
      };
    default:
      return state;
  }
};

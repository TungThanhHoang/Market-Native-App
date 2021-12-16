import axios from "axios";
import React, { createContext, useState, useEffect, useReducer } from "react";
import { API_URL } from "../constants/constant";
import { CategoryReducer } from "../reducers/CategoryReducer";
import { LOAD_CATEGORIES, LOAD_CATEGORY } from "../reducers/store";
export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categoryState, dispatch] = useReducer(CategoryReducer, {
    isLoading: true,
    categories: [],
    category: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadCategory = async () => {
    try {
      await axios
        .get(`${API_URL}/categories`)
        .then((res) =>
          dispatch({
            type: LOAD_CATEGORIES,
            payload: res.data,
          })
        )
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const loadOneCategory = async (catId) => {
    try {
        setIsLoading(true);
      await axios
        .get(`${API_URL}/categories/${catId}`)
        .then((res) => {
            setIsLoading(false),
          dispatch({ type: LOAD_CATEGORY, payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const dataContext = {
    categoryState,
    isLoading,
    loadCategory,
    loadOneCategory,
  };

  return (
    <CategoryContext.Provider value={dataContext}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/constant";
export const SearchContext = createContext();
const SearchContextProvider = ({ children }) => {
  const [searchItem, setSearchItem] = useState([]);
  const [stringSearch] = useState("");
  const searchProduct = async (stringSearch) => {
    try {
      await axios
        .get(`${API_URL}/products?_q=${stringSearch}`)
        .then((res) => setSearchItem(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const dataContext = {
    stringSearch,
    searchItem,
    searchProduct,
  };
  return (
    <SearchContext.Provider value={dataContext}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;

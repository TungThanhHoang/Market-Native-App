import axios from "axios";
import "intl";
import "intl/locale-data/jsonp/en";
import React, { createContext, useState, useReducer } from "react";
import { ProductReducer } from "../reducers/ProductReducer";
import { API_URL, TOKEN_USER } from "../constants/constant";
import {
  LOAD_NEW_PRODUCTS,
  LOAD_ONE_PRODUCT,
  LOAD_PRODUCTs,
} from "../reducers/store";
export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(ProductReducer, {
    isLoading: true,
    products: [],
    newProducts: [],
    product: [],
  });
  const [idProduct, setIdProduct] = useState([]);
  const [isloading, setLoading] = useState(false);
  const loadProduct = async (type) => {
    try {
      const response = await axios.get(
        `${API_URL}/products?wards.slug=${type}&_start=8&_sort=createdAt:DESC`
      );
      if (response.data) {
        dispatch({
          type: LOAD_PRODUCTs,
          payload: response.data,
          isloading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadNewProduct = async (type) => {
    try {
      await axios
        .get(
          `${API_URL}/products?wards.slug=${type}&_limit=8&_sort=createdAt:DESC`
        )
        .then((res) => {
          dispatch({
            type: LOAD_NEW_PRODUCTS,
            payload: res.data,
            isloading: false,
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const loadOneProduct = async (idProduct) => {
    setLoading(true);
    try {
      await axios
        .get(`${API_URL}/products/${idProduct}`)
        .then((res) => {
          setLoading(false);
          dispatch({ type: LOAD_ONE_PRODUCT, payload: [res.data] });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const formatPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const dataContext = {
    productState,
    formatPrice,
    isloading,
    idProduct,
    loadProduct,
    loadNewProduct,
    loadOneProduct,
  };

  return (
    <ProductContext.Provider value={dataContext}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;

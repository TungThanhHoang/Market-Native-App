import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL, TOKEN_USER } from "../constants/constant";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const loadItemCart = async () => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);
    try {
      const response = await axios.get(
        `${API_URL}/items?_sort=createdAt:DESC`,
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      );
      if (response.data) {
        const getCart = response.data.filter((item) => item !== null);
        setCartItem(getCart);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemCart = async (itemId) => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);

    try {
      await axios
        .delete(`${API_URL}/items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((res) => {
          if (res.data) {
            loadItemCart();
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToCart = async (productId) => {
    const item = cartItem.find((idItem) => idItem.products.id === productId);
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);
    try {
      setIsLoading(true);
      if (item) {
        const response = await axios.put(
          `${API_URL}/items/${item.id}`,
          {
            quanlity: parseInt(item.quanlity) + 1,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenUser}`,
            },
          }
        );
        if (response.data) {
          setIsLoading(false);
          loadItemCart();
        }
      } else {
        const response = await axios.post(
          `${API_URL}/items`,
          {
            products: productId,
            quanlity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenUser}`,
            },
          }
        );
        if (response.data) {
          setIsLoading(false);
          loadItemCart();
        }
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const increaseQuanlity = async (itemId, quanlity) => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);

    try {
      if (quanlity < 10) {
        setIsLoading(true);
        await axios
          .put(
            `${API_URL}/items/${itemId}`,
            {
              quanlity: parseInt(quanlity) + 1,
            },
            {
              headers: {
                Authorization: `Bearer ${tokenUser}`,
              },
            }
          )
          .then((res) => {
            if (res.data) {
              setIsLoading(false);
              loadItemCart();
            }
          });
      } else {
        alert("Đã đạt tối đa số lượng!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseQuanlity = async (itemId, quanlity) => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);

    try {
      if (quanlity > 1) {
        await axios
          .put(
            `${API_URL}/items/${itemId}`,
            {
              quanlity: parseInt(quanlity) - 1,
            },
            {
              headers: {
                Authorization: `Bearer ${tokenUser}`,
              },
            }
          )
          .then((res) => {
            if (res.data) {
              loadItemCart();
            }
          });
      } else {
        alert("Đã đạt tối thiểu số lượng!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataContext = {
    isloading,
    cartItem,
    loadItemCart,
    decreaseQuanlity,
    increaseQuanlity,
    addProductToCart,
    deleteItemCart,
  };
  return (
    <CartContext.Provider value={dataContext}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;

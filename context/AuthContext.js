import React, { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthReducer } from "../reducers/AuthReducer";
import { LOAD_USER } from "../reducers/store";
import { API_URL, TOKEN_USER } from "../constants/constant";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    isLoading: true,
    isAuth: false,
    user: null,
    ward: null,
  });

  // const setToken = (token) => {
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = ` Bearer ${token} `;
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  // };
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const loadUser = async () => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);
    if (SecureStore[TOKEN_USER]) {
      console.log("token", tokenUser);
    }
    try {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });
      if (response.data) {
        dispatch({
          type: LOAD_USER,
          payload: {
            isAuth: true,
            user: response.data,
            ward: response.data.ward,
          },
        });
      }
    } catch (error) {
      await SecureStore.deleteItemAsync(TOKEN_USER);
      dispatch({
        type: LOAD_USER,
        payload: { isAuth: false, user: null, ward: null },
      });
      console.log(error);
    }
  };

  const loginUser = async (identifier, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/local`, {
        identifier,
        password,
      });
      if (response.data) {
        await SecureStore.setItemAsync(TOKEN_USER, response.data.jwt);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (formRegister) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/local/register`,
        formRegister
      );
      if (response.data.user) {
        await SecureStore.setItemAsync(TOKEN_USER, response.data.jwt);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync(TOKEN_USER);
    await SecureStore.deleteItemAsync("ward");
    dispatch({
      type: LOAD_USER,
      payload: { isAuth: false, user: null, ward: null },
    });
  };

  const updateUser = async (updateAddress, userId) => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);
    setLoadingUpdate(true);
    try {
      const response = await axios.put(
        `${API_URL}/users/${userId}`,
        updateAddress,
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      );
      if (response.data) {
        setLoadingUpdate(false);
        await loadUser();
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const contextData = {
    authState,
    loadingUpdate,
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;

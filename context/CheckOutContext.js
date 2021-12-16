import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL, TOKEN_USER } from "../constants/constant";
export const CheckOutContext = createContext();
const CheckOutContextProvider = ({ children }) => {
  const [payment, setPayment] = useState([]);
  const [bill, setBill] = useState([]);
  const [stateBill, setStateBill] = useState("unconfirmed");
  const [summaryBill, setSummaryBill] = useState([]);
  const [detailBill, setDetailBill] = useState([]);
  const [loadingCheckOut, setLoadingCheckOut] = useState(false);
  const orderProducts = async (formProduct) => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);
    setLoadingCheckOut(true);
    try {
      const response = await axios.post(`${API_URL}/bills`, formProduct, {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      });
      if (response.data) {
        setLoadingCheckOut(false);
        setPayment(response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const loadBill = async () => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);
    try {
      await axios
        .get(`${API_URL}/bills?_sort=createdAt:DESC`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((res) => setBill(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoadBillDeivery = async (stateBill) => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);
    try {
      await axios
        .get(`${API_URL}/bills?status=${stateBill}&_sort=createdAt:DESC`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((res) => setSummaryBill(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const loadOneBill = async (billId) => {
    const tokenUser = await SecureStore.getItemAsync(TOKEN_USER);
    try {
      await axios
        .get(`${API_URL}/bills/${billId}`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((res) => setDetailBill(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const contextData = {
    bill,
    payment,
    summaryBill,
    detailBill,
    loadingCheckOut,
    stateBill,
    loadBill,
    handleLoadBillDeivery,
    setStateBill,
    orderProducts,
    loadOneBill,
  };
  return (
    <CheckOutContext.Provider value={contextData}>
      {children}
    </CheckOutContext.Provider>
  );
};

export default CheckOutContextProvider;

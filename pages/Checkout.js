import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
// import QRCode from "react-native-qrcode-svg";
import QRCode from "qrcode";

import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/core";

import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { CheckOutContext } from "../context/CheckOutContext";

import CheckOutProduct from "../components/CheckOutProduct";
import Payment from "../components/Payment";
import Canvas from "react-native-canvas";
import LoadingPage from "../components/LoadingPage";
const windowWidth = Dimensions.get("window").width;

const payments = [
  {
    id: 11,
    img: require("../assets/payment-cod.png"),
    title: "Thanh toán tiền mặt khi nhận hàng",
  },
  {
    id: 22,
    img: require("../assets/payment-mo-mo.png"),
    title: "Thanh toán bằng ví MoMo",
  },
  {
    id: 3,
    img: require("../assets/payment-atm.png"),
    title: "Thanh toán bằng ATM/Internet Banking",
  },
];
const codeOrder = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Checkout({ route }) {
  const navigation = useNavigation();
  const { cart, totalPrice } = route.params;
  const { loadItemCart } = useContext(CartContext);
  const {
    authState: {
      user: { address, ward, district, firstname, lastname, phone },
    },
  } = useContext(AuthContext);
  const { formatPrice } = useContext(ProductContext);
  const { orderProducts, loadingCheckOut } = useContext(CheckOutContext);

  const [checked, setChecked] = useState(payments[0].title);
  const [imgQR, setImgQR] = useState("hello word");
  const [convertProduct, setConvertProduct] = useState("");
  // console.log(convertProduct);
  const code = codeOrder(10000000, 100000000);

  const [order, setOrder] = useState({
    id_code: JSON.stringify(code),
    phone: `${phone}`,
    name: `${lastname}${firstname} `,
    cart: cart.map((item) => item.id),
    price: JSON.stringify(totalPrice + 15000),
    address: `${address}, ${ward}, ${district}`,
    payment: checked,
  });
  const [sendCode] = useState({
    id_code: JSON.stringify(code),
    phone: `${phone}`,
    name: `${lastname} ${firstname}`,
    price: JSON.stringify(totalPrice + 15000),
    address: `${address}, ${ward}, ${district}`,
  });
  let opts = {
    errorCorrectionLevel: "Q",
    width: 256,
    height: 256,
  };
// console.log(cart);
  useEffect(() => {
    const arrayProduct = [];
    cart?.forEach((item) => {
      arrayProduct.push(...convertProduct, {
        title: item.products.title,
        price:item.products.Price,
        picture: item.products.picture[0].url,
        quanlity: item.quanlity,
      });
    });
    setConvertProduct(arrayProduct);
  }, []);

  QRCode.toString(
    JSON.stringify({
      ...sendCode,
      product: convertProduct,
      payment: checked,
    }),
    opts
  )
    .then((res) => {
      setImgQR(res);
    })
    .catch((err) => {
      console.error(err);
    });

  const handleSubmit = async () => {
    try {
      const submit = await orderProducts({
        ...order,
        id_code: JSON.stringify(code),
        imgcode: imgQR,
        payment: checked,
      });
      if (submit) {
        loadItemCart();
        navigation.navigate("Order-success", { codeId: code });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {loadingCheckOut ? <LoadingPage /> : null}
        <Navbar title="Thanh toán" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location" size={20} color="#247BA0" />
              <Text>Địa chỉ giao hàng</Text>
            </View>
            <View style={{ paddingLeft: 4 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    borderRightWidth: 1,
                    borderColor: "#000",
                    marginRight: 5,
                  }}
                >
                  {lastname} {firstname}
                </Text>
                <Text style={{ fontWeight: "500" }}>{phone}</Text>
              </View>
              <View style={{ marginTop: 2 }}>
                <Text style={styles.title}>{address}</Text>
                <Text style={styles.title}>
                  {ward}, {district}, TP Đà Nẵng
                </Text>
              </View>
            </View>
          </View>
          <View>
            {cart?.map((item, index) => (
              <CheckOutProduct key={index} item={item} />
            ))}
          </View>
          <View style={{ backgroundColor: "#fff", marginTop: 8, padding: 10 }}>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="wallet-outline" size={22} color="#E07A5F" />
                <Text
                  style={{ paddingLeft: 10, fontWeight: "500", fontSize: 15 }}
                >
                  Phương thức thanh toán
                </Text>
              </View>
              <View>
                {payments.map((item, index) => (
                  <Payment
                    key={item.id}
                    item={item}
                    checked={checked}
                    setChecked={setChecked}
                  />
                ))}
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={styles.billDetail}>
                  <Text style={styles.titleBill}>Tổng tiền hàng</Text>
                  <Text style={styles.titleBill}>
                    {formatPrice.format(totalPrice)}
                  </Text>
                </View>
                <View style={styles.billDetail}>
                  <Text style={styles.titleBill}>Phí vận chuyển</Text>
                  <Text style={styles.titleBill}>
                    {formatPrice.format(10000)}
                  </Text>
                </View>
                <View style={styles.billDetail}>
                  <Text style={styles.titleSumBill}>Tổng thanh toán</Text>
                  <Text style={[styles.titleSumBill, { color: "#FFDC5E" }]}>
                    {formatPrice.format(totalPrice + 10000)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              paddingLeft: 10,
              marginTop: 8,
              paddingTop: 18,
              paddingBottom: 18,
              justifyContent: "flex-start",
            }}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color="#E07A5F"
            />
            <Text>Nhấn đặt hàng là đồng ý với điều khoản của chúng tôi</Text>
          </View>
          <View></View>
        </ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            width: 200,
            zIndex: 10,
            width: windowWidth,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          }}
        >
          <View style={{ alignItems: "flex-end", marginRight: 10 }}>
            <Text style={{ fontSize: 16 }}>Tổng tiền</Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {formatPrice.format(totalPrice + 10000)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleSubmit()}>
            <View
              style={{
                backgroundColor: "#FFDC5E",
                height: 45,
                borderRadius: 10,
                marginVertical: 10,
                paddingHorizontal: 25,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 1.0,

                elevation: 1,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Đặt hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default Checkout;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 8,
    backgroundColor: "#fff",
    borderColor: "#D5D6AA",
    borderRadius: 8,
    borderWidth: 0.5,
  },
  title: {
    color: "#353535",
  },
  billDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  titleBill: {
    color: "#666",
  },
  titleSumBill: {
    fontSize: 16,
    fontWeight: "500",
  },
});

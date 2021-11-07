import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

import CheckOutProduct from "../components/CheckOutProduct/CheckOutProduct";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { CheckOutContext } from "../context/CheckOutContext";
import Payment from "../components/CheckOutProduct/Payment";

const windowWidth = Dimensions.get("window").width;

const payments = [
  {
    id: 1,
    img: require("../assets/payment-cod.png"),
    title: "Thanh toán tiền mặt khi nhận hàng",
  },
  {
    id: 2,
    img: require("../assets/payment-mo-mo.png"),
    title: "Thanh toán bằng ví MoMo",
  },
  {
    id: "3",
    img: require("../assets/payment-atm.png"),
    title: "Thanh toán bằng ATM/Internet Banking",
  },
];

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
  const { orderProducts } = useContext(CheckOutContext);

  const [checked, setChecked] = useState(payments[0].title);

  const codeOrder = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const code = codeOrder(10000000, 100000000);

  const [order, setOrder] = useState({
    id_code: JSON.stringify(code),
    phone: `${phone}`,
    name: `${lastname}${firstname} `,
    cart: cart.map((item) => item.id),
    price: JSON.stringify(totalPrice),
    address: `${address}, ${ward}, ${district}`,
    payment: checked,
  });

  console.log(checked);

  const handleSubmit = async () => {
    try {
      const submit = await orderProducts({ ...order, payment: checked });
      if (submit) {
        Alert.alert("Đặt hàng thành công");
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
        <Navbar title="Thanh toán" navigation={navigation} />
        <ScrollView>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={20} />
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
                  Hoàng Thanh Tùng
                </Text>
                <Text style={{ fontWeight: "500" }}>0326625927</Text>
              </View>
              <View style={{ marginTop: 2 }}>
                <Text style={styles.title}>93 Lương Văn Can</Text>
                <Text style={styles.title}>
                  Phường Khuê Trung, Quận Cẩm Lệ, Đà Nẵng
                </Text>
              </View>
            </View>
          </View>
          <FlatList
            scrollEnabled={false}
            data={cart}
            renderItem={({ item, index }) => (
              <CheckOutProduct key={index} item={item} />
            )}
            keyExtractor={({ item, index }) => `${index}`}
          />
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
                    key={index}
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
        </ScrollView>
        <View
          style={{
            backgroundColor: "#eee",
            height: 55,
            width: 200,
            zIndex: 10,
            width: windowWidth,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
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
                width: (windowWidth * 1.2) / 3,
                backgroundColor: "#FFDC5E",
                height: 55,
                alignItems: "center",
                justifyContent: "center",
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
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderColor: "#D5D6AA",
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

import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { CheckOutContext } from "../context/CheckOutContext";
import CheckOutProduct from "../components/CheckOutProduct";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ShowQRCode from "../components/ShowQRCode";

function DetailOrderBill({ route }) {
  const { billId, cart } = route.params;
  console.log(billId);
  const navigation = useNavigation();
  const {
    authState: {
      user: { firstname, lastname },
    },
  } = useContext(AuthContext);

  const { formatPrice } = useContext(ProductContext);
  const [visible, setVisible] = useState(false);
  const {
    loadOneBill,
    detailBill: {
      id,
      id_code,
      imgcode,
      status,
      price,
      payment,
      address,
      phone,
      createdAt,
    },
  } = useContext(CheckOutContext);
  useEffect(() => {
    loadOneBill(billId);
  }, [billId]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <Navbar navigation={navigation} title="Chi tiết đơn hàng" />
        <View>
          <ShowQRCode
            imgcode={`${imgcode}`}
            visible={visible}
            setVisible={setVisible}
          />
        </View>
        <ScrollView>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              marginTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ paddingBottom: 4, marginRight: 4 }}>
                  Trạng thái đơn hàng:
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {status === "confirmed"
                    ? "Đã xác nhận"
                    : status === "unconfirmed"
                    ? "Chưa xác nhận"
                    : status === "deliveried"
                    ? "Đã giao hàng"
                    : status === "delivery"
                    ? "Đang giao hàng"
                    : "Đã hủy"}
                </Text>
              </View>
              <Text style={{ paddingVertical: 4, color: "#666" }}>
                {payment}
              </Text>
            </View>
            <Ionicons
              name={
                status === "unconfirmed"
                  ? "alert-circle"
                  : status === "deliveried"
                  ? "checkmark-circle"
                  : status === "delivery"
                  ? "bus"
                  : "checkbox"
              }
              size={50}
              color="#73E2A7"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              padding: 10,
              margin: 5,
              marginTop: 10,
              borderRadius: 8,
              borderWidth: 0.5,
            }}
          >
            <Ionicons name="location" size={20} color="#247BA0" />
            <View style={{ padding: 2 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "500", fontSize: 16 }}>
                  {lastname} {firstname}
                </Text>
                <Text style={{ marginLeft: 8, fontWeight: "500" }}>
                  {phone}
                </Text>
              </View>
              <Text style={{ color: "#666", paddingVertical: 4 }}>
                {address}
              </Text>
            </View>
          </View>
          <View>
            {cart?.map((item) => (
              <CheckOutProduct key={item.id} item={item} />
            ))}
          </View>
          <View></View>
          <View
            style={{
              marginTop:10,
              backgroundColor: "#fff",
              padding: 10,
              borderBottomWidth: 0.8,
              borderBottomColor: "#eee",
            }}
          >
            <Text>
              Đơn hàng: <Text style={{ fontWeight: "500" }}>#{id_code}</Text>
            </Text>
            <Text style={{ color: "#666", fontSize: 12, paddingVertical: 5 }}>
              Đặt hàng {createdAt}
            </Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => setVisible(!visible)}
            >
              <Ionicons name="qr-code-outline" size={20} />
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 4,
                  textDecorationLine: "underline",
                  color: "#666",
                }}
              >
                Xem mã QR
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "#fff", padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 5,
              }}
            >
              <Text>Tổng tiền </Text>
              <Text style={{ color: "#666" }}>
                {formatPrice.format(price - 10000)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <Text>Phí vận chuyển</Text>
              <Text style={{ color: "#666" }}>{formatPrice.format(10000)}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Tổng cộng</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  paddingBottom: 10,
                  color: "#F18F01",
                }}
              >
                {formatPrice.format(price)}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {status === "deliveried" || status === "canceled" ? (
              <View
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  borderRadius: 8,
                  marginTop: 20,
                  borderWidth: 1,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "500" }}>Đặt lại</Text>
              </View>
            ) : status === "unconfirmed" ? (
              <View
                style={{
                  backgroundColor: "#F18F01",
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  borderRadius: 8,
                  marginTop: 20,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "500" }}>
                  Hủy đơn hàng
                </Text>
              </View>
            ) : (
              null
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default DetailOrderBill;

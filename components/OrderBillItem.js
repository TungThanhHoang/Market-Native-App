import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import OrderBillProductItem from "./OrderBillProductItem";
import { useNavigation } from "@react-navigation/core";
function OrderBillItem({
  item: { id,id_code, status, createdAt, price, cart },
  formatPrice,
}) {
  const navigation = useNavigation()
  //  format date time
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const dateOrder = date.toLocaleString("en-Us");
    return dateOrder;
  };

  return (
    <>
      <TouchableOpacity onPress={()=> navigation.navigate('Detail-bill' , { billId: id , cart:cart })}>
      <View
        style={{
          backgroundColor: "#fff",
          marginVertical: 5,
          marginHorizontal: 2,
          padding: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: "#eee",
          }}
        >
          <Text style={{ color: "#666" }}>#{id_code}</Text>
          <Text
            style={{
              textTransform: "uppercase",
              fontSize: 12,
              fontWeight: "500",
              color: "red",
            }}
          >
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
        {/* product  */}
        {cart.map((product) => (
          <OrderBillProductItem
            key={product.id}
            product={product}
            formatPrice={formatPrice}
          />
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 15,
            paddingBottom: 10,
            borderTopColor: "#eee",
            borderTopWidth: 1,
          }}
        >
          <Text style={{ color: "#666" }}>{formatDate(createdAt)}</Text>
          <Text style={{ color: "#666" }}>
            {" "}
            Tổng số tiền:
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#FFB30F",
                paddingLeft: 10,
              }}
            >
              {formatPrice.format(price)}
            </Text>
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    </>
  );
}

export default OrderBillItem;

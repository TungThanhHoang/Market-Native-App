import React from "react";
import { View, Image, Text } from "react-native";
import { API_URL } from "../constants/constant";
function OrderBillProductItem({
  product: {
    quanlity,
    products: {
      title,
      Price,
      size,
      picture: {
        0: { url },
      },
    },
  },
  formatPrice,
}) {
  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Image
          source={{ uri: `${url}` }}
          style={{ width: 80, height: 80, resizeMode: "contain" }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 8,
            flex: 1,
          }}
        >
          <View>
            <Text style={{ fontSize: 16 }}>{title}</Text>
            <Text style={{ paddingVertical: 4 }}>{size}</Text>
            <Text>SL: x{quanlity}</Text>
          </View>
          <Text style={{ color: "#666" }}>{formatPrice.format(Price)}</Text>
        </View>
      </View>
    </>
  );
}

export default OrderBillProductItem;

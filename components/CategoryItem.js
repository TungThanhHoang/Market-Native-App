import React, { useContext } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API_URL } from "../constants/constant";
import { ProductContext } from "../context/ProductContext";
import { useNavigation } from "@react-navigation/core";
const windowWidth = Dimensions.get("window").width;

function CategoryItem({
  item: {
    id,
    title,
    size,
    Price,
    picture: {
      0: { url },
    },
  },
}) {
  const navigation = useNavigation();
  const { formatPrice } = useContext(ProductContext);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail-product", { idProduct:id })}
      >
        <View
          style={{
            width: windowWidth / 2 - 10,
            backgroundColor: "#fff",
            margin: 5,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0.5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.41,
            elevation: 1,
          }}
        >
          <Image
            source={{ uri: `${API_URL}${url}` }}
            style={{
              width: "100%",
              height: 140,
              borderRadius: 8,
            }}
          />
          <View style={{ padding: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
            <Text style={{ fontSize: 12, color: "#666" }}>Quận Hải Châu</Text>
            <Text style={{}}>
              {size === "onebox"
                ? "Hộp"
                : size === "onebotlle"
                ? "Chai"
                : size === "fivegram"
                ? "500g"
                : ""}
            </Text>
            <Text
              style={{
                paddingVertical: 4,
                fontSize: 16,
                fontWeight: "500",
                color: "#f1c40f",
              }}
            >
              {formatPrice.format(Price)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default CategoryItem;

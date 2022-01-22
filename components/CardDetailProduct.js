import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Toast } from "@ant-design/react-native";
import { Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URL } from "../constants/constant";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useNavigation } from "@react-navigation/core";
import { CartContext } from "../context/CartContext";
function CardDetailProduct({
  item: {
    id,
    title,
    Price,
    size,
    picture: {
      0: { url },
    },
  },
  formatPrice,
}) {
  const navigation = useNavigation();

  const { cartItem, addProductToCart } = useContext(CartContext);

  const handleAddProduct = (productId) => {
    const addCart = addProductToCart(productId);
    if (addCart) {
      Toast.success("Thêm vào giỏ hàng thành công", 1);
    }
    return addCart;
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: windowHeight }}>
        <View
          style={{
            position: "absolute",
            top: 25,
            left: 10,
            zIndex: 10,
            opacity: 0.6,
            backgroundColor: "rgba(90, 90, 90, .6)",
            borderRadius: 20,
            padding: 4,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            right: 90,
            top: 25,
            zIndex: 10,
            backgroundColor: "rgba(90, 90, 90, .6)",
            borderRadius: 20,
            padding: 4,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Cart")}
          >
            <Ionicons name="cart-outline" size={25} color="#fff" />
            <Badge
              status="error"
              value={`${cartItem.length}`}
              containerStyle={{ position: "absolute", top: -4, right: -4 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            right: 50,
            top: 25,
            opacity: 0.6,
            zIndex: 10,
            backgroundColor: "rgba(90, 90, 90, .6)",
            borderRadius: 20,
            padding: 4,
          }}
        >
          <Ionicons name="pricetag-outline" size={25} color="#fff" />
        </View>
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 25,
            opacity: 0.6,
            zIndex: 10,
            backgroundColor: "rgba(90, 90, 90, .6)",
            borderRadius: 20,
            padding: 4,
          }}
        >
          <Ionicons name="settings-outline" size={25} color="#fff" />
        </View>
        <Image
          source={{ uri: `${url}` }}
          style={{ width: windowWidth, height: 350 }}
        />
        <View style={{ padding: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>{title}</Text>
            <Text
              style={{
                fontSize: 18,
                color: "#f1c40f",
                fontWeight: "800",
                paddingTop: 5,
              }}
            >
              {formatPrice.format(Price)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 8,
            }}
          >
            <Text style={{ fontSize: 16 }}>Khối lượng</Text>
            <Text
              style={{
                fontSize: 16,
                backgroundColor: "#FFDC5E",
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 4,
                paddingBottom: 4,
                marginLeft: 10,
                fontWeight: "600",
              }}
            >
              {size === "onebox"
                ? "Hộp"
                : size === "onebotlle"
                ? "Chai"
                : size === "fivegram"
                ? "500g"
                : ""}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="location-outline" size={18} />
            <Text style={{ opacity: 0.6 }}>Phường Khuê Trung, Quận Cẩm Lệ</Text>
          </View>
          <View>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
              temporibus officia at blanditiis eum beatae nobis sed numquam
              neque accusantium ut in ducimus sequi id itaque ad, optio error.
              Beatae.
            </Text>
          </View>
        </View>
        <View style={styles.buttonBuy}>
          <View style={{marginHorizontal:15 , alignItems:"center"}}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="#666" />
            <Text style={{color:'#666' ,fontSize:12}}> Chat </Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFBF81",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              borderRadius: 10,
              height: 45,
            }}
          >
            <Ionicons name="cart-outline" size={24} />
            <Text style={{ fontSize:14 , fontWeight:"500"}}>Thêm vào giỏ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddProduct(id)}
            style={{
              backgroundColor: "#FFDC5E",
              // width: (windowWidth * 2) / 3,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 35,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 14 }}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CardDetailProduct;

const styles = StyleSheet.create({
  buttonBuy: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    width: windowWidth,
    alignItems: "center",
    height: 55,
    justifyContent: "space-between",
    borderTopWidth: 0.3,
    backgroundColor: "#fff",
    borderColor: "#eee",
  },
});

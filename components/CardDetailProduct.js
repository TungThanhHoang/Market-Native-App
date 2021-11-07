import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
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
  const { cartItem ,decreaseQuanlity, increaseQuanlity, addProductToCart } =
    useContext(CartContext);

  const navigation = useNavigation();

  const handleAddProduct = (productId) => {
    const addCart = addProductToCart(productId);
    if (addCart) {
      Alert.alert("Thêm sản phẩm thành công");
    }
    return addCart;
  };
  return (
    <View style={{ flex:1}}>
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
          padding: 2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          right: 90,
          top: 25,
          zIndex:10,
          backgroundColor: "rgba(90, 90, 90, .6)",
          borderRadius: 20,
          padding: 4,
        }}
      >
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Cart")}>
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
        source={{ uri: `${API_URL}${url}` }}
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
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 8 }}
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
          style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="location-outline" size={18} />
          <Text style={{ opacity: 0.6 }}>Phường Khuê Trung, Quận Cẩm Lệ</Text>
        </View>
        <View>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
            temporibus officia at blanditiis eum beatae nobis sed numquam neque
            accusantium ut in ducimus sequi id itaque ad, optio error. Beatae.
          </Text>
        </View>
      </View>
      <View style={styles.buttonBuy}>
        <TouchableOpacity
          style={{
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            width: (windowWidth * 1) / 3,
            backgroundColor: "#FFBF81",
          }}
        >
          <Ionicons name="cart-outline" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAddProduct(id)}
          style={{
            backgroundColor: "#FFDC5E",
            width: (windowWidth * 2) / 3,
            height: 55,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Mua ngay</Text>
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
  },
});

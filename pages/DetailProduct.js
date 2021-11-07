import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import CardDetailProduct from "../components/CardDetailProduct";
import { ProductContext } from "../context/ProductContext";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
import { API_URL } from "../constants/constant";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function DetailProduct({ route }) {
  const { idProduct: id } = route.params;
  const {
    productState: { product },
    formatPrice,
    loadOneProduct,
    isloading,
    idProduct,
  } = useContext(ProductContext);

  useEffect(() => {
    loadOneProduct(id);
  }, []);

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      {isloading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            top: windowHeight / 2,
          }}
        >
          <PulseIndicator color="#ECD444" size={80} />
        </View>
      ) : (
        <View>
          {product?.map((item) => {
            return (
              <CardDetailProduct
                key={item.id}
                item={item}
                formatPrice={formatPrice}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

export default DetailProduct;

const styles = StyleSheet.create({
  headerTop: {
    backgroundColor: "yellow",
    height: 90,
    width: windowWidth,
  },
});

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
import LoadingPage from "../components/LoadingPage";
const windowWidth = Dimensions.get("window").width;

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
        <LoadingPage />
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

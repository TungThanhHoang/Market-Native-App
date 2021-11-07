import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
const ProductStack = createStackNavigator();
function ProductScreen() {
  return (
    <>
      <ProductStack.Navigator
        initialRouteName="Product"
        screenOptions={{ headerShown: false }}
      >
        <ProductStack.Screen name="Product" component={Product} />
        <ProductStack.Screen name="Product-detail" component={ProductDetail} />
      </ProductStack.Navigator>
    </>
  );
}

export default ProductScreen;

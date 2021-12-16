import React, { useLayoutEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Home from "../pages/Home";
import Product from "../pages/Product";
import DetailProduct from "../pages/DetailProduct";
import Cart from "../pages/Cart";
import DetailCategory from "../pages/DetailCategory";
const HomeStack = createStackNavigator();
export default function HomeScreen({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Detail-product" || routeName === "Detail-category") {
      navigation.setOptions({ tabBarVisible: false });
    } else if (routeName === "Cart") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);
  return (
    <>
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Detail-category" component={DetailCategory} screenOptions={{gestureEnabled: false}}  />
        <HomeStack.Screen name="Detail-product" component={DetailProduct} />
        <HomeStack.Screen name="Product" component={Product} />
        <HomeStack.Screen name="Cart" component={Cart} />
      </HomeStack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
});

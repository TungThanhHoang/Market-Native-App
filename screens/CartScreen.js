import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Home from "../pages/Home";
const CartStack = createStackNavigator();
function CartScreen({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName == "Home") {
      navigation.setOptions({ tabBarVisible: true });
    } else {
      navigation.setOptions({ tabBarVisible: false });
    }
  }, [navigation, route]);
  return (
    <>
      <CartStack.Navigator
        initialRouteName="Cart"
        screenOptions={{ headerShown: false }}
      >
        <CartStack.Screen
          name="Cart"
          component={Cart}
          options={{ title: "Giỏ Hàng" }}
        />
        <CartStack.Screen name="Home" component={Home} />
        <CartStack.Screen name="Checkout" component={Checkout} />
        <CartStack.Screen name="Order-success" component={OrderSuccess} />
      </CartStack.Navigator>
    </>
  );
}

export default CartScreen;

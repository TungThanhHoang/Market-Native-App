import React, { useEffect, useState, useContext } from "react";
import * as Font from "expo-font";
import { Provider } from "@ant-design/react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import SearchScreen from "../screens/SearchScreen";
import QrcodeScreen from "../screens/QrcodeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import QrcodeButtonTab from "../components/QrcodeButtonTab";
import { CartContext } from "../context/CartContext";
import CartScreen from "../screens/CartScreen";

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
function Navigation() {
  const { cartItem, loadItemCart } = useContext(CartContext);

  useEffect(() => {
    Font.loadAsync(
      "antoutline",
      require("@ant-design/icons-react-native/fonts/antoutline.ttf")
    );
  }, []);

  useEffect(() => {
    loadItemCart();
  }, []);
  return (
    <>
      <Provider>
        <Tab.Navigator
          screenOptions={{ headerShow: false }}
          tabBarOptions={{
            style: {
              backgroundColor: "#fff",
              borderTopColor: "transparent",
              padding: 5,
              height: 55,
            },
            activeTintColor: "#EEBA0B",
            inactiveTintColor: "#272838",
          }}
        >
          <Tab.Screen
            name="Trang Chủ"
            component={HomeScreen}
            options={{
              tabBarLabel: "Trang chủ",
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Sản Phẩm"
            component={CartScreen}
            options={{
              tabBarBadge: `${cartItem?.length}`,
              tabBarLabel: "Giỏ hàng",
              tabBarIcon: ({ color }) => (
                <Ionicons name="cart" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Qr"
            component={QrcodeScreen}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ size, color }) => <QrcodeButtonTab size={26} />,
             
            }}
          />
          <Tab.Screen
            name="Tìm kiếm"
            component={SearchScreen}
            options={{
              tabBarLabel: "Tìm kiếm",
              tabBarIcon: ({ color }) => (
                <Ionicons name="search" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Tài khoản"
            component={AccountScreen}
            options={{
              tabBarLabel: "Tài khoản",
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </Provider>
    </>
  );
}

export default Navigation;

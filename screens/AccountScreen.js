import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import InfoUser from "../pages/InfoUser";
import SettingUser from "../pages/SettingUser";
import OrderBill from "../pages/OrderBill";
import DetailOrderBill from "../pages/DetailOrderBill";
import DetailUser from "../pages/DetailUser";
import AddressUser from "../pages/AddressUser";
import PasswordUser from "../pages/PasswordUser";
const AccountStack = createStackNavigator();
function AccountScreen({ navigation, route }) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Order-bill" || routeName === "Detail-bill" || routeName === "Detail-user" || routeName === "Address-user" || routeName === "Password-user") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);
  return (
    <>
      <AccountStack.Navigator screenOptions={{ headerShown: false }}>
        <AccountStack.Screen name="Info-user" component={InfoUser} />
        <AccountStack.Screen name="Order-bill" component={OrderBill} />
        <AccountStack.Screen name="Detail-bill" component={DetailOrderBill} />
        <AccountStack.Screen name="Setting" component={SettingUser} />
        <AccountStack.Screen name="Detail-user" component={DetailUser} />
        <AccountStack.Screen name="Address-user" component={AddressUser} />
        <AccountStack.Screen name="Password-user" component={PasswordUser} />
      </AccountStack.Navigator>
    </>
  );
}

export default AccountScreen;

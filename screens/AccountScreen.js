import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoUser from "../pages/InfoUser";
import Bill from "../pages/Bill";
import SettingUser from "../pages/SettingUser";
const AccountStack = createStackNavigator();
function AccountScreen() {
  return (
    <>
      <AccountStack.Navigator screenOptions={{ headerShown: false }}>
        <AccountStack.Screen name="Info-user" component={InfoUser} />
        <AccountStack.Screen name="Bill" component={Bill} />
        <AccountStack.Screen name="Setting" component={SettingUser} />
      </AccountStack.Navigator>
    </>
  );
}

export default AccountScreen;

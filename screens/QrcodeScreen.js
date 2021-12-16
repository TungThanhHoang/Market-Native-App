import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import QRCodeCheck from "../pages/QRCodeCheck";

const QRcodeStack = createStackNavigator();
function QrcodeScreen({ navigation, route }) {
  useLayoutEffect(() => {
      navigation.setOptions({ tabBarVisible: false });
  }, [navigation, route]);
  return (
    <>
      <QRcodeStack.Navigator
        initialRouteName="qrcode"
        screenOptions={{ headerShown: false }}
      >
        <QRcodeStack.Screen name="qrcode" component={QRCodeCheck} />
      </QRcodeStack.Navigator>
    </>
  );
}

export default QrcodeScreen;

import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "@ant-design/react-native";
import * as Font from "expo-font";
import Login from "../pages/Login";
import Register from "../pages/Register";
const AuthStack = createStackNavigator();
function AuthUser() {
  useEffect(() => {
    Font.loadAsync(
      "antoutline",
      require("@ant-design/icons-react-native/fonts/antoutline.ttf")
    );
  }, []);
  return (
    <>
      <Provider>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
      </Provider>
    </>
  );
}

export default AuthUser;

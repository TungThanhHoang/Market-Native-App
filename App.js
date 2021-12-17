import "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import ProductContextProvider from "./context/ProductContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./screens/Landing";
import ProtectRouter from "./routing/ProtectRouter";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import CheckOutContextProvider, {
  CheckOutContext,
} from "./context/CheckOutContext";
import CategoryContextProvider from "./context/CategoryContext";
import SearchContextProvider from "./context/SearchContext";

const Root = createStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <CategoryContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <CheckOutContextProvider>
              <SearchContextProvider>
                <NavigationContainer>
                  <Root.Navigator
                    initialRouteName="Landing"
                    screenOptions={{
                      gestureEnabled: false,
                      headerShown: false,
                    }}
                  >
                    <Root.Screen name="Landing" component={Landing} />
                    <Root.Screen name="Protect" component={ProtectRouter} />
                  </Root.Navigator>
                </NavigationContainer>
              </SearchContextProvider>
            </CheckOutContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </CategoryContextProvider>
    </AuthContextProvider>
  );
}

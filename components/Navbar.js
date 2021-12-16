import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CartContext } from "../context/CartContext";
function Navbar({ navigation, title }) {
  const { cartItem } = useContext(CartContext);
  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          height: 70,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 30,
            left: 10,
            zIndex: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: 30,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View
            style={{
              position: "absolute",
              right: 50,
              top: 30,
              zIndex: 10,
            }}
          >
            <Ionicons
              name="cart-outline"
              size={25}
              color="#000"
              
            />
            <Badge
              status="error"
              value={`${cartItem.length}`}
              containerStyle={{ position: "absolute", top: -4, right: -4 }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 28,
            zIndex: 10,
          }}
        >
          <Ionicons name="settings-outline" size={25} color="#000" />
        </View>
      </View>
    </>
  );
}

export default Navbar;

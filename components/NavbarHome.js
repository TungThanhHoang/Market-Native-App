import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/core";
function NavbarHome() {
  const {
    authState: {
      user: { firstname, ward, district },
    },
  } = useContext(AuthContext);

  const { cartItem } = useContext(CartContext);
  const navigation = useNavigation()
  return (
    <>
      <View style={styles.headerTop}>
        <Image
          source={{
            uri: "https://assets.glxplay.io/static/avatars/Avatar%20Profile-12.png",
          }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View style={styles.titleName}>
          <Text style={styles.title}>Xin chào, {firstname}</Text>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={18} />
            <Text style={styles.subTitle}>
              {ward}, {district}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
          <View>
            <Ionicons name="cart-outline" size={30} color="#272838" />
            <Badge
              status="error"
              value={`${cartItem.length}`}
              containerStyle={{ position: "absolute", top: -4, right: -4 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default NavbarHome;

const styles = StyleSheet.create({
  headerTop: {
    paddingTop: 30,
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 90,
    shadowColor: "#000",
  },
  titleName: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: "800",
  },
  location: {
    flexDirection: "row",
    paddingTop: 5,
    alignItems: "center",
  },
  subTitle: {
    opacity: 0.6,
    fontSize: 12,
  },
});

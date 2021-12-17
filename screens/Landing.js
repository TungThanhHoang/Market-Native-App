import React, { useContext, useEffect,useRef } from "react";
import { Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductContext } from "../context/ProductContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Landing() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <LottieView
          style={{ width: 300, height: 300 }}
          source={require("../assets/shopping-market.json")}
          // ref={animation.current}
          // speed={0.6}
          loop={true}
          autoPlay
        />
      </View>
      <View style={styles.content}></View>
      <View style={styles.start}>
        <TouchableOpacity onPress={() => navigation.navigate("Protect")}>
          <Text style={styles.titleStart}>Shopping ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Landing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: windowWidth - 20,
    height: 200,
  },
  content: {
    flex: 1,
  },
  start: {
    position: "absolute",
    bottom: 20,
    left: 10,
    backgroundColor: "rgb(241, 196, 15)",
    width: windowWidth - 20,
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  titleStart: {
    fontSize: 16,
    fontWeight: "600",
    color:'#222'
  },
});

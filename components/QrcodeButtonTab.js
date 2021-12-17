import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

function QrcodeButtonTab({ size }) {
  return (
    <>
      <View style={styles.container}>
        {/* <Ionicons name="qr-code" color="#fff" size={size} /> */}
        <LottieView
          style={{ width: 60, height: 60 }}
          source={require("../assets/qr-scan.json")}
          // ref={animation.current}
          // speed={0.6}
          loop={true}
          autoPlay
        />
      </View>
    </>
  );
}

export default QrcodeButtonTab;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: 42,
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

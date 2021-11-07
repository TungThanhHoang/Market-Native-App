import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function QrcodeButtonTab({ size }) {
 
  return (
    <>
      <View style={styles.container}>
        <Ionicons name="qr-code" color="#fff" size={size} />
      </View>
    </>
  );
}

export default QrcodeButtonTab;

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  
});

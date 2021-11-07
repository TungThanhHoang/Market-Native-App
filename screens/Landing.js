import React, { useContext ,useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductContext } from "../context/ProductContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Landing() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
      </View>
      <View style={styles.content}>
      </View>
      <View style={styles.start}>
        <TouchableOpacity onPress={()=> navigation.navigate('Protect')}>
          <Text style={styles.titleStart}>Bắt Đầu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Landing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: windowWidth - 20,
    height: 200,
  },
  content: {
    backgroundColor: "rgb(52, 152, 219)",
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
  },
});

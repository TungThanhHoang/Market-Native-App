import React from "react";
import { PulseIndicator } from "react-native-indicators";
import { View, Text, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;

function LoadingPage() {
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          top: windowHeight / 2,
          zIndex:999
        }}
      >
        <PulseIndicator color="#ECD444" size={80} />
      </View>
    </>
  );
}

export default LoadingPage;

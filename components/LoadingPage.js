import React from "react";
import { PulseIndicator } from "react-native-indicators";
import { View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function LoadingPage() {
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          top: windowHeight / 2,
          zIndex: 999,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          // height: windowHeight
        }}
      >
        {/* <PulseIndicator color="#ECD444" size={80} /> */}
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          <LottieView
            style={{ width: 80, height: 80 }}
            source={require("../assets/loading1.json")}
            loop={true}
            autoPlay
          />
        </View>
      </View>
    </>
  );
}

export default LoadingPage;

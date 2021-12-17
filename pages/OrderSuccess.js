import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

function OrderSuccess({ route }) {
  const navigation = useNavigation();
  const { codeId } = route.params;
  return (
    <>
      <SafeAreaView style={{ flex: 1 , backgroundColor:'#fff' }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: 55,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
            Thành công
          </Text>
          <View style={{ position: "absolute", right: 15, top: 5 }}>
            <TouchableOpacity
              style={{ zIndex: 10 }}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons name="close-outline" size={32} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <LottieView
            source={require("../assets/check-mark-success.json")}
            style={{
              width: 200,
              height: 180,
            }}
            autoPlay
            loop={false}
          />
          <Text style={{ marginTop: 30, fontWeight: "600" }}>
            Mã đơn hàng: <Text>{codeId}</Text>
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View
              style={{
                backgroundColor: "#FFDC5E",
                width: windowWidth - 50,
                height: 50,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Trở về trang chủ
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Order-bill", { undefined })}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#222",
                width: windowWidth - 50,
                height: 50,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Xem chi tiết đơn hàng
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:"center", marginTop:50}}>
          <LottieView 
           style={{ width:10 , height:100}}
           source={require('../assets/order-delivered.json')}
           speed={0.4}
           autoPlay={true}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 15,
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "#666", paddingRight: 5 }}>
            Gặp sự cố?
            <Text style={{ color: "#000", fontWeight: "500" }}>
              Liên hệ với chúng tôi
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default OrderSuccess;

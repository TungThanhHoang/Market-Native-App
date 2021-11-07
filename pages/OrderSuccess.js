import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;

function OrderSuccess({ route }) {
  const navigation = useNavigation();
  const { codeId } = route.params;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 55,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Thành công</Text>
        <TouchableOpacity style={{ zIndex:10}} onPress={()=> navigation.navigate('Home')}>
          <View style={{ position: "absolute", right: 15 }}>
            <Ionicons name="close-outline" size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={require("../assets/delivery-truck.png")}
          style={{
            width: windowWidth - 50,
            height: 300,
            resizeMode: "contain",
          }}
        />
        <Text style={{ marginTop: 30 }}>
          Mã đơn hàng: <Text>{codeId}</Text>
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
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
        <TouchableOpacity>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#666",
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
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: 15,
          left: (windowWidth * 1) / 3,
        }}
      >
        <Text style={{ color: "#666" }}>
          Gặp sự cố?{" "}
          <Text style={{ color: "#000", fontWeight: "500", paddingLeft: 4 }}>
            Liên hệ với chúng tôi
          </Text>{" "}
        </Text>
      </View>
    </>
  );
}

export default OrderSuccess;

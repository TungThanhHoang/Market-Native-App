import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput ,Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import Select from "../components/Select";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function RegisterScreen() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const handleShow = ()=>{
  }
  const handleLoginForm = async () => {
    if (identifier === "" || password === "") {
      Toast.success("Load success !!!", 1);
    }
    try {
      const sendData = await loginUser(identifier, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.backgroundHeader}>
            <Text style={styles.brandName}>Shopping Market</Text>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Ionicons name="close-outline" size={40} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.backgroundContent}>
            <Text style={styles.titleHeader}>Đăng Ký</Text>
            <View>
              <Text style={styles.title}>Họ</Text>
              <TextInput style={styles.input} name="lastname" />
            </View>
            <View>
              <Text style={styles.title}>Tên</Text>
              <TextInput style={styles.input} name="firstname" />
            </View>
            <View>
              <Text style={styles.title}>Tài khoản</Text>
              <TextInput style={styles.input} name="email" />
            </View>
            <View>
              <Text style={styles.title}>Mật khẩu</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                name="password"
              />
            </View>
            <View>
              <Text style={styles.title}>Số điện thoại</Text>
              <TextInput style={styles.input} name="phone" />
            </View>
            <View>
              {/* <TextInput onPress={()=> handleShow()}>hi</TextInput> */}
            </View>
            <View>
              <Text style={styles.title}>Phường/Xã</Text>
              <TextInput style={styles.input} name="phone" />
            </View>
            <View>
              <Text style={styles.title}>Địa chỉ</Text>
              <TextInput style={styles.input} name="phone" />
            </View>
            <TouchableOpacity
              style={styles.btnLogin}
              color="#f1c40f"
              backgroundColor="#f1c40f"
              onPress={() => handleLoginForm(identifier, password)}
            >
              <Text style={styles.textBtn}>Đăng Ký</Text>
            </TouchableOpacity>
            <View style={styles.navigateRegister}>
              <Text> Đã có tài khoản ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.textRegister}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 1,
    flex: 1,
    backgroundColor: "#f1c40f",
    alignItems: "center",
  },
  backgroundHeader: {
    backgroundColor: "#f1c40f",
    width: windowWidth,
    height: 150,
    alignItems: "flex-start",
  },
  brandName: {
    position: "absolute",
    top: 20,
    left: 30,
    fontSize: 28,
    fontWeight: "600",
  },
  icon: { right: 15, top: 15, position: "absolute" },
  backgroundContent: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    width: windowWidth,
    // height: windowHeight,
    padding: 10,
    alignItems: "center",
  },
  titleHeader: {
    marginTop: 20,
    fontWeight: "500",
    fontSize: 28,
  },
  title: {
    paddingTop: 12,
    paddingBottom: 5,
    fontSize: 15,
    textAlign: "left",
  },
  input: {
    height: 50,
    width: windowWidth - 80,
    borderWidth: 1,
    borderColor: "#f1c40f",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  btnLogin: {
    color: "#000",
    marginTop: 30,
    backgroundColor: "#f1c40f",
    borderColor: "#f1c40f",
    width: windowWidth - 80,
    padding: 15,
    borderRadius: 10,
  },
  textBtn: {
    textAlign: "center",
    fontSize: 16,
  },
  navigateRegister: {
    flexDirection: "row",
    marginTop: 20,
    fontSize: 16,
  },
  textRegister: {
    paddingLeft: 5,
  },
  btn: {
    marginTop: 30,
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f1c40f",
    backgroundColor: "#fff",
    width: windowWidth - 80,
    borderRadius: 10,
  },
});

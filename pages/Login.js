import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Toast } from "@ant-design/react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Login() {
  const navigation = useNavigation();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser , authState:{ isLoading} } = useContext(AuthContext);

  const handleLoginForm = async () => {
    if (identifier === "" || password === "") {
      return Toast.fail("Nhập dữ liệu", 1);
    } 
    try {
      const sendData = await loginUser(identifier, password);
      if (sendData === undefined) {
       return Toast.fail("Tài khoản hoặc mật khẩu không đúng" ,1)
      } 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.backgroundHeader}>
          <Text style={styles.brandName}>Shopping Market</Text>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
              <Ionicons name="close-outline" size={40} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.backgroundContent}>
          <Text style={styles.titleHeader} h3>
            Đăng Nhập
          </Text>
          <View>
            <Text style={styles.title}>Tài khoản</Text>
            <TextInput
              style={styles.input}
              name="identifier"
              value={identifier}
              onChangeText={setIdentifier}
            />
          </View>
          <View>
            <Text style={styles.title}>Mật khẩu</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              name="password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity
            style={styles.btnLogin}
            color="#f1c40f"
            backgroundColor="#f1c40f"
            onPress={() => handleLoginForm(identifier, password)}
          >
            <Text style={styles.textBtn}>{ isLoading ? "loading..." : " Đăng nhập"}</Text>
          </TouchableOpacity>
          <View style={styles.navigateRegister}>
            <Text> Chưa có tài khoản ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.textRegister}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Login;

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
    height: windowHeight,
    padding: 10,
    alignItems: "center",
  },
  titleHeader: {
    marginTop: 20,
    fontWeight: "500",
    fontSize: 24,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 12,
    fontSize: 14,
    textAlign: "left",
  },
  input: {
    height: 45,
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
});

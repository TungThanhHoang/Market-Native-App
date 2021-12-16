import React, { useState, useContext } from "react";
import { Toast } from "@ant-design/react-native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import Select from "../components/Select";
import country from "../db/ward.json";
import ModalSelectCountry from "../components/ModalSelectCountry";
import { AuthContext } from "../context/AuthContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function Register() {
  const navigation = useNavigation();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectCountryId, setSelectCountries] = useState(null);
  const [selectStateId, setSelectState] = useState(null);
  // Register
  const [dataRegister, setDataRegister] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const {
    registerUser,
    authState: { isLoading },
  } = useContext(AuthContext);

  console.log(selectCountryId);
  console.log(selectStateId);
  const handleSelectCoutry = (value) => {
    setSelectState(null);
    setSelectCountries(value);
  };
  const handleSelectState = (value) => {
    setSelectState(value);
  };
  const handleLoginForm = async () => {
    if (dataRegister.email === "" || dataRegister.password === "") {
      return Toast.fail("Nhập dữ liệu !!!", 1);
    } else if (dataRegister.password !== dataRegister.confirmPassword) {
      return Toast.fail("Mật khấu không khớp", 1);
    }
    try {
      const sendData = await registerUser({
        ...dataRegister,
        ward: selectStateId,
        district: selectCountryId,
      });
      console.log(sendData);
      if (sendData === undefined) {
        Toast.fail("Tài khoản hoặc mật khẩu không đúng", 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ width: "100%", paddingBottom: 100 }}>
          <ModalSelectCountry
            modalVisible={modalVisible1}
            setModalVisible={setModalVisible1}
            options={country.countries}
            value={selectCountryId}
            handleSelect={handleSelectCoutry}
            title="Chọn Quận/Huyện"
          />
          <ModalSelectCountry
            modalVisible={modalVisible2}
            setModalVisible={setModalVisible2}
            options={country.ward.filter(
              (state) => state.countryId === selectCountryId
            )}
            value={selectStateId}
            handleSelect={handleSelectState}
            title="Chọn Phường/Xã"
          />
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
              <TextInput
                style={styles.input}
                name="lastname"
                value={dataRegister.lastname}
                onChangeText={(text) =>
                  setDataRegister({ ...dataRegister, lastname: text })
                }
              />
            </View>
            <View>
              <Text style={styles.title}>Tên</Text>
              <TextInput
                style={styles.input}
                name="firstname"
                value={dataRegister.firstname}
                onChangeText={(text) =>
                  setDataRegister({ ...dataRegister, firstname: text })
                }
              />
            </View>
            <View>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.input}
                name="email"
                value={dataRegister.email}
                onChangeText={(text) =>
                  setDataRegister({ ...dataRegister, email: text })
                }
              />
            </View>
            <View>
              <Text style={styles.title}>Mật khẩu</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                name="password"
                value={dataRegister.password}
                onChangeText={(text) =>
                  setDataRegister({ ...dataRegister, password: text })
                }
              />
            </View>
            <View>
              <Text style={styles.title}>Xác nhận mật khẩu</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                name="confirmpassword"
                value={dataRegister.confirmPassword}
                onChangeText={(text) =>
                  setDataRegister({ ...dataRegister, confirmPassword: text })
                }
              />
            </View>
            <View>
              <Text style={styles.title}>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                name="phone"
                value={dataRegister.phone}
                onChangeText={(text) =>
                  setDataRegister({ ...dataRegister, phone: text })
                }
              />
            </View>
            <View></View>
            <View>
              <Text style={styles.title}>Quận/Huyện</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(!modalVisible1);
                }}
              >
                <View style={styles.input}>
                  <Text style={{ fontSize: 15 }}>{selectCountryId}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.title}>Phường/Xã</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}
              >
                <View style={styles.input}>
                  <Text style={{ fontSize: 15 }}>{selectStateId}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.title}>Địa chỉ</Text>
              <TextInput
                style={styles.input}
                name="address"
                onChangeText={(text) =>
                  setDataRegister({ ...dataRegister, address: text })
                }
              />
            </View>
            <TouchableOpacity
              style={styles.btnLogin}
              color="#f1c40f"
              backgroundColor="#f1c40f"
              onPress={() => handleLoginForm()}
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Register;

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
    height: 90,
    alignItems: "flex-start",
  },
  brandName: {
    position: "absolute",
    top: 0,
    left: 30,
    fontSize: 28,
    fontWeight: "600",
  },
  icon: { right: 15, top: -5, position: "absolute" },
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
    justifyContent: "center",
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

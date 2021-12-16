import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
const windowWidth = Dimensions.get("window").width;
function SettingUser({ navigation }) {
  const { logoutUser } = useContext(AuthContext);
  const handleLogOut = () => {
    logoutUser();
  };
  return (
    <>
      <View style={styles.barSetting}>
        <TouchableOpacity onPress={() => navigation.navigate("Info-user")}>
          <Ionicons
            style={styles.iconClose}
            name="chevron-back-outline"
            size={26}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Thiết lập tài khoản</Text>
      </View>
      <View style={styles.wrapSetting}>
        <Text style={styles.titleSetting}>Thiết lập hồ sơ</Text>
        <View style={styles.backgroundCard}>
          <TouchableOpacity style={styles.cardItem} onPress={()=> navigation.navigate('Detail-user')} >
            <Text>Hồ sơ của tôi</Text>
            <Ionicons name="chevron-forward-outline" color="#000" size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={()=> navigation.navigate('Address-user')} >
            <Text>Địa chỉ</Text>
            <Ionicons name="chevron-forward-outline" size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={()=> navigation.navigate('Password-user')}>
            <Text>Mật khẩu</Text>
            <Ionicons name="chevron-forward-outline" size={22} />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleSetting}>Hổ trợ</Text>
        <View style={styles.backgroundCard}>
          <View style={styles.cardItem}>
            <Text>Trung tâm hổ trợ</Text>
            <Ionicons name="chevron-forward-outline" size={22} />
          </View>
          <View style={styles.cardItem}>
            <Text>Tiêu chuẩn cộng đồng</Text>
            <Ionicons name="chevron-forward-outline" size={22} />
          </View>
          <View style={styles.cardItem}>
            <Text>Giới thiệu</Text>
            <Ionicons name="chevron-forward-outline" size={22} />
          </View>
        </View>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => handleLogOut()}>
          <Text style={styles.button}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default SettingUser;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
  },
  barSetting: {
    backgroundColor: "#FFDC5E",
    height: 70,
    paddingTop: 20,
    alignItems:"center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  iconClose: {
    marginLeft: 10,
  },
  titleSetting: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 12,
  },
  wrapSetting: {
    // padding: 10,
  },
  backgroundCard: {
    backgroundColor: "#fff",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e3e4e6",
    paddingTop: 12,
    paddingBottom: 12,
    padding: 10,
  },
  logout: {
    marginTop: 15,
    alignItems: "center",
  },
  button: {
    height: 50,
    width: 100,
    borderRadius: 20,
    width: windowWidth - 20,
    backgroundColor: "#FFDC5E",
    textAlign: "center",
    alignItems: "center",
    paddingTop: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});

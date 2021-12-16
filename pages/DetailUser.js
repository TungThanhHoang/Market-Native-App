import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/core";
function DetailUser() {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <Navbar title="Thông tin tài khoản" navigation={navigation} />
        <View style={styles.card}>
          <View style={styles.layour}>
            <Text>Họ</Text>
            <View style={styles.editText}>
              <Text style={styles.textStyle}>Hoàng Thanh</Text>
              <Ionicons name="create-outline" size={20} color="#666" />
            </View>
          </View>
          <View style={styles.layour}>
            <Text>Tên</Text>
            <View style={styles.editText}>
              <Text style={styles.textStyle}>Tùng</Text>
              <Ionicons name="create-outline" size={20} color="#666" />
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.layour}>
            <Text>Số điện thoại</Text>
            <View style={styles.editText}>
              <Text style={styles.textStyle}>03266794</Text>
              <Ionicons name="create-outline" size={20} color="#666" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default DetailUser;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  layour: {
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    color: "#666",
    marginRight: 8,
  },
  editText: {
    flexDirection: "row",
    alignItems: "center",
  },
});

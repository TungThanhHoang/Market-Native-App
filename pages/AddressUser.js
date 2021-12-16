import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/core";
function AddressUser() {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <Navbar title="Thông tin địa chỉ" navigation={navigation} />
        <View style={styles.card}>
          <View style={styles.layour}>
            <Text>Quận/Huyện</Text>
            <View style={styles.editText}>
              <Text style={styles.textStyle}>Quận Cẩm Lệ</Text>
              <Ionicons name="create-outline" size={20} color="#666" />
            </View>
          </View>
          <View style={styles.layour}>
            <Text>Phường/Xã</Text>
            <View style={styles.editText}>
              <Text style={styles.textStyle}>Phường Khuê Trung</Text>
              <Ionicons name="create-outline" size={20} color="#666" />
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.layour}>
            <Text>Địa chỉ</Text>
            <View style={styles.editText}>
              <Text style={styles.textStyle}>93 Lương Văn</Text>
              <Ionicons name="create-outline" size={20} color="#666" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default AddressUser;

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

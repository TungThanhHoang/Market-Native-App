import React from "react";
import { View, Text, StyleSheet, TextInput ,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
const windowWidth = Dimensions.get('window').width
function PasswordUser() {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1 , justifyContent:"space-between" }}>
        <View>
          <Navbar title="Thay đổi mật khẩu" navigation={navigation} />
          <View style={styles.card}>
            <View style={styles.layour}>
              <Text>Mật khẩu hiện tại</Text>
              <View style={styles.editText}>
                <TextInput
                  style={styles.textStyle}
                  autoComplete="password"
                ></TextInput>
                <Ionicons name="create-outline" size={20} color="#666" />
              </View>
            </View>
            <View style={styles.layour}>
              <Text>Mật khẩu mới</Text>
              <View style={styles.editText}>
                <Text style={styles.textStyle}></Text>
                <Ionicons name="create-outline" size={20} color="#666" />
              </View>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.btnSave}>
            <Text style={{ fontWeight:"500"}}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default PasswordUser;

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
  btnSave: {
      alignItems:"center",
      backgroundColor:'#FFDC5E',
      padding:15,
      width: windowWidth/3,
      alignSelf:"center",
      marginBottom:40,
      borderRadius:10,
    
  },
});

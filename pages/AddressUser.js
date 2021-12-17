import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/core";
import ModalSelectCountry from "../components/ModalSelectCountry";
import country from "../db/ward.json";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import { Toast } from "@ant-design/react-native";
import LoadingPage from "../components/LoadingPage";
const windowWidth = Dimensions.get("window").width;
function AddressUser() {
  const navigation = useNavigation();
  const {
    authState: {
      user: { ward, district, address, id },
    },
    updateUser,
    loadingUpdate,
  } = useContext(AuthContext);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectCountryId, setSelectCountries] = useState(district);
  const [selectStateId, setSelectState] = useState(ward);
  const [updateAddress, setUpdateAddress] = useState({
    ward: selectStateId,
    district: selectCountryId,
    address: address,
  });

  const handleSelectCoutry = (value) => {
    setSelectState(null);
    setSelectCountries(value);
  };
  const handleSelectState = (value) => {
    setSelectState(value);
  };
  const handleUpdateUser = async () => {
    try {
      const update = await updateUser(
        {
          ...updateAddress,
          ward: selectStateId,
          district: selectCountryId,
        },
        id
      );
      if (update) {
        Toast.success("Cập nhật thành công", 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectCountryId);
  console.log(selectStateId);
  return (
    <>
      <View >
        {loadingUpdate ? <LoadingPage /> : null}
        <View>
          <Navbar title="Thông tin địa chỉ" navigation={navigation} />
          <View>
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
          </View>
          <View style={styles.card}>
            <View style={styles.layour}>
              <Text>Quận/Huyện</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(!modalVisible1);
                }}
              >
                <View style={styles.editText}>
                  <Text style={styles.textStyle}>{selectCountryId}</Text>
                  <Ionicons name="create-outline" size={20} color="#666" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.layour}>
              <Text>Phường/Xã</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}
              >
                <View style={styles.editText}>
                  <Text style={styles.textStyle}>{selectStateId}</Text>
                  <Ionicons name="create-outline" size={20} color="#666" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.layour}>
              <Text>Địa chỉ</Text>
              <View style={styles.editText}>
                <TextInput
                  style={styles.textStyle}
                  value={updateAddress.address}
                  onChangeText={(text) =>
                    setUpdateAddress({ ...updateAddress, address: text })
                  }
                />
                <Ionicons name="create-outline" size={20} color="#666" />
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.btnSave}
              onPress={() => handleUpdateUser()}
            >
              <Text style={{ fontWeight: "500" }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default AddressUser;

const styles = StyleSheet.create({
  card: {
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
    alignItems: "center",
    backgroundColor: "#FFDC5E",
    padding: 15,
    width: windowWidth / 3,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 10,
  },
});

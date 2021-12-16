import React, { useState } from "react";
import { View, Text, Modal, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

const windowWidth = Dimensions.get("window").width;
function ModalSelectCountry({ modalVisible, setModalVisible, options, title ,value ,handleSelect}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonClose}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="close" size={26} />
              </TouchableOpacity>
            </View>
            <View>
              <Picker
                selectedValue={value}
                onValueChange={(valueData, index) => handleSelect(valueData)}
                mode="dropdown" // Android only
              >
                <Picker.Item enabled={false}
                  label={title}
                />
                {options?.map((item, index) => {
                 return <Picker.Item key={index} label={item.name} value={item.slug} />;
                })}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalSelectCountry;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 22,
    // backgroundColor: "rgba(37, 37, 37, 0.38)",
  },
  modalView: {
    width: windowWidth,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  buttonClose: {
    position: "absolute",
    right: 15,
    top: 10,
    zIndex: 10,
  },
});

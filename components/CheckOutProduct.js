import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_URL } from "../constants/constant";

function CheckOutProduct({
  item: {
    quanlity,
    products: {
      title,
      size,
      Price,
      picture: {
        0: { url },
      },
    },
  },
}) {
  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 12,
            borderBottomColor:'#eee',
            marginTop:8,
            marginRight:8,
            marginLeft:8,
            borderBottomWidth:1,
            borderRadius:10,
            
          }}
        >
          <Image
            source={{ uri: `${API_URL}${url}` }}
            style={{ width: 80, height: 80 , resizeMode:"contain" }}
          />
          <View style={{ flex: 1, marginLeft: 10, alignItems: "stretch" }}>
            <Text style={{ fontSize: 15, fontWeight: "400" ,  }}>{title}</Text>
            <View
              style={{ flexDirection: "row", paddingTop: 2, paddingBottom: 2 }}
            >
              <Text style={{ fontSize: 13, color: "#4d4d4d" }}>Phân loại:</Text>
              <Text style={{ marginLeft: 4, fontSize: 13, color: "#4d4d4d" }}>
                {size}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 14, fontWeight: "400" ,color:"#666" }}>{Price}</Text>
              <Text style={{ color:'#666'}}>x{quanlity}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default CheckOutProduct;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderColor: "#D5D6AA",
    
  },
  title: {
    color: "#353535",
  },
});

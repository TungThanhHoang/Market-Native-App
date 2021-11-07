import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import { API_URL } from "../constants/constant";
import Ionicons from "react-native-vector-icons/Ionicons";

function CartItem({
  item: {
    id,
    quanlity,
    products: {
      Price,
      title,
      size,
      picture: {
        0: { url },
      },
    },
  },
  index,
  checkedState,
  handleCheck,
  handleDecrease,
  handleIncrease,
  handleDeleteItem,
}) {
  return (
    <>
      <View style={{ backgroundColor: "#fff" ,flexDirection:"row" ,alignItems:"center" , justifyContent:"space-between" }}>
        <View
          style={{
            flex:1,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#eee",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <CheckBox
            checked={checkedState[index]}
            onPress={() => handleCheck(index)}
            value={index}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: `${API_URL}${url}` }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                resizeMode: "contain",
              }}
            />
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "500", opacity: 0.8 }}>
                {title}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  paddingTop: 4,
                  paddingBottom: 4,
                  opacity: 0.6,
                }}
              >
                Khối lượng:
                {size === "onebox"
                  ? "Hộp"
                  : size === "onebotlle"
                  ? "Chai"
                  : size === "fivegram"
                  ? "500g"
                  : ""}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                SL: x{quanlity}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 5,
                  borderWidth: 0.3,
                  borderColor: "#eee",
                  justifyContent: "space-between",
                  width: 100,
                  padding: 2,
                  backgroundColor: "#fafafa",
                }}
              >
                <TouchableOpacity onPress={() => handleDecrease(id, quanlity)}>
                  <View
                    style={{
                      paddingRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        paddingRight: 10,
                        paddingLeft: 10,
                        padding: 2,
                        textAlign: "center",
                        color: "#4d4d4d",
                      }}
                    >
                      -
                    </Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <Text style={{ fontSize: 16, color: "#4d4d4d" }}>
                    {quanlity}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleIncrease(id, quanlity)}>
                  <View style={{ paddingLeft: 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        paddingRight: 10,
                        paddingLeft: 10,
                        textAlign: "center",
                        color: "#4d4d4d",
                      }}
                    >
                      +
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity  onPress={() => handleDeleteItem(id)}>
          <View
            style={{
              marginRight:20
            }}
          >
            <Ionicons name="trash-outline" size={18} color="#666" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default CartItem;

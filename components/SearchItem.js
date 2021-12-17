import React, { useContext } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { API_URL } from "../constants/constant";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
const windowWidth = Dimensions.get("window").width;
function SearchItem({
  item: {
    id,
    title,
    picture: {
      0: { url },
    },
  },
}) {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail-product", { idProduct: id })}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: windowWidth - 10,
            padding: 5,
            paddingBottom: 10,
          }}
        >
          <Image
            source={{ uri: `${API_URL}${url}` }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
          <Text style={{ marginLeft: 10 }}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default SearchItem;

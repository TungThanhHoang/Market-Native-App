import React from "react";
import { View, Text, Image, StyleSheet ,Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API_URL } from "../../constants/constant";
import { useNavigation } from "@react-navigation/core";

const windowWidth = Dimensions.get("window").width;

function CardProductItem({
  item: {
    id,
    title,
    Price,
    wards,
    size,
    picture: {
      0: { url },
    },
  },
  formatPrice
}) {
  const navigation = useNavigation()
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Detail-product", { idProduct: id })}
      >
        <View style={styles.wrapProduct}>
          <Image
            source={{ uri: `${API_URL}${url}` }}
            style={{ width: "100%", height: 140, borderRadius: 8 }}
          />
          <View style={styles.detailProduct}>
            <Text style={{ fontWeight: "600" }}>{title}</Text>
            <Text style={{ fontSize: 12, opacity: 0.7, paddingTop: 2 }}>
              {/* {ward} */}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#f1c40f" }}
              >
                {formatPrice.format(Price)}
              </Text>
              <Text style={{ opacity: 0.6 }}>
                {size === "onebox"
                  ? "Hộp"
                  : size === "onebotlle"
                  ? "Chai"
                  : size === "fivegram"
                  ? "500g"
                  : ""}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default CardProductItem;

const styles = StyleSheet.create({
  wrapProduct: {
    backgroundColor: "#fff",
    justifyContent: "center",
    width: windowWidth / 2 - 10,
    margin: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 1,
  },
  detailProduct: {
    margin: 10,
  },
});

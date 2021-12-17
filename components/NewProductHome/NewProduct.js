import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import slug from "slug";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import { API_URL } from "../../constants/constant";
function NewProduct() {
  const navigation = useNavigation();
  const {
    authState: {
      user: { ward },
    },
  } = useContext(AuthContext);

  const {
    productState: { newProducts },
    formatPrice,
    loadNewProduct,
  } = useContext(ProductContext);
  const ProductItemCard = ({
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
  }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate("Detail-product", { idProduct: id })}
    >
      <View style={styles.cardItem}>
        <Image
          source={{ uri: `${API_URL}${url}` }}
          style={{ width: "100%", height: 130 }}
        />
        <View style={styles.wrapProduct}>
          <Text style={styles.titleProduct}>{title}</Text>
          <Text style={styles.wardProduct}>{ward}</Text>
          <View style={styles.weightProduct}>
            <Text style={styles.priceProduct}>{formatPrice.format(Price)}</Text>
            <Text style={styles.sizeProduct}>
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
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={newProducts}
          listKey="1.2"
          renderItem={({ item }) => <ProductItemCard item={item} />}
          keyExtractor={(item, index) => item.id}
          nestedScrollEnabled
        />
      </View>
    </>
  );
}

export default NewProduct;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  cardItem: {
    width: 165,
    backgroundColor: "#fff",
    padding: 12,
    margin: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
  },
  wrapProduct: {
    marginTop: 15,
  },
  titleProduct: {
    fontWeight: "600",
    overflow: "hidden",
  },
  wardProduct: {
    fontSize: 12,
    paddingTop: 2,
    opacity: 0.7,
  },
  weightProduct: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceProduct: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f1c40f",
  },
  sizeProduct: {
    opacity: 0.6,
  },
});

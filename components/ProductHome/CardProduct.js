import React, { useContext, useEffect } from "react";
import slug from "slug";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import CardProductItem from "./CardProductItem";

function CardProduct() {
  const {
    authState: {
      user: { ward },
    },
  } = useContext(AuthContext);

  const {
    productState: { products },
    formatPrice,
    loadProduct,
  } = useContext(ProductContext);
  useEffect(() => {
    setTimeout(() => {
      const tokenProduct = slug(ward);
      loadProduct(tokenProduct);
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={2}
          data={products}
          renderItem={({ item }) => <CardProductItem item={item} formatPrice={formatPrice}/>}
          keyExtractor={(item, index) => index}
          contentInset={{ bottom: 100 }}
        />
      </View>
    </>
  );
}

export default CardProduct;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  
});

import React, { useContext, useEffect } from "react";
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
 
  return (
    <>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={2}
          data={products}
          listKey="1.3"
          renderItem={({ item }) => <CardProductItem item={item} ward={ward} formatPrice={formatPrice}/>}
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

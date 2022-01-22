import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { CategoryContext } from "../context/CategoryContext";
import { API_URL } from "../constants/constant";
const { height, width } = Dimensions.get("window");
const itemWidth = (width - 15) / 4;

function Categories() {
  const navigation = useNavigation();

  const {
    categoryState: { categories },
    loadCategory,
  } = useContext(CategoryContext);

 

  // useEffect(() => {
  //   loadCategory();
  // }, []);

  const CategoryItem = ({
    item: {
      id,
      title,
      image: { url },
    },
  }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Detail-category", { name: title, categoryId: id })
      }
    >
      <View style={styles.cardItem}>
        <Image source={{ uri: `${url}` }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View>
        <FlatList
          // scrollEnabled={false}
        
          data={categories}
          listKey="1.1"
          renderItem={({ item }) => (
            <CategoryItem item={item} style={styles.cardCategory} />
          )}
          numColumns={4}
          keyExtractor={(item, index) => index}
        />
      </View>
    </>
  );
}

export default Categories;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  cardItem: {
    alignItems: "center",
    textAlign: "center",
    margin: 2,
    padding: 2,
    width: itemWidth,
  },
  title: {
    paddingTop: 5,
    fontSize: 12,
    fontWeight: "500",
  },
});

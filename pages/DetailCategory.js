import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import FilterProduct from "../components/FilterProduct";
import LoadingPage from "../components/LoadingPage";
import Navbar from "../components/Navbar";
import { API_URL } from "../constants/constant";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";
import CategoryItem from "../components/CategoryItem";
function DetailCategory({navigation,route }) {
  const { name, categoryId } = route.params;
  console.log(categoryId);
  const {
    categoryState: {
      category: { products },
    },
    isLoading,
    loadOneCategory,
  } = useContext(CategoryContext);

  useEffect(() => {
    loadOneCategory(categoryId);
  }, [categoryId]);

  return (
    <>
      <View>
        <Navbar title={name} navigation={navigation} />
        {isLoading ? (
          <LoadingPage />
        ) : (
          <ScrollView>
            <FilterProduct />
            <View style={{ flexDirection: "row" }}>
              {products?.map((item) => (
                <CategoryItem key={item.id} item={item} navigation={navigation} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
}

export default DetailCategory;

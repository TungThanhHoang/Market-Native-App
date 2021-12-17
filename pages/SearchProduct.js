import React, { useState, useContext, useEffect } from "react";
import { ScrollView } from "react-native";
import { View, Text, Image, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import SearchItem from "../components/SearchItem";
import SuggestSearchItem from "../components/SuggestSearchItem";
import { ProductContext } from "../context/ProductContext";
import { SearchContext } from "../context/SearchContext";
function SearchProduct() {
  const [searchString, setSearchItem] = useState("");
  // const [Search, setSearch] = useState([]);
  const {
    productState: { newProducts },
  } = useContext(ProductContext);
  const { searchProduct, searchItem } = useContext(SearchContext);
  useEffect(() => {
    searchProduct(searchString);
  }, [searchString]);
  console.log(searchItem);

  const SuggestProduct = (
    <View style={{ margin: 5, marginTop: 10 }}>
      <Text>Sản phẩm mới</Text>
      <FlatList
        scrollEnabled={false}
        data={newProducts.slice(0, 6)}
        renderItem={({ item }) => <SuggestSearchItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
  const searchData = (
    <View style={{ margin: 5 }}>
      <Text>Sản phẩm tìm kiếm</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchItem}
        renderItem={({ item }) => <SearchItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
  return (
    <>
      <View style={{ paddingTop: 20, margin: 5, borderRadius: 10 }}>
        <SearchBar
          placeholder="Tìm kiếm"
          inputContainerStyle={{ height: 20, backgroundColor: "white" }}
          platform="ios"
          value={searchString}
          cancelButtonTitle=""
          onSubmit={() => alert("hello")}
          onChangeText={(text) => setSearchItem(text)}
        />
        {searchString === "" ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={SuggestProduct}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={SuggestProduct}
            ListFooterComponent={searchData}
          />
        )}
      </View>
    </>
  );
}

export default SearchProduct;

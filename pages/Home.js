import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import NavbarHome from "../components/NavbarHome";
import Poster from "../components/Poster";
import Categories from "../components/Categories";
import CardProduct from "../components/ProductHome/CardProduct";
import NewProduct from "../components/NewProductHome/NewProduct";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

function Home({ navigation }) {
  const HomeContent = () => (
    <View>
      <StatusBar barStyle="dark-content" />
      <View style={{ position: "relative", top: 0, zIndex: 10 }}>
        <NavbarHome />
      </View>
      {/* ScrollView Component */}
      {/* Component Poster */}
      <View style={styles.cardCarousel}>
        <Poster />
      </View>
      {/* Component Categories */}
      <View style={styles.card}>
        <Categories />
      </View>
      {/* Component New Product */}
      <View style={styles.wrapNewProduct}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.titleNewProduct}>Sản phẩm mới</Text>
          <TouchableOpacity>
            <Text style={{ marginRight: 10, opacity: 0.6 }}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <NewProduct />
      </View>
      {/* Component Product */}
      <View style={styles.wrapNewProduct}>
        <Text style={styles.titleNewProduct}>Sản phẩm gợi ý</Text>
        <CardProduct />
      </View>
      {/* End ScrollView */}
    </View>
  );
  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={HomeContent}
          listKey={(item, index) => "D" + index.toString()}
          keyExtractor={({ item, index }) => index.toString()}
        />
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: "relative",
  },
  card: {
    marginTop: 12,
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingBottom: 15,
  },
  cardCarousel: {
    width: windowWidth,
    justifyContent: "center",
  },
  titleNewProduct: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.6,
  },
  wrapNewProduct: {
    marginBottom: 12,
    backgroundColor: "#fff",
    paddingTop: 15,
  },
});

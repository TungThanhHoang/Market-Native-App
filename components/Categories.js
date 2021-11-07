import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
const { height, width } = Dimensions.get("window");
const itemWidth = (width - 15) / 4;

const category = [
  {
    image: require("../assets/fruits-and-vegetables.png"),
    title: "Rau Củ Quả",
  },
  { image: require("../assets/beef1.png"), title: "Thịt" },
  { image: require("../assets/milk1.png"), title: "Sữa" },
  { image: require("../assets/seafood.png"), title: "Hải Sản" },
  { image: require("../assets/spice.png"), title: "Gia Vị" },
  { image: require("../assets/pet-food1.png"), title: "Thức Ăn Khô" },
  { image: require("../assets/soft-drink.png"), title: "Thức Uống" },
  { image: require("../assets/fruit.png"), title: "Trái Cây" },
];

function Categories() {
  const CategoryItem = ({image , title }) => (
    <TouchableOpacity>
      <View style={styles.cardItem}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View>
        <FlatList
          scrollEnabled={false}
          data={category}
          renderItem={({ item }) => (
            <CategoryItem
              image={item.image}
              title={item.title}
              style={styles.cardCategory}
            />
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

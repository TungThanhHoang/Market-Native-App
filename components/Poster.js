import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { FlatListSlider } from "react-native-flatlist-slider";
const windowWidth = Dimensions.get("window").width;

const dataPoster = [
  { image: require("../assets/poster1.jpg") },
  { image: require("../assets/poster2.jpg") },
  { image: require("../assets/poster3.jpg") },
];

function Poster() {
  
  const PosterItem = ({ style, item, imageKey, onPress, index, active, local }) => (
    <View>
      <TouchableOpacity style={[styles.cardContainer]}>
        <Image style={[styles.image]} source={item[imageKey]} />
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <View>
        <FlatListSlider
          data={dataPoster}
          width={windowWidth}
          timer={10000}
          component={<PosterItem />}
          onPress={(item) => alert(JSON.stringify(item))}
          indicatorActiveWidth={25}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
    </>
  );
}

export default Poster;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth,
  },
  image: {
    width: windowWidth - 20,
    height: 155,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

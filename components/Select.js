import React ,{ useState} from "react";
import { View, Dimensions, StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function Select() {
  const [country, setCountry] = useState("Unknown");

  return (
    <>
      <View>
        <Picker
          selectedValue={country}
          onValueChange={(value, index) => setCountry(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Please select your country" value="Unknown" />
          <Picker.Item label="Australia" value="Australia" />
          <Picker.Item label="Belgium" value="Belgium" />
          <Picker.Item label="Canada" value="Canada" />
          <Picker.Item label="India" value="India" />
          <Picker.Item label="Japan" value="Japan" />
        </Picker>
      </View>
    </>
  );
}

export default Select;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight / 2,
    width: windowWidth,
  },
});

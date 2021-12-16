import React from "react";
import { View, Text } from "react-native";
import { CheckBox, Slider } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

function FilterProduct() {
  return (
    <>
      <View>
        <CheckBox
          title="Xem giá sản phẩm từ thấp đến cao"
          checked={true}
          size={20}
        />
        <CheckBox title="Xem giá sản phẩm từ cao đến thấp" size={20} />
      </View>
      <View
      style={{ margin:10}}
      >
        <Slider
          value={24}
          //   onValueChange={setValue}
          maximumValue={50000}
          minimumValue={0}
          step={1}
          trackStyle={{ height: 6, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Ionicons
                name="ellipse"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color="#FFC857"
              />
            ),
          }}
        />
        {/* <Text>Value: {this.state.value}</Text> */}
      </View>
    </>
  );
}

export default FilterProduct;

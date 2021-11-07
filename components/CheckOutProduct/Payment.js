import React from "react";
import { View , Text , Image} from 'react-native'
import { CheckBox } from "react-native-elements";
function Payment({item:{ title , img} , checked , setChecked}) {
  return (
    <>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <CheckBox
          size={20}
          type="checkbox"
          name="payment"
          checked={checked === title}
          onPress={() => {
            setChecked(title);
          }}
        />
        <Image
          source={img}
          style={{ width: 30, height: 30, resizeMode: "contain" }}
        />
        <Text style={{ marginLeft: 5 }}>{title}</Text>
      </View>
    </>
  );
}

export default Payment;

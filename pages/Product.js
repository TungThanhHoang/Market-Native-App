import React from "react";
import { View, Text ,Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Product({navigation}) {
  return (
    <>
     <SafeAreaView>
        <View>
          <Text>This is a Product</Text>
          <Button onPress={()=> navigation.navigate('Cart')} title="Go to Cart"></Button>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Product;

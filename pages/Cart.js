import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/core";

import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import { ProductContext } from "../context/ProductContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Cart() {
  const navigation = useNavigation();
  const { decreaseQuanlity, increaseQuanlity, deleteItemCart, cartItem } =
    useContext(CartContext);
  const { formatPrice } = useContext(ProductContext);

  const [checkedState, setCheckedState] = useState([...cartItem].fill(false));
  const [totalPrice, setTotalPrice] = useState(0);
  const handleCheck = (idItem) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === idItem ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const total = updatedCheckedState.reduce((sum, currentState, index) => {
      if (currentState === true) {
        return sum + cartItem[index]?.products.Price * cartItem[index]?.quanlity;
      }
      return sum;
    }, 0);

    setTotalPrice(total);
  };
  const getData = useMemo(() => handleCheck(cartItem), [cartItem]);

  let newarray = [];
  const handleSubmitOrder = () => {
    [...checkedState]?.map((item, index) => {
      if (item === true) {
        newarray.push(cartItem[index]);
      }
      return newarray;
    });
  };
  handleSubmitOrder();

  // confirm checkout
  const handleCheckProduct = () => {
    if (newarray.length === 0) {
      Alert.alert("Vui lòng chọn ít nhất 1 sản phẩm !");
    } else {
      navigation.navigate('Checkout' , { totalPrice: totalPrice , cart: newarray })
    }
  };

  //   Xóa sản phẩm
  const handleDeleteItem = (id) => {
    deleteItemCart(id);
    Alert.alert("Xóa sản phẩm thành công !");
    setCheckedState([...cartItem].fill(false));
  };

  // Tăng sản phẩm
  const handleIncrease = (id, quanlity) => {
    const increase = increaseQuanlity(id, quanlity);
    if (increase) {
      Alert.alert("Thêm phẩm thành công !");
    }
    return increase;
  };
  //   Giam sản phẩm
  const handleDecrease = (id, quanlity) => {
    const decrease = decreaseQuanlity(id, quanlity);
    if (decrease) {
      Alert.alert("Xóa sản phẩm thành công !");
    }
    return decrease;
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Navbar navigation={navigation} title="Giỏ hàng" />
        <View
          style={{
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#DEE7E7",
          }}
        >
          <Ionicons name="notifications-outline" size={22} color="#F58A07" />
          <Text style={{ fontSize: 14, fontWeight: "500", paddingLeft: 10 }}>
            Chọn sản phẩm để tiến hành thanh toán
          </Text>
        </View>
        <View style={styles.wrapCart}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cartItem}
            renderItem={({ item, index }) => (
              <CartItem
                key={index}
                index={index}
                item={item}
                checkedState={checkedState}
                handleCheck={handleCheck}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
                handleDeleteItem={handleDeleteItem}
              />
            )}
            keyExtractor={(item, index) => index}
            contentInset={{ bottom: 20 }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            bottom: 0,
            backgroundColor: "#FFBF81",
            width: windowWidth,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: (windowWidth * 1.2) / 2,
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingRight: 10,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "400", paddingBottom: 4 }}>
              Tổng tiền
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 18 }}>
              {formatPrice.format(totalPrice)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: (windowWidth * 1) / 2.2,
              backgroundColor: "#FFDC5E",
              height: 55,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={()=> handleCheckProduct()}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Mua hàng
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "700", paddingLeft: 2 }}>
              (10)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default Cart;

const styles = StyleSheet.create({
  wrapCart: {},
});

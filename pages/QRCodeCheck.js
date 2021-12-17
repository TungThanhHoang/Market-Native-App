import React, { useState, useEffect, useRef, useContext } from "react";
import {
  AppState,
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "react-native-vector-icons/Ionicons";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

import { Modalize } from "react-native-modalize";
import { API_URL } from "../constants/constant";
import { ProductContext } from "../context/ProductContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function QRCodeCheck() {
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isReactivated, setIsReactivated] = useState(true);
  const [viewFocused, setViewFocused] = useState(false);
  const [dataCode, setDataCode] = useState([]);
  const { formatPrice } = useContext(ProductContext);
  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const modalizeRef = useRef(null);
  useEffect(() => {
    const onFocus = navigation.addListener("focus", () => {
      setViewFocused(true);
    });

    const onBlur = navigation.addListener("blur", () => {
      setViewFocused(false);
    });

    return { onFocus, onBlur };
  }, [navigation]);

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const getData = data && JSON.parse(data);
    setDataCode(getData);
    modalizeRef.current?.open();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const buttonScaned = () => (
    <View
      style={{
        position: "absolute",
        bottom: windowHeight / 5,
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => setScanned(false)}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          width: windowWidth / 2.5,
          alignSelf: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "500" }}>
          Quét lại
        </Text>
      </TouchableOpacity>
    </View>
  );
  const cancelScaner = () => {
    setIsReactivated(false);
    navigation.goBack();
  };
  console.log(dataCode);
  const barScan = () => (
    <View style={styles.container}>
      <BarCodeScanner
        reactivate={isReactivated}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity
        style={{ marginTop: 40, marginLeft: 20 }}
        onPress={() => cancelScaner()}
      >
        <Ionicons name="chevron-back-outline" size={30} color="#fff" />
      </TouchableOpacity>
      {scanned && buttonScaned()}
      <Modalize ref={modalizeRef} snapPoint={600}>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 16, color: "#666" }}>
            Thông tin người giao
          </Text>
          <Text style={{ marginTop: 5, fontWeight: "500" }}>
            Mã đơn hàng: {dataCode?.id_code}
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              padding: 10,
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500" }}>{dataCode?.name}</Text>
              <Text style={{ marginLeft: 10, fontWeight: "500" }}>
                {dataCode?.phone}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>{dataCode?.address}, TP Đà Nẵng</Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, marginBottom: 15, color: "#666" }}>
              Sản phẩm
            </Text>
            {dataCode.length &&
              dataCode.product.map((item, index) => {
                console.log("lỗi");
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      padding: 8,
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={{ uri: `${API_URL}${item?.picture}` }}
                      style={{ height: 70, width: 70, resizeMode: "contain" }}
                    ></Image>
                    <View style={{ marginLeft: 10 }}>
                      <Text>{item?.title}</Text>
                      <Text>{item.quanlity}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{ marginVertical: 20, fontWeight: "500", fontSize: 14 }}
            >
              Tổng số tiền thanh toán:
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {formatPrice.format(dataCode?.price)}
            </Text>
          </View>
        </View>
      </Modalize>
    </View>
  );
  return <>{viewFocused && barScan()}</>;
}

export default QRCodeCheck;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

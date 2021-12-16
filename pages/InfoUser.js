import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../context/AuthContext";
import { CheckOutContext } from "../context/CheckOutContext";
function InfoUser() {
  const navigation = useNavigation();
  const {
    authState: {
      user: { firstname, lastname },
    },
  } = useContext(AuthContext);
  const { handleLoadBillDeivery, stateBill, loadBill, bill } =
    useContext(CheckOutContext);

  useEffect(() => {
    loadBill();
    handleLoadBillDeivery(stateBill);
  }, [stateBill]);

  var countBillUnconfirmed = bill.reduce((acc, curr) => {
    if (curr["status"] === "unconfirmed") acc++;
    return acc;
  }, 0);
  var countBillconfirmed = bill.reduce((acc, curr) => {
    if (curr["status"] === "confirmed") acc++;
    return acc;
  }, 0);
  var countBilldelivery = bill.reduce((acc, curr) => {
    if (curr["status"] === "delivery") acc++;
    return acc;
  }, 0);

  return (
    <>
      <View style={styles.headerTop}>
        <View style={styles.flexCenter}>
          <Avatar
            rounded
            source={{
              uri: "https://assets.glxplay.io/static/avatars/Avatar%20Profile-12.png",
            }}
            style={{ width: 60, height: 60 }}
          />
          <View style={styles.textWrap}>
            <Text style={styles.textTitle}>
              {lastname} {firstname}
            </Text>
            <Text style={styles.subTitle}>
              Hải Châu I, Quận Cẩm Lệ, TP Đà Nẵng
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
              <View>
                <Ionicons name="settings-outline" color="#000" size={26} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.contentWrap}>
        <View style={styles.wrapBill}>
          <View style={styles.title}>
            <Ionicons name="receipt-outline" size={25} color="#3498db" />
            <Text style={styles.titleBill}>Đơn Mua</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Order-bill", { undefined })}
          >
            <View style={styles.viewAll}>
              <Text style={styles.subTitle}>Xem lịch sử mua hàng</Text>
              <Ionicons name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.statusBill}>
          <TouchableOpacity
            style={styles.wrapStatus}
            onPress={() => navigation.navigate("Order-bill", { idTab: 2 })}
          >
            <Ionicons name="cube-outline" size={28} />
            <Text>Chờ xác nhận</Text>
            <Badge
              status="error"
              value={`${countBillUnconfirmed}`}
              containerStyle={{ position: "absolute", top: -4, right: 9 }}
            />
          </TouchableOpacity>
          <View style={styles.wrapStatus}>
            <Ionicons name="file-tray-full-outline" size={28} />
            <Text>Chờ lấy hàng</Text>
            <Badge
              status="error"
              value={`${countBillconfirmed}`}
              containerStyle={{ position: "absolute", top: -4, right: 9 }}
            />
          </View>
          <TouchableOpacity
            style={styles.wrapStatus}
            onPress={() => navigation.navigate("Order-bill", { idTab: 4 })}
          >
            <Ionicons name="car-outline" size={28} />
            <Badge
              status="error"
              value={`${countBilldelivery}`}
              containerStyle={{ position: "absolute", top: -4, right: 9 }}
            />
            <Text>Đang giao</Text>
          </TouchableOpacity>
          <View style={styles.wrapStatus}>
            <Ionicons name="ribbon-outline" size={28} />
            <Text>Đánh giá</Text>
          </View>
        </View>
        <View style={styles.title}>
          <Ionicons name="journal-outline" size={25} color="#f39c12" />
          <Text style={styles.titleBill}>Tiện ích của tôi</Text>
        </View>
        <View style={styles.title}>
          <Ionicons name="star-half-outline" size={25} color="#27ae60" />
          <Text style={styles.titleBill}>Tiện ích của tôi</Text>
        </View>
        <View style={styles.title}>
          <Ionicons name="pricetags-outline" size={25} color="#f39c12" />
          <Text style={styles.titleBill}>Mã giảm giá</Text>
        </View>
        <View>
          <View></View>
        </View>
      </View>
    </>
  );
}

export default InfoUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTop: {
    paddingTop: 30,
    backgroundColor: "#FFDC5E",
    height: 110,
    justifyContent: "center",
    padding: 10,
  },
  flexCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textWrap: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 10,
  },
  contentWrap: {
    padding: 10,
  },
  wrapBill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e3e4e6",
    padding: 5,
  },
  titleBill: {
    fontSize: 14,
    fontWeight: "400",
    padding: 10,
  },
  subTitle: {
    color: "#000",
    fontSize: 12,
    opacity: 0.8,
  },
  statusBill: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderColor: "#e3e4e6",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  viewAll: {
    alignItems: "center",
    flexDirection: "row",
  },
  wrapStatus: {
    justifyContent: "center",
    alignItems: "center",
  },
  walet: {
    padding: 12,
    fontSize: 18,
  },
});

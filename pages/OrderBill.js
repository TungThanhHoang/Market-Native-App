import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
import { Tabs } from "@ant-design/react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Navbar from "../components/Navbar";
import { CheckOutContext } from "../context/CheckOutContext";
import OrderBillItem from "../components/OrderBillItem";
import { ProductContext } from "../context/ProductContext";
import { useNavigation } from "@react-navigation/core";
function OrderBill({ route }) {
  const { idTab } = route.params;
  console.log(idTab);
  const navigation = useNavigation();
  const { bill, summaryBill, setStateBill, loadBill } =
    useContext(CheckOutContext);

  const { formatPrice } = useContext(ProductContext);
  const [activeTabKey, setActiveTabKey] = useState(1);
  const [isFreshing, setIsFreshing] = useState(false);

  const changeTab = (activeKey) => {
    setActiveTabKey(activeKey);
  };

  const handleFreshing = () => {
    setIsFreshing(true);
    console.log("get data bill");
    loadBill().then((res) => {
      setIsFreshing(false);
    });
  };


  useEffect(() => {
    if (activeTabKey === 0) {
    }

    if (activeTabKey === 1) {
      setStateBill("unconfirmed");
    }

    if (activeTabKey === 2) {
      setStateBill("confirmed");
    }

    if (activeTabKey === 3) {
      setStateBill("delivery");
    }

    if (activeTabKey === 4) {
      setStateBill("deliveried");
    }
    if (activeTabKey === 5) {
      setStateBill("canceled");
    }
  }, [activeTabKey]);

  const tabs2 = [
    { title: "Tất cả", sub: 0 },
    { title: "Chưa xác nhận", sub: 1 },
    { title: "Đã xác nhận", sub: 2 },
    { title: "Đang giao", sub: 3 },
    { title: "Đã giao", sub: 4 },
    { title: "Đã hủy", sub: 5 },
  ];
  let emptyBill = (
    <View
      style={{ alignItems: "center", justifyContent: "center", marginTop: 60 }}
    >
      <Image
        source={require("../assets/no-bill.png")}
        style={{ width: 120, height: 120 }}
      />
    </View>
  );
  return (
    <>
      <View style={{ flex: 1 }}>
        <Navbar title="Đơn mua" navigation={navigation} />
        <Tabs
          tabs={tabs2}
          initialPage={idTab}
          tabBarPosition="top"
          tabBarUnderlineStyle={{ backgroundColor: "#ffb366" }}
          onChange={(tab, index) => {
            changeTab(index);
          }}
          onTabClick={(tab, index) => {
            changeTab(index);
          }}
          style={{ marginTop: 10, padding: 2 }}
        >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isFreshing}
                onRefresh={handleFreshing}
              />
            }
          >
            <View>
              {bill?.map((item) => (
                <OrderBillItem
                  key={item.id}
                  item={item}
                  formatPrice={formatPrice}
                />
              ))}
            </View>
          </ScrollView>
          <ScrollView>
            <View>
              {summaryBill.length
                ? summaryBill?.map((item) => (
                    <OrderBillItem
                      key={item.id}
                      item={item}
                      formatPrice={formatPrice}
                    />
                  ))
                : emptyBill}
            </View>
          </ScrollView>
          <ScrollView>
            <View>
              {summaryBill.length
                ? summaryBill?.map((item) => (
                    <OrderBillItem
                      key={item.id}
                      item={item}
                      formatPrice={formatPrice}
                    />
                  ))
                : emptyBill}
            </View>
          </ScrollView>
          <ScrollView>
            <View>
              {summaryBill.length
                ? summaryBill?.map((item) => (
                    <OrderBillItem
                      key={item.id}
                      item={item}
                      formatPrice={formatPrice}
                    />
                  ))
                : emptyBill}
            </View>
          </ScrollView>
          <ScrollView>
            <View>
              {summaryBill.length
                ? summaryBill?.map((item) => (
                    <OrderBillItem
                      key={item.id}
                      item={item}
                      formatPrice={formatPrice}
                    />
                  ))
                : emptyBill}
            </View>
          </ScrollView>
          <ScrollView>
            <View>
              {summaryBill.length
                ? summaryBill?.map((item) => (
                    <OrderBillItem
                      key={item.id}
                      item={item}
                      formatPrice={formatPrice}
                    />
                  ))
                : emptyBill}
            </View>
          </ScrollView>
        </Tabs>
      </View>
    </>
  );
}

export default OrderBill;

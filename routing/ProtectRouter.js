import React, { useContext, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Navigation from "../navigator/Navigation";
import AuthUser from "../AuthUser/AuthUser";
import { AuthContext } from "../context/AuthContext";
function ProtectRouter() {
  const {
    authState: { isAuth, isLoading },
  } = useContext(AuthContext);

  if (isLoading) {
    <View styles={styles.container}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>;
    console.log('loading ....');
  }
  return <>{isAuth ? <Navigation /> : <AuthUser />}</>;
}

export default ProtectRouter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState, useRef } from "react";
import QRCode from "react-native-qrcode-svg";
import { View } from "react-native";
function QrcodeImage() {
  let myQRCode = useRef();

  const shareQRCode = () => {
    myQRCode.toDataURL((dataURL) => {
      console.log(dataURL);
      let shareImageBase64 = {
        title: "React Native",
        url: `data:image/png;base64,${dataURL}`,
        subject: "Share Link", //  for email
      };
      console.log(shareImageBase64);
    });
  };

  return (
    <>
      <View style={{ alignItems: "flex-end", marginRight: 20 }}>
        <QRCode
          value="hello word"
          size={90}
          level="Q"
          color="black"
          backgroundColor="white"
        />
      </View>
    </>
  );
}

export default QrcodeImage;

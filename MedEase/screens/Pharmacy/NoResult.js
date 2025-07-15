import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, View, Dimensions, Animated, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding,
} from "../../GlobalStyles";

const NoResult = () => {
  const navigation = useNavigation();
  

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.3;
  const dynamicWidth = deviceWidth * 0.65;
  const dynamicWidth1 = deviceWidth * 0.85;
  const dynamicPaddingTop1 = deviceHeight * 0.62;
  const dynamicPaddingLeft = deviceWidth * 0.015;

  

  return (
    <LinearGradient
      style={styles.homepagepharmacy}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
    <TouchableOpacity activeOpacity={0.7}>
    <Text
        style={[
          styles.trackingMedicineBecomes,
          styles.iconPosition,
          {
            left: dynamicPaddingLeft,
            top: dynamicPaddingTop1,
            width: dynamicWidth1,
          },
        ]}
      >
        No Result Found ://
      </Text>
    </TouchableOpacity>
      
      <View style={styles.topBar} />
        <TouchableOpacity activeOpacity={0.7}>
        <Image
        style={[
          styles.pharmacistRafiki1Icon,
          styles.iconPosition,
          { top: dynamicPaddingTop, width: dynamicWidth},
        ]}
        contentFit="cover"
        source={require("../../assets/noresult.png")}
      />
        </TouchableOpacity>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    width:375,
    position: "absolute",
  },
  trackingMedicineBecomes: {
    top: 423,
    marginLeft:20,
    fontSize: FontSize.size_13xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.colorDarkslateblue,
    height: 78,
    textAlign: "center",
  },
  topBar: {
    height: "12.32%",
    top: "0%",
    right: "0%",
    bottom: "87.68%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  letsGo: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    width: 113,
    height: 26,
    textAlign: "center",
  },
  button: {
    height: "6.9%",
    width: "69.33%",
    top: "73.9%",
    right: "15.2%",
    bottom: "22.66%",
    left: "15.47%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: Padding.p_64xl,
    paddingVertical: Padding.p_0,
    position: "absolute",
  },
  navebarIcon: {
    top: 687,
    width: 375,
    height: 125,
  },
  pharmacistRafiki1Icon: {
    top: 130,
    left: 64,
    width: 330,
    height: 200,
    position: "absolute",
    overflow: "hidden",
  },
  homepagepharmacy: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default NoResult;

import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, Padding, FontSize, FontFamily } from "../../GlobalStyles";

const HomePageDoctorApp = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeInImage = useRef(new Animated.Value(0)).current;

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.2;
  const dynamicWidth = deviceWidth * 0.9;
  const dynamicWidth1 = deviceWidth * 0.95;
  const dynamicPaddingTop1 = deviceHeight * 0.64;
  const dynamicPaddingLeft = deviceWidth * 0.0;

  useEffect(() => {
    // Use Animated.parallel for running animations in parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInImage, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Use setTimeout to navigate to the next screen after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate("AvailabilityScreen");
    }, 2000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timer);
  }, [fadeAnim, fadeInImage, navigation]);

  return (
    <LinearGradient
      style={styles.homepagedoctorapp}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
      <TouchableOpacity activeOpacity={0.4}>
      <Animated.Text
        style={[
          styles.chooseYourBest,
          styles.navebarIconLayout,
          {
            left: dynamicPaddingLeft,
            top: dynamicPaddingTop1,
            width: dynamicWidth1,
            opacity: fadeAnim,
          },
        ]}
      >
        Choose your best doctor
      </Animated.Text>
      </TouchableOpacity>
      
      <TouchableOpacity activeOpacity={0.4}>
        <Animated.Image
          style={[
            styles.doctorsPana1Icon,
            { top: dynamicPaddingTop, width: dynamicWidth, opacity: fadeInImage },
          ]}
          contentFit="cover"
          source={require("../../assets/doctorspana-1.png")}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  navebarIconLayout: {
    width: 375,
    position: "absolute",
  },
  homeIndicator1: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorDarkslategray_200,
    width: 134,
    height: 5,
  },
  homeIndicator: {
    top: 776,
    height: 36,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: Padding.p_0,
    paddingVertical: Padding.p_5xs,
    left: 0,
    width: 375,
  },
  chooseYourBest: {
    top: 440,
    marginLeft:10,
    right:0.5,
    fontSize: FontSize.size_13xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.colorDarkslateblue,
    height: 78,
    textAlign: "center",
  },
  doctorsPana1Icon: {
    top: 130,
    left: 14,
    width: 366,
    height: 316,
    position: "absolute",
    overflow: "hidden",
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
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    width: 83,
    height: 25,
  },
  button: {
    height: "6.9%",
    width: "69.33%",
    top: "71.5%",
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
    height: 125,
    left: 0,
    width: 375,
  },
  homepagedoctorapp: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default HomePageDoctorApp;

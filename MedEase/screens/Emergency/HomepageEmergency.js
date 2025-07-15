import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../../GlobalStyles";

const HomepageEmergency = () => {
    const navigation = useNavigation();
    const fadeInText = useRef(new Animated.Value(0)).current;
    const fadeInImage = useRef(new Animated.Value(0)).current;
  
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;
    const dynamicPaddingTop = deviceHeight * 0.23;
    const dynamicWidth = deviceWidth * 0.7;
    const dynamicWidth1 = deviceWidth * 0.97;
    const dynamicPaddingTop1 = deviceHeight * 0.67;
    const dynamicPaddingLeft = deviceWidth * 0.015;
  
    useEffect(() => {
      // Use Animated.parallel for running animations in parallel
      Animated.parallel([
        Animated.timing(fadeInText, {
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
  
      // SetTimeout to navigate to the next screen after 10 seconds
      const timer = setTimeout(() => {
        navigation.navigate("DisplayEmergency");
      }, 2000);
  
      // Clear the timeout to prevent memory leaks
      return () => clearTimeout(timer);
    }, [fadeInText, fadeInImage, navigation]);
  
    return (
        <LinearGradient
          style={styles.homepagereminders}
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
              styles.searchAwayYour,
              { left: dynamicPaddingLeft, top: dynamicPaddingTop1, width: dynamicWidth1, opacity: fadeInText },
            ]}
          >
            Save Lives, Be A Hero!
          </Animated.Text>
        </TouchableOpacity>
          
          <View style={styles.topBar} />
          <TouchableOpacity activeOpacity={0.4}>
            <Animated.Image
              style={[
                styles.questionsAmico1Icon,
                { top: dynamicPaddingTop, width: dynamicWidth, opacity: fadeInImage },
              ]}
              contentFit="cover"
              source={require("../../assets/firstaid1.png")}
            />
          </TouchableOpacity>
        </LinearGradient>
    );
  };

const styles = StyleSheet.create({
  questionsAmico1Icon: {
    top: 120,
    left: 55,
    width: 366,
    height: 316,
    position: "absolute",
    overflow: "hidden",
  },
  searchAwayYour: {
    top: 435,
    left: 2,
    fontSize: FontSize.size_13xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.colorDarkslateblue,
    width: 375,
    height: 78,
    textAlign: "center",
    position: "absolute",
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
  neverMissAPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  pajamasnotificationsLayout: {
    height: 24,
    width: 24,
    position: "absolute",
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
  pushNotificationsRafiki1: {
    top: 88,
    height: 334,
    overflow: "hidden",
  },
  neverMissA: {
    top: 438,
    fontSize: FontSize.size_13xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.colorDarkslateblue,
    height: 78,
    textAlign: "center",
  },
  letsGo: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    width: 83,
    height: 25,
    textAlign: "center",
  },
  button: {
    height: "6.16%",
    width: "69.33%",
    top: "68.84%",
    right: "14.67%",
    bottom: "25%",
    left: "16%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: Padding.p_64xl,
    paddingVertical: Padding.p_0,
    position: "absolute",
  },
  fill1Icon: {
    height: 22,
    width: 22,
  },
  pajamasnotificationsIcon: {
    top: 0,
    left: 0,
    width: 24,
    overflow: "hidden",
  },
  pajamasnotificationsWrapper: {
    top: 761,
    left: 153,
  },
  profileIcon: {
    height: 20,
    width: 22,
  },
  homepagereminders: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default HomepageEmergency;

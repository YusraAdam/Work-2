import React, { useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border, Padding } from "../../GlobalStyles";

const HomePageChatbot = () => {
  const navigation = useNavigation();
  const fadeInText = useRef(new Animated.Value(0)).current;
  const fadeInImage = useRef(new Animated.Value(0)).current;

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.23;
  const dynamicWidth = deviceWidth * 0.81;
  const dynamicWidth1 = deviceWidth * 0.85;
  const dynamicPaddingTop1 = deviceHeight * 0.64;
  const dynamicPaddingLeft = deviceWidth * 0.06;

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

    // SetTimeout to navigate to the next screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.navigate("ChatPage");
    },2000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timer);
  }, [fadeInText, fadeInImage, navigation]);

  return (
      <LinearGradient
        style={styles.homepagechatbot}
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
            {
              left: dynamicPaddingLeft,
              top: dynamicPaddingTop1,
              width: dynamicWidth1,
              opacity: fadeInText,
            },
          ]}
        >
          We are here to help you
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
            source={require("../../assets/chat-botamico-1.png")}
          />
        </TouchableOpacity>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  questionsAmico1Icon: {
    top: 120,
    left: 35,
    width: 366,
    height: 270,
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
  weAreHerePosition: {
    left: 20,
    position: "absolute",
  },
  weAreHere: {
    top: 450,
    fontSize: FontSize.size_13xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.colorDarkslateblue,
    width: 372,
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
    top: "73.5%",
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
  chatBotAmico1: {
    top: 160,
    left: 45,
    width: 320,
    height: 270,
    position: "absolute",
    overflow: "hidden",
  },
  homepagechatbot: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default HomePageChatbot;

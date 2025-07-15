import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color } from "../../GlobalStyles";

const HomeScreen1 = () => {
  const [typedText, setTypedText] = useState("");
  const [showImage, setShowImage] = useState(false);
  const originalText = "MedEase";

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i <= originalText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 350)); // Adjust the delay (550ms in this example)
        setTypedText(originalText.substring(0, i));
      }
      // After typing is done, show the image
      setShowImage(true);
    };

    typeText();
  }, []); // Run once when the component mounts

  return (
    <LinearGradient
      style={styles.homescreen1}
      locations={[0, 0.41, 0.66, 0.69, 0.81, 1]}
      colors={[
        "rgba(0, 0, 0, 0)",
        "rgba(85, 35, 83, 0.43)",
        "rgba(132, 54, 129, 0.67)",
        "rgba(138, 56, 135, 0.7)",
        "rgba(162, 66, 158, 0.82)",
        "#c550c1",
      ]}
    >
      <View style={[styles.logo, styles.logoLayout]}>
        {showImage && (
          <Image
            style={styles.fa6SolidhandHoldingMedicalIcon}
            contentFit="cover"
            source={require("../../assets/fa6solidhandholdingmedical.png")}
          />
        )}
        <Text style={styles.medease}>{typedText}</Text>
      </View>
      <View style={[styles.homeIndicator, styles.logoLayout]}>
        <View style={styles.homeIndicatorChild} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logoLayout: {
    width: 375,
    alignItems: "center",
  },
  fa6SolidhandHoldingMedicalIcon: {
    width: 146,
    height: 125,
    overflow: "hidden",
  },
  medease: {
    fontSize: 50,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.colorDarkslateblue,
    textAlign: "center",
    width: 237,
    height: 58,
    marginTop: 10,
  },
  logo: {
    height: 464,
    justifyContent: "flex-end",
    paddingLeft: 60,
    paddingTop: 0,
    paddingRight: 59,
    paddingBottom: 30,
  },
  homeIndicatorChild: {
    alignSelf: "stretch",
    height: 36,
  },
  homeIndicator: {
    marginTop: 250,
  },
  homescreen1: {
    flex: 0,
    width: "100%",
    height: 812,
    backgroundColor: "transparent",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default HomeScreen1;
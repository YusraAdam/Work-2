import * as React from "react";
import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity, Linking, Alert } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../../GlobalStyles";
import { useState } from "react";
import Mailer from "react-native-mail";
import { Image } from "expo-image";
const ResetPasswordEmail = () => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const [email, setEmail] = useState(""); // Use the fixed email address
  const dynamicPaddingTop = deviceHeight * 0.04; 
  const dynamicWidth = deviceWidth * 0.83;
  const dynamicPaddingTopIcon = deviceHeight * 0.0009; 
  const dynamicPaddingTopIcon1 = deviceHeight * 0.145;
  const dynamicPaddingLeftIcon = deviceHeight * 0.0002; 
  const dynamicPaddingLeft = deviceWidth * 0.17;
  const dynamicPaddingLeft1 = deviceWidth * 0.009;
  const dynamicPaddingRight = deviceWidth * 0.2;
  const sendCodeByEmail = () => {
    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Generate the mailto URL
    const mailtoUrl = `mailto:${email}?subject=Reset%20Password%20Code&body=Your%20reset%20code:%2056666`;

    // Open the default email client
    Linking.openURL(mailtoUrl)
      .then(() => {
        Alert.alert("Email App Opened", "Compose a new email with the reset code.");
      })
      .catch((error) => {
        console.error("Failed to open email client", error);
        Alert.alert("Error", "Failed to open email client. Please try again.");
      });
  };

  return (
    <View style={styles.resetPasswordEmail}>
      <View style={[styles.homeIndicator, styles.homeLayout]}>
        <View style={[styles.homeIndicatorChild, styles.topBarIconPosition]} />
        <View style={styles.homeIndicator1} />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        underlayColor="transparent"
        onPress={sendCodeByEmail}
      >
        <View style={styles.button}>
          <View style={[styles.buttonChild, styles.phone1Position]} />
          <Text style={styles.sendCode}>Send Code</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.tab, styles.tabPosition]}>
        <View style={styles.tabChild} />

        <View style={styles.phone2}>
          <View style={[styles.roundedRectangle1, styles.roundedBg]} />
        </View>
        <View style={[styles.phone3, styles.phonePosition]}>
          <View style={[styles.roundedRectangle2, styles.roundedBg]} />
          <Image
            style={[styles.iconlylightOutlinesearch1,styles.iconLayout, {top: dynamicPaddingTopIcon}]}
            contentFit="cover"
            source={require("../../assets/icons8-email-50.png")}
    />
          <TextInput
            style={[styles.phone1, styles.yourFlexBox]}
            placeholder="Enter your email"
            placeholderTextColor="#a0a8b0"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
      <View style={[styles.text, styles.tabPosition]}>
        <Text style={[styles.enterYourEmail, styles.yourFlexBox]}>
          Enter your registered email from which you created account, we will send you a confirmation code.
        </Text>
        <Text style={[styles.forgotYourPassword, styles.yourFlexBox]}>
          Forgot Your Password?
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  iconLayout: {
    position: "absolute",
    overflow: "hidden",
  },
  iconlylightOutlinesearch1: {
    height: 22,
  width: 22,
  top: 24,
  left: -50.5,
  },
  homeLayout: {
    height: 36,
    width: 375,
    position: "absolute",
  },
  topBarIconPosition: {
    top: 0,
    left: 0,
  },
  phone1Position: {
    left: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  tabPosition: {
    left: 24,
    width: 327,
    position: "absolute",
  },
  phonePosition: {
    bottom: "26.79%",
    top: "325.93%",
    height: "39.29%",
    position: "absolute",
  },
  roundedBg: {
    display: "none",
    backgroundColor: Color.colorDarkcyan,
    borderRadius: Border.br_10xl,
    position: "absolute",
  },
  yourFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  homeIndicatorChild: {
    height: 36,
    width: 375,
    position: "absolute",
  },
  homeIndicator1: {
    marginLeft: -67.5,
    bottom: 8,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorDarkslategray_200,
    width: 134,
    height: 5,
    position: "absolute",
  },
  homeIndicator: {
    top: 776,
    left: 0,
  },
  buttonChild: {
    bottom: "0%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    right: "0%",
    left: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  sendCode: {
    height: "44%",
    width: "50.77%",
    top: "28%",
    left: "24.62%",
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  button: {
    top: 510,
    left: 55,
    width: 260,
    height: 55,
    position: "absolute",
  },
  tabChild: {
    height: "109.82%",
    bottom: "-9.82%",
    backgroundColor: Color.colorWhitesmoke,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    borderRadius: Border.br_10xl,
    left: "-3%",
    right: "0%",
    top: "290%",
    position: "absolute",
    width: "100%",
  },
  roundedRectangle: {
    width: "310.2%",
    right: "-91.84%",
    left: "-118.37%",
    bottom: "-73.18%",
    top: "-41.36%",
    height: "214.55%",
    display: "none",
    backgroundColor: Color.colorDarkcyan,
  },
  phone1: {
    lineHeight: 22,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorDarkgray_200,
    textAlign: "left",
    fontSize: FontSize.size_base,
    left: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  phone: {
    width: "14.98%",
    right: "15.29%",
    left: "69.72%",
  },
  roundedRectangle1: {
    width: 152,
    height: 47,
  },
  phone2: {
    top: "35.71%",
    left: "20.49%",
    width: 0,
    height: 0,
    position: "absolute",
  },
  roundedRectangle2: {
    width: "353.49%",
    right: "-118.6%",
    left: "-134.88%",
    bottom: "-73.18%",
    top: "-41.36%",
    height: "214.55%",
    display: "none",
    backgroundColor: Color.colorDarkcyan,
  },
  phone3: {
    width: "100.15%",
    right: "63.91%",
    left: "22.94%",
  },
  tab: {
    top: 236,
    height: 56,
    width: 327,
  },
  enterYourEmail: {
    top: 180,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDarkgray_200,
    textAlign: "left",
    fontSize: 16,
    width: 360,
    lineHeight: 24,
    left: 0,
  },
  forgotYourPassword: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_200,
    top: 130,
    left: 0,
  },
  text: {
    top: 124,
    height: 88,
    width: 327,
  },
  topBarIcon: {
    height: 100,
    width: 375,
    top: 0,
    position: "absolute",
  },
  resetPasswordEmail: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default ResetPasswordEmail;

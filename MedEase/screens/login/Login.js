import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Color, Border, FontSize, FontFamily, Padding } from "./../../GlobalStyles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_APP } from '../../firebaseConfig';
import { getAuth,signInWithEmailAndPassword , fetchSignInMethodsForEmail } from 'firebase/auth';
const Login = () => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
    // setValidEmail(text.includes("@") || text === "");
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    // if (text.length < 8) {
    //   setPasswordError("");
    // } else {
    //   setPasswordError("");
    // }
  };
  const handleLoginPress = async () => {
    if (!email || !isValidEmail) {
      return;
    }

    try {
      const auth = getAuth(FIREBASE_APP);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const usersInfoQuery = query(collection(FIREBASE_DB, 'usersInfo'), where('email', '==', email));

      const usersInfoSnapshot = await getDocs(usersInfoQuery);

      if (!usersInfoSnapshot.empty) {
        navigation.navigate("ServicesPage");
        return;
      }

      const hspInfoQuery = query(collection(FIREBASE_DB, 'hspInfo'), where('email', '==', email));
      const hspInfoSnapshot = await getDocs(hspInfoQuery);

      if (!hspInfoSnapshot.empty) {  
        navigation.navigate("ServicesPageHSP");
      }
      

      console.log("User data not found in patients or hsps.");
    } catch (error) {
      // Handle authentication errors
      if (error.code === 'auth/user-not-found') {
        setEmailError("Email does not exist");
      } else if (error.code === 'auth/invalid-credential') {
        setPasswordError("Incorrect password! Try again");
      } else {
        console.error('Error authenticating user:', error.code, error.message);
      }
    }
  };
  const dynamicPaddingTop = deviceHeight * 0.04; 
  const dynamicWidth = deviceWidth * 0.83;
  const dynamicPaddingTopIcon = deviceHeight * 0.063; 
  const dynamicPaddingTopIcon1 = deviceHeight * 0.145;
  const dynamicPaddingLeftIcon = deviceHeight * 0.022; 
  const dynamicPaddingLeft = deviceWidth * 0.17;
  const dynamicPaddingLeft1 = deviceWidth * 0.009;
  const dynamicPaddingRight = deviceWidth * 0.2;

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[styles.container]}
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient
        style={styles.login}
        locations={[0, 0.3, 8.5, 1]}
        colors={[
          "rgba(252, 252, 252, 0)",
          "rgba(231, 205, 230, 0.2)",
          "rgba(172, 86, 188, 0.5)",
          "#a2429e",
        ]}
      >
        <View style={[styles.loginChild]} />
        <View style={[styles.topBar, styles.topBarFlexBox]}>
          <View style={[styles.top]}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("HomeScreen2")}
            >
            </TouchableOpacity>
            <Text style={[styles.login1]}>Login</Text>
          </View>
        </View>
        <View style={[styles.inputFields,styles.buttonLayout, { paddingTop: dynamicPaddingTop, width: dynamicWidth}]}>
          <TextInput
            style={[styles.input,styles.inputLayout,!isValidEmail && styles.errorInput]}
            placeholder="Enter your email"
            placeholderTextColor="#a0a8b0"
            value={email}
            onChangeText={handleEmailChange}
          />
          <Image
            style={[styles.iconlylightOutlinesearch1,styles.iconLayout, {top: dynamicPaddingTopIcon, left : dynamicPaddingLeftIcon}]}
            contentFit="cover"
            source={require("../../assets/icons8-email-50.png")}
    />
          {emailError !== "" && (
            <Text style={styles.errorMessage}>{emailError}</Text>
          )}
          <TextInput
            style={[styles.input1, styles.inputLayout, passwordError !== "" && styles.errorInput]}
            placeholder="Enter your password"
            placeholderTextColor="#a0a8b0"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
          <Image
            style={[styles.iconlylightOutlinesearch, styles.iconLayout, styles.passwordIcon,(emailError !== "") && styles.errorButton4,(passwordError !== "") && styles.errorButton5, (emailError !== "" && passwordError !== "") && styles.errorButton7, {top: dynamicPaddingTopIcon1, left : dynamicPaddingLeftIcon}]}
            contentFit="cover"
            source={require("../../assets/icons8-password-50.png")}
          />
          {passwordError !== "" && (
            <Text style={styles.errorMessage}>{passwordError}</Text>
          )}
          <TouchableOpacity
          style={[styles.dontHaveAnContainer1]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("ResetPasswordEmail")}
        >
          <Text style={[styles.forgotPass,styles.topBarFlexBox,(emailError !== "") && styles.errorButton10,(passwordError !== "") && styles.errorButton11, (emailError !== "" && passwordError !== "") && styles.errorButton12]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button1, styles.topBarFlexBox,(emailError !== "") && styles.errorButton1,(passwordError !== "") && styles.errorButton2, (emailError !== "" && passwordError !== "") && styles.errorButton3]}
          activeOpacity={0.7}
          onPress={handleLoginPress}
        >
          <Text style={[styles.login2]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dontHaveAnContainer, {left: dynamicPaddingLeft, right: dynamicPaddingRight}]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={[styles.text, (emailError !== "" && passwordError !== "") && styles.errorButton6]}>
            <Text style={[styles.dontHaveAn]}>
              <Text style={[styles.dontHaveAnAccount]}>Don’t have an account?</Text>
              {` `}
            </Text>
            <Text style={styles.signUp}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};


const styles = StyleSheet.create({
  buttonLayout: {
    width: 327,
    position: "absolute",
  },
  errorButton1: {
  marginTop: 8, // Adjust the value as needed to push the button down
},
  errorButton2: {
  marginTop: 10, // Adjust the value as needed to push the button down
},
  errorButton3: {
  marginTop: 30, // Adjust the value as needed to push the button down
},
errorButton4: {
  marginTop: 23, // Adjust the value as needed to push the button down
},
errorButton5: {
  marginTop: 0, // Adjust the value as needed to push the button down
},
errorButton6: {
  marginTop: 20, // Adjust the value as needed to push the button down
},
errorButton7: {
  marginTop: 23, // Adjust the value as needed to push the button down
},
errorButton10: {
  marginTop: 25, // Adjust the value as needed to push the button down
},
errorButton11: {
  marginTop: 22, // Adjust the value as needed to push the button down
},
errorButton12: {
  marginTop: 45, // Adjust the value as needed to push the button down
},
  errorMessage: {
    color: "red",
    marginTop: 5,
  },
  passwordIcon: {
    top: 85, // Adjust the position as needed
    right: 28,
  },
  invalidInput: {
    borderColor: 'red', // Change to the desired color for invalid input
  },
  iconlylightOutlinesearch: {
    height: 23,
  width: 23,
  top: 20,
  left: 26.5,
  },
  iconlylightOutlinesearch1: {
    height: 22,
  width: 22,
  top: 24,
  left: 27.5,
  },
  iconLayout: {
    position: "absolute",
    overflow: "hidden",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10, 
  },
    topBarFlexBox: {
    justifyContent: "center",
    position: "absolute",
  },
  inputLayout: {
    height: 56,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_5xl,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interRegular,
    width: 300,
  },
  loginChild: {
    top: 776,
    left: 0,
    width: 375,
    height: 36,
    position: "absolute",
  },
  icon: {
    borderRadius: Border.br_3xs,
    height: "100%",
    width: "100%",
  },
  button: {
    width: 40,
    height: 40,
  },
  login1: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_200,
    textAlign: "center",
    marginTop:3.5,
    left:100,
  },
  top: {
    width: 200,
    flexDirection: "row",
    height: 40,
  },
  topBar: {
    height: "17.24%",
    top: "0%",
    right: "-0.27%",
    bottom: "82.76%",
    left: "0.27%",
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_0,
    width: "100%",
  },
  input: {
    paddingHorizontal: Padding.p_35xl,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interRegular,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: Padding.p_0,
  },
  input1: {
    marginTop: 8,
    paddingHorizontal: Padding.p_35xl,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interRegular,
  },
  inputFields: {
    top: 230,
    left: 30,
    width:320,
    paddingTop: Padding.p_5xs,
    alignItems: "center",
    position: "absolute",
  },
  login2: {
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    width: 59,
    height: 25,
    fontSize: FontSize.size_base,
    textAlign: "center",
  },
  button1: {
    height: "6.16%",
    width: "69.33%",
    top: "54%",
    right: "15.2%",
    bottom: "36.58%",
    left: "15.47%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    alignItems: "center",
  },
  dontHaveAn: {
    letterSpacing: 1,
  },
  dontHaveAnAccount: {
    color: Color.colorSlategray,
  },
  signUp: {
    color: Color.colorDarkslateblue,
    fontWeight: "bold",
    fontSize: 15,
  },
  forgotPass: {
    color: Color.colorDarkslateblue,
    fontWeight: "bold",
    paddingTop:15,
    left: 170,
    top:20,
    fontSize: 15,
  },
  text: {
    fontSize: FontSize.size_mini,
    width: 300,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  dontHaveAnContainer: {
    top: 505,
    position: "absolute",
  },
  dontHaveAnContainer1: {
    left: 18,
    top: 135,
    position: "absolute",
  },
  login: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    backgroundColor: "transparent",
    width: "100%",
  },
});

export default Login;

import React, { useState } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Pressable,
  Text,
  RadioForm,
  Dimensions,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  Modal,
  
} from "react-native";
import { RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Padding, Color, Border, FontFamily } from "../../GlobalStyles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
const SignUp = () => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const [checkboxchecked, setCheckboxchecked] = useState(false);
  const navigation = useNavigation();
  const [chosenOption, setChosenOption] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [radioError, setRadioError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignUp = async () => {
    // Reset error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setCheckboxError("");
    setRadioError("");

    // Perform validation
    if (!name.trim()) {
      setNameError("It is required field");
    }

    // if (!email.trim()) {
    //   setEmailError("It is a required field");
    // } else if (!email.includes("@")) {
    //   setEmailError("Invalid! Must contain '@' symbol");
    // }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    }

    if (!checkboxchecked) {
      setCheckboxError("You must agree to the terms");
    }

    if (!chosenOption) {
      setRadioError("Please select an option");
    }

    // If there are validation errors, return without navigating
    if (emailError!== "" || !name || !checkboxchecked  || password.length < 8) {
      return;
    }
    try {
      setModalVisible(true);
      
      // Create a new user account with email and password
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

      // If successful, userCredential.user will contain the user information
      const user = userCredential.user;

      // Store additional user information in Firebase Firestore or any other database
      // For example, you can store user's name, type, etc. in Firestore
      if (chosenOption === 'patient') {
        await setDoc(doc(FIREBASE_DB, "usersInfo", user.uid), {
          name: name,
          email: email,
          password: password,
          userType: chosenOption,
        });
        // Navigate to the next screen or perform any other action
      navigation.navigate("ProfileSetupPatient");
      } else if (chosenOption === 'hsp') {
        await setDoc(doc(FIREBASE_DB, "hspInfo", user.uid), {
          name: name,
          email: email,
          password: password,
          userType: chosenOption,
        });
        // Navigate to the next screen or perform any other action
      navigation.navigate("ProfileSetupHSP");
      }

      // For testing, log the values
      console.log("User ID:", user.uid);
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Checkbox checked:", checkboxchecked);
      console.log("Radio button selected:", chosenOption);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // Email does not exist
        setEmailError("Email already exists");
      } else if(error.code==='auth/invalid-email'){
        setEmailError("Invalid email format");
      } else { 
        console.error("Error creating account:", error.code, error.message);
      }
      // Handle any errors during account creation
    }
    finally {
      setModalVisible(false); // Set loading state to false, whether successful or not
    }
  };
  const dynamicPaddingTop = deviceHeight * 0.001; 
  const dynamicWidth = deviceWidth * 0.83;
  const dynamicPaddingTopIcon = deviceHeight * 0.063; 
  const dynamicPaddingTopIcon1 = deviceHeight * 0.145;
  const dynamicPaddingLeftIcon = deviceHeight * 0.006; 
  const dynamicPaddingLeft = deviceWidth * 0.17;
  const dynamicPaddingLeft1 = deviceWidth * 0.07;
  const dynamicPaddingLeft2 = deviceWidth * 0.09;
  const dynamicPaddingRight = deviceWidth * 0.2;
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
    <LinearGradient
      style={styles.signup}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
      <TouchableOpacity
        style={[styles.alreadyHaveAnContainer, {left:dynamicPaddingLeft}]}
        activeOpacity={0.2}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.text}>
          <Text style={styles.alreadyHaveAnAccount}>
            <Text style={styles.alreadyHaveAn}>Already have an account?</Text>
            {` `}
          </Text>
          <Text style={styles.logIn}>Log In</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={[styles.button2, styles.topBarFlexBox, (checkboxError !== "") && styles.button3]}
          activeOpacity={0.7}
          onPress={handleSignUp}
        >
          {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Text style={styles.login2}>Sign Up</Text>
        )}
        </TouchableOpacity>
        {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Handle modal close (if needed)
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="purple" />
            <Text style={styles.modalText}>Creating account, please wait...</Text>
          </View>
        </View>
      </Modal>

      <View style={[styles.radioContainer, (emailError!== "")&& styles.errorButton6, (passwordError !== "") && styles.errorButton8, (checkboxError !== "") && styles.errorButton10]}>
        
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setChosenOption('patient')}
        >
          <RadioButton
            value="patient"
            status={chosenOption === 'patient' ? 'checked' : 'unchecked'}
            onPress={() => setChosenOption('patient')}
            color={Color.colorPurple} // Set the radio button color
          />
          <Text style={styles.radioText}>Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setChosenOption('hsp')}
        >
          <RadioButton
            value="hsp"
            status={chosenOption === 'hsp' ? 'checked' : 'unchecked'}
            onPress={() => setChosenOption('hsp')}
            color={Color.colorPurple} // Set the radio button color
          />
          <Text style={styles.radioText}>Healthcare Service Provider</Text>
        </TouchableOpacity>
        {radioError ? <Text style={styles.errorText}>{radioError}</Text> : null}
      </View>
      <View style={[styles.inputFields, styles.buttonLayout, { paddingTop: dynamicPaddingTop, width: dynamicWidth}]}>
        <TextInput
          style={[styles.input, styles.inputTypo, (nameError !== "") && styles.errorButton2, (emailError !== "") && styles.errorButton4]}
          placeholder="Enter your password"
          placeholderTextColor="#a0a8b0"
          secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Image
            style={[styles.iconlylightOutlinesearch1,styles.iconLayout, (nameError !== "") && styles.errorButton7, (emailError !== "") && styles.errorButton1]}
            contentFit="cover"
            source={require("../../assets/icons8-password-50.png")}
    />
        <TextInput
          style={[styles.input1, styles.inputBorder, (nameError !== "") && styles.errorButton1]}
          placeholder="Enter your email"
          placeholderTextColor="#a0a8b0"
          value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Image
            style={[styles.iconlylightOutlinesearch2,styles.iconLayout, (nameError !== "") && styles.errorButton1]}
            contentFit="cover"
            source={require("../../assets/icons8-email-50.png")}
    />
        <TextInput
          style={[styles.input2, styles.input2Position]}
          placeholder="Enter your name"
          placeholderTextColor="#a0a8b0"
          value={name}
            onChangeText={(text) => setName(text)}
          />
          <Image
            style={[styles.iconlylightOutlinesearch3,styles.iconLayout]}
            contentFit="cover"
            source={require("../../assets/icons8-name-50.png")}
    />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          {emailError ? <Text style={styles.errorText1}>{emailError}</Text> : null}
          {passwordError ? <Text style={styles.errorText2}>{passwordError}</Text> : null}
      <View style={[styles.terms]}>
      <Text style={[styles.iAgreeToContainer, styles.patientFlexBox, {left: dynamicPaddingLeft1}, (nameError !== "") && styles.errorButton3, (emailError !== "") && styles.errorButton5, (passwordError !== "") && styles.errorButton7]}>
          <Text style={styles.iAgreeTo}>{`I agree to the MedEase `}</Text>
          <Text style={styles.logIn}>Terms of Service</Text>
          <Text style={styles.iAgreeTo}>{` and `}</Text>
          <Text style={[styles.logIn]}>Privacy Policy</Text>
        </Text>
        <CheckBox
          style={[styles.checkbox]}
          checked={checkboxchecked}
          onPress={() => setCheckboxchecked(!checkboxchecked)}
          checkedColor="#fff"
          containerStyle={[styles.checkboxLayout, (nameError !== "") && styles.errorButton3, (passwordError !== "") && styles.errorButton9, (emailError!== "") && styles.errorButton11]}
        />
        {checkboxError ? <Text style={styles.errorText3}>{checkboxError}</Text> : null}

      </View>
      
      </View>
      <View style={[styles.topBar, styles.input2Position1]}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.button1}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("HomeScreen2")}
          >
            
          </TouchableOpacity>
          <Text style={styles.signUp}>Sign Up</Text>
        </View>
      </View>
    </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  modalText:{
    top:5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    height:100,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  terms:{
    height:1500,
  },
  errorButton1: {
    marginTop: 13, // Adjust the value as needed to push the button down
  },
  errorButton2: {
    marginTop: 9, // Adjust the value as needed to push the button down
  },
  errorButton3: {
    marginTop: -78, // Adjust the value as needed to push the button down
  },
  errorButton4: {
    marginTop: 13, // Adjust the value as needed to push the button down
  },
  errorButton5: {
    marginTop: -145, // Adjust the value as needed to push the button down
  },
  errorButton6: {
    marginTop: 23, // Adjust the value as needed to push the button down
  },
  errorButton7: {
    marginTop: -210, // Adjust the value as needed to push the button down
  },
  errorButton8: {
    marginTop: 26, // Adjust the value as needed to push the button down
  },
  errorButton9: {
    marginTop: -205, // Adjust the value as needed to push the button down
  },
  errorButton10: {
    marginTop: 35, // Adjust the value as needed to push the button down
  },
  errorButton11: {
    marginTop: -140, // Adjust the value as needed to push the button down
  },
  errorText: {
    color: 'red',
    marginTop: 60,
    textAlign:"center",
  },
  errorText1: {
    color: 'red',
    marginTop: 132,
    textAlign:"center",
  },
  errorText2: {
    color: 'red',
    marginTop: 205,
    textAlign:"center",
  },
  errorText3: {
    color: 'red',
    marginTop: 260,
    textAlign:"center",
    left:15,
  },
  iconlylightOutlinesearch3: {
    height: 27,
  width: 27,
  top: 16,
  left: 16.5,
  },
  iconlylightOutlinesearch2: {
    height: 25,
  width: 25,
  top: 88,
  left: 16.5,
  },
  iconlylightOutlinesearch1: {
    height: 25,
  width: 25,
  top: 158,
  left: 19.5,
  },
  iconLayout: {
    position: "absolute",
    overflow: "hidden",
  },
  radioContainer: {
    top:365,
    left:48,
    marginVertical: 20,
  },
  radioLabel: {
    fontSize: FontSize.size_base,
    marginBottom: 10,
    color: Color.colorDarkslategray_100,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    marginLeft: 10,
    fontSize: 14,
    color: Color.colorDarkslategray_100,
  },
  button: {
    backgroundColor: Color.colorPurple,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    fontWeight: "bold",
  },
  button2: {
    height: "6.16%",
    width: "69.33%",
    top: "64.3%",
    right: "15.2%",
    bottom: "36.58%",
    left: "15.47%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    alignItems: "center",
  },
  button3: {
    height: "6.16%",
    width: "69.33%",
    top: "65.3%",
    right: "15.2%",
    bottom: "36.58%",
    left: "15.47%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    alignItems: "center",
  },
  radioFormContainer: {
    flex: 0,
    left:47,
    paddingTop: 385, // Adjust the top padding as needed
  },
  login2: {
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    width: 65,
    height: 25,
    fontSize: FontSize.size_base,
    textAlign: "center",
    top:12,
    marginLeft:10,
  },
  checkboxLayout: {
    backgroundColor: "transparent",
    padding: 0,
    left: -13,
    top: 220,
    position: "absolute",
  },
  buttonLayout: {
    width: 327,
    position: "absolute",
  },
  patientFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  inputTypo: {
    fontSize: FontSize.size_base,
    position: "absolute",
    paddingHorizontal: Padding.p_35xl,
  },
  inputTypo1: {
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  inputBorder: {
    paddingVertical: Padding.p_0,
    alignItems: "center",
    flexDirection: "row",
    fontSize: FontSize.size_base,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_5xl,
    height: "21.88%",
    fontFamily: FontFamily.interRegular,
    paddingHorizontal: Padding.p_35xl,
  },
  input2Position1: {
    top: "0%",
    paddingHorizontal: Padding.p_5xl,
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  input2Position: {
    top: "0%",
    paddingHorizontal: Padding.p_35xl,
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  homeIndicatorIcon: {
    top: 771,
    left: 0,
    width: 375,
    height: 41,
    position: "absolute",
  },
  alreadyHaveAn: {
    letterSpacing: 1,
  },
  
  alreadyHaveAnAccount: {
    color: Color.colorSlategray,
  },
  logIn: {
    color: Color.colorDarkslateblue,
    fontWeight:"bold",
  },
  text: {
    fontSize: FontSize.size_mini,
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
  },
  alreadyHaveAnContainer: {
    left: 78,
    top: 594,
    position: "absolute",
  },
  fluentradioButton16RegularIcon: {
    height: "42.86%",
    width: "7.34%",
    right: "88.99%",
    bottom: "78.57%",
    left: "3.67%",
    maxWidth: "100%",
    maxHeight: "100%",
    top: "-21.43%",
    position: "absolute",
    overflow: "hidden",
  },
  healthcareServiceProvider: {
    height: "37.5%",
    width: "45.87%",
    left: "12.54%",
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    top: "-21.43%",
  },
  button: {
    top: 483,
    left: 23,
    height: 56,
  },
  signupChild: {
    height: "6.6%",
    width: "69.33%",
    top: "64.4%",
    right: "15.2%",
    bottom: "27.02%",
    left: "15.47%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    position: "absolute",
  },
  input: {
    top: "56.25%",
    bottom: "21.88%",
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_5xl,
    left: "0%",
    right: "0%",
    height: "21.88%",
    fontSize: FontSize.size_base,
    borderStyle: "solid",
    fontFamily: FontFamily.interRegular,
    width: "100%",
  },
  input1: {
    top: "28.13%",
    bottom: "50%",
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_0,
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  input2: {
    bottom: "78.13%",
    paddingVertical: Padding.p_0,
    alignItems: "center",
    flexDirection: "row",
    fontSize: FontSize.size_base,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_5xl,
    height: "21.88%",
    fontFamily: FontFamily.interRegular,
  },
  iAgreeTo: {
    color: Color.colorDarkslategray_100,
  },
  iAgreeToContainer: {
    top: 220,
    left: 42,
    fontSize: FontSize.size_smi,
    lineHeight: 18,
    width: 287,
    fontFamily: FontFamily.interRegular,
  },
  checkbox: {
    borderRadius: 8,
    backgroundColor: Color.colorWhite,
    borderColor: "#d3d6da",
    borderWidth: 1.5,
    borderStyle: "solid",
    overflow: "hidden",
  },
  inputFields: {
    top: 170,
    left: 30,
    height: 256,
  },
  icon: {
    borderRadius: Border.br_3xs,
    height: "100%",
    width: "100%",
  },
  button1: {
    width: 40,
    height: 40,
  },
  signUp: {
    fontSize: FontSize.size_5xl,
    lineHeight: 25,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    marginLeft: 80,
    color: Color.colorGray_200,
    textAlign: "center",
    marginTop:3.5,
  },
  top: {
    width: 210,
    height: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  topBar: {
    height: "16.13%",
    bottom: "83.87%",
    justifyContent: "flex-end",
    paddingVertical: 39,
  },
  fluentradioButton16RegularIcon1: {
    top: 437,
    left: 35,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  patient: {
    top: 439,
    left: 64,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  signUp1: {
    height: "3.3%",
    width: "38.4%",
    top: "68.1%",
    left: "30.4%",
    lineHeight: 24,
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  signup: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
  radiobuttons:{
        paddingTop:400,
        marginLeft:54,
        borderColor: 'purple',
      },
});

export default SignUp;
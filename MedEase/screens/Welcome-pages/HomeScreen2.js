import * as React from "react";
import { StyleSheet,Dimensions, View, Text, TouchableOpacity, TouchableHighlight, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding } from "../../GlobalStyles";

const HomeScreen2 = () => {
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingLeft = deviceWidth * 0.22;
  const dynamicWidth= deviceWidth*0.57;
  return (
    <ImageBackground
      style={styles.homescreen2}
      
      source={require("../../assets/homepage2.jpg")}
    >
      <View style={styles.overlay}>
        <Text style={styles.welcomeToMedease}>{`Welcome to MedEase`}</Text>
        <View style={[styles.buttons, {left: dynamicPaddingLeft, width: dynamicWidth}]}>
          <TouchableOpacity
            style={[styles.loginButton, styles.buttonLayout]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.login, styles.loginTypo]}>Login</Text>
          </TouchableOpacity>
          <TouchableHighlight
            style={[styles.signupButton, styles.buttonLayout]}
            activeOpacity={0.7}
            underlayColor="transparent"
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={[styles.signUp, styles.loginTypo]}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.09)", // You can adjust the opacity here
  },
  buttonLayout: {
    justifyContent: "center",
    height: 50,
    width: 260,
    top: 100,
    borderRadius: 13,
  },
  loginTypo: {
    lineHeight: 24,
    fontSize: FontSize.size_base,
    textAlign: "center",
  },
  welcomeToMedease: {
    top: 180,
    fontSize: FontSize.size_13xl,
    fontWeight: "700",
    fontFamily: FontFamily.montserratBold,
    color: Color.colorDarkslateblue,
    height: 78,
    textAlign: "center",
  },
  login: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
  },
  loginButton: {
    backgroundColor: Color.colorPurple,
    alignItems: "center",
  },
  signUp: {
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorPurple,
    width: 71,
    height: 24,
    transform: [
      {
        rotate: "0.13deg",
      },
    ],
  },
  signupButton: {
    borderStyle: "solid",
    borderColor: Color.colorPurple,
    borderWidth: 1,
    paddingHorizontal: 101,
    paddingVertical: Padding.p_0,
    marginTop: 10,
  },
  buttons: {
    top: 150,
    width: 207,
    left:100,
    alignItems: "center",
    position: "absolute",
  },
  homescreen2: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    transform: [{ rotate: '360deg' }],
  },
});

export default HomeScreen2;


// import * as React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Pressable,
//   TouchableOpacity,
//   TouchableHighlight,
//   ScrollView,
// } from "react-native";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import { Border, FontSize, FontFamily, Color, Padding } from "../../GlobalStyles";
// //import Navbar from "../navbar-footer/Navbar";

// const HomeScreen2 = () => {
//   const navigation = useNavigation();

//   return (
//     <>
//     <LinearGradient
//       style={styles.homescreen2}
//       locations={[0, 0.3, 8.5, 1]}
//       colors={[
//         "rgba(252, 252, 252, 0)",
//         "rgba(231, 205, 230, 0.2)",
//         "rgba(172, 86, 188, 0.5)",
//         "#a2429e",
//       ]}
//     >
//     {/* <Navbar /> */}
//       <View style={[styles.homeIndicator, styles.homeIndicatorPosition]} />
//       <Text style={styles.welcomeToMedease}>{`Welcome to MedEase`}</Text>
//       <View style={styles.buttons}>
//         <TouchableOpacity
//           style={[styles.loginButton, styles.buttonLayout]}
//           activeOpacity={0.7}
//           onPress={() => navigation.navigate("Login")}
//         >
//           <Text style={[styles.login, styles.loginTypo]}>Login</Text>
//         </TouchableOpacity>
//         <TouchableHighlight
//           style={[styles.signupButton, styles.buttonLayout]}
//           activeOpacity={0.7}
//           underlayColor="transparent"
//           onPress={() => navigation.navigate("SignUp")}
//         >
//           <Text style={[styles.signUp, styles.loginTypo]}>Sign Up</Text>
//         </TouchableHighlight>
//       </View>
//       <Image
//         style={[styles.homescreen2Child, styles.homeIndicatorPosition]}
//         contentFit="cover"
//         source={require("../../assets/vector-36.png")} />
//     </LinearGradient>
//     {/* <Navbar /> */}
//     </>
    
//   );
// };

// const styles = StyleSheet.create({
//   homeIndicatorPosition: {
//     width: 400,
//     left: 0,
//     position: "absolute",
//   },
//   buttonLayout: {
//     justifyContent: "center",
//     height: 50,
//     width: 260,
//     top: 100,
//     borderRadius: Border.br_13xl,
//   },
//   loginTypo: {
//     lineHeight: 24,
//     fontSize: FontSize.size_base,
//     textAlign: "center",
//   },
//   homeIndicator: {
//     top: 776,
//     height: 36,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   welcomeToMedease: {
//     top: 485,
//     left: 20,
//     fontSize: FontSize.size_13xl,
//     fontWeight: "700",
//     fontFamily: FontFamily.montserratBold,
//     color: Color.colorDarkslateblue,
//     height: 78,
//     textAlign: "center",
//     width: 375,
//     position: "absolute",
//   },
//   login: {
//     fontWeight: "600",
//     fontFamily: FontFamily.interSemiBold,
//     color: Color.colorWhite,
//   },
//   loginButton: {
//     backgroundColor: Color.colorPurple,
//     alignItems: "center",
//   },
//   signUp: {
//     fontWeight: "500",
//     fontFamily: FontFamily.interMedium,
//     color: Color.colorPurple,
//     width: 71,
//     height: 24,
//     transform: [
//       {
//         rotate: "0.13deg",
//       },
//     ],
//   },
//   signupButton: {
//     borderStyle: "solid",
//     borderColor: Color.colorPurple,
//     borderWidth: 1,
//     paddingHorizontal: 101,
//     paddingVertical: Padding.p_0,
//     marginTop: 10,
//   },
//   buttons: {
//     top: 490,
//     left: 100,
//     width: 207,
//     alignItems: "center",
//     position: "absolute",
//   },
//   homescreen2Child: {
//     height: 450,
//     width: "100%",
//     top:-9,
//   },
//   homescreen2: {
//     flex: 1,
//     width: "100%",
//     height: 812,
//     overflow: "hidden",
//     backgroundColor: "transparent",
//   },
// });

// import * as React from "react";
// import { StyleSheet, View, Text, TouchableOpacity, LinearGradient, TouchableHighlight, ImageBackground } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FontSize, FontFamily, Color, Padding } from "../../GlobalStyles";
// import { Image } from "expo-image";
// const HomeScreen2 = () => {
//   const navigation = useNavigation();

//   return (
    
//     <LinearGradient
//       style={styles.homescreen2}
//       source={require("../../assets/vector-36.png")}
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.welcomeToMedease}>{`Welcome to MedEase`}</Text>
//         <View style={styles.buttons}>
//           <TouchableOpacity
//             style={[styles.loginButton, styles.buttonLayout]}
//             activeOpacity={0.7}
//             onPress={() => navigation.navigate("Login")}
//           >
//             <Text style={[styles.login, styles.loginTypo]}>Login</Text>
//           </TouchableOpacity>
//           <TouchableHighlight
//             style={[styles.signupButton, styles.buttonLayout]}
//             activeOpacity={0.7}
//             underlayColor="transparent"
//             onPress={() => navigation.navigate("SignUp")}
//           >
//             <Text style={[styles.signUp, styles.loginTypo]}>Sign Up</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//       <Image
//         style={[styles.homescreen2Child, styles.homeIndicatorPosition]}
//         contentFit="cover"
//         source={require("../../assets/vector-36.png")} />
//     </LinearGradient>
   
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.09)", // You can adjust the opacity here
//   },
//   buttonLayout: {
//     justifyContent: "center",
//     height: 50,
//     width: 260,
//     top: 100,
//     borderRadius: 13,
//   },
//   loginTypo: {
//     lineHeight: 24,
//     fontSize: FontSize.size_base,
//     textAlign: "center",
//   },
//   welcomeToMedease: {
//     top: 485,
//     right:0.5,
    
//     fontSize: FontSize.size_13xl,
//     fontWeight: "700",
//     fontFamily: FontFamily.montserratBold,
//     color: Color.colorDarkslateblue,
//     height: 78,
//     textAlign: "center",
//   },
//   login: {
//     fontWeight: "600",
//     fontFamily: FontFamily.interSemiBold,
//     color: Color.colorWhite,
//   },
//   loginButton: {
//     backgroundColor: Color.colorPurple,
//     alignItems: "center",

//   },
//   signUp: {
//     fontWeight: "500",
//     fontFamily: FontFamily.interMedium,
//     color: Color.colorPurple,
//     width: 71,
//     height: 24,
//     transform: [
//       {
//         rotate: "0.13deg",
//       },
//     ],
//   },
//   signupButton: {
//     borderStyle: "solid",
//     borderColor: Color.colorPurple,
//     borderWidth: 1,
//     paddingHorizontal: 101,
//     paddingVertical: Padding.p_0,
//     marginTop: 10,
//   },
//   buttons: {
//     top: 490,
//     left: 80,
//     width: 207,
//     left:100,
//     alignItems: "center",
//     position: "absolute",
//   },
//   homescreen2: {
//     flex: 1,
//     width: "100%",
//     height: 715,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
// });

// export default HomeScreen2;


// // import * as React from "react";
// // import {
// //   StyleSheet,
// //   View,
// //   Text,
// //   Pressable,
// //   TouchableOpacity,
// //   TouchableHighlight,
// //   ScrollView,
// // } from "react-native";
// // import { Image } from "expo-image";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { useNavigation } from "@react-navigation/native";
// // import { Border, FontSize, FontFamily, Color, Padding } from "../../GlobalStyles";
// // //import Navbar from "../navbar-footer/Navbar";

// // const HomeScreen2 = () => {
// //   const navigation = useNavigation();

// //   return (
// //     <>
// //     <LinearGradient
// //       style={styles.homescreen2}
// //       locations={[0, 0.3, 8.5, 1]}
// //       colors={[
// //         "rgba(252, 252, 252, 0)",
// //         "rgba(231, 205, 230, 0.2)",
// //         "rgba(172, 86, 188, 0.5)",
// //         "#a2429e",
// //       ]}
// //     >
// //     {/* <Navbar /> */}
// //       <View style={[styles.homeIndicator, styles.homeIndicatorPosition]} />
// //       <Text style={styles.welcomeToMedease}>{`Welcome to MedEase`}</Text>
// //       <View style={styles.buttons}>
// //         <TouchableOpacity
// //           style={[styles.loginButton, styles.buttonLayout]}
// //           activeOpacity={0.7}
// //           onPress={() => navigation.navigate("Login")}
// //         >
// //           <Text style={[styles.login, styles.loginTypo]}>Login</Text>
// //         </TouchableOpacity>
// //         <TouchableHighlight
// //           style={[styles.signupButton, styles.buttonLayout]}
// //           activeOpacity={0.7}
// //           underlayColor="transparent"
// //           onPress={() => navigation.navigate("SignUp")}
// //         >
// //           <Text style={[styles.signUp, styles.loginTypo]}>Sign Up</Text>
// //         </TouchableHighlight>
// //       </View>
// //       <Image
// //         style={[styles.homescreen2Child, styles.homeIndicatorPosition]}
// //         contentFit="cover"
// //         source={require("../../assets/vector-36.png")} />
// //     </LinearGradient>
// //     {/* <Navbar /> */}
// //     </>
    
// //   );
// // };

// // const styles = StyleSheet.create({
// //   homeIndicatorPosition: {
// //     width: 400,
// //     left: 0,
// //     position: "absolute",
// //   },
// //   buttonLayout: {
// //     justifyContent: "center",
// //     height: 50,
// //     width: 260,
// //     top: 100,
// //     borderRadius: Border.br_13xl,
// //   },
// //   loginTypo: {
// //     lineHeight: 24,
// //     fontSize: FontSize.size_base,
// //     textAlign: "center",
// //   },
// //   homeIndicator: {
// //     top: 776,
// //     height: 36,
// //     justifyContent: "flex-end",
// //     alignItems: "center",
// //   },
// //   welcomeToMedease: {
// //     top: 485,
// //     left: 20,
// //     fontSize: FontSize.size_13xl,
// //     fontWeight: "700",
// //     fontFamily: FontFamily.montserratBold,
// //     color: Color.colorDarkslateblue,
// //     height: 78,
// //     textAlign: "center",
// //     width: 375,
// //     position: "absolute",
// //   },
// //   login: {
// //     fontWeight: "600",
// //     fontFamily: FontFamily.interSemiBold,
// //     color: Color.colorWhite,
// //   },
// //   loginButton: {
// //     backgroundColor: Color.colorPurple,
// //     alignItems: "center",
// //   },
// //   signUp: {
// //     fontWeight: "500",
// //     fontFamily: FontFamily.interMedium,
// //     color: Color.colorPurple,
// //     width: 71,
// //     height: 24,
// //     transform: [
// //       {
// //         rotate: "0.13deg",
// //       },
// //     ],
// //   },
// //   signupButton: {
// //     borderStyle: "solid",
// //     borderColor: Color.colorPurple,
// //     borderWidth: 1,
// //     paddingHorizontal: 101,
// //     paddingVertical: Padding.p_0,
// //     marginTop: 10,
// //   },
// //   buttons: {
// //     top: 490,
// //     left: 100,
// //     width: 207,
// //     alignItems: "center",
// //     position: "absolute",
// //   },
// //   homescreen2Child: {
// //     height: 450,
// //     width: "100%",
// //     top:-9,
// //   },
// //   homescreen2: {
// //     flex: 1,
// //     width: "100%",
// //     height: 812,
// //     overflow: "hidden",
// //     backgroundColor: "transparent",
// //   },
// // });
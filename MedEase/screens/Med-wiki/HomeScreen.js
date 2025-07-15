// import * as React from "react";
// import {
//   StyleSheet,
//   Pressable,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
//   Text,
//   View,
//   Image,
//   Modal,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import Collapsible from "react-native-collapsible";
// import { useState } from "react";
// import Navbar from './../navbar-footer/Navbar';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {
//   Padding,
//   Color,
//   Border,
//   FontFamily,
//   FontSize,
// } from "../../GlobalStyles";
// const deviceWidth = Dimensions.get("window").width;
//   const deviceHeight = Dimensions.get("window").height;
//   const dynamicPaddingTop = deviceHeight * 0.0;
//   const dynamicWidth = deviceWidth * 0.87;
//   const dynamicPaddingTop1 = deviceHeight * 0.65;
//   const dynamicPaddingLeft = deviceWidth * 0.17;
//   const dynamicPaddingLeft1 = deviceWidth * 0.06;
//   const dynamicPaddingLeft2 = deviceWidth * 0.63;
//   const dynamicPaddingLeft3 = deviceWidth * 0.195;

// const MedDescription = () => {
//   return (
//     <>
//     <ScrollView contentContainerStyle={styles.container}>
//     <LinearGradient
//       style={styles.meddescription}
//       locations={[0, 0.3, 8.5, 1]}
//       colors={[
//         "rgba(252, 252, 252, 0)",
//         "rgba(231, 205, 230, 0.2)",
//         "rgba(172, 86, 188, 0.5)",
//         "#a2429e",
//       ]}
//         >
          
//       </LinearGradient>
//     </ScrollView>
//     <Navbar/>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container:{
//     height:1290,
// },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.2)",
//   },
//   modalContent: {
//     backgroundColor: Color.colorWhite,
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   alertText: {
//     fontSize: FontSize.size_lg,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   okButton: {
//     backgroundColor: Color.colorPurple,
//     width:50,
//     padding: 8,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   okButtonText: {
//     color: Color.colorWhite,
//     fontSize: FontSize.size_base,
//     textAlign: "center",
//   },
//   materialSymbolsplayArrowOu: {
//     top:0,
//     width: 40,
//     height: 40,
//     left:240,
//   },
//   iconLayout: {
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   section:{
//     top:-26,
//   },
//   searchBorder: {
//     flexDirection: "row",
//     borderColor: Color.colorAzure,
//     width: 360,
//     borderWidth: 0,
//     borderStyle: "solid",
//   },
//   article: {
//     borderRadius: Border.br_3xs,
//     backgroundColor: "transparent",
//     height: 65,
//     top:10,
//     paddingHorizontal: Padding.p_8xs,
//     paddingVertical: Padding.p_5xs,
//   },
//   display:{
//     top:50,
//   },
//   boxContent:{
//     textAlign:"center",
//     fontSize:18,
//     fontWeight:"bold",
//   },
//   sectionContainer: {
//     width:367,
//     marginBottom: 15,
//     top:290,
//     left:21,
//     padding: 13,
//     backgroundColor: "white",
//     borderRadius: 10,
//     elevation: 3,
//   },
//   sectionTouchable: {
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     left:25,
//   },
//   sectionContent: {
//     textAlign:"center",
//     marginTop: 5,
//     color: "#666",
//   },
//   cardView: {
//     padding: Padding.p_8xs,
//     backgroundColor: Color.colorWhite,
//     marginTop: 10,
//     marginLeft: 20,
//     width: "91%",
//     position: "absolute",
//     zIndex: 1,
//     borderRadius: 5,
//   },
//   tabContent: {
//     padding: Padding.p_8xs,
//     backgroundColor: Color.colorWhite,
//     marginTop: 10,
//     marginLeft: 20, // Adjust the left margin as needed
//     width: "91%", // Adjust the width as needed
//     position: "absolute",
//     top: "42%", // Adjust the top position as needed
//     zIndex: 1, // Ensure it overlays other components
//     borderRadius:5,
//   },
//   tabContent1: {
//     padding: Padding.p_8xs,
//     backgroundColor: Color.colorWhite,
//     marginTop: 10,
//     marginLeft: 20, // Adjust the left margin as needed
//     width: "91%", // Adjust the width as needed
//     position: "absolute",
//     top: "50%", // Adjust the top position as needed
//     zIndex: 1, // Ensure it overlays other components
//     borderRadius:5,
//   },
//   dropdownIcon: {
//     width: 25,
//     height: 25,
//     marginRight: 90,
//     top:305,
//     left:40,
//   },
//   plusIcon: {
//     width: 25,
//     height: 25,
//     marginRight: 90,
//     top:240,
//     left:30,
//   },
//   dropdownIcon1: {
//     width: 25,
//     height: 25,
//     marginRight: 90,
//     top:345,
//     left:40,
//   },
//   onlineDoctorAmico1: {
//     top:90,
//     left: 85,
//     width: 250,
//     height: 160,
//     position: "absolute",
//     overflow: "hidden",
//   },
//   findANear: {
//     fontSize: FontSize.size_5xl,
//     lineHeight: 32,
//     width: 250,
//     fontWeight: "700",
//     color: Color.colorGray_200,
//     top:15,
//     left: 20,
//     color: "black",
//     fontFamily: FontFamily.interBold,
//     position: "absolute",
//   },
//   findANear1: {
//     fontSize: 13,
//     lineHeight: 32,
//     width: 250,
//     fontWeight: "700",
//     color: Color.colorGray_200,
//     top:40,
//     left: 20,
//     color: "black",
//     fontFamily: FontFamily.interBold,
//     position: "absolute",
//   },
//   dentalTypo: {
//     textAlign: "left",
//     fontFamily: FontFamily.interSemiBold,
//     fontWeight: "600",
//   },
//   title: {
//     top: 0,
//     left: 21,
//     width: 345,
//     height: 66,
//     position: "absolute",
//   },
//   buttonLayout: {
//     left:20,
//     paddingVertical: 7,
//     paddingHorizontal: Padding.p_0,
//     alignItems: "left",
//     backgroundColor: Color.colorPurple,
//     borderRadius:5,
//     bottom: "80.67%",
//     top: "36.29%",
//     width: "90.67%",
//     height: "6%",
//     position: "absolute",
//   },
//   buttonLayout1: {
//     left:20,
//     paddingVertical: 7,
//     paddingHorizontal: Padding.p_0,
//     alignItems: "left",
//     backgroundColor: Color.colorPurple,
//     borderRadius:5,
//     bottom: "80.67%",
//     top: "44.29%",
//     width: "90.67%",
//     height: "6%",
//     position: "absolute",
//   },
//   effectsTypo: {
//     fontFamily: FontFamily.interSemiBold,
//     fontWeight: "600",
//   },
//   buttonPosition: {
//     bottom: "74.26%",
//     top: "20.69%",
//     paddingVertical: 7,
//     paddingHorizontal: Padding.p_0,
//     alignItems: "center",
//     backgroundColor: Color.colorPurple,
//     borderRadius: Border.br_13xl,
//     width: "26.67%",
//     height: "5.05%",
//     position: "absolute",
//   },
//   overviewLayout: {
//     lineHeight: 24,
//     textAlign: "left",
//     color: Color.colorGray_200,
//     position: "absolute",
//   },
//   navebarIcon: {
//     top: 687,
//     left: 0,
//     width: 380,
//     height: 125,
//     position: "absolute",
//   },
//   icon: {
//     borderRadius: Border.br_3xs,
//     height: "100%",
//     width: "100%",
//   },
//   button: {
//     width: 100,
//     height: 40,
//   },
//   button1: {
//     width: 100,
//     height: 40,
//   },
//   panadol: {
//     fontSize: FontSize.size_5xl,
//     lineHeight: 32,
//     width: 224,
//     marginLeft: 88,
//     textAlign: "left",
//     color: Color.colorGray_200,
//     fontFamily: FontFamily.interSemiBold,
//     fontWeight: "600",
//     height: 40,
//   },
//   topBar: {
//     height: "12.32%",
//     top: "0%",
//     right: "0%",
//     bottom: "87.68%",
//     left: "0%",
//     flexDirection: "row",
//     paddingHorizontal: Padding.p_5xs,
//     paddingVertical: Padding.p_35xl,
//     position: "absolute",
//     width: "100%",
//   },
//   effects: {
//     fontSize: 17,
//     lineHeight: 32,
//     color: Color.colorWhite,
//     width: 200,
//     height: 200,
//     left:60,
//   },
//   button1: {
//     right: "67.73%",
//     left: "5.6%",
//   },
//   button2: {
//     right: "37.07%",
//     left: "36.27%",
//   },
//   button3: {
//     right: "20.53%",
//     left: "52.8%",
//   },
//   button4: {
//     right: "6.4%",
//     left: "66.93%",
//   },
//   button5: {
//     right: "51.73%",
//     left: "21.6%",
//   },
//   overview: {
//     top: 243,
//     left: 16,
//     fontSize: FontSize.size_lg,
//     width: 343,
//     height: 34,
//     fontFamily: FontFamily.interSemiBold,
//     fontWeight: "600",
//   },
//   theDeasDrug: {
//     top: 277,
//     left: 12,
//     fontSize: FontSize.size_sm,
//     fontWeight: "500",
//     fontFamily: FontFamily.interMedium,
//     width: 355,
//     height: 252,
//   },
//   meddescription: {
//     borderStyle: "solid",
//     borderColor: Color.colorGray_300,
//     borderWidth: 1,
//     flex: 1,
//     height: 812,
//     overflow: "hidden",
//     backgroundColor: "transparent",
//     width: "100%",
//   },
// });

// export default MedDescription;


import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { med_wiki, folderData } from "../../constants/constants";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import Navbar from './../navbar-footer/Navbar';

const HomeScreen = ({ navigation }) => {
    const handleCategoryPress = (category) => {
        // Filter medicines based on the selected category
        const filteredMedicines = med_wiki.filter(medicine => medicine.categories.includes(category));
        // Navigate to the MedicinesPage and pass the filtered medicines as route params
        navigation.navigate('MedicinesPage', { medicines: filteredMedicines });
    };

    return (
        <>
       <ScrollView
      
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          style={styles.searching}
          locations={[0, 0.3, 8.5, 1]}
          colors={[
            "rgba(252, 252, 252, 0)",
            "rgba(231, 205, 230, 0.2)",
            "rgba(172, 86, 188, 0.5)",
            "#a2429e",
          ]}
        >

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>MedEase Medicine WIKI</Text>
                {/* <TouchableOpacity >
                   <Ionicons name="ios-book"
                        style={styles.favsIcon}
                    />
                    <Text style={styles.favsText}>My Favs</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.searchBar}>
                
            </View>
            <View>
                <Image
                    style={styles.featuredImage}
                    resizeMode="cover"
                    source={require("../../assets/Guthealth-rafiki.png")}
                />
                <Text style={styles.featuredText}>Featured</Text>
                <View style={styles.categoryContainer}>
                    {folderData.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryBox}
                            onPress={() => handleCategoryPress(category.name)}
                        >
                            <Image
                                style={styles.categoryImage}
                                source={category.image}
                            />
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
                    </View>
                </LinearGradient>
            </ScrollView>
            <Navbar/>
            </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop:20
    
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    favsButton: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 280,
},
//     favsIcon: {
//         width: 30,
//         height: 30,
//         color: 'purple', // Change the color as desired
//     },
//     favsText: {
//         color: 'purple', // Change the color as desired
        //     },
    
    favsIcon: {
    fontSize: 30, // Adjust the font size to make the icon bigger
        color: 'purple', // Change the color as desired
    marginLeft:20
},
favsText: {
    fontSize: 16, // Adjust the font size of the text
    color: 'purple', // Change the color as desired
    marginTop: -3, // Adjust this value to align the text properly with the icon
    fontWeight: 'bold',
    marginLeft:5
},
    searchBar: {
        // Implement styles for search bar
    },
    featuredImage: {
        width: '80%',
        height: 200,
        marginBottom: 10,
    },
    featuredText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryBox: {
        width: '48%',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
        alignItems: 'center',
        paddingVertical: 10,
    },
    categoryImage: {
        width: 80,
        height: 80,
        marginBottom: 5,
    },
    categoryName: {
        fontWeight: 'bold',
    },
});

export default HomeScreen;

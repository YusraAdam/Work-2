// // // import * as React from "react";
// // // import { useState } from 'react';
// // // import {
// // //   StyleSheet,
// // //   View,
// // //   TextInput,
// // //   ScrollView,
// // //   SafeAreaView,
// // //   Text,
// // //   Pressable,
// // //   TouchableOpacity,
// // //   Dimensions,
// // //   Image,
// // // } from "react-native";
// // // import { LinearGradient } from "expo-linear-gradient";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { Color, FontFamily, Border, FontSize, Padding } from "../../GlobalStyles";
// // // import Menu from "../Menu/Menu";
// // // import Navbar from './../navbar-footer/Navbar';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // const Searching = () => {
// // //   const deviceWidth = Dimensions.get("window").width;
// // //   const deviceHeight = Dimensions.get("window").height;
// // //   const dynamicPaddingTop = deviceHeight * 0.0;
// // //   const dynamicWidth = deviceWidth * 0.87;
// // //   const dynamicPaddingTop1 = deviceHeight * 0.65;
// // //   const dynamicPaddingLeft = deviceWidth * 0.001;
// // //   const dynamicPaddingLeft1 = deviceWidth * 0.78;
// // //   const dynamicPaddingLeft2 = deviceWidth * 0.69;
// // //   const dynamicPaddingLeft3 = deviceWidth * 0.195;
// // //   const navigation = useNavigation();
// // //   const [isMenuVisible, setIsMenuVisible] = React.useState(false);
// // //   const [searchText, setSearchText] = useState("");

// // //   const toggleMenu = () => {
// // //     setIsMenuVisible(!isMenuVisible);
// // //   };

// // //   const handleSearch = () => {
// // //     navigation.navigate('MedDescription');
// // //   };

// // //   const navigateToDoctorsDisplay = () => {
// // //     navigation.navigate('Favourites');
// // //   };
// // //   const dataForBoxes = [
// // //     { title: "Amikacin", subtitle: "GlaxoSmithKline" },
// // //     { title: "Adoxa", subtitle: "Doxycycline" },
// // //     { title: "Bactroban", subtitle: "Mupirocin" },
// // //     { title: "Mavik", subtitle: "Trandolapril" },
// // //   ];
// // //   return (
// // //     <>
// // //       <ScrollView
      
// // //         contentContainerStyle={styles.scrollViewContent}
// // //         keyboardShouldPersistTaps="handled"
// // //       >
// // //         <LinearGradient
// // //           style={styles.searching}
// // //           locations={[0, 0.3, 8.5, 1]}
// // //           colors={[
// // //             "rgba(252, 252, 252, 0)",
// // //             "rgba(231, 205, 230, 0.2)",
// // //             "rgba(172, 86, 188, 0.5)",
// // //             "#a2429e",
// // //           ]}
// // //         >

// // //           <View style={[styles.search, styles.searchLayout]}>
// // //             <View style={[styles.searchChild, styles.searchLayout, { width: dynamicWidth }]} />
// // //             <TextInput
// // //               style={[styles.search1, styles.search1Typo]}
// // //               placeholder="Search"
// // //               placeholderTextColor={Color.colorDarkgray_100}
// // //               value={searchText}
// // //               onChangeText={(text) => setSearchText(text)}
// // //               onSubmitEditing={handleSearch} // This will be called when the user presses Enter/Return
// // //             />
// // //             <Image
// // //               style={[styles.iconlylightOutlinesearch, styles.iconLayout]}
// // //               contentFit="cover"
// // //               source={require("../../assets/iconlylightoutlinesearch.png")}
// // //             />
// // //           </View>

// // //           <View style={[styles.topBar, styles.topBarPosition, { left: dynamicPaddingLeft }]}>
// // //             <View style={styles.rectangle} />
// // //             <View style={styles.title}>
// // //               <Text style={[styles.findANear, styles.dentalTypo]}>
// // //                 MedEase Medicine Wiki
// // //               </Text>
// // //               <TouchableOpacity activeOpacity={0.4} onPress={navigateToDoctorsDisplay}>
// // //                 <Text style={[styles.myAppointments, styles.dentalTypo, { left: dynamicPaddingLeft2 }]}>
// // //                   My Wiki
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //             <TouchableOpacity activeOpacity={0.4} onPress={navigateToDoctorsDisplay}>
// // //             <Ionicons name="ios-book" size={30} color="purple" style={[styles.uilcalenderIcon, { left: dynamicPaddingLeft1 }]} />
// // //             </TouchableOpacity>
// // //           </View>
          
// // //           <View style={styles.display}>
// // //             <Text style={[styles.featured]}>Featured</Text>

// // //             {dataForBoxes.map((data, index) => (
// // //         <TouchableOpacity
// // //           key={index}
// // //           style={[styles.article, styles.searchBorder, { width: dynamicWidth, top: 10 + index * 10 }]}
// // //           activeOpacity={0.4}
// // //           onPress={() => navigation.navigate("MedDescription", { data })}
// // //         >
// // //           {/* Your existing code for the box */}
// // //           <View
// // //             style={styles.materialSymbolsplayArrowOu}
// // //             activeOpacity={0.4}
// // //             onPress={() => navigation.navigate("MedDescription", { data })}
// // //           >
// // //             <Image
// // //               style={[styles.icon, styles.iconLayout]}
// // //               resizeMode="cover"
// // //               source={require("../../assets/materialsymbolsplayarrowoutline.png")}
// // //             />
// // //           </View>
// // //           <View
// // //             style={styles.amikinParent}
// // //             activeOpacity={0.4}
// // //             onPress={() => navigation.navigate("MedDescription", { data })}
// // //           >
// // //             <Text style={[styles.amikin, styles.amikinTypo]}>{data.title}</Text>
// // //             <Text style={styles.glaxosmithkline}>{data.subtitle}</Text>
// // //           </View>
// // //         </TouchableOpacity>
// // //       ))}
// // //           </View>
// // //               <TouchableOpacity activeOpacity={0.4}>
// // //               <Image
// // //             style={[styles.onlineDoctorAmico1, { left: dynamicPaddingLeft3 }]}
// // //             resizeMode="cover"
// // //             source={require("../../assets/Guthealth-rafiki.png")}
// // //           />
// // //               </TouchableOpacity>
          
         
// // //       </LinearGradient>
// // //       </ScrollView>
// // //       <Navbar/>
// // //       </>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   scrollViewContent: {
// // //     flexGrow: 1,
// // //   },
// // //   display:{
// // //     top:390,
// // //     left:23,
// // //   },
// // //   uilcalenderIcon: {
// // //     top: 65,
// // //     left: 280,
// // //     width: 45,
// // //     height: 45,
// // //     position: "absolute",
// // //     overflow: "hidden",
// // //   },
// // //   dentalTypo: {
// // //     textAlign: "left",
// // //     fontFamily: FontFamily.interSemiBold,
// // //     fontWeight: "600",
// // //   },
// // //   myAppointments: {
// // //     top: 30,
// // //     left: 233,
// // //     color: Color.colorBlack,
// // //     width: 127,
// // //     height: 19,
// // //     fontSize: 15,
// // //     textAlign: "left",
// // //     position: "absolute",
// // //   },
// // //   search: {
// // //     top: 150,
// // //     left: 23,
// // //   },
// // //   searchLayout: {
// // //     height: 50,
// // //     width: 365,
// // //     position: "absolute",
// // //   },
// // //   searchChild: {
// // //     borderRadius: Border.br_5xl,
// // //     backgroundColor: Color.colorGray_100,
// // //     borderWidth: 1,
// // //     borderColor: Color.colorAzure,
// // //     borderStyle: "solid",
// // //     left: 0,
// // //     top: 0,
// // //   },
// // //   search1: {
// // //     top: 14,
// // //     left: 60,
// // //     fontFamily: FontFamily.interRegular,
// // //     color: Color.colorDarkgray_100,
// // //     width: 190,
// // //     height: 21,
// // //   },
// // //   search1Typo: {
// // //     fontSize: FontSize.size_base,
// // //     textAlign: "left",
// // //     position: "absolute",
// // //   },
// // //   iconlylightOutlinesearch: {
// // //     height: 30,
// // //     width: "7.4%",
// // //     top: 10,
// // //     right: "87.68%",
// // //     bottom: "18.75%",
// // //     left: 20,
// // //   },
// // //   topBar: {
// // //     height: 92,
// // //     top: 0,
// // //   },
// // //   topBarPosition: {
// // //     width: 375,
// // //     left: 0,
// // //     position: "absolute",
// // //   },
// // //   rectangle: {
// // //     height: "100%",
// // //     top: "0%",
// // //     right: "0%",
// // //     bottom: "0%",
// // //     left: "0%",
// // //     position: "absolute",
// // //     width: "100%",
// // //   },
// // //   title: {
// // //     top: 68,
// // //     left: 21,
// // //     width: 345,
// // //     height: 66,
// // //     position: "absolute",
// // //   },
// // //   findANear: {
// // //     fontSize: FontSize.size_5xl,
// // //     lineHeight: 32,
// // //     width: 250,
// // //     fontWeight: "700",
// // //     color: Color.colorGray_200,
// // //     top: -7,
// // //     left:0,
// // //     fontFamily: FontFamily.interBold,
// // //     position: "absolute",
// // //   },
// // //   dentalTypo: {
// // //     textAlign: "left",
// // //     fontFamily: FontFamily.interSemiBold,
// // //     fontWeight: "600",
// // //   },
// // //   onlineDoctorAmico1: {
// // //     top: -30,
// // //     left: 90,
// // //     width: 220,
// // //     height: 160,
// // //     position: "absolute",
// // //     overflow: "hidden",
// // //   },
// // //   iconLayout: {
// // //     maxHeight: "100%",
// // //     maxWidth: "100%",
// // //     position: "absolute",
// // //     overflow: "hidden",
// // //   },
// // //   menuIconContainer: {
// // //     position: "absolute",
// // //     top: 62,
// // //     left: 10,
// // //     padding: 10,
// // //   },
// // //   menuIcon: {
// // //     width: 22,
// // //     height: 20,
// // //   },
// // //   searchBorder: {
// // //     flexDirection: "row",
// // //     borderColor: Color.colorAzure,
// // //     width: 360,
// // //     borderWidth: 0,
// // //     borderStyle: "solid",
// // //   },
// // //   amikinTypo: {
// // //     color: Color.colorGray_200,
// // //     textAlign: "left",
// // //     fontFamily: FontFamily.interSemiBold,
// // //     fontWeight: "400",
// // //   },
// // //   navebarIcon: {
// // //     top: 687,
// // //     left: 0,
// // //     width: 379,
// // //     height: 125,
// // //     position: "absolute",
// // //   },

// // //   medeaseWiki: {
// // //     fontSize: FontSize.size_5xl,
// // //     lineHeight: 32,
// // //     width: 250,
// // //     fontWeight: "700",
// // //     color: Color.colorGray_200,
// // //     left: 40,
// // //     top: -7,
// // //     fontFamily: FontFamily.interBold,
// // //     position: "absolute",
// // //   },
// // //   featured: {
// // //     left: 3,
// // //     color: Color.colorGray_200,
// // //     fontFamily: FontFamily.interSemiBold,
// // //     fontWeight: "600",
// // //     fontSize: 17,
// // //     top: 0,
// // //   },
// // //   icon: {
// // //     height: "100%",
// // //   },
// // //   materialSymbolsplayArrowOu: {
// // //     width: 30,
// // //     height: 35,
// // //     left:5,
// // //   },
// // //   amikin: {
// // //     lineHeight: 16,
// // //     width: 101,
// // //     height: 18,
// // //     textAlign: "left",
// // //   },
// // //   glaxosmithkline: {
// // //     fontSize: FontSize.size_1xs,
// // //     fontWeight: "500",
// // //     fontFamily: FontFamily.interMedium,
// // //     color: Color.colorPurple,
// // //     height: 50,
// // //     width: 155,
// // //     textAlign: "left",
// // //   },
// // //   amikinParent: {
// // //     height: 33,
// // //     marginLeft: 7,
// // //     width: 155,
// // //   },
// // //   article: {
// // //     borderRadius: Border.br_3xs,
// // //     backgroundColor: Color.colorWhite,
// // //     height: 55,
// // //     top:10,
// // //     paddingHorizontal: Padding.p_8xs,
// // //     paddingVertical: Padding.p_5xs,
// // //   },

// // //   article1: {
// // //     borderRadius: Border.br_3xs,
// // //     backgroundColor: Color.colorWhite,
// // //     height: 55,
// // //     top:490,
// // //     left:10,
// // //     paddingHorizontal: Padding.p_8xs,
// // //     paddingVertical: Padding.p_5xs,
// // //   },
// // //   relatedArticles: {
// // //     top: 390,
// // //     left: 20,
// // //     width: 335,
// // //     position: "absolute",
// // //   },
// // //   searching: {
// // //     borderColor: Color.colorGray_300,
// // //     flex: 1,
// // //     height: 812,
// // //     backgroundColor: "transparent",
// // //     borderWidth: 1,
// // //     borderStyle: "solid",
// // //     overflow: "hidden",
// // //   },
// // // });

// // // export default Searching;
// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';

// // const MedicinesPage = ({ route }) => {
// //     const { medicines } = route.params;

// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.header}>Medicines</Text>
// //             {medicines.map((medicine, index) => (
// //                 <View key={index} style={styles.medicineContainer}>
// //                     {/* Render medicine information here */}
// //                     <Text style={styles.medicineName}>{medicine.name}</Text>
// //                     <Text style={styles.medicineDescription}>{medicine.description}</Text>
// //                     <Text style={styles.medicineUsage}>{medicine.usage}</Text>
// //                     {/* Render more information as needed */}
// //                 </View>
// //             ))}
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //         padding: 20,
// //     },
// //     header: {
// //         fontSize: 20,
// //         fontWeight: 'bold',
// //         marginBottom: 20,
// //         marginTop:30
// //     },
// //     medicineContainer: {
// //         marginBottom: 20,
// //     },
// //     medicineName: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     medicineDescription: {
// //         fontSize: 16,
// //     },
// //     medicineUsage: {
// //         fontSize: 16,
// //         fontStyle: 'italic',
// //     },
// // });

// // export default MedicinesPage;


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from './../navbar-footer/Navbar';
// const MedicinesPage = ({ route }) => {
//     const { medicines } = route.params;
//     const [expandedMedicine, setExpandedMedicine] = useState(null);

//     const handleMedicinePress = (medicineName) => {
//         if (expandedMedicine === medicineName) {
//             setExpandedMedicine(null);
//         } else {
//             setExpandedMedicine(medicineName);
//         }
//     };

//     return (
//         <ScrollView>
//         <LinearGradient
//             style={styles.container}
//             locations={[0, 0.3, 8.5, 1]}
//             colors={[
//                 "rgba(252, 252, 252, 0)",
//                 "rgba(231, 205, 230, 0.2)",
//                 "rgba(172, 86, 188, 0.5)",
//                 "#a2429e",
//             ]}
//         >
//             <View style={styles.container}>
//                 <Text style={styles.header}>Medicines</Text>
//                 {medicines.map((medicine, index) => (
//                     <TouchableOpacity
//                         key={index}
//                         onPress={() => handleMedicinePress(medicine.name)}
//                         style={styles.medicineContainer}
//                     >
//                         <Text style={styles.medicineName}>{medicine.name}</Text>
//                         {expandedMedicine === medicine.name && (
//                             <View style={styles.expandedContent}>
//                                 <Text style={styles.medicineName}>Description</Text>
//                                 <Text style={styles.medicineDescription}>{medicine.description}</Text>
//                                 <Text style={styles.medicineName}>Usage</Text>
//                                 <Text style={styles.medicineUsage}>{medicine.usage}</Text>
//                                 <Text style={styles.medicineName}>Side Effects</Text>
//                                 <Text style={styles.medicineUsage}>{medicine.side_effects}</Text>
//                                 <Text style={styles.medicineName}>Precautions</Text>
//                                 <Text style={styles.medicineUsage}>{medicine.precautions}</Text>
//                                 <Text style={styles.medicineName}>Categories</Text>
//                                 <Text style={styles.medicineUsage}>{medicine.categories.join(", ")}</Text>
//                                 {/* Render more information as needed */}
//                             </View>
//                         )}
//                     </TouchableOpacity>
//                 ))}
//             </View>
//             </LinearGradient>
//             </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
        
//         padding: 20,
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         marginTop: 30,

//     },
//     medicineContainer: {
//         marginBottom: 20,
//     },
//     medicineName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     expandedContent: {
//         marginTop: 10,
//         padding: 10,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 5,
//     },
//     medicineDescription: {
//         fontSize: 16,
//     },
//     medicineUsage: {
//         fontSize: 16,
//         marginTop: 5,
//         fontStyle: 'italic',
//     },
// });

// export default MedicinesPage;

const MedicinesPage = ({ route }) => {
    const { medicines } = route.params;
    const [expandedMedicine, setExpandedMedicine] = useState(null);

    const handleMedicinePress = (medicineName) => {
        if (expandedMedicine === medicineName) {
            setExpandedMedicine(null);
        } else {
            setExpandedMedicine(medicineName);
        }
    };

    return (
        <>
        <LinearGradient
            style={styles.container}
            locations={[0, 0.3, 8.5, 1]}
            colors={[
                "rgba(252, 252, 252, 0)",
                "rgba(231, 205, 230, 0.2)",
                "rgba(172, 86, 188, 0.5)",
                "#a2429e",
            ]}
        >
            <ScrollView>
            <View style={styles.innerContainer}>
                <Text style={styles.header}>Medicines </Text>
                {medicines.map((medicine, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleMedicinePress(medicine.name)}
                        style={styles.medicineContainer}
                    >
                        <Text style={styles.medicineName}>. {medicine.name}</Text>
                        {expandedMedicine === medicine.name && (
                            <View style={styles.expandedContent}>
                                <Text style={styles.subHeader}>Description</Text>
                                <Text style={styles.medicineDescription}>{medicine.description}</Text>
                                <Text style={styles.subHeader}>Usage</Text>
                                <Text style={styles.medicineUsage}>{medicine.usage}</Text>
                                <Text style={styles.subHeader}>Side Effects</Text>
                                <Text style={styles.medicineSideEffects}>{medicine.side_effects}</Text>
                                <Text style={styles.subHeader}>Precautions</Text>
                                <Text style={styles.medicinePrecautions}>{medicine.precautions}</Text>
                                <Text style={styles.subHeader}>Categories</Text>
                                <Text style={styles.medicineCategories}>{medicine.categories.join(', ')}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
                </View>
                </ScrollView>
        </LinearGradient>
        <Navbar/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
        alignContent: 'center',
    },
    medicineContainer: {
        marginBottom: 20,
    },
    medicineName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    expandedContent: {
        marginTop: 10,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    medicineDescription: {
        fontSize: 16,
    },
    medicineUsage: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    medicineSideEffects: {
        fontSize: 16,
    },
    medicinePrecautions: {
        fontSize: 16,
    },
    medicineCategories: {
        fontSize: 16,
    },
});

export default MedicinesPage;

// import * as React from "react";
// import { useState } from "react";
// import { Image } from "expo-image";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Dimensions,
//   TouchableOpacity,
//   Linking,
//   FlatList,
//   ScrollView
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import { FontFamily, FontSize, Color, Border } from "../../GlobalStyles";
// import Navbar from './../navbar-footer/Navbar';
// const DoctorsDisplay = () => {
//   const navigation = useNavigation();
//   const [isMenuVisible, setIsMenuVisible] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuVisible(!isMenuVisible);
//   };
//   const deviceWidth = Dimensions.get("window").width;
//   const deviceHeight = Dimensions.get("window").height;
//   const dynamicPaddingTop = deviceHeight * 0.0;
//   const dynamicWidth = deviceWidth * 0.44;
//   const dynamicPaddingTop1 = deviceHeight * 0.65;
//   const dynamicPaddingLeft = deviceWidth * 0.0;
//   const dynamicPaddingLeft1 = deviceWidth * 0.045;
//   const dynamicPaddingLeft2 = deviceWidth * 0.63;
//   const dynamicPaddingLeft3 = deviceWidth * 0.195;
//   // Assuming you have an array of doctors' information like this
//   const doctorsData = [
//     {
//       name: "Dr. Ahmed Faisal",
//       category: "Dentist",
//       hospital: "Ziauddin Hospital",
//       image: require("../../assets/avatar.png"),
//     },
//     {
//       name: "Dr. Omer Khan",
//       category: "Neurosurgeon",
//       hospital: "South City Hospital",
//       image: require("../../assets/avatar1.png"),
//     },
//     {
//       name: "Dr. Rafat Nasir",
//       category: "Skin",
//       hospital: "Aga Khan Hospital",
//       image: require("../../assets/avatar1.png"),
//     },
//     {
//       name: "Dr. Areej Zia",
//       category: "Urologist",
//       hospital: "Patel Hospital",
//       image: require("../../assets/avatar1.png"),
//     },
//     // Add more doctors as needed
//   ];
//   const renderBoxes = ({ item }) => (
//     <View style={[styles.doctorItem1, styles.categoryItem, { marginBottom: 10, width:dynamicWidth }]}>
    
//     <Image
//                   style={[styles.avatarIcon, styles.avatarIconLayout]}
//                   contentFit="cover"
//                   source={item.image}
//                 />
    
//       <Text style={[styles.doctorName1, styles.categoryText]}>{item.name}</Text>
//       <Text style={[styles.doctorName2, styles.categoryText]}>{item.category}</Text>
//       <Text style={[styles.doctorName3, styles.categoryText]}>{item.hospital}</Text>
//       <TouchableOpacity activeOpacity={0.4}
//                   style={[styles.button, styles.doctorFlexBox]}
//                   onPress={navigateToAppointment}
//                 >
//                   <Text style={[styles.bookAppointment, styles.myAppointmentsTypo]}>
//                     Book appointment
//                   </Text>
//                 </TouchableOpacity>
//     </View>
//   );
//   const renderTwoRows = ({ item, index }) => {
//     // Render every 1st, 3rd, 5th, ... indexed item in a new row
//     if (index % 2 === 0) {
//       return (
//         <View key={index} style={styles.doctorRow}>
//           {renderBoxes({ item })}
//           {doctorsData[index + 1] && renderBoxes({ item: doctorsData[index + 1] })}
//         </View>
//       );
//     }
  
//     return null; // For even-indexed items
//   };
//   const navigateToAppointment = () => {
//     // Open the URL in the device browser
//     Linking.openURL('https://www.ziauddinhospital.com/make-an-appointment/');
//   };
//   return (
//     <>
//     <ScrollView >
//     <LinearGradient
//       style={styles.doctorsdisplay}
//       locations={[0, 0.3, 8.5, 1]}
//       colors={[
//         "rgba(252, 252, 252, 0)",
//         "rgba(231, 205, 230, 0.2)",
//         "rgba(172, 86, 188, 0.5)",
//         "#a2429e",
//       ]}
//     >

// <View style={[styles.sectionContainer, {left:dynamicPaddingLeft1}]}>
            
//             <FlatList
//               data={doctorsData}
//               horizontal
//               renderItem={renderTwoRows}
//               keyExtractor={(item, index) => index.toString()}
//             />
//           </View>

//           <View style={[styles.topBar, styles.topBarPosition, { left: dynamicPaddingLeft }]}>
//             <View style={styles.rectangle} />
//             <View style={styles.title}>
//               <Text style={[styles.findANear, styles.dentalTypo]}>
//                 MedEase Doctors
//               </Text>
//             </View>
//           </View>
//     </LinearGradient>
//     </ScrollView>
//       <Navbar/>
//     </>
//   );
// };


import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
 import { LinearGradient } from "expo-linear-gradient";
 import { FontFamily, FontSize, Color, Border } from "../../GlobalStyles";

const DoctorsDisplay = () => {
  const navigation = useNavigation();
  const [doctorsData, setDoctorsData] = useState([]);
  const columns = 2; // Number of columns in the FlatList

  useEffect(() => {
    const fetchDoctorsData = async () => {
      const db = getFirestore();
      const doctorsCollection = collection(db, 'alldrs'); // Replace with your Firestore collection name
      const doctorsSnapshot = await getDocs(doctorsCollection);
      const data = doctorsSnapshot.docs.map(doc => doc.data());
      setDoctorsData(data);
    };

    fetchDoctorsData();
  }, []);

  const navigateToAppointment = (hospitalLink) => {
    Linking.openURL(hospitalLink);
  };

  const calculateBoxWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    return (screenWidth - 12 * (columns + 1)) / columns; // Adjust 20 based on your desired spacing
  };

  const renderBoxes = ({ item }) => (
    <TouchableOpacity
      style={{ margin: 10, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, width: calculateBoxWidth() }}
      activeOpacity={0.8}
      onPress={() => navigateToAppointment(item.dr_hosp_link)}
    >
      <View style={{  overflow: 'hidden' }}>
        <Image
          style={{ width: '100%', height: 140, }}
          source={{ uri: item.dr_pic }} // Assuming dr_pic is the field containing the image URL
        />
      </View>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }} numberOfLines={2}>
        {item.dr_name}
      </Text>
      <Text style={{ color: 'gray' }} numberOfLines={2}>
        {item.dr_sp1}
      </Text>
      <Text style={{ color: 'gray' }} numberOfLines={2}>
        {item.dr_sp2}
      </Text>
      <Text style={{ fontWeight: '600' }} numberOfLines={2}>
        {item.dr_hosp}
      </Text>
      <View style={{ backgroundColor: '#a2429e',  marginTop: 'auto', borderRadius: 20, padding: 10, alignSelf: 'bottom',  }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Book appointment</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <><FlatList
      
      ListHeaderComponent={() => (
        <LinearGradient
          style={{ paddingTop: 20 }}
          locations={[0, 0.3, 8.5, 1]}
          colors={[
            'rgba(252, 252, 252, 0)',
            'rgba(231, 205, 230, 0.2)',
            'rgba(172, 86, 188, 0.5)',
            '#a2429e',
          ]}
        >
           <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {/* Render your hospital boxes here */}
            <FlatList
            data={doctorsData}
      renderItem={renderBoxes}
      keyExtractor={(item, index) => index.toString()}
              numColumns={2}
             />
      </View>
    </LinearGradient>
      )}
          
    />
            
    </>
  );
};


export default DoctorsDisplay;

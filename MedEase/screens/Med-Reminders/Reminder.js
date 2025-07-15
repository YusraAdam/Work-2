// PillReminderPage.js
import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AddMed from './AddMed';
import { LinearGradient } from "expo-linear-gradient";
 const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
import Navbar from './../navbar-footer/Navbar';
import { COLORS } from './../../constants/theme';
import { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color, FontSize, FontFamily, Border } from "../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { collection, getDocs, query, where, getDoc, doc, addDoc} from "@firebase/firestore";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
import { firebase } from "@firebase/app";
import "firebase/firestore";
import medicineImage from '../../assets/medicine.png';
import inhalerImage from '../../assets/inhaler.png';
import syrupImage from '../../assets/syrup.png';
import injectionImage from '../../assets/injection.png';
import insulinImage from '../../assets/insuline.png';
import dropsImage from '../../assets/eye-dropper.png';
const PillReminderPage = ({route}) => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [medicineData, setMedicineData] = useState([]);

  useEffect(() => {
    const fetchMedicineData = async () => {
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (user) {
                const q = query(collection(FIREBASE_DB, 'medReminder'), where('createdBy', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const data = [];

                querySnapshot.forEach(doc => {
                    const { startDate, duration, selectedDays } = doc.data();
                    const startDateTime = new Date(startDate).getTime();
                    const endDateTime = startDateTime + duration * 24 * 60 * 60 * 1000; // Calculate end date based on start date and duration

                    if (startDateTime <= currentDate.getTime() && currentDate.getTime() <= endDateTime && Array.isArray(selectedDays) && selectedDays.includes(daysOfWeek[selectedDay])) {
                        data.push({ id: doc.id, ...doc.data() });
                    }
                });

                setMedicineData(data);
            }
        } catch (error) {
            console.error('Error fetching medicine data: ', error);
        }
    };

    fetchMedicineData();
}, [isFocused, selectedDay]);
  

  const filteredMedicineData = medicineData.filter(item =>
    item.selectedDays.includes(daysOfWeek[selectedDay])
  );
  const renderDaySelector = () => (
    <View style={styles.daySelector}>
      {daysOfWeek.map((day, index) => (
        <TouchableOpacity activeOpacity={0.4}
          key={index}
          style={[styles.dayButton, selectedDay === index && styles.selectedDay]}
          onPress={() => {
            setSelectedDay(index);
            setCurrentDate((prevDate) => {
              const newDate = new Date(prevDate);
              newDate.setDate(newDate.getDate() + index - selectedDay);
              return newDate;
            });
          }}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const isFocused = useIsFocused();
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;
    const dynamicPaddingTop = deviceHeight * 0.01;
    const dynamicWidth = deviceWidth * 0.87;
    const dynamicWidth1 = deviceWidth * 0.93;
    const dynamicPaddingTop1 = deviceHeight * 0.65;
    const dynamicPaddingLeft = deviceWidth * 0.001;
    const dynamicPaddingLeft1 = deviceWidth * 0.77;
    const dynamicPaddingLeft2 = deviceWidth * 0.66;
    const dynamicPaddingLeft3 = deviceWidth * 0.235;
  const navigation = useNavigation();


  const toggleMedicineTaken = (id) => {
    setMedicineData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, taken: !item.taken } : item
      )
    );
  };

  
  const renderMedicineItem = ({ item }) => {
    let typeImage;
  switch (item.type) {
    case 'Tablet':
      typeImage = require('../../assets/medicine.png');
      break;
    case 'Inhaler':
      typeImage = require('../../assets/inhaler.png');
      break;
    case 'Syrup':
      typeImage = require('../../assets/syrup.png');
      break;
      case 'Injection':
      typeImage = require('../../assets/injection.png');
      break;
      case 'Insulin':
      typeImage = require('../../assets/insuline.png');
      break;
      case 'Drops':
      typeImage = require('../../assets/eye-dropper.png');
      break;
    default:
      typeImage = require('../../assets/medicine.png'); // Default image for unknown types
      break;
  }
  return (
    <TouchableOpacity
  activeOpacity={0.4}
  style={{
    top: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  }}
  onPress={() => navigation.navigate('MedDetail', { id: item.id })}
  
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image
      source={typeImage}
      style={{ width: 50, height: 50, borderRadius: 5, marginRight: 2, marginLeft: 0 }}
    />
    <View style={{ marginLeft: 16, flex: 1 }}>
      <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
      <Text>{item.type}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        activeOpacity={0.4}
        style={{
          padding: 8,
          borderRadius: 20,
          left:-30,
          backgroundColor: item.taken ? '#4C0B46' : '#D3D3D3',
        }}
        onPress={() => toggleMedicineTaken(item.id)}
      >
        <FontAwesome name="check" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.4}
        style={{
          left:-10,
        }}
        onPress={() => navigation.navigate('MedDetail', { id: item.id })}
      >
        <FontAwesome name="chevron-right" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  </View>
</TouchableOpacity>
  );
          }
          const renderEmptyListComponent = () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 30,
                height:280,
              }}
              
              // onPress={() => navigation.navigate('AddMed')}
            >
            {/* <Image
        style={[
          styles.pharmacistRafiki1Icon,
          { top: dynamicPaddingTop},
        ]}
        contentFit="cover"
        source={require("../../assets/noresult.png")}
      /> */}
              <View style={{ textAlign: 'center', fontSize: 16, top:0, fontWeight:"bold", backgroundColor:'white', width:270, height:80, borderRadius:15,}}>
                <Text style={{ textAlign: 'center', marginRight:15, marginLeft:15,fontSize: 16, top:13, fontWeight:"bold", padding:0,lineHeight:25}}>No medicine reminder found. Tap to add reminder</Text>
                <Ionicons name="arrow-down-circle-outline" size={24} color="purple" left={200} top={-10}/>
              </View>
            
            </TouchableOpacity>
          );


  return (
    <>
        <LinearGradient
      style={styles.reminder}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
    
        <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.4}>
              <Image
            style={[styles.onlineDoctorAmico1]}
            resizeMode="cover"
            source={require("../../assets/rem.png")}
          />
              </TouchableOpacity>
          {renderDaySelector()}
    
          <View style={styles.currentDayContainer}>
            <Text style={styles.currentDay}>{`${
              daysOfWeek[selectedDay]
            }, ${currentDate.toLocaleDateString()}`}</Text>
          </View>
    <View style={{ flex: 1, padding: 1, marginTop: 10 }}>
      {/* Top Section */}
      {/* Your logic to display days and dates here */}

      {/* Medicines List */}
      <FlatList
        data={medicineData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMedicineItem}
        ListEmptyComponent={renderEmptyListComponent}
      />
      <View style={[styles.topBar, styles.topBarPosition, { left: dynamicPaddingLeft }]}>
            <View style={styles.rectangle} />
            <View style={styles.title}>
              <Text style={[styles.findANear, styles.dentalTypo]}>
                Your Med Companion
              </Text>
            </View>
          </View>
          
      {/* Add More Button */}
      <TouchableOpacity activeOpacity={0.4}
        style={{
          position: 'absolute',
          bottom: 50,
          right: 1,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#4C0B46',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AddMed')}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
      
    </View>
    </View>
    
    </LinearGradient>
    <Navbar/>
    </>
  );
};
const styles = StyleSheet.create({
  iconPosition: {
    width:375,
    position: "absolute",
  },
  pharmacistRafiki1Icon: {
    top: 130,
    left: 80,
    width: 170,
    height: 170,
    position: "absolute",
    overflow: "hidden",
  },
  onlineDoctorAmico1: {
    top: -40,
    left: 40,
    width: 200,
    height: 160,
    position: "absolute",
    overflow: "hidden",
  },
  topBar: {
    height: 92,
    top: -280,
  },
  topBarPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  rectangle: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  title: {
    top: -3,
    left: 0,
    width: 345,
    height: 66,
    position: "absolute",
  },
  findANear: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 250,
    fontWeight: "700",
    color: Color.colorGray_200,
    top: -7,
    left:0,
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
    reminder: {
     flex: 1,
       height: 812,
       backgroundColor: "transparent",
       overflow: "hidden",
       width: "100%",
          },
    container: {
      flex: 1,
      padding: '5.5%',
      marginTop:'28%'
    },
    daySelector: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: '15%',
    },
    dayButton: {
      top:140,
      padding: '3%',
      borderRadius: 50,
      backgroundColor: COLORS.secondaryBlack,
    },
    selectedDay: {
      backgroundColor: COLORS.primary,
    },
    dayText: {
      textAlign: 'center',
      color:COLORS.white,
    },
    currentDayContainer: {
      marginBottom: '5%',
      top:110,
      marginBottom:90,
    },
    currentDay: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: '5%',
    },
    medicineList: {
      flex: 1,
      marginBottom: '15%',
    },
    medicineItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8%',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: '6%',
    },
  });
  
  
export default PillReminderPage;

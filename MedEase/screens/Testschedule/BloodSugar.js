import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image,item,  TouchableOpacity, Platform, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Carousel from 'react-native-snap-carousel';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection , getDocs, query, where, orderBy } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig'; // Import your Firebase DB instance
import { limit } from 'firebase/firestore';
import { getAuth, currentUser } from 'firebase/auth';
 import { LinearGradient } from "expo-linear-gradient";
import {
  FIREBASE_AUTH,
} from "../../firebaseConfig";
const BloodSugar = () => {
  const [sugarConcentration, setSugarConcentration] = useState('');
  const [measuredType, setMeasuredType] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [history, setHistory] = useState([]);
const fetchHistory = async () => {
  try {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
      throw new Error('User not authenticated.');
    }

    const userId = user.uid;

    const historyCollection = collection(FIREBASE_DB, 'BloodSugar');
    const q = query(
      historyCollection,
      orderBy('sugar_date', 'desc'),
      orderBy('sugar_time', 'desc'),
      limit(5),
      where('createdBy', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const fetchedHistory = [];

    querySnapshot.forEach((doc) => {
      fetchedHistory.push(doc.data());
    });

    setHistory(fetchedHistory);
  } catch (error) {
    console.error('Error fetching history: ', error);
  }
};



  useEffect(() => {
    fetchHistory();
  }, []);


  const renderHistoryItem = (item) => {
     if (!item) {
    return <Text>No History Available</Text>;
  }
  let boxColor = '';
  let headingColor = '';
  let headingText = '';
  
  if (item.sugar_measured_at === 'Fasting') {
    if (item.sugar_conc >= 70 && item.sugar_conc <= 100) {
      boxColor = 'green';
      headingColor = 'green';
      headingText = 'Normal';
    } else if (item.sugar_conc > 100 && item.sugar_conc <= 130) {
      boxColor = 'orange';
      headingColor = 'orange';
      headingText = 'Moderately High';
    } else if (item.sugar_conc > 130){
      boxColor = 'red';
      headingColor = 'red';
      headingText = 'Very High';
    }
  } else if (item.sugar_measured_at === 'Random') {
    if (item.sugar_conc >= 100 && item.sugar_conc <= 150) {
      boxColor = 'green';
      headingColor = 'green';
      headingText = 'Normal';
    } else if (item.sugar_conc > 150 && item.sugar_conc <= 180) {
      boxColor = 'orange';
      headingColor = 'orange';
      headingText = 'Moderately High';
    } else if (item.sugar_conc > 180) {
      boxColor = 'red';
      headingColor = 'red';
      headingText = 'Very High';
    }
  }// Convert sugar_date to Date object or display "N/A" if invalid
const sugarDate = item.sugar_date ? new Date(item.sugar_date) : "N/A";
// Convert sugar_time to Date object or display "N/A" if invalid
const sugarTime = item.sugar_time ? new Date(`1970-01-01T${item.sugar_time}`) : "N/A";

    return (
    <View style={{ flexDirection: 'row', borderColor: boxColor, borderWidth: 1, borderRadius: 5, marginBottom: 10, }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
        <Image source={require('../../assets/sugarlogo.jpg')} style={{ width: 80, height: 80, borderRadius: 100 }} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
        <Text style={{ color: headingColor, fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{headingText}</Text>
        <Text>{`Measured at: ${item.sugar_measured_at}`}</Text>
        <Text>{`Date: ${sugarDate.toDateString()}`}</Text>
      <Text>{`Time: ${sugarTime.toLocaleTimeString()}`}</Text>
        <Text>{`Concentration: ${item.sugar_conc} mg/dl`}</Text>
      </View>
    </View>
  );
};

  const saveBloodSugarRecord = async () => {
   
    try {
      const user = FIREBASE_AUTH.currentUser; // Get the current user
      if (!user) {
        throw new Error('User not authenticated.');
      }
  
      const userId = user.uid; // Get the user ID
        // Create the blood sugar record associated with the user
        const bloodSugarRecord = {
          sugar_conc: sugarConcentration,
          sugar_measured_at: measuredType,
          sugar_date: date,
          sugar_time: time,
        createdBy: userId, // Include the user ID in the document
        };

        // Save the blood sugar record
        await addDoc(collection(FIREBASE_DB, 'BloodSugar'), bloodSugarRecord);
        console.log('Blood sugar record saved successfully!');
      } catch (error) {
        console.error('Error saving blood sugar record: ', error);
      }
    
};
  
    const bloodSugarData = [
  { imageUri: require('../../assets/sugarslider1.jpg') },
  { imageUri: require('../../assets/sugarslider2.png') },
  { imageUri: require('../../assets/sugarslider3.png') },
  // Add more images as needed
];

 const renderItem = ({ item, index }) => {
  return (
    <View style={{ width: 600, height: 200 , paddingRight:250}}>
      <Image
        source={item.imageUri}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
        
      />
    </View>
  );
};

    return (
        <ScrollView >
             <LinearGradient
  style={{ flex: 1, paddingTop: 10 ,paddingBottom: 20 }}
  locations={[0, 0.3, 8.5, 1]}
  colors={[
    'rgba(252, 252, 252, 0)',
    'rgba(231, 205, 230, 0.2)',
    'rgba(172, 86, 188, 0.5)',
    '#a2429e',
  ]}
>
      <View >
        <Text style={{ color: '#4C0B46', fontSize: 24, marginTop: 20 , padding:20}}>Blood Sugar</Text>
        <Carousel
          data={bloodSugarData}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={400}
          autoplay={true}
          autoplayInterval={3000} // Change image every 3 seconds
          loop={true} // Restart sequence when it reaches the end
        />
                        <View  style={{padding:20}}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Add your readings</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1 }}>Sugar Concentration</Text>
                                <TextInput
                                    style={{ flex: 2, borderBottomWidth: 1 }}
                                    value={sugarConcentration}
                                    onChangeText={setSugarConcentration}
                                    placeholder="Enter concentration (mmOI/L)"
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1 }}>Measured</Text>
                                <Picker
                                    style={{ flex: 2 }}
                                    selectedValue={measuredType}
                                    onValueChange={(itemValue) => setMeasuredType(itemValue)}
                                >
                                    <Picker.Item label="Fasting" value="Fasting" />
                                    <Picker.Item label="Random" value="Random" />
                                </Picker>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1 }}>Date & Time</Text>
                                <TouchableOpacity
                                    style={{ flex: 2, borderBottomWidth: 1 }}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Text>{date.toDateString()}</Text>
                                </TouchableOpacity>
                                {Platform.OS === 'ios' && showDatePicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="inline"
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);
                                            if (selectedDate) setDate(selectedDate);
                                        }}
                                    />
                                )}
                                {Platform.OS === 'android' && showDatePicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);
                                            if (selectedDate) setDate(selectedDate);
                                        }}
                                    />
                                )}
                                <TouchableOpacity
                                    style={{ flex: 1, borderBottomWidth: 1 }}
                                    onPress={() => setShowTimePicker(true)}
                                >
                                    <Text>{time.toLocaleTimeString()}</Text>
                                </TouchableOpacity>
                                {Platform.OS === 'ios' && showTimePicker && (
                                    <DateTimePicker
                                        value={time}
                                        mode="time"
                                        display="inline"
                                        onChange={(event, selectedTime) => {
                                            setShowTimePicker(false);
                                            if (selectedTime) setTime(selectedTime);
                                        }}
                                    />
                                )}
                                {Platform.OS === 'android' && showTimePicker && (
                                    <DateTimePicker
                                        value={time}
                                        mode="time"
                                        onChange={(event, selectedTime) => {
                                            setShowTimePicker(false);
                                            if (selectedTime) setTime(selectedTime);
                                        }}
                                    />
                                )}
                            </View>
                            <TouchableOpacity
                                style={{ backgroundColor: '#4C0B46', padding: 10, borderRadius: 5, alignItems: 'center' }}
                                onPress={saveBloodSugarRecord}
                            >
                                <Text style={{ color: 'white', fontSize: 16 }}>Save Record</Text>
                            </TouchableOpacity>
                          
                    </View>
                     <View>
          <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10,padding:20 }}>Recent History</Text>
          {history.map((item, index) => (
            renderHistoryItem(item)
          ))}
            </View>
             <View style={{ width: '100%', height: 250,resizeMode: 'contain' }}>
      <Image
        source={require("../../assets/sugarchart.png")}
        style={{ width: '100%', height: '100%' , resizeMode: 'contain'}}
        resizeMode="cover"
      />
    </View>
                </View>
                </LinearGradient>
            </ScrollView>
  );
};

export default BloodSugar;

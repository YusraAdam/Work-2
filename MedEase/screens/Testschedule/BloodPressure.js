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
const BloodPressure = () => {
    const [systolic, setSystolic] = useState('');
      const [diastolic, setDiastolic] = useState('');
  const [heartrate, setHeartrate] = useState('');
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

    const historyCollection = collection(FIREBASE_DB, 'BloodPressure');
    const q = query(
      historyCollection,
      where('createdBy', '==', userId), // Filter documents by createdBy field
      orderBy('bp_date', 'desc'),
      orderBy('bp_time', 'desc'),
      limit(5)
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
       
        let boxColor = '';
        let headingColor = '';
        let headingText = '';
  
        if (item.bp_systolic <= 120 && item.bp_diastolic <= 80) {
            boxColor = 'green';
            headingColor = 'green';
            headingText = 'Normal Blood Pressure';
        } else if (item.bp_systolic > 120 && item.bp_systolic <= 129 && item.bp_diastolic <= 80) {
            boxColor = 'yellow';
            headingColor = 'yellow';
            headingText = 'Elevated Blood Pressure';
        } else if (item.bp_systolic >= 130 && item.bp_systolic <= 139 && item.bp_diastolic > 80 && item.bp_diastolic <= 89) {
            boxColor = 'orange';
            headingColor = 'orange';
            headingText = 'Stage 1 HypreTension';
        }
        else if (item.bp_systolic >= 140 && item.bp_systolic <= 179 && item.bp_diastolic >= 90 && item.bp_diastolic <= 119) {
            boxColor = 'red';
            headingColor = 'red';
            headingText = 'Stage 2 HypreTension';
        } else if (item.bp_systolic >= 180 && item.bp_diastolic >= 120) {
            boxColor = 'darkred';
            headingColor = 'darkred';
            headingText = 'HypreTensive Crisis';
        }
    
  
  // Convert sugar_date to Date object or display "N/A" if invalid
const bpDate = item.bp_date ? new Date(item.bp_date) : "N/A";
// Convert sugar_time to Date object or display "N/A" if invalid
const bpTime = item.bp_time ? new Date(`1970-01-01T${item.bp_time}`) : "N/A";

    return (
    <View style={{ flexDirection: 'row', borderColor: boxColor, borderWidth: 1, borderRadius: 5, marginBottom: 10, }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: 100 }}>
                <Text>{`${item.bp_systolic}`}</Text>
                <Text>{`${item.bp_diastolic}`}</Text>
                 <Text>{`mm Hg`}</Text>
            </View>
            
            {/* Vertical purple line */}
            <View style={{ width: 2, backgroundColor: '#4C0B46' }} />
      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
        <Text style={{ color: headingColor, fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{headingText}</Text>
        <Text>{`Pulse: ${item.bp_heart_rate}`}</Text>
        <Text>{`Date: ${bpDate.toDateString()}`}</Text>
      <Text>{`Time: ${bpTime.toLocaleTimeString()}`}</Text>
      </View>
    </View>
  );
};

  const saveBPRecord = async () => {
   
    try {
      const user = FIREBASE_AUTH.currentUser; // Get the current user
      if (!user) {
        throw new Error('User not authenticated.');
      }
  
      const userId = user.uid; // Get the user ID
        // Create the blood sugar record associated with the user
        const bpRecord = {
            bp_systolic: systolic,
            bp_diastolic: diastolic,
                      bp_heart_rate: heartrate,
          bp_date: date,
          bp_time: time,
        createdBy: userId, // Include the user ID in the document
        };

        // Save the blood sugar record
        await addDoc(collection(FIREBASE_DB, 'BloodPressure'), bpRecord);
        console.log('Blood pressure record saved successfully!');
      } catch (error) {
        console.error('Error saving bp record: ', error);
      }
    
};
  
    const bpData = [
  { imageUri: require('../../assets/bpslider1.png') },
  { imageUri: require('../../assets/bpslider2.png') },
        { imageUri: require('../../assets/bpslider3.png') },
    { imageUri: require('../../assets/bpslider4.png') },

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
        <Text style={{ color: '#4C0B46', fontSize: 24, marginTop: 20 , padding:20}}>Blood Pressure</Text>
        <Carousel
          data={bpData}
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
                                <Text style={{ flex: 1 }}>Systolic</Text>
                                <TextInput
                                    style={{ flex: 2, borderBottomWidth: 1 }}
                                    value={systolic}
                                    onChangeText={setSystolic}
                                    placeholder="Enter Systolic Value (mm Hg)"
                            />
                            
                        </View>
                         <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1 }}>Diastolic</Text>
                                <TextInput
                                    style={{ flex: 2, borderBottomWidth: 1 }}
                                    value={diastolic}
                                    onChangeText={setDiastolic}
                                    placeholder="Enter Diastolic Value (mm Hg)"
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={{ flex: 1 }}>HeartRate</Text>
                            <TextInput
                                    style={{ flex: 2, borderBottomWidth: 1 }}
                                    value={heartrate}
                                    onChangeText={setHeartrate}
                                    placeholder="Enter Heartrate (bpm)"
                                />
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
                                onPress={saveBPRecord}
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
             <View style={{ width: '100%', height: 290,resizeMode: 'contain' }}>
      <Image
        source={require("../../assets/bpcategory.png")}
        style={{ width: '100%', height: '100%' , resizeMode: 'contain'}}
        resizeMode="cover"
      />
    </View>
                </View>
                </LinearGradient>
            </ScrollView>
  );
};

export default BloodPressure;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import Navbar from './../navbar-footer/Navbar';
import { LinearGradient } from 'expo-linear-gradient'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import { Color, Border, FontSize, FontFamily, Padding } from "./../../GlobalStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
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
const AddMed = () => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [pillType, setPillType] = useState('tablet');
  const [reminderTime, setReminderTime] = useState('');
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [duration, setDuration] = useState('');
  const [quantity, setQuantity] = useState(''); // Add state for quantity
  const route = useRoute();
  const navigation = useNavigation();
  const [reminderTimes, setReminderTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isReminderAlarmOn, setIsReminderAlarmOn] = useState(false);
  const [isMedicineFinishAlarmOn, setIsMedicineFinishAlarmOn] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [stock, setStock] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  // Define the options for days of the week
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDaySelection = (day) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((selectedDay) => selectedDay !== day)
      : [...selectedDays, day];
    setSelectedDays(newSelectedDays);
  };

  // Function to render day selection buttons
  const renderDaySelectionButtons = () => {
    return daysOfWeek.map((day, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.dayButton, selectedDays.includes(day) && styles.selectedDayButton]}
        onPress={() => toggleDaySelection(day)}
      >
       <Text
              style={[
                styles.dayButtonText,
                selectedDays.includes(day) && styles.selectedDayButtonText,
              ]}
            >
              {day.charAt(0)}
            </Text>
      </TouchableOpacity>
    ));
  };
  const pillTypeOptions = [
    { label: 'Tablet', value: 'Tablet' },
    { label: 'Syrup', value: 'Syrup' },
    { label: 'Injection', value: 'Injection' },
    { label: 'Insulin', value: 'Insulin' },
    { label: 'Drops', value: 'Drops' },
    { label: 'Inhaler', value: 'Inhaler' },
  ];
  const validateInputs = () => {
    if (!medicineName) {
      alert('Medicine Name is required.');
      return false;
    }

    if (selectedTimes.length === 0) {
      alert('Please add at least one reminder time.');
      return false;
    }

    if (!duration) {
      alert('Duration is required.');
      return false;
    }

    if (!quantity) {
      alert('Quantity is required.');
      return false;
    }

    return true;
  };
  const addReminderTime = (newTime) => {
    setReminderTimes((prevTimes) => [...prevTimes, newTime]);
    setSelectedTimes((prevSelectedTimes) => [...prevSelectedTimes, newTime]);
  };
  // const saveReminder = () => {
  //   const medicine = {
  //     id: Math.random(),
  //     name: medicineName,
  //     type:medicineType,
  //     taken: false,
  //   };
  //   // Get the existing medicine data from the route
  //   const existingMedicineData = route.params?.medicineData || [];
  //   // Update the medicine data with the new medicine
  //   const updatedMedicineData = [...existingMedicineData, medicine];
  //   // Navigate to the "PillReminderPage" with updated medicine data
  //   navigation.navigate('Reminder', { medicineData: updatedMedicineData });
  // };
  const showTimePicker = () => {
    setTimePickerVisible(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };
  const handleTimeConfirm = (time) => {
    // Handle the selected time
    addReminderTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    hideTimePicker();
  };
  const removeReminderTime = (index) => {
    const newReminderTimes = [...reminderTimes];
    newReminderTimes.splice(index, 1); // Remove the time at the specified index
    setReminderTimes(newReminderTimes); // Update the reminder times state
    setSelectedTimes(newReminderTimes); // Update the selected times state
  };
  
  const renderSelectedTimes = () => {
    return (
      <View style={styles.selectedTimesContainer}>
        {selectedTimes.map((time, index) => (
          <View key={index} style={styles.selectedTimeBox}>
            <Text style={styles.selectedTimeText}>{time}</Text>
            <TouchableOpacity onPress={() => removeReminderTime(index)} style={styles.removeButton}>
              <Ionicons name="close-circle" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };
  // Function to get the current date in the required format
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    return formattedDate;
  };
  const saveReminder = async () => {
    // if (!validateInputs()) {
    //   return;
    // }
  
    try {
      const user = FIREBASE_AUTH.currentUser; // Get the current user
      if (!user) {
        throw new Error('User not authenticated.');
      }
  
      const userId = user.uid; // Get the user ID
  
      const medicineData = {
        name: medicineName,
        type: medicineType,
        reminderTimes: selectedTimes,
        selectedDays,
        isMedicineFinishAlarmOn,
        duration: parseInt(duration), // Parse string to integer
        quantity: parseInt(quantity), // Parse string to integer
        createdBy: userId, // Include the user ID in the document
        availableStock: parseInt(stock),
        startDate: getCurrentDate(),
      };
  
      // Add the medicine data to Firestore
      const docRef = await addDoc(collection(FIREBASE_DB, 'medReminder'), medicineData);
      // console.log('Medicine reminder added with ID: ', docRef.id);
      // console.log('Medicine reminder added of user with ID: ', userId);
  
      // Navigate to the "PillReminderPage"
      navigation.navigate('Reminder', { startDate: medicineData.startDate, duration: medicineData.duration });
    } catch (error) {
      console.error('Error adding medicine reminder: ', error);
    }
  };
  return (
    <>
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
        <LinearGradient
      style={styles.addmed}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
    <View style={styles.container}>
    <View style={[styles.topBar, styles.topBarPosition]}>
            <View style={styles.rectangle} />
            <View style={styles.title}>
              <Text style={[styles.findANear, styles.dentalTypo]}>
                Add Medicine Reminder
              </Text>
            </View>
          </View>
                <Text style={styles.label}>Medicine Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#a0a8b0"
                  value={medicineName}
                  onChangeText={(text) => setMedicineName(text)}
                  placeholder=""
                />
                
                <View style={styles.labelContainer}>
            <Text style={styles.label1}>Pill Type:</Text>
            <SelectDropdown
  data={pillTypeOptions.map((option) => option.label)}
  onSelect={(selectedItem, index) => {
    const selectedType = pillTypeOptions[index].value;
    setMedicineType(selectedType);
    setPillType(selectedType); // Update the pillType state as well
  }}
  buttonTextAfterSelection={(selectedItem, index) => pillTypeOptions[index].label}
  rowTextForSelection={(item, index) => pillTypeOptions[index].label}
  buttonStyle={styles.dropdownButton}
  dropdownStyle={styles.dropdown}
  rowStyle={styles.dropdownRow}
  containerStyle={styles.dropdownContainer}
/>
          </View>

          <TouchableOpacity onPress={showTimePicker}>
              <View style={styles.addTimeContainer}>
                
                <Text style={styles.addTimeLabel}>Add Reminder Time </Text>
                <Ionicons name="ios-notifications" size={30} color="purple" />
              </View>
            </TouchableOpacity>

            {renderSelectedTimes()}

            

      
      {/* TimePicker modal */}
      <DateTimePickerModal style={styles.timePicker}
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

{/* <View style={styles.switchContainer}>
        <Text style={styles.label2}>Reminder Alarm:</Text>
        <Switch
          value={isReminderAlarmOn}
          onValueChange={() => setIsReminderAlarmOn(!isReminderAlarmOn)}
          thumbColor={isReminderAlarmOn ? 'purple' : '#f4f3f4'}  // Purple when on, default color when off
          trackColor={{ false: 'white', true: '#a2429e' }} // Change track color if needed
        />
      </View> */}
      
      <Text style={styles.label}>Select Days:</Text>
            <View style={styles.daySelectionContainer}>
              {renderDaySelectionButtons()}
            </View>
      {/* <View style={styles.labelContainer}>
          <Text style={styles.label1}>Frequency:</Text>
          <SelectDropdown
              data={['Daily', 'Weekly']}
              onSelect={(selectedItem, index) => setFrequency(selectedItem.toLowerCase())}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              rowTextForSelection={(item, index) => item}
              buttonStyle={styles.dropdownButton1}
              dropdownStyle={styles.dropdown}
              rowStyle={styles.dropdownRow}
              containerStyle={styles.dropdownContainer}
            />
            </View> */}


          <Text style={styles.label}>Duration (days):</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#a0a8b0"
            value={duration}
            onChangeText={(text) => setDuration(text)}
            placeholder=""
            keyboardType="numeric"
          />

          {pillType === 'Tablet' && (
            <>
              <Text style={styles.label}>Quantity (per dose):</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#a0a8b0"
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                placeholder=""
                keyboardType="numeric"
              />
            </>
          )}
          {pillType === 'Tablet' && (
            <>
          <Text style={styles.label}>Available Stock:</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#a0a8b0"
            value={stock}
            onChangeText={(text) => setStock(text)}
            placeholder=""
            keyboardType="numeric"
          />
          </>
          )}
          {pillType === 'Tablet' && (
            <>
          <View style={styles.switchContainer}>
        <Text style={styles.label2}>Medicine Finish Alarm:</Text>
        <Switch
          value={isMedicineFinishAlarmOn}
          onValueChange={() => setIsMedicineFinishAlarmOn(!isMedicineFinishAlarmOn)}
          thumbColor={isMedicineFinishAlarmOn ? 'purple' : '#f4f3f4'}  // Purple when on, default color when off
          trackColor={{ false: 'white', true: '#a2429e' }} // Change track color if needed
        />
      </View>
      </>
          )}
      <TouchableOpacity style={styles.button} onPress={saveReminder}>
        <Text style={styles.buttonText}>Add Reminder</Text>
      </TouchableOpacity>
    </View>
</LinearGradient>
</KeyboardAwareScrollView>
    <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
  removeButton: {
    position: 'absolute',
    top: -18,
    right: -17,
    padding: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20, // Add some bottom margin to create space between switches
  },
  button: {
    height: 50, // Adjusted button height for better visibility and touchability
    width: '80%', // Adjusted width to make the button wider
    borderRadius: 10,
    backgroundColor: '#a2429e', // Adjusted button color
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Add some top margin to create space between button and other elements
  },
  daySelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: -33,
    marginBottom: 40,
    left:50,
  },
  dayButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 28.5,
    height: 28.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  selectedDayButton: {
    backgroundColor: Color.colorPurple,
  },
  selectedDayButtonText: {
    color: 'white',
  },
  dayButtonText: {
    fontSize: 13,
  },
  timePicker:{
    color:"purple",
    
  },
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:-15,
  },
  addTimeLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black', // You can adjust the color
    fontWeight:"bold",
  },
  labelContainer: {
    top:-15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdownButton: {
    left:-50,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor:"transparent",
    borderRadius:10,
    borderWidth:2,
  },
  dropdownButton1: {
    left:-35,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor:"transparent",
    borderRadius:10,
    borderWidth:2,
  },
  dropdown: {
    marginTop:-38,
    width:183,
    backgroundColor: 'white',
    borderColor:"transparent",
    borderRadius:15,
    borderWidth:2,
  },
  dropdownRow: {
    padding: 10,
  },
  selectedTimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  selectedTimeBox: {
    backgroundColor: Color.colorPurple,
    borderRadius: 5,
    padding: 8,
    left:5,
    marginRight: 5,
    marginBottom: 10,
  },
  selectedTimeText: {
    color: '#fff',
  },
  topBar: {
    height: 92,
    top: 0, // Adjusted the top property to 0
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
    top: 40, // Adjusted the top property to 20
    left: 10,
    width: 345,
    height: 66,
    position: "absolute",
  },
  findANear: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 350,
    fontWeight: "700",
    color: Color.colorGray_200,
    top: 18,
    left:10,
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  addmed: {
    flex: 1,
      height: 812,
      backgroundColor: "transparent",
      overflow: "hidden",
      width: "100%",
         },
  container: {
    
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    left:-100,
    fontSize: 16,
    fontWeight:"bold",
    marginBottom: 5,
    width: 120,
  },
  label1: {
    left:-10,
    fontSize: 16,
    fontWeight:"bold",
    marginBottom: 5,
    width: 120,
  },
  label2: {
    left:0,
    fontSize: 16,
    fontWeight:"bold",
    marginBottom: 5,
    width: 190,
  },
  input: {
    borderBottomWidth: 3,
  borderBottomColor: Color.colorPurple,
  paddingBottom: 0,
    paddingHorizontal: 10,
    borderRadius: Border.br_5xl,
    fontSize: FontSize.size_base,
    flexDirection: "row",
    paddingVertical: Padding.p_xs_7,
    top:-43,
    left:50,
    height: 35,
    borderWidth: 0,
    fontFamily: FontFamily.interRegular,
    width: 180,
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalItem: {
    fontSize: 18,
    padding: 10,
    color: 'white',
  },
  switchContainer: {
    top:-10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    height: "6.16%",
    width: "69.33%",
    top: -0,
    right: "15.2%",
    bottom: "36.58%",
    left: "0.47%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    alignItems: "center",
  },
  buttonText: {
    top:10,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AddMed;

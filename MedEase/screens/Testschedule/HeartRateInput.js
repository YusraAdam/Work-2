// HeartRateInput.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";
//import { searchText } from 'react-native';
import Navbar from './../navbar-footer/Navbar';
const HeartRateInput = ({ navigation }) => {
  const [heartRate, setHeartRate] = useState('');

  const handleSaveHeartRate = () => {
    // Implement logic to save the heart rate and navigate back to the main page
    // You can use navigation.goBack() or any other navigation method based on your app's navigation structure
   
  // Navigate to the DisplayTest page and pass the heartRate state as a parameter
  navigation.navigate('DisplayTest', { heartRate });
  };

  return (
    <>
     <LinearGradient
      style={styles.pharmacyHomepage}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
    <View style={styles.container}>
      <Text style={styles.heading}>Please Enter Your Heart Rate</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter your heart rate"
        value={heartRate}
        onChangeText={(text) => setHeartRate(text)}
      />
      <View style={styles.unitContainer}>
        <Text style={styles.unitText}>BPM</Text>
      </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveHeartRate}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <Image
        source={require('../../assets/heart.png')} // Replace with your actual image source
        style={styles.image}
      />

    </View>
    </LinearGradient>
<Navbar/>
</>
  );
};

const styles = StyleSheet.create({
    pharmacyHomepage: {
      flex: 1,
      height: 812,
      backgroundColor: "transparent",
      overflow: "hidden",
      width: "100%",
    },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 21,
    marginBottom: 22,
    textAlign: 'center',
    fontWeight:'bold',
  },
  input: {
    height: 40,
    width:250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    left:10,
  },
  unitContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
    left:25,
  },
  unitText: {
    fontSize: 20,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    top:70,
  },
  saveButton: {
    backgroundColor: '#8A3887',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HeartRateInput;


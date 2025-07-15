
// Import necessary components and modules from React Native
import * as React from "react";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Color, FontSize, FontFamily, Border } from "../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from './../navbar-footer/Navbar';
import { FontAwesome } from '@expo/vector-icons';
// Define the scrollable module page
const ManageTest = ({ route }) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.83;
  const dynamicWidth = deviceWidth * 0.16;
  const dynamicWidth1 = deviceWidth * 0.93;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.001;
  const dynamicPaddingLeft1 = deviceWidth * 0.77;
  const dynamicPaddingLeft2 = deviceWidth * 0.66;
  const dynamicPaddingLeft3 = deviceWidth * 0.235;
  const dynamicHeight = deviceHeight *0.08;
  const navigation = useNavigation();
    const { moduleName } = route.params;
  
    // Dummy content for the scrollable page
    const dummyContent = Array.from({ length: 5 }).map((_, index) => (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', top: 45, marginBottom: 25, left: 0 }}>
        {/* Circular circle */}
        <TouchableOpacity
          activeOpacity={0.4}
          style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', marginRight: 10, justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Grey line in the center */}
          <View style={{ height: 2, width: '50%', backgroundColor: 'grey', position: 'absolute', top: '50%' }} />

          {/* Number above the line */}
          <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', position: 'absolute', top: '17%' }}>
            123
          </Text>

          {/* Number below the line */}
          <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', position: 'absolute', bottom: '17%' }}>
            84
          </Text>
        </TouchableOpacity>
    
        <View>
          <Text style={{ fontSize: 17, top:-5, fontWeight:"bold" }}>
            Normal
          </Text>
          <Text style={{ top:-3, fontSize: 14, color: Color.colorPurple, fontWeight: 'bold' }}>
            Today, 10:24 p.m | Pulse: 80 bpm
          </Text>
        </View>
      </View>
    ));
    return (
      <>
      <ScrollView>
      <LinearGradient
      style={styles.availabilityscreen}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
    <View style={[styles.topBar, styles.topBarPosition, { left: dynamicPaddingLeft }]}>
            <View style={styles.rectangle} />
            <View style={styles.title}>
            <Text style={[styles.findANear, styles.dentalTypo]}>Monitor Your {moduleName}</Text>
        {dummyContent}
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.4}
        style={[styles.button, {top:dynamicPaddingTop, left:dynamicPaddingLeft1, height: dynamicHeight, width: dynamicWidth}]}
        onPress={() => navigation.navigate('AddTestBP')}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>

          {/* <View style={[styles.bottomBox, {height: dynamicHeight}]}>
        <BottomTabs />
      </View> */}

        </LinearGradient>
      </ScrollView>
      <Navbar/>
      </>
    );
  };
  const styles = StyleSheet.create({
    button:{
          left:270,
          position: 'absolute',
          bottom: 50,
          right: 1,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#4C0B46',
          justifyContent: 'center',
          alignItems: 'center',
    },
    availabilityscreen: {
      flex: 1,
      height: 812,
      backgroundColor: "transparent",
      overflow: "hidden",
      width: "100%",
    },
    topBar: {
      height: 92,
      top: 0,
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
      top: 68,
      left: 21,
      width: 345,
      height: 66,
      position: "absolute",
    },
    findANear: {
      fontSize: 21,
      lineHeight: 32,
      width: 350,
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
  });
  export default ManageTest;
import * as React from "react";
import { useState,useEffect } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';

const BookedAppointment = () => {
    const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const route = useRoute();
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  useEffect(() => {
    const { searchText: routeSearchText } = route.params || {};
    setSearchText(routeSearchText || "");
  }, []);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 0.44;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.0;
  const dynamicPaddingLeft1 = deviceWidth * 0.045;
  const dynamicPaddingLeft2 = deviceWidth * 0.63;
  const dynamicPaddingLeft3 = deviceWidth * 0.195;
  // Assuming you have an array of doctors' information like this
  const doctorsData = [
    {
      name: "Dr. Ahmed Faisal",
      category: "Dentist",
      hospital: "Ziauddin Hospital",
      image: require("../../assets/avatar.png"),
    },
    {
      name: "Dr. Omer Khan",
      category: "Neurosurgeon",
      hospital: "South City Hospital",
      image: require("../../assets/avatar1.png"),
    },
    {
      name: "Dr. Rafat Nasir",
      category: "Skin",
      hospital: "Aga Khan Hospital",
      image: require("../../assets/avatar1.png"),
    },
    {
      name: "Dr. Areej Zia",
      category: "Urologist",
      hospital: "Patel Hospital",
      image: require("../../assets/avatar1.png"),
    },
    // Add more doctors as needed
  ];
  const renderBoxes = ({ item }) => (
    <View style={[styles.doctorItem1, styles.categoryItem, { marginBottom: 10, width:dynamicWidth }]}>
    
    <Image
                  style={[styles.avatarIcon, styles.avatarIconLayout]}
                  contentFit="cover"
                  source={item.image}
                />
    
      <Text style={[styles.doctorName1, styles.categoryText]}>{item.name}</Text>
      <Text style={[styles.doctorName2, styles.categoryText]}>{item.category}</Text>
      <Text style={[styles.doctorName3, styles.categoryText]}>{item.hospital}</Text>
      <TouchableOpacity activeOpacity={0.4}
                  style={[styles.button, styles.doctorFlexBox]}
                  onPress={navigateToAppointment}
                >
                  <Text style={[styles.bookAppointment, styles.myAppointmentsTypo]}>
                    Book appointment
                  </Text>
                </TouchableOpacity>
    </View>
  );
  const renderTwoRows = ({ item, index }) => {
    // Render every 1st, 3rd, 5th, ... indexed item in a new row
    if (index % 2 === 0) {
      return (
        <View key={index} style={styles.doctorRow}>
          {renderBoxes({ item })}
          {doctorsData[index + 1] && renderBoxes({ item: doctorsData[index + 1] })}
        </View>
      );
    }
  
    return null; // For even-indexed items
  };
  const navigateToAppointment = () => {
    // Open the URL in the device browser
    Linking.openURL('https://www.ziauddinhospital.com/make-an-appointment/');
  };
  return (
    <>
    <ScrollView >
    <LinearGradient
      style={styles.doctorsdisplay}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >

<View style={[styles.sectionContainer, {left:dynamicPaddingLeft1}]}>
            
            <FlatList
              data={doctorsData}
              horizontal
              renderItem={renderTwoRows}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={[styles.topBar, styles.topBarPosition, { left: dynamicPaddingLeft }]}>
            <View style={styles.rectangle} />
            <View style={styles.title}>
              <Text style={[styles.findANear, styles.dentalTypo]}>
              {searchText ? `Available ${searchText} Doctors` : ""}
              </Text>
            </View>
          </View>
    </LinearGradient>
    </ScrollView>
      <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
  doctorRow: {
  justifyContent: "space-between",
  marginBottom: 10, // Add marginBottom
  },
  topBar: {
    height: 92,
    top: 0,
    left:-10,
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
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 500,
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
  sectionTitle: {
    fontSize: FontSize.size_base,
    color: Color.colorGray_200,
    marginBottom: 10,
    fontFamily: FontFamily.interSemiBold,
  },
  sectionContainer: {
    top:120,
    left:15,
  },
  categoryText: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  doctorName1: {
    fontSize:15,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
    top:110,
  },
  doctorName2: {
    fontSize:12,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
    top:115,
  },
  doctorName3: {
    fontSize:12,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
    top:120,
  },
  categoryItem: {
    marginRight: 10,
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    padding: 10,
    borderRadius: 10,
  },
  doctorItem1: {
    height:250,
    marginRight: 10,
    width: 160,
    backgroundColor: Color.colorWhite,
    padding: 10,
    borderRadius: 10,
  },
  doctor: {
    // Adjust the width to fit the desired number of boxes on each row
    width: Dimensions.get("window").width / 2 - 20, // Assuming 20 is the desired margin
    flexDirection: "row",
    height: 258,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10, // Add vertical margin between rows
  },
  menuItem: {
    fontSize: FontSize.size_base,
    marginBottom: 10,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: Color.colorGray_100,
    padding: 20,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    left: 5,
    padding: 10,
  },
  menuIcon: {
    marginTop:60,
    width: 22,
    height: 20,
  },

  doctorFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
  ziauddinTypo: {
    height: 27,
    width: 132,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
  },
  avatarIconLayout: {
    height: 100,
    width: 100,
    top: 10,
    position: "absolute",
  },
  dentistTypo: {
    height: 22,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
  },
  noorTypo: {
    fontSize: FontSize.size_mini,
    height: 27,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  myAppointmentsTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  doctorLayout: {
    width: 170,
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    height: 258,
  },
  dentist1Position: {
    left: 11,
    textAlign: "left",
    position: "absolute",
  },
  findANearPosition: {
    color: Color.colorGray_200,
    top: 0,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    left: 0,
    position: "absolute",
  },
  dentistFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  navebarIcon: {
    top: 687,
    width: 375,
    height: 125,
    left: 0,
    position: "absolute",
  },
  ziauddinHospital: {
    top: 164,
    textAlign: "left",
    position: "absolute",
    left: 10,
  },
  avatarIcon: {
    left: 34,
  },
  dentist: {
    top: 137,
    width: 61,
    textAlign: "left",
    position: "absolute",
    left: 10,
  },
  drNoorJahan: {
    top: 108,
    width: 132,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    left: 10,
    position: "absolute",
  },
  bookAppointment: {
    lineHeight: 18,
    color: Color.colorWhite,
    textAlign: "center",
    width: 150,
    height: 20,
    fontSize: FontSize.size_xs,
    fontWeight: "600",
  },
  button: {
    height: "17.12%",
    width: "100.62%",
    top: "85.46%",
    right: "7.04%",
    bottom: "5.43%",
    left: "7.34%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    justifyContent: "center",
  },
  avatarIcon1: {
    left: 31,
  },
  drNoorJahan1: {
    top: 109,
    color: Color.colorDarkslategray_100,
    width: 123,
    fontSize: FontSize.size_mini,
    height: 27,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  dentist1: {
    top: 138,
    width: 67,
    height: 22,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
  },
  ziauddinHospital1: {
    top: 163,
    height: 27,
    width: 132,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
  },
  doctor2: {
    marginLeft: 16,
  },
  availableDoctors: {
    fontSize: FontSize.size_base,
  },
  topDoctor: {
    top: 120,
    width: 320,
    height: 292,
    left: 23,
    position: "absolute",
  },
  search: {
    top: 160,
    borderRadius: Border.br_5xl,
    backgroundColor: Color.colorGray_100,
    width: 327,
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_base,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    flexDirection: "row",
    left: 23,
    position: "absolute",
  },
  myAppointments: {
    top: 38,
    left: 265,
    fontStyle: "italic",
    color: Color.colorBlack,
    width: 127,
    height: 19,
    fontSize: 15,
    textAlign: "left",
    position: "absolute",
  },
  title: {
    top: 68,
    left: 21,
    width: 345,
    height: 66,
    position: "absolute",
  },
  uilcalenderIcon: {
    top: 64,
    left: 330,
    width: 35,
    height: 35,
    position: "absolute",
    overflow: "hidden",
  },
  icon: {
    height: "100%",
    borderRadius: Border.br_3xs,
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    width: "100%",
  },
  button2: {
    left: "0.27%",
    top: "80%",
    right: "89.07%",
    bottom: "-20%",
    width: "10.67%",
    height: "40%",
    position: "absolute",
  },

  doctorsdisplay: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default BookedAppointment;

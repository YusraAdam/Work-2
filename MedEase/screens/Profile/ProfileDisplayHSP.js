import * as React from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, FlatList } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontSize, FontFamily, Border } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";

const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.34;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicWidth1 = deviceWidth * 0.93;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.025;
  const dynamicPaddingLeft1 = deviceWidth * 0.04;
  const dynamicPaddingLeft2 = deviceWidth * 0.66;
  const dynamicPaddingLeft3 = deviceWidth * 0.01;
  dynamicHeight= deviceHeight*0.375;
  
  const BottomTabs = () => {
    const navigation = useNavigation();
  
    const handleTabPress = (screen) => {
      navigation.navigate(screen);
    };
    const handleLogout = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid; // Get the user ID
        await FIREBASE_AUTH.signOut(); // Sign out the user
        console.log(`User with ID ${userId} signed out successfully!`);
  
        // Redirect to HomeScreen2.js or any other screen after logout
        navigation.navigate("HomeScreen2");
      } catch (error) {
        console.error("Error signing out:", error.message);
      }
    };
  
    return (
      <View style={styles.bottomTabsContainer}>
      
      {/* <TouchableOpacity activeOpacity={0.4} style={styles.bottomTab} onPress={() => handleTabPress("MySavedScreen")}>
      <View style={styles.inARow}>
          <Text style={styles.bottomTabText}>Health Monitoring</Text>
          <Ionicons name="medical" size={27} color="purple" left={-203} top={0} />
          <Ionicons name="ios-arrow-forward" size={30} color="grey" left={35} top={-4}/>
          </View>
        </TouchableOpacity> */}
      
        {/* <TouchableOpacity  activeOpacity={0.4} style={styles.bottomTab} onPress={() => handleTabPress("Reminder")}>
        <View style={styles.inARow}>
          <Text style={styles.bottomTabText}>Medicine Intake</Text>
          <Ionicons name="ios-medkit" size={27} color="purple" left={-183} top={0}/>
          <Ionicons name="ios-arrow-forward" size={30} color="grey" left={55} top={-4}/>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity  activeOpacity={0.4} style={styles.bottomTab} onPress={() => handleTabPress("ChatPage")}>
        <View style={styles.inARow}>
          <Text style={styles.bottomTabText}>Chatbot</Text>
          <Ionicons name="ios-chatbubbles" size={27} color="purple" left={-120} top={0}/>
          <Ionicons name="ios-arrow-forward" size={30} color="grey" left={120} top={-4}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity  activeOpacity={0.4} style={styles.bottomTab} onPress={handleLogout}>
        <View style={styles.inARow}>
          <Text style={styles.bottomTabText}>Logout</Text>
          <Ionicons name="ios-log-out" size={27} color="purple" left={-105} top={0}/>
          <Ionicons name="ios-arrow-forward" size={30} color="grey" left={130} top={-4}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity  activeOpacity={0.4} style={styles.bottomTab} onPress={() => handleTabPress("ProfileSetupHSP")}>
        <View style={styles.inARow}>
          <Text style={styles.bottomTabText}>Edit Profile</Text>
          <Ionicons name="person" size={27} color="purple" left={-140} top={0}/>
          <Ionicons name="ios-arrow-forward" size={30} color="grey" left={95} top={-4}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
const ProfileDisplayHSP = () => {
  const navigation = useNavigation();
  const [hspInfo, setHspInfo] = useState(null);
  useEffect(() => {
    const fetchHspInfo = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid;

        // Fetch user information from Firestore
        const userDoc = await getDoc(doc(FIREBASE_DB, "hspInfo", userId));
        if (userDoc.exists) {
          const userData = userDoc.data();
          setHspInfo(userData);
        }
      } catch (error) {
        console.error("Error fetching user info:", error.message);
      }
    };

    fetchHspInfo();
  }, []);
  const info = [
    { name: "Gender", specialty: hspInfo?.gender || "" },
    { name: "Age", specialty: hspInfo?.age || "" },
    { name: "Speciality", specialty: hspInfo?.speciality || "" },
  ];
  const info1 = [
    { name: "Experience", specialty: hspInfo?.experience || "" },
    { name: "Hospital", specialty: hspInfo?.practice || "" },
  ];
  const renderInfo = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4}>
    <View style={[styles.doctorItem, styles.categoryItem]}>
    {item.name === "Gender" && <Ionicons name="ios-female" size={30} left={-10} color="purple" />}
        {item.name === "Age" && <Ionicons name="ios-calendar" size={30} left={-10} color="purple" />}
        {item.name === "Speciality" && <Ionicons name="fitness-outline" size={30} left={-10} color="purple" />}
        {item.name === "Experience" && <Ionicons name="ios-heart" size={30} color="purple" />}
        {item.name === "Hospital" && <Ionicons name="ios-hospital" size={30} color="purple" />}
      <Text style={[styles.doctorName, styles.categoryText]}>{item.name}</Text>
      <Text style={[styles.doctorSpecialty, styles.categoryText1]}>{item.specialty}</Text>
    </View>
    </TouchableOpacity>
  );
  const renderInfo1 = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4}>
    <View style={[styles.doctorItem1, styles.categoryItem1]}>
    {item.name === "Gender" && <Ionicons name="ios-female" size={30} color="purple" />}
        {item.name === "Age" && <Ionicons name="ios-calendar" size={30} color="purple" />}
        {item.name === "Speciality" && <Ionicons name="ios-barbell" size={30} color="purple" />}
        {item.name === "Experience" && <Ionicons name="star" size={30} color="purple" />}
        {item.name === "Hospital" && <Ionicons name="medkit-outline" size={30} color="purple" />}
      <Text style={[styles.doctorName, styles.categoryText2]}>{item.name}</Text>
      <Text style={[styles.doctorSpecialty, styles.categoryText3]}>{item.specialty}</Text>
    </View>
    </TouchableOpacity>
  );
  return (
    <LinearGradient
      style={styles.profile}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
<View style={[styles.bottomBox, {height: dynamicHeight}]}>
        <BottomTabs />
      </View>
      <View style={[styles.profile1]}>
        {/* Use userInfo?.name to safely access the name property */}
        <Text style={[styles.ameliaRenata, styles.bpmTypo, { left: dynamicPaddingLeft1 }]}>
          {hspInfo?.name || "User Name"}
        </Text>
        <TouchableOpacity activeOpacity={0.4}>
          <Image
            style={[styles.imageIcon, { left: dynamicPaddingLeft3 }]}
            contentFit="cover"
            source={{ uri: hspInfo?.profilePhoto }}
          />
        </TouchableOpacity>
      </View>
      {/* Info Section */}
      <View style={[styles.sectionContainer, {top:dynamicPaddingTop, left:dynamicPaddingLeft}]}>
            <FlatList
              data={info}
              horizontal
              renderItem={renderInfo}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false} 
            />
          </View>
          <View style={[styles.sectionContainer1, {top:dynamicPaddingTop}]}>
          <FlatList
              data={info1}
              horizontal
              renderItem={renderInfo1}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false} 
            />
            </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  doctorItem: {
    height:90,
    marginLeft: 8,
    width: 95,
    padding: 10,
    borderRadius: 10,
  },
  categoryItem: {
    left:20,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  doctorItem1: {
    height:90,
    width: 120,
    left:0,
    borderRadius: 10,
  },
  categoryItem1: {
    right:10,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  doctorName: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  categoryText: {
    top:2,
    left:-10,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  categoryText1: {
    top:3,
    left:-10,
    color: Color.colorPurple,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  categoryText2: {
    width:220,
    top:2,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  categoryText3: {
    width:900,
    top:3,
    color: Color.colorPurple,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  doctorSpecialty: {
    color: "Color.colorDarkgray_100",
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    fontSize:12,
  },
  sectionContainer: {
    top:240,
    marginBottom: 9,
  },
  sectionContainer1: {
    left:60,
    top:245,
    marginBottom: 9,
  },
  sectionTitle: {
    fontSize: FontSize.size_base,
    color: Color.colorGray_200,
    marginBottom: 8,
    fontFamily: FontFamily.interSemiBold,
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: Color.colorWhite,
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    paddingTop: 10,
  },
  bottomTabsContainer: {
    height:265,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  inARow:{
    flexDirection: "row",
  },
  bottomTab: {
    left:70,
    paddingVertical: 10,
  },
  bottomTabText: {
    fontSize: 18,
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  bgPosition: {
    width: 360,
    left: 0,
    position: "absolute",
  },
  contentLayout: {
    height: 2,
    width: 360,
    backgroundColor: Color.colorAzure,
    position: "absolute",
  },
  faqsLayout: {
    height: 44,
    position: "absolute",
  },
  mySaveIconLayout: {
    width: 44,
    height: 44,
    position: "absolute",
  },
  iconlylightLayout: {
    height: 25,
    position: "absolute",
  },
  logout1Layout: {
    height: 40,
    fontSize: FontSize.size_base,
  },
  bpmTypo: {
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  groupParentPosition: {
    width: 32,
    top: 0,
    position: "absolute",
  },
  parentLayout: {
    height: 34,
    top: 37,
  },
  textTypo: {
    top: 15,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  ageTypo: {
    fontSize: FontSize.size_3xs,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    top: 0,
    position: "absolute",
  },
  femaleParentLayout: {
    width: 56,
    height: 34,
    left: 0,
    position: "absolute",
  },
  lbsParentLayout: {
    width: 52,
    position: "absolute",
  },
  profileItemLayout: {
    width: 1,
    backgroundColor: Color.colorPurple,
    height: 44,
    position: "absolute",
  },
  text1Typo: {
    fontSize: FontSize.size_xs,
    top: 400,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  contactTypo: {
    height: 15,
    width: 62,
    fontSize: FontSize.size_3xs,
    color: Color.colorDarkslateblue,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  heartWithPulseLayout: {
    height: 39,
    width: 39,
    position: "absolute",
  },
  bg: {
    top: 490,
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    backgroundColor: Color.colorWhite,
    height: 246,
  },
  navebarIcon: {
    top: 684,
    height: 128,
  },
  contentChild: {
    height: 0,
    width: 346,
    backgroundColor: Color.colorAzure,
    left: 8,
    top: 0,
    position: "absolute",
  },
  contentItem: {
    top: 165,
    left: 8,
  },
  logoutChild: {
    top: 0,
    left: 0,
  },
  iconlylightOutlinearrowR: {
    left: 321,
    width: 25,
    height: 25,
    top: 10,
  },
  logout1: {
    left: 63,
    color: Color.colorTomato,
    width: 57,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    height: 20,
    top: 12,
    position: "absolute",
  },
  logout: {
    top: 179,
    left: 5,
    width: 346,
  },
  faqsChild: {
    width: 45,
    top: 0,
    left: 0,
  },
  iconlylightOutlinearrowR1: {
    left: 329,
    width: 25,
    height: 25,
    top: 10,
  },
  chatbot: {
    left: 65,
    width: 68,
    height: 20,
    fontSize: FontSize.size_base,
    top: 12,
    color: Color.colorDarkslateblue,
  },
  faqs: {
    top: 104,
    width: 354,
    left: 3,
  },
  iconlylightOutlinearrowR2: {
    left: 258,
    width: 25,
    height: 25,
    top: 0,
  },
  mySaved: {
    top: 3,
    width: 83,
    height: 20,
    fontSize: FontSize.size_base,
    left: 0,
  },
  payment: {
    top: 29,
    left: 74,
    width: 283,
  },
  mySaveIcon: {
    top: 19,
    left: 3,
  },
  contentInner: {
    top: 84,
    left: 0,
  },
  content: {
    top: 497,
    width: 357,
    height: 223,
    left: 7,
    position: "absolute",
  },
  text: {
    textAlign: "center",
    left: 3,
  },
  age: {
    textAlign: "center",
    width: 29,
    left: 0,
  },
  parent: {
    left: 1,
    width: 29,
    position: "absolute",
  },
  fireIcon: {
    top: -2,
    left: -123,
    width: 155,
    height: 36,
    position: "absolute",
  },
  groupParent: {
    left: 134,
    height: 71,
  },
  female: {
    textAlign: "left",
    left: 0,
  },
  gender: {
    textAlign: "left",
    left: 7,
  },
  femaleParent: {
    top: 0,
  },
  healthTrackingInner: {
    top: 37,
    width: 56,
  },
  weight: {
    textAlign: "left",
    left: 8,
  },
  lbsParent: {
    height: 34,
    top: 37,
    left: 0,
  },
  barbellIcon: {
    left: 10,
    height: 32,
  },
  groupContainer: {
    left: 238,
    height: 71,
    top: 0,
  },
  healthTrackingChild: {
    left: 93,
    top: 14,
    backgroundColor: Color.colorPurple,
  },
  healthTrackingItem: {
    left: 207,
    top: 14,
    backgroundColor: Color.colorPurple,
  },
  healthTracking: {
    top: 239,
    left: 42,
    width: 290,
    height: 71,
    position: "absolute",
  },
  profileChild: {
    top: 347,
    left: 250,
  },
  profileItem: {
    top: 354,
    left: 135,
  },
  bpm: {
    top: 398,
    left: 44,
    fontSize: FontSize.size_base,
    color: Color.colorDarkslateblue,
  },
  text1: {
    left: 142,
    textAlign: "left",
  },
  shahLatifTown: {
    left: 259,
    width: 97,
    height: 35,
    textAlign: "center",
  },
  ameliaRenata: {
    width: 200,
    top:110,
    fontSize: FontSize.size_lg,
    position: "absolute",
    textAlign: "center", // Center text horizontally
  },
  imageIcon: {
    left: 18,
    width: 115,
    height: 115,
    top: -30,
    position: "absolute",
    borderRadius:100,
  },
  profile1: {
    top: 90,
    left: 123,
    width: 125,
    height: 121,
    position: "absolute",
  },
  vectorIcon: {
    height: "3.08%",
    width: "8%",
    top: "41.87%",
    right: "45.87%",
    bottom: "55.05%",
    left: "46.13%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  heartRate: {
    left: 46,
    top: 383,
    width: 62,
  },
  location: {
    top: 381,
    left: 285,
  },
  contact: {
    left: 170,
    top: 383,
    width: 62,
  },
  placeMarkerIcon: {
    top: 335,
    left: 284,
  },
  heartWithPulse: {
    top: 337,
    left: 49,
  },
  profile: {
    flex: 1,
    width: "100%",
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});

export default ProfileDisplayHSP;

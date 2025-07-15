import * as React from "react";
import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
  View,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";
import { useState, useRef, useEffect } from "react";
import Navbar from './../navbar-footer/Navbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Video } from "expo-av";
import { useRoute } from "@react-navigation/native";
import {
  Padding,
  Color,
  Border,
  FontFamily,
  FontSize,
} from "../../GlobalStyles";
import { collection, doc, getDoc } from '@firebase/firestore';
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 1.05;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicPaddingTop1 = deviceHeight * 0.67;
  const dynamicPaddingLeft = deviceWidth * 0.17;
  const dynamicPaddingLeft1 = deviceWidth * 0.06;
  const dynamicPaddingLeft2 = deviceWidth * 0.23;
  const dynamicPaddingLeft3 = deviceWidth * 0.195;
  
  const Section = ({ title, content, dynamicWidth }) => {
    return (
      <View style={[styles.sectionContainer, { width: dynamicWidth }]}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionContent}>
          <Text>{content}</Text>
        </View>
      </View>
    );
  };
const DetailedHelp = () => {
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isRemoveAlertVisible, setRemoveAlertVisible] = useState(false);
  const route = useRoute();
  const { id } = route.params; // Get the document ID passed from EmergencyHelp.js
  const [firstAidData, setFirstAidData] = useState(null);
  useEffect(() => {
    const fetchFirstAidData = async () => {
      const firstAidDocRef = doc(FIREBASE_DB, 'firstAid', id);
      const firstAidDocSnapshot = await getDoc(firstAidDocRef);
      if (firstAidDocSnapshot.exists()) {
        setFirstAidData(firstAidDocSnapshot.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchFirstAidData();
  }, [id]);
  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const addToSavedArticles = () => {
    showAlert();
  };
  const toggleHeart = () => {
    setHeartFilled(!isHeartFilled);
    isHeartFilled ? showAlert("Removed from Saved Help") : showAlert("Added to Saved Help");
  };
  const videoRef = useRef(null);
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const toggleVideoPlayback = () => {
    setVideoPlaying(!isVideoPlaying);
  };
  
  return (
    <>
    
    <ScrollView contentContainerStyle={styles.container}>
    <LinearGradient
      style={styles.meddescription}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
    <View style={styles.display}>
    <View style={[styles.title]}>
      <View style={[styles.article, styles.searchBorder, {width:dynamicWidth}]}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isAlertVisible}
        onRequestClose={hideAlert}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.alertText}>{isHeartFilled ? "Added to" : "Removed from"} Saved Help</Text>
            <TouchableOpacity onPress={hideAlert} style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <TouchableOpacity
          style={styles.materialSymbolsplayArrowOu}
          activeOpacity={0.4}
          onPress={toggleHeart}
        >
          <Ionicons
            name={isHeartFilled ? "ios-heart" : "ios-heart-outline"}
            size={35}
            color="purple"
            style={[styles.uilcalenderIcon, { left: dynamicPaddingLeft1 }]}
          />
        </TouchableOpacity> */}
              </View>
              
          <Text style={[styles.findANear, styles.dentalTypo]}>
            {firstAidData ? firstAidData.name : " "}
          </Text>
          {/* <Text style={[styles.findANear1,styles.dentalTypo]}>
          CPR
          </Text> */}
          
          
          
        </View>
        <TouchableOpacity
              style={styles.playButton} // Add a new style for the play button
              onPress={toggleVideoPlayback}
            >
              <Ionicons
                name={isVideoPlaying ? "ios-pause" : "ios-play"} // Toggle between play and pause icons
                size={30}
                color="purple"
              />
            </TouchableOpacity>

            <Video
              source={firstAidData ? { uri: firstAidData.video } : null}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={isVideoPlaying} // Use the state variable to control playback
              isLooping
              style={[styles.onlineDoctorAmico1, {width:dynamicWidth}]} // Adjust the width of the video
              />
        <View style={[styles.section]}>
        <Section
  title={`${firstAidData ? firstAidData.name : " "}`}
  content={firstAidData ? firstAidData.whatIs : "Loading..."}
  dynamicWidth={dynamicWidth}
/>
        <Section
        title="What to do?"
        content={firstAidData ? firstAidData.whatToDo : "Loading..."}
        dynamicWidth={dynamicWidth}
      />
      <Section
        title="What are the causes?"
        content={firstAidData ? firstAidData.causes : "Loading..."}
        dynamicWidth={dynamicWidth}
      />
      {/* <Section
        title="Extreme situation"
        content="In extreme situations requiring CPR (Cardiopulmonary Resuscitation), it's crucial to act quickly and follow the recommended steps. CPR is a life-saving technique that can help maintain blood circulation and provide oxygen to the body when someone's heart has stopped beating. "
        dynamicWidth={dynamicWidth}
      /> */}
      {/* <Text style={[styles.findANear1, styles.dentalTypo, {top:dynamicPaddingTop,left:dynamicPaddingLeft2}]}>
            CPR Help by MedEase :)
          </Text> */}
      </View>
    </View>
      </LinearGradient>
    </ScrollView>
    <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
    container:{
        height:1250,
    },
    playButton:{
        width:30,
        top:15,
        left:290,
    },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    backgroundColor: Color.colorWhite,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  alertText: {
    fontSize: FontSize.size_lg,
    marginBottom: 10,
    textAlign: "center",
  },
  okButton: {
    backgroundColor: Color.colorPurple,
    width:50,
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  okButtonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    textAlign: "center",
  },
  materialSymbolsplayArrowOu: {
    top:-5,
    width: 40,
    height: 40,
    left:240,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  section:{
    top:70,
  },
  searchBorder: {
    flexDirection: "row",
    borderColor: Color.colorAzure,
    width: 360,
    borderWidth: 0,
    borderStyle: "solid",
  },
  article: {
    borderRadius: Border.br_3xs,
    backgroundColor: "transparent",
    height: 65,
    top:10,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_5xs,
  },
  display:{
    top:50,
  },
  boxContent:{
    textAlign:"center",
    fontSize:18,
    fontWeight:"bold",
  },
  sectionContainer: {
    width:367,
    marginBottom: 15,
    top:290,
    left:21,
    padding: 13,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  sectionTouchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    left:25,
  },
  sectionContent: {
    textAlign:"center",
    marginTop: 5,
    color: "#666",
  },
  cardView: {
    padding: Padding.p_8xs,
    backgroundColor: Color.colorWhite,
    marginTop: 10,
    marginLeft: 20,
    width: "91%",
    position: "absolute",
    zIndex: 1,
    borderRadius: 5,
  },
  tabContent: {
    padding: Padding.p_8xs,
    backgroundColor: Color.colorWhite,
    marginTop: 10,
    marginLeft: 20, // Adjust the left margin as needed
    width: "91%", // Adjust the width as needed
    position: "absolute",
    top: "42%", // Adjust the top position as needed
    zIndex: 1, // Ensure it overlays other components
    borderRadius:5,
  },
  tabContent1: {
    padding: Padding.p_8xs,
    backgroundColor: Color.colorWhite,
    marginTop: 10,
    marginLeft: 20, // Adjust the left margin as needed
    width: "91%", // Adjust the width as needed
    position: "absolute",
    top: "50%", // Adjust the top position as needed
    zIndex: 1, // Ensure it overlays other components
    borderRadius:5,
  },
  dropdownIcon: {
    width: 25,
    height: 25,
    marginRight: 90,
    top:305,
    left:40,
  },
  plusIcon: {
    width: 25,
    height: 25,
    marginRight: 90,
    top:240,
    left:30,
  },
  dropdownIcon1: {
    width: 25,
    height: 25,
    marginRight: 90,
    top:345,
    left:40,
  },
  onlineDoctorAmico1: {
    borderRadius:12,
    top:70,
    left: 20,
    width: 320,
    height: 300,
    position: "absolute",
    overflow: "hidden",
  },
  findANear: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 250,
    fontWeight: "700",
    color: Color.colorGray_200,
    top:15,
    left: 0,
    color: "black",
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  findANear1: {
    fontSize: 18,
    lineHeight: 32,
    width: 250,
    fontWeight: "700",
    color: Color.colorGray_200,
    top:970,
    left: 67,
    color: "black",
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  title: {
    top: 0,
    left: 21,
    width: 345,
    height: 66,
    position: "absolute",
  },
  buttonLayout: {
    left:20,
    paddingVertical: 7,
    paddingHorizontal: Padding.p_0,
    alignItems: "left",
    backgroundColor: Color.colorPurple,
    borderRadius:5,
    bottom: "80.67%",
    top: "36.29%",
    width: "90.67%",
    height: "6%",
    position: "absolute",
  },
  buttonLayout1: {
    left:20,
    paddingVertical: 7,
    paddingHorizontal: Padding.p_0,
    alignItems: "left",
    backgroundColor: Color.colorPurple,
    borderRadius:5,
    bottom: "80.67%",
    top: "44.29%",
    width: "90.67%",
    height: "6%",
    position: "absolute",
  },
  effectsTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  buttonPosition: {
    bottom: "74.26%",
    top: "20.69%",
    paddingVertical: 7,
    paddingHorizontal: Padding.p_0,
    alignItems: "center",
    backgroundColor: Color.colorPurple,
    borderRadius: Border.br_13xl,
    width: "26.67%",
    height: "5.05%",
    position: "absolute",
  },
  overviewLayout: {
    lineHeight: 24,
    textAlign: "left",
    color: Color.colorGray_200,
    position: "absolute",
  },
  navebarIcon: {
    top: 687,
    left: 0,
    width: 380,
    height: 125,
    position: "absolute",
  },
  icon: {
    borderRadius: Border.br_3xs,
    height: "100%",
    width: "100%",
  },
  button: {
    width: 100,
    height: 40,
  },
  button1: {
    width: 100,
    height: 40,
  },
  panadol: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 224,
    marginLeft: 88,
    textAlign: "left",
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    height: 40,
  },
  topBar: {
    height: "12.32%",
    top: "0%",
    right: "0%",
    bottom: "87.68%",
    left: "0%",
    flexDirection: "row",
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_35xl,
    position: "absolute",
    width: "100%",
  },
  effects: {
    fontSize: 17,
    lineHeight: 32,
    color: Color.colorWhite,
    width: 200,
    height: 200,
    left:60,
  },
  button1: {
    right: "67.73%",
    left: "5.6%",
  },
  button2: {
    right: "37.07%",
    left: "36.27%",
  },
  button3: {
    right: "20.53%",
    left: "52.8%",
  },
  button4: {
    right: "6.4%",
    left: "66.93%",
  },
  button5: {
    right: "51.73%",
    left: "21.6%",
  },
  overview: {
    top: 243,
    left: 16,
    fontSize: FontSize.size_lg,
    width: 343,
    height: 34,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  theDeasDrug: {
    top: 277,
    left: 12,
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    width: 355,
    height: 252,
  },
  meddescription: {
    borderStyle: "solid",
    borderColor: Color.colorGray_300,
    borderWidth: 1,
    flex: 1,
    height: 812,
    overflow: "hidden",
    backgroundColor: "transparent",
    width: "100%",
  },
});

export default DetailedHelp;

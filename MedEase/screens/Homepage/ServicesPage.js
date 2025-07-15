import * as React from "react";
import {
  ScrollView,
  Pressable,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  View,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding } from "./../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
const ServicesPage = () => {
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.001; 
  const dynamicWidth = deviceWidth * 0.83;
  const dynamicHeight = deviceHeight * 0.005;
  const dynamicPaddingTopIcon = deviceHeight * 0.063; 
  const dynamicPaddingTopIcon1 = deviceHeight * 0.145;
  const dynamicPaddingLeftIcon = deviceHeight * 0.006; 
  const dynamicPaddingLeft = deviceWidth * 0.17;
  const dynamicPaddingLeft1 = deviceWidth * 0.07;
  const dynamicPaddingLeft2 = deviceWidth * 0.09;
  const dynamicPaddingRight = deviceWidth * 0.2;
  return (
    <>
     <ScrollView style={[styles.container]}>
      <LinearGradient
      style={styles.servicespage}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
      <View style={[styles.topBar]}>
      <TouchableOpacity style={[styles.drugs9, styles.drugsLayout4]}  activeOpacity={0.7} 
          onPress={() => navigation.navigate("HomepageEmergency")}>
          <Text style={[styles.emergency, styles.chatbotTypo]}>Emergency</Text>
          <Image
            style={styles.cilmedicalCrossIcon1}
            contentFit="cover"
            source={require("../../assets/cilmedicalcross.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drugs8, styles.drugsLayout3]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("HomePageWiki")}
        >
          <Text style={[styles.medicineWiki, styles.chatbotTypo]}>
            Medicine wiki
          </Text>
          <Image
            style={styles.cilmedicalCrossIcon2}
            contentFit="cover"
            source={require("../../assets/oouilogometawiki.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drugs7, styles.drugsLayout3]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("HomePageChatbot")}
        >
          <Text style={[styles.chatbot, styles.chatbotTypo]}>Chatbot</Text>
          <Image
            style={[styles.carbonbotIcon, styles.carbonbotIconPosition]}
            contentFit="cover"
            source={require("../../assets/carbonbot.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drugs6, styles.drugsLayout2]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("HomePageNewsboard")}
        >
          <Text style={[styles.newsBoard, styles.chatbotTypo]}>News board</Text>
          <Image
            style={[styles.arcticonscbcNews, styles.carbonbotIconPosition2]}
            contentFit="cover"
            source={require("../../assets/arcticonscbcnews.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drugs5, styles.drugsLayout2]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("HomepageTest")}
        >
          <Image
            style={[styles.arcticonscbcNews2,styles.healthiconshematologyLaborat]}
            contentFit="cover"
            source={require("../../assets/healthiconshematologylaboratory.png")}
          />
          <Text style={[styles.testsSchedules, styles.chatbotTypo]}>
            Tests schedules
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drugs4, styles.drugsLayout1]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("HomePageBloodbank")}
        >
          <Text style={[styles.bloodBanks, styles.chatbotTypo]}>Blood banks</Text>
          <Image
            style={[
              styles.healthiconsbloodBagNegative,
              styles.fontistodoctorIconPosition1,
            ]}
            contentFit="cover"
            source={require("../../assets/healthiconsbloodbagnegative.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drugs3, styles.drugsLayout1]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("HomePageReminders")}
        >
          <Text style={[styles.bloodBanks, styles.chatbotTypo]}>Reminders</Text>
          <Image
            style={styles.fluentMdl2reminderTimeIcon}
            contentFit="cover"
            source={require("../../assets/fluentmdl2remindertime.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drugs2, styles.drugsLayout]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("HomePagePharmacy")}
        >
            <Text style={[styles.pharmacy, styles.chatbotTypo]}>Pharmacy</Text>
            <Image
              style={styles.cilmedicalCrossIcon}
              contentFit="cover"
              source={require("../../assets/gameiconsmedicines.png")}
            />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.drugs1, styles.drugsLayout]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("HomePageDoctorApp")}
        >
          <Text style={[styles.findADoctor, styles.chatbotTypo]}>
            Find a doctor
          </Text>
          <Image
            style={[
              styles.fontistodoctorIcon,
              styles.fontistodoctorIconPosition,
            ]}
            contentFit="cover"
            source={require("../../assets/fontistodoctor.png")}
          />
        </TouchableOpacity>
        <Text style={styles.services}>Services</Text>
      </View>
    </LinearGradient>
    </ScrollView>
    <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatbotTypo: {
    height: 23,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
    color: Color.colorGray_200,
  },
  drugsLayout3: {
    top: 455,
    height: 110,
    width: 142,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    position: "absolute",
  },
  drugsLayout4: {
    top: 575,
    height: 110,
    width: 142,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    position: "absolute",
  },
  carbonbotIconPosition: {
    left: 50,
    position: "absolute",
    overflow: "hidden",
  },
  carbonbotIconPosition2: {
    left: 43,
    position: "absolute",
    overflow: "hidden",
  },
  drugsLayout2: {
    top: 333,
    height: 110,
    width: 142,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    position: "absolute",
  },
  drugsLayout1: {
    top: 212,
    height: 110,
    width: 142,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    position: "absolute",
  },
  fontistodoctorIconPosition: {
    left: 44,
    height: 48,
    position: "absolute",
    overflow: "hidden",
  },
  fontistodoctorIconPosition1: {
    left: 48,
    height: 42,
    position: "absolute",
    overflow: "hidden",
  },
  drugsLayout: {
    top: 83,
    height: 110,
    width: 142,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    position: "absolute",
  },
  emergency: {
    left: 27,
    width: 116,
    top: 66,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  cilmedicalCrossIcon: {
    top: 14,
    left: 39,
    height: 48,
    width: 53,
    position: "absolute",
    overflow: "hidden",
  },
  cilmedicalCrossIcon1: {
    top: 14,
    left: 45,
    height: 48,
    width: 53,
    position: "absolute",
    overflow: "hidden",
  },
  cilmedicalCrossIcon2: {
    top: 17,
    left: 43,
    height: 46,
    width: 53,
    position: "absolute",
    overflow: "hidden",
  },
  drugs9: {
    top: 598,
    left: 117,
    height: 110,
    width: 142,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    position: "absolute",
  },
  medicineWiki: {
    left: 16,
    width: 122,
    top: 69,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  drugs8: {
    left: 203,
  },
  chatbot: {
    left: 40,
    width: 104,
    top: 68,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  carbonbotIcon: {
    width: 43,
    top: 14,
    height: 50,
  },
  drugs7: {
    left: 34,
  },
  newsBoard: {
    top: 69,
    left: 22,
    width: 120,
    position: "absolute",
  },
  arcticonscbcNews: {
    top: 14,
    height: 49,
    width: 55,
  },
  arcticonscbcNews2: {
    top: 0,
    height: 60,
    width: 55,
  },
  drugs6: {
    left: 200,
  },
  healthiconshematologyLaborat: {
    height: 45,
    width: 51,
    overflow: "hidden",
  },
  testsSchedules: {
    width: 128,
    marginTop: 3,
  },
  drugs5: {
    paddingLeft: Padding.p_6xs,
    paddingTop: Padding.p_2xl,
    paddingRight: 7,
    paddingBottom: Padding.p_2xl,
    left: 34,
    alignItems: "center",
  },
  bloodBanks: {
    top: 68,
    left: 29,
    width: 113,
    position: "absolute",
  },
  healthiconsbloodBagNegative: {
    top: 21,
    width: 45,
  },
  drugs4: {
    left: 200,
  },
  fluentMdl2reminderTimeIcon: {
    top: 20,
    left: 46,
    height: 45,
    width: 51,
    position: "absolute",
    overflow: "hidden",
  },
  drugs3: {
    left: 34,
  },
  pharmacy: {
    left: 33,
    width: 105,
    top: 68,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  drugs2: {
    marginTop:10,
    left: 204,
  },
  findADoctor: {
    left: 23,
    width: 119,
    top: 68,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "bold",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  fontistodoctorIcon: {
    width: 50,
    top: 14,
  },
  drugs1: {
    marginTop:10,
    left: 34,

  },
  services: {
    top: 46,
    left: 136,
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    textAlign: "center",
    color: Color.colorGray_200,
    position: "absolute",
  },
  topBar: {
    width: 375,
    height: 82,
  },
  servicespage: {
    flex: 1,
    width: "100%",
    height: 812,
    paddingTop: Padding.p_5xs,
    backgroundColor: "transparent",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default ServicesPage;

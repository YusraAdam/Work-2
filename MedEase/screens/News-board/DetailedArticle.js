import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
  Dimensions,
  Modal,
  TouchableOpacity,
  Linking, // Import Linking
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
import { Share } from "react-native";

const DetailedArticle = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route
  const { article } = route.params; // Get the article object from route.params
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 1;
  const dynamicWidth1 = deviceWidth * 0.93;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.04;
  const dynamicPaddingLeft1 = deviceWidth * 0.7;
  const dynamicPaddingLeft2 = deviceWidth * 0.03;
  const dynamicPaddingLeft3 = deviceWidth * 0.09;
  const dynamicPaddingLeft4 = deviceWidth * 0.63;
  const dynamicPaddingLeft5 = deviceWidth * 0.76;
  const dynamicPaddingLeft6 = deviceWidth * 0.32;
  const [isAlertVisible, setAlertVisible] = useState(false);
  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const addToSavedArticles = () => {
    showAlert();
  };

  const shareArticle = async () => {
    try {
      const result = await Share.share({
        message: article.url,
        url: article.url,
        title: "MedEase News",
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error("Error sharing article:", error.message);
    }
  };

  const openURL = () => {
    Linking.openURL(article.url);
  };

  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <LinearGradient
      style={styles.detailedarticle}
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
              <Text style={[styles.findANear, styles.dentalTypo]}>
                MedEase News Board
              </Text>
              {/* <TouchableOpacity activeOpacity={0.4} onPress={navigateToDoctorsDisplay}>
                <Text style={[styles.myAppointments, styles.dentalTypo, { left: dynamicPaddingLeft2 }]}>
                  Saved Articles
                </Text>
              </TouchableOpacity> */}
            </View>
            
          </View>
      <TouchableOpacity activeOpacity={0.4}>
      <Image
        style={[styles.streamlineinterfaceUserCircIcon]}
        contentFit="cover"
        source={require("../../assets/streamlineinterfaceusercirclecirclegeometrichumanpersonsingleuser.png")}
      />
      </TouchableOpacity>
      <Text style={[styles.the25Healthiest, styles.theDeasDrugLayout1, {left:dynamicPaddingLeft, width:dynamicWidth1}]}>
        {article.title}
      </Text>
      <View style={[styles.maskGroup, styles.iconLayout1 , {left:dynamicPaddingLeft}]}>
        <Text style={[styles.byWorldHealth, styles.jun102021Typo, {left:dynamicPaddingLeft3}]}>
          By {article.author}
        </Text>
        <Text style={[styles.jun102021, styles.jun102021Typo, {left:dynamicPaddingLeft1}]}>
          {article.publishedAt}
        </Text>
      </View>
      <View style={[styles.topBar, styles.iconLayout]}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isAlertVisible}
        onRequestClose={hideAlert}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.alertText}>Added to Saved Articles</Text>
            <TouchableOpacity onPress={hideAlert} style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <TouchableOpacity
      style={[styles.iconlyboldbookmark, {left:dynamicPaddingLeft4}]}
      activeOpacity={0.4}
      onPress={addToSavedArticles}>
      <Image
        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        source={require("../../assets/iconlyboldbookmark1.png")}
      />
      </TouchableOpacity> */}

      <TouchableOpacity
      style={[styles.icroundShareIcon, {left:dynamicPaddingLeft5}]}
      activeOpacity={0.4}
      onPress={shareArticle}>
        <Image
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          contentFit="cover"
          source={require("../../assets/icroundshare.png")}
        />
        </TouchableOpacity>
      </View>
      <Text
        style={[styles.theDeasDrug, styles.theDeasDrugLayout2, {left:dynamicPaddingLeft2, width:dynamicWidth1}]}
      >{article.description}</Text>
      <Text
        style={[styles.theDeasDrug1, styles.theDeasDrugLayout3, {left:dynamicPaddingLeft6, width:dynamicWidth1}]}
      >View full article below</Text>
      <TouchableOpacity activeOpacity={0.4} onPress={openURL}>
  <Text style={{top:640,color: 'purple', textDecorationLine: 'underline', left: dynamicPaddingLeft2, width: dynamicWidth1}}>
    {article.url}
  </Text>
</TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4}>
      <Image
        style={[styles.upload1Icon, styles.theDeasDrugLayout, {width:dynamicWidth}]}
        contentFit="cover"
        source={article.urlToImage ? { uri: article.urlToImage } : require("../../assets/search.png")}
      />
      </TouchableOpacity>
    </LinearGradient>
    </ScrollView>
    <Navbar/>
    </>
  );
};
const styles = StyleSheet.create({
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
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 550,
    fontWeight: "700",
    color: Color.colorGray_200,
    top: -7,
    left:-20,
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
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
  iconLayout: {
    width: 375,
    left: 40,
  },
  iconLayout1: {
    width: 375,
    left: 0,
  },
  theDeasDrugLayout1: {
    color: Color.colorGray_200,
    lineHeight: 24,
    left: 12,
  },
  jun102021Typo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "bold",
    textAlign: "center",
  },
  theDeasDrugLayout: {
    
    width:360,
    height: 252,
    position: "absolute",
  },
  theDeasDrugLayout2: {
    
    textAlign:"justify",
    width:340,
    height: 252,
    position: "absolute",
  },
  theDeasDrugLayout3: {
    
    textAlign:"justify",
    width:340,
    height: 252,
    position: "absolute",
  },
  navebarIcon: {
    top: 687,
    height: 125,
    position: "absolute",
  },
  streamlineinterfaceUserCircIcon: {
    top: 442,
    left: 13,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  the25Healthiest: {
    top: 381,
    fontSize: FontSize.size_lg,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    height: 51,
    textAlign: "left",
    width: 355,
    color: Color.colorGray_200,
    lineHeight: 24,
    left: 12,
    position: "absolute",
  },
  byWorldHealth: {
    left: 48,
    color: Color.colorBlack,
    fontSize: 14,
    top: 330,
    position: "absolute",
  },
  jun102021: {
    left: 270,
    color: Color.colorPurple,
    width: 84,
    height: 15,
    fontSize: 12,
    top: 330,
    position: "absolute",
  },
  maskGroup: {
    top: 116,
    height: 344,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  button: {
    left: 8,
    top: 54,
    width: 40,
    height: 40,
    position: "absolute",
  },
  iconlyboldbookmark: {
    height: "29%",
    width: "7.47%",
    top: "59%",
    right: "19.47%",
    bottom: "12%",
    left: "58.07%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  icroundShareIcon: {
    top: 59,
    left: 270,
    width: 28,
    height: 29,
    position: "absolute",
    overflow: "hidden",
  },
  topBar: {
    top: 0,
    height: 100,
    position: "absolute",
  },
  theDeasDrug: {
    top: 485,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "left",
    width: 355,
    color: Color.colorGray_200,
    lineHeight: 24,
    left: 12,
    height: 252,
  },
  theDeasDrug1: {
    top: 605,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interMedium,
    fontWeight: "bold",
    textAlign: "left",
    width: 355,
    color: Color.colorGray_200,
    lineHeight: 24,
    left: 12,
    height: 252,
  },
  upload1Icon: {
    top: 80,
    width: 450,
    left: 0,
  },
  detailedarticle: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default DetailedArticle;

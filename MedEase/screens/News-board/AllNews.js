import * as React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  searchText,
  Dimensions,
  Image,
  View,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Border, FontSize, Padding } from "../../GlobalStyles";
import { Alert } from "react-native";
import Navbar from './../navbar-footer/Navbar';
const AllNews = () => {
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicWidth1 = deviceWidth * 0.93;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.001;
  const dynamicPaddingLeft1 = deviceWidth * 0.77;
  const dynamicPaddingLeft2 = deviceWidth * 0.6;
  const dynamicPaddingLeft3 = deviceWidth * 0.15;
  const dynamicPaddingLeft4 = deviceWidth / 30;
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [removedIndexes, setRemovedIndexes] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=health&language=en&apiKey=f72387a843854bd4839a15aeac1d1d42&sortBy=publishedAt");
      const data = await response.json();
      const articlesWithDateOnly = data.articles.map(article => {
        const date = new Date(article.publishedAt);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        return { ...article, publishedAt: formattedDate };
      });
      setArticles(articlesWithDateOnly.slice(6, 9));
      console.log(articles);
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSearch = () => {
    navigation.navigate('SearchResults');
  };
  const navigateToDoctorsDisplay = () => {
    // Add your navigation logic here
    navigation.navigate('SavedArticles'); 
  };
  const [searchText, setSearchText] = useState("");
  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const addToSavedArticles = () => {
    showAlert();
  };
  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <LinearGradient
      style={styles.allnews}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
    {/* <View style={[styles.search, styles.searchLayout]}>
            <View style={[styles.searchChild, styles.searchLayout, { width: dynamicWidth }]} />
            <TextInput
              style={[styles.search1, styles.search1Typo]}
              placeholder="Search"
              placeholderTextColor={Color.colorDarkgray_100}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onSubmitEditing={handleSearch} // This will be called when the user presses Enter/Return
            />
            <Image
              style={[styles.iconlylightOutlinesearch, styles.iconLayout]}
              contentFit="cover"
              source={require("../../assets/iconlylightoutlinesearch.png")}
            />
          </View> */}


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
          {/* <TouchableOpacity activeOpacity={0.4} onPress={navigateToDoctorsDisplay}>
              <Image
                style={[styles.uilcalenderIcon, { left: dynamicPaddingLeft1 }]}
                contentFit="cover"
                source={require("../../assets/dashiconscloudsaved.png")}
              />
            </TouchableOpacity> */}


            <View style={styles.relatedArticles}>
  <Text style={[styles.relatedArticles1, styles.articlesTypo]}>
    Featured Articles
  </Text>
  <TouchableOpacity
            style={styles.seeAll}
            activeOpacity={0.4}
            onPress={() => navigation.navigate("SeeAllArticles")}
          >
            <Text style={[styles.seeAll1, styles.seeTypo, {left:dynamicPaddingLeft4}]}>See all</Text>
          </TouchableOpacity>
  {/* <TouchableOpacity onPress={handleShowArticles} style={styles.showArticlesButton}>
        <Text>Show Articles</Text>
      </TouchableOpacity> */}
      {articles
  .filter(item => {
    try {
      // Split the publishedAt date string by comma and extract the year part
      const yearString = item.publishedAt.split(", ")[1];
      // Parse the year string to integer
      const publishedYear = parseInt(yearString);
      
      return !isNaN(publishedYear) && publishedYear >= 2020;
    } catch (error) {
      console.error("Error parsing published date:", error);
      return false; // Exclude articles with invalid date format
    }
  })
  .map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.articleContainer}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("DetailedArticle", { article: item })}
    >
      <Image
        style={styles.maskGroupLayout}
        source={{ uri: item.urlToImage }}
      />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDate}>{item.publishedAt}</Text>
        <Text style={styles.articleSource}>{item.source && item.source.name}</Text>
      </View>
    </TouchableOpacity>
  ))} 
</View>
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

      
      
      <TouchableOpacity activeOpacity={0.4}>
              <Image
            style={[styles.onlineDoctorAmico1, { left: dynamicPaddingLeft3 }]}
            resizeMode="cover"
        source={require("../../assets/Online-article-rafiki.png")}
        />
              </TouchableOpacity>
    </LinearGradient>
    </ScrollView>
    <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
  seeTypo: {
    height: 18,
    fontFamily: FontFamily.interRegular,
    fontSize: 15,
    textAlign: "left",
    color: Color.colorDarkslateblue,
  },
  seeAll1: {
    width: 49,
    fontWeight:"bold",
  },
  seeAll: {
    marginLeft: 250 ,
    top:0,
  },
  scrollViewContent:{
    height:950,
  },
  articleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    top:15,
    width:320,
    left:-7,
  },
  maskGroupLayout: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  articleContent: {
    padding:10,
    flex: 0,
    width:250,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  articleDate: {
    top:3,
    fontSize: 13,
    color: "#666",
  },
  articleSource: {
    top:4,
    fontSize: 12,
    color: Color.colorPurple,
    fontWeight:"bold",
  },
  showArticlesButton: {
    alignSelf: "center",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    left:220,
    top:-10,
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
  onlineDoctorAmico1: {
    top: 100,
    left: 90,
    width: 250,
    height: 200,
    position: "absolute",
    overflow: "hidden",
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
  uilcalenderIcon: {
    top: 60,
    left: 310,
    width: 40,
    height: 45,
    position: "absolute",
    overflow: "hidden",
  },
  myAppointments: {
    top: 33,
    left: 240,
    color: Color.colorBlack,
    width: 127,
    height: 19,
    fontSize: 15,
    textAlign: "left",
    position: "absolute",
  },
  search: {
    top: 150,
    left: 23,
  },
  searchLayout: {
    height: 50,
    width: 365,
    position: "absolute",
  },
  searchChild: {
    borderRadius: Border.br_5xl,
    backgroundColor: Color.colorGray_100,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    left: 0,
    top: 0,
    width: 365,
  },
  search1: {
    top: 14,
    left: 60,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDarkgray_100,
    width: 190,
    height: 21,
  },
  search1Typo: {
    fontSize: FontSize.size_base,
    textAlign: "left",
    position: "absolute",
  },
  iconlylightOutlinesearch: {
    height: 30,
    width: "7.4%",
    top: 10,
    right: "87.68%",
    bottom: "18.75%",
    left: 20,
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
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 550,
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
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  articlesTypo: {
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  articleLayout: {
    height: 110,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
    width: 320,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
    marginBottom: 10,
  },
  beautyTipsForTypo: {
    height: 46,
    lineHeight: 15,
    fontSize: FontSize.size_1xl,
    textAlign: "left",
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  maskGroupLayout: {
    width: 59,
    height: 81,
  },
  junTypo: {
    height: 100,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.interMedium,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  worldTypo: {
    fontWeight:"bold",
    color: Color.colorPurple,
    fontSize: FontSize.size_1xs,
    fontFamily: FontFamily.interMedium,
    textAlign: "left",
    position: "absolute",
  },
  traditionalLayout: {
    width: 196,
    position: "absolute",
  },
  iconlyboldbookmarkLayout: {
    left: "86.4%",
    right: "7.2%",
    width: "6.4%",
    height: "2.96%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  navebarIcon: {
    top: 687,
    width: 375,
    height: 125,
    left: 0,
    position: "absolute",
  },
  medeaseNewsBoard: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 184,
    textAlign: "left",
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    top: 0,
    height: 68,
    left: 0,
    position: "absolute",
  },
  savedArticles1: {
    fontSize: FontSize.size_smi,
    fontStyle: "italic",
    width: 127,
    height: 20,
  },
  savedArticles: {
    left: 228,
    top: 40,
    position: "absolute",
  },
  icon: {
    height: "100%",
  },
  dashiconscloudSaved: {
    left: 251,
    width: 40,
    height: 40,
    top: 0,
    position: "absolute",
  },
  topBar: {
    height: "12.32%",
    top: "0%",
    right: "0%",
    bottom: "87.68%",
    left: "0%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%",
  },
  articleChild: {
    top: 17,
    left: 308,
    width: 16,
    height: 22,
    display: "none",
    position: "absolute",
  },
  beautyTipsFor: {
    top: 7,
    left: 71,
    width: 250,
    position: "absolute",
  },
  maskGroupIcon: {
    top: 5,
    left: 3,
    position: "absolute",
  },
  jun82021: {
    top: 66,
    width: 100,
    height: 15,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_4xs,
    left: 70,
  },
  byWorldHealth: {
    top: 43,
    left: 70,
  },
  beautyTipsForFace10DosAParent: {
    left: 6,
    width: 280,
    height: 81,
    top: 8,
    position: "absolute",
  },
  article: {
    top: 270,
  },
  iconlyboldbookmark: {
    height: "25%",
    width: "7.16%",
    top: "15.63%",
    right: "2.39%",
    bottom: "59.38%",
    left: "90.45%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  maskGroupIcon1: {
    left: 8,
    top: 13,
    width: 59,
    position: "absolute",
  },
  maskGroupIcon3: {
    left: 10,
    top: 13,
    width: 59,
    position: "absolute",
  },
  traditionalHerbalMedicine: {
    height: 44,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    top: 0,
    left: 0,
  },
  jun92021: {
    top: 59,
    width: 100,
    height: 15,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_4xs,
    left: 0,
  },
  byWorldHealth1: {
    top: 35,
    left: 0,
  },
  traditionalHerbalMedicineTrParent: {
    top: 15,
    left: 76,
    height: 74,
  },
  article1: {
    top: 150,
  },
  the25Healthiest: {
    width: 250,
    top: 0,
    left: 0,
    position: "absolute",
  },
  jun102021: {
    top: 58,
    width: 84,
    height: 15,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_4xs,
    left: 0,
  },
  the25HealthiestFruitsYouCParent: {
    height: 73,
    marginLeft: 12,
    width: 209,
  },
  article2: {
    top: 32,
    paddingHorizontal: Padding.p_8xs,
    paddingTop: 7,
    paddingBottom: 8,
    alignItems: "center",
    flexDirection: "row",
    height: 96,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
  },
  relatedArticles1: {
    fontSize: 17,
    width: 150,
    height: 36,
    top: 0,
    left: 0,
    position: "absolute",
  },
  relatedArticles: {
    top: 325,
    left: 21,
    position: "absolute",
  },
  iconlyboldbookmark3: {
    top: "82.56%",
    bottom: "34.48%",
  },
  iconlyboldbookmark2: {
    top: "67.5%",
    bottom: "62.56%",
  },
  iconlyboldbookmark1: {
    top: "52.9%",
    bottom: "62.56%",
  },
  allnews: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
  },
});
export default AllNews;
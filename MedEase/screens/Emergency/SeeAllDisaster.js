import * as React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  View,
  TextInput,
  searchText,
  handleSearch,
  Dimensions,
  toggleMenu,
  Image,
  ScrollView,
  navigation,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Dummy data for types
const typesData = [
    { id: 1, name: 'Earthquake', image: require('../../assets/earthquake.png'), type: 'Natural Disaster Help', source:'By MedEase' },
    { id: 2, name: 'Hurricane', image: require('../../assets/newTornado.png') , type: 'Natural Disaster Help', source:'By MedEase'},
    { id: 3, name: 'Flood', image: require('../../assets/newFlood.png') , type: 'Natural Disaster Help', source:'By MedEase'},
    { id: 4, name: 'Tsunami', image: require('../../assets/tsunami.png') , type: 'Natural Disaster Help', source:'By MedEase'},
];

const SeeAllDisaster= ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 0.915;
  const dynamicWidth1 = deviceWidth * 0.93;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.001;
  const dynamicPaddingLeft1 = deviceWidth * 0.79;
  const dynamicPaddingLeft2 = deviceWidth * 0.66;
  const dynamicPaddingLeft3 = deviceWidth * 0.27;
  
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const navigateToDoctorsDisplay = () => {
    // Add your navigation logic here
    navigation.navigate('DetailedHelp'); 
  };
  const navigateToSavedDisplay = () => {
    // Add your navigation logic here
    navigation.navigate('SavedHelp'); 
  };
  const handleSearch = () => {
    navigation.navigate('DoctorsDisplay');
  };

  const handleSeeAll = () => {
    // Navigate to a different page (replace 'DetailsScreen' with your actual details screen)
    
    navigation.navigate('TypeDetail', { typesData });
  };

  const [searchText, setSearchText] = useState("");
  
  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

          <View style={[styles.topBar, styles.topBarPosition, { left: dynamicPaddingLeft }]}>
            <View style={styles.rectangle} />
            <View style={styles.title}>
              <Text style={[styles.findANear, styles.dentalTypo]}>
                Natural Disaster Emergency
              </Text>
            </View>
          </View>
      

    <View style={[styles.container, {width:dynamicWidth}]}>
      {/* Heading and See All Button */}
      <View style={[styles.headerContainer]}>
      </View>

      {/* Types Section */}
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typesContainer}>
        {typesData.map((type) => (
          <View key={type.id} style={styles.typeBoundaryContainer}>
            <TouchableOpacity style={styles.typeBox} onPress={navigateToDoctorsDisplay}>
              <Image source={type.image} style={styles.typeImage} />
              <Text style={styles.typeName}>{type.name}</Text>
              <Text style={styles.typeName1}>{type.type}</Text>
              <Text style={styles.typeName2}>{type.source}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
    </LinearGradient>
    </ScrollView>
    <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
    scrollViewContent:{
        height:900,
    },
  container: {
    width:330,
    left:20,
    top:100,
  },
  containerCat: {
    flex: 1,
    //padding: 16,
    left:20,
    top:100,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:9,
  },
  heading: {
    fontSize: 17,
    color: Color.colorGray_200,
    marginBottom: 0,
    fontFamily: FontFamily.interSemiBold,
  },
  seeAllButton: {
    backgroundColor: "transparent",
    padding:6,
    borderRadius: 8,
    right:35,
  },
  seeAllButtonText: {
    fontWeight:"bold",
    height: 18,
    fontFamily: FontFamily.interRegular,
    fontSize: 15,
    textAlign: "left",
    color: Color.colorDarkslateblue,
  },
 
  typeBoundaryContainer: {
    right:0,
    borderWidth: 1,
    borderColor: '#8A3887',
    borderRadius: 8,
    marginRight: 10,
    marginBottom:20,
    height:83,
  },
  typeBox: {
    padding: 8,
    alignItems: 'center',
  },
  typeImage: {
    top:0,
    left:-110,
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  typeName: {
    top:-60,
    fontSize:17,
    fontWeight:"bold",
    left:10,
  },
  typeName1: {
    top:-58,
    fontSize:15,
    left:20,
  },
  typeName2: {
    top:-55,
    fontSize:13,
    left:15,
    color:Color.colorPurple,
    fontWeight:"bold",
  },
  // searchBar: {
  //   // Your search bar styles
  // },
  // typesContainer: {
  //   marginTop: 200,
  // },
  // typeBox: {
  //   marginRight: 16,
  //   alignItems: 'center',
  // },
  // typeImage: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 8,
  // },
  // typeName: {
  //   marginTop: 8,
  // },
  // seeAllButton: {
  //   marginTop: 16,
  //   backgroundColor: '#3498db',
  //   padding: 12,
  //   borderRadius: 8,
  //   alignItems: 'center',
  // },
  // seeAllButtonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
    firstaid:{
        top: 180,
    left: 60,
    width: 250,
    height: 230,
    },
  drugsTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  seeTypo: {
    height: 18,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_5xs,
    textAlign: "left",
    color: Color.colorDarkslateblue,
  },
  textLayout: {
    width: 348,
    flexDirection: "row",
    height: 23,
    position: "absolute",
  },
  drugsPosition: {
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 13,
    width: 87,
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    top: 45,
    paddingRight: 14,
    height: 88,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    alignItems: "center",
    position: "absolute",
  },
  panadolTypo: {
    marginTop: 5,
    height: 30,
    textAlign: "center",
    color: Color.colorGray_200,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  drugsBorder: {
    paddingBottom: 14,
    justifyContent: "flex-end",
    paddingTop: 12,
    paddingLeft: 13,
    height: 88,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  iconPosition1: {
    height: 60,
    top: 45,
    width:90,
    position: "absolute",
  },
  drugsLayout: {
    paddingVertical: 14,
    paddingHorizontal: Padding.p_0,
    top: 637,
    justifyContent: "flex-end",
    height: 88,
    width: 87,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    alignItems: "center",
    position: "absolute",
  },
  iconPosition: {
    height: 59,
    top: 642,
    position: "absolute",
  },
  babyCareTypo: {
    height: 17,
    textAlign: "center",
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  titleLayout: {
    height: 66,
    position: "absolute",
  },
  searchPosition: {
    left: 31,
    position: "absolute",
  },
  drugs: {
    left: 3,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
    top: 0,
  },
  seeAll1: {
    width: 49,
    fontWeight:"bold",
  },
  seeAll: {
    marginLeft: 270 ,
  },
  seeAll2: {
    marginLeft: 230 ,
  },
  seeAll3:{
    marginLeft: 230,
    fontWeight:"bold",
  },
  text: {
    top: 13,
    left: 5,
    width: 343,
    alignItems: "center",
    flexDirection: "row",
    height: 23,
    position: "absolute",
  },
  pharmacies: {
    width: 131,
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    height: 23,
  },
  text1: {
    top: 152,
    left: 0,
  },
  imageIcon: {
    width: 53,
    height: 42,
  },
  panadol: {
    width: 120,
    marginTop: 10,
  },
  drugs1: {
    left: 0,
  },
  drugs11: {
    left: 286,
  },
  popularProduct: {
    top: 370,
    left: 18,
    width: 398,
    height: 134,
    position: "absolute",
  },
  popularProduct1: {
    top: 385,
    left: 18,
    width: 398,
    height: 134,
    position: "absolute",
  },
  popularProduct2: {
    top: 620,
    left: 18,
    width: 398,
    height: 134,
    position: "absolute",
  },
  imageIcon2: {
    width: 52,
    height: 42,
  },
  drugs12: {
    left:95,
    width: 86,
    paddingRight: 14,
    paddingBottom: 14,
  },
  imageIcon3: {
    width: 51,
    height: 42,
  },
  panadol3: {
    width: 59,
  },
  drugs13: {
    paddingRight: 13,
    marginLeft: 190,
    width: 85,
  },
  drugs1Parent: {
    top: 396,
    left: 121,
    width: 190,
    height: 88,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  pharmacyHomepageChild: {
    top: 747,
    left: 1,
    backgroundColor: Color.colorPurple,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 50,
    elevation: 50,
    shadowOpacity: 1,
    width: 375,
    height: 65,
    position: "absolute",
  },
  pharmacyHomepageItem: {
    height: "2.93%",
    width: "48.27%",
    top: "94.58%",
    right: "28%",
    bottom: "2.49%",
    left: "23.73%",
    position: "absolute",
  },
  image11Icon: {
    left: 0,
    width: 85,
  },
  image12Icon: {
    left: 96,
    borderRadius: Border.br_mini,
    width: 85,
  },
  image15Icon: {
    left: 191,
    borderRadius: Border.br_2xs,
    width: 82,
  },
  image166Icon: {
    left: 286,
    borderRadius: Border.br_2xs,
    width: 82,
  },
  categories: {
    width: 130,
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    height: 23,
  },
  seeAll4: {
    width: 40,
    marginLeft: 178,
  },
  text2: {
    top: 608,
    left: 15,
    alignItems: "center",
  },
  medicines: {
    height: 10,
    textAlign: "center",
    width: 60,
    fontSize: FontSize.size_xs,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  drugs14: {
    left: 16,
  },
  drugs15: {
    left: 120,
  },
  image16Icon: {
    left: 24,
    width: 74,
  },
  image17Icon: {
    left: 131,
    width: 76,
  },
  image18Icon: {
    width: 73,
    height: 54,
  },
  milkSupplements: {
    fontSize: FontSize.size_4xs,
    width: 62,
    marginTop: 5,
  },
  drugs16: {
    left: 223,
    paddingHorizontal: Padding.p_6xs,
    paddingVertical: Padding.p_8xs,
    top: 637,
    height: 88,
    width: 87,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    alignItems: "center",
    position: "absolute",
  },
  image19Icon: {
    height: 55,
    width: 89,
  },
  babyCare: {
    width: 63,
    fontSize: FontSize.size_xs,
    height: 17,
  },
  drugs17: {
    left: 318,
    paddingVertical: Padding.p_6xs,
    width: 89,
    paddingHorizontal: Padding.p_0,
    top: 637,
    height: 88,
    borderWidth: 1,
    borderColor: Color.colorAzure,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: 11,
    alignItems: "center",
    position: "absolute",
  },
  medeasepharmacy: {
    top: 12,
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 231,
    color: Color.colorGray_200,
    height: 66,
    left: 0,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  group: {
    left: "79.71%",
    top: "4.56%",
    right: "7.54%",
    bottom: "28.57%",
    width: "12.75%",
    height: "66.87%",
    position: "absolute",
  },
  myFavourites1: {
    fontSize: FontSize.size_smi,
    fontStyle: "italic",
    color: Color.colorBlack,
    width: 127,
    height: 19,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  myFavourites: {
    left: 253,
    top: 53,
    position: "absolute",
  },
  titleE: {
    top: 40,
    width: 345,
  },
  pharmacistBro1Icon: {
    top: 141,
    width: 327,
    height: 222,
    overflow: "hidden",
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
  titleE: {
    top: 68,
    width: 345,
    height: 66,
    position: "absolute",
  },
  myAppointments: {
    top: 38,
    left: 240,
    color: Color.colorBlack,
    width: 127,
    height: 19,
    fontSize: 15,
    textAlign: "left",
    position: "absolute",
  },
  uilcalenderIcon: {
    top: 70,
    left: 280,
    width: 35,
    height: 35,
    position: "absolute",
    overflow: "hidden",
  },
  onlineDoctorAmico1: {
    top: 147,
    left: 87,
    width: 180,
    height: 170,
    position: "absolute",
    overflow: "hidden",
  },
  pharmacyHomepage: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default SeeAllDisaster;

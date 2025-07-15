import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  View,
  TextInput,
  searchText,
  Dimensions,
  handleSearch,
  toggleMenu,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image,
  navigation,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { collection, getDocs, query, where, getDoc, doc } from "@firebase/firestore";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
import { firebase } from "@firebase/app";
import "firebase/firestore";
const DisplayPage = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState("Search by blood group");
  const [loading, setIsLoading] = useState(true);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [bloodGroup, setBloodGroup] = useState([]);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.67;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicWidth1 = deviceWidth * 1;
  const dynamicPaddingTop1 = deviceHeight * 0.047;
  const dynamicPaddingLeft = deviceWidth * 0.035;
  const dynamicPaddingLeft1 = deviceWidth * 0.73;
  const dynamicPaddingLeft2 = deviceWidth * 0.52;
  const dynamicPaddingLeft3 = deviceWidth * 0.2;
  const dynamicPaddingLeft4 = deviceWidth * 0.01;
  const [numColumns, setNumColumns] = useState(4);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const navigateToDoctorsDisplay = () => {
    // Add your navigation logic here
    navigation.navigate('SavedBloodBank'); 
  };
  // Set the default search text when the component mounts
  useEffect(() => {
    setSearchText("Search by blood group");
  }, []);
  const handleSearch = async () => {
    try {
      const bloodBankQuery = query(
        collection(FIREBASE_DB, "allBloodGroup"),
        where("blood_group", "==", searchText)
      );
      const bloodBankQuerySnapshot = await getDocs(bloodBankQuery);

      if (bloodBankQuerySnapshot.size > 0) {
        // Medicine exists, fetch pharmacy information
        const bloodBankIds = bloodBankQuerySnapshot.docs[0].data().bank_id || [];

        const bloodBankDataPromises = bloodBankIds.map(async (bank_id) => {
          const bloodBankRef = doc(FIREBASE_DB, "allBloodBank", bank_id.id);
          const bloodBankDoc = await getDoc(bloodBankRef);

          if (bloodBankDoc.exists()) {
            const bloodBankData = bloodBankDoc.data();
            const bloodBankName = bloodBankData.name;
            return {
              id: bank_id.id,
              name: bloodBankName,
            };
          } else {
            return null;
          }
        });

        const bloodBankData = await Promise.all(bloodBankDataPromises);
        const filteredBloodBankData = bloodBankData.filter(Boolean);

        navigation.navigate('SearchResultBlood', { searchText, bloodBankData: filteredBloodBankData });
      } else {
        // Medicine not found, navigate to NoResult screen
        navigation.navigate('NoResult', { searchText });
      }

      AsyncStorage.setItem("searchText", searchText);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  // Retrieve the search text from AsyncStorage when the component is focused
  useFocusEffect(
    React.useCallback(() => {
      const getSearchText = async () => {
        try {
          const storedSearchText = await AsyncStorage.getItem("searchText");
          if (storedSearchText !== null) {
            setSearchText(storedSearchText);
          }else {
            // If there is no stored search text, set it to default
            setSearchText("Search by blood group");
          }
        } catch (error) {
          console.error("Error retrieving search text from AsyncStorage:", error);
        }
      };

      getSearchText();
    }, [])
  );
  // Handle Android back button press
const handleBackPress = async () => {
  try {
    // Remove the stored search text when navigating back
    await AsyncStorage.removeItem("searchText");
    // Navigate back
    navigation.goBack();
    return true; // Prevent default behavior
  } catch (error) {
    console.error("Error removing search text from AsyncStorage:", error);
    return false; // Continue with default behavior
  }
};
// Attach the event listener when the component mounts
useEffect(() => {
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    handleBackPress
  );

  // Detach the event listener when the component unmounts
  return () => backHandler.remove();

}, []);
useEffect(() => {
  const fetchBloodBankData = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "allBloodBank"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBloodBanks(data);
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  fetchBloodBankData();
}, []);

useEffect(() => {
  const fetchBloodGroupData = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "allBloodGroup"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBloodGroup(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  fetchBloodGroupData();
}, []);
  const handleSeeAll2 = () => {
    // Navigate to a different page (replace 'DetailsScreen' with your actual details screen)
    
    navigation.navigate('AllBlood');
  };

  const renderBloodBank = ({ item, index }) => {
    if (!item.blood_logo) {
      return null; // or a placeholder image
    }

    return (
      
      <View style={[styles.typeBoundaryContainer2 ]}>
            <TouchableOpacity >
              <Image source={{uri: item.blood_logo}} style={styles.typeImage1} />
            </TouchableOpacity>
          </View>
      
    );
  };
  const renderBloodGroup = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4}>
      <View style={{ marginRight: 0, width: 90, alignItems: 'center' }}>
        <View style={{ borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff', top:15, width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 100, height: 30, resizeMode: 'contain' }} source={{ uri: item.bloodgroup_logo }} />
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 8, justifyContent: 'center', textAlign: 'center', color: '#a2429e' }}>{item.blood_group}</Text>
          
        </View>
      </View>
    </TouchableOpacity>
  );
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
      <View style={[styles.containerCat2, {top:dynamicPaddingTop1}]}>
      {/* Heading and See All Button */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Blood Banks</Text>
        <TouchableOpacity style={[styles.seeAllButton, {left:dynamicPaddingLeft}]} onPress={handleSeeAll2}>
          <Text style={styles.seeAllButtonText}>See All</Text>
        </TouchableOpacity>
      </View>

     
            <FlatList
              data={bloodBanks}
              horizontal
              renderItem={renderBloodBank}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
        
        
    </View>
    
    </View>


    
    <View style={[styles.sectionContainer1,{width:dynamicWidth1, top:dynamicPaddingTop}]}>
            <Text style={styles.sectionTitle}>Blood Groups</Text>
            
            <FlatList
              data={bloodGroup}
              horizontal
              renderItem={renderBloodGroup}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false} 
            />
        
            <View style={{ alignItems: 'center', top: 10 }}>
  <Image
    style={{ width: 30, height: 30 }}
    source={require('../../assets/mark.png')}
  />
  <Text style={{ left:-5, width:300, fontSize: 14, /*fontWeight: 'bold',*/ color: 'red', top:5, textAlign: 'center' }}>
    Ensure all the safety measures and essential procedures while blood transfusion.
  </Text>
</View>
          </View>
          

      <View style={[styles.search, styles.searchLayout]}>
            <View style={[styles.searchChild, styles.searchLayout, { width: dynamicWidth }]} />
            <TextInput
              style={[styles.search1, styles.search1Typo]}
              placeholder="Search by Blood Group"
              placeholderTextColor={Color.colorDarkgray_100}
              defaultValue=""
              onChangeText={(text) => setSearchText(text)}
              onSubmitEditing={handleSearch} // This will be called when the user presses Enter/Return
            />
            <Image
              style={[styles.iconlylightOutlinesearch, styles.iconLayout]}
              contentFit="cover"
              source={require("../../assets/iconlylightoutlinesearch.png")}
            />
            
          </View>

          <View style={[styles.topBar, styles.topBarPosition, { left: dynamicPaddingLeft }]}>
            <View style={styles.rectangle} />
            <View style={styles.title}>
              <Text style={[styles.findANear, styles.dentalTypo]}>
                Track Blood Group Easily
              </Text>
              <TouchableOpacity activeOpacity={0.4} onPress={navigateToDoctorsDisplay}>
                <Text style={[styles.myAppointments, styles.dentalTypo, { left: dynamicPaddingLeft2 }]}>
                  Saved Bloodbanks
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.4} onPress={navigateToDoctorsDisplay}>
              <Image
                style={[styles.uilcalenderIcon, { left: dynamicPaddingLeft1 }]}
                contentFit="cover"
                source={require("../../assets/group1.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.4}>
              <Image
            style={[styles.onlineDoctorAmico1, { left: dynamicPaddingLeft3 }]}
            resizeMode="cover"
            source={require("../../assets/bloodtesticon.png")}
          />
              </TouchableOpacity>
              
          </View>
          
    </LinearGradient>
    <Navbar/>
    </>
  );
};


const styles = StyleSheet.create({
  pharmacyImage: {
    width: 145,
    height: 90,
    borderRadius: Border.br_smi,
  },
  doctorItem: {
    left: 10,
    top: 10,
    marginRight: 10,
    width: 70,
    backgroundColor: 'Color.colorWhite',
    borderRadius: 10,
  },
  categoryText: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  doctorName: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  sectionContainer1: {
    height: 185, // Increase the height to accommodate both rows
    top: 155,
    left: 10,
    flex:0,
    position:'absolute',
  },
  container: {
    marginRight:0,
    flex: 1,
    //padding: 16,
    left:0,
    top:335,
  },
  container1: {
    marginRight:0,
    flex: 1,
    //padding: 16,
    left:0,
    top:315,
  },
  typeBox1: {
    borderRadius:13,
    backgroundColor:'transparent',
    alignItems: 'center',
  },
  typeImage1: {
    top:5,
    width: 110,
    height: 80,
    borderRadius: 8,
  },
  typeName1: {
    backgroundColor:'white',
    fontSize:15,
    marginTop: 15,
    fontWeight:"bold",
  },
  typeName2: {
    fontSize:13,
    marginTop: 0,
    color: Color.colorPurple,
    fontWeight:"bold",

  },
  typeBoundaryContainer2: {
    right:0,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 13,
    marginRight: -10,
    height:100,
    top:-3,
    width:130,
  },
  typeBoundaryContainer3: {
    right:0,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 13,
    marginRight: -10,
    height:100,
    width:100,
    position:"fixed",
  },
  seeAllButton: {
    backgroundColor: "transparent",
    padding:6,
    borderRadius: 8,
    right:35,
    marginRight:30,
  },
  seeAllButtonText: {
    fontWeight:"bold",
    height: 18,
    fontFamily: FontFamily.interRegular,
    fontSize: 15,
    textAlign: "left",
    color: Color.colorDarkslateblue,
  },
  containerCat2: {
    marginRight:25,
    flex: 1,
    //padding: 16,
    left:15,
    top:50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:3,
  },
  heading: {
    fontSize: 17,
    color: Color.colorGray_200,
    marginBottom: 0,
    fontFamily: FontFamily.interSemiBold,
  },
  doctorName2: {
    fontSize:13,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
    top:55,
  },

  categoryText: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  categoryItem: {
    marginRight: 100,
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
    borderRadius:15,
    marginBottom:10,
  },
  categoryItem1: {
    marginRight: 10,
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    top:10,
    borderRadius: 10,
  },
  sectionTitle: {
    top:3,
    left:5,
    fontSize: 17,
    color: Color.colorGray_200,
    marginBottom: 0,
    fontFamily: FontFamily.interSemiBold,
  },
  sectionContainer: {
    marginBottom: 9,
  },
  pharmacyHomePage: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
  pharmacyItem: {
    marginRight: 10,
    width: 83,
    backgroundColor: Color.colorWhite,
    padding: 10,
    height:100,
    borderRadius: 10,
  },
  pharmacyItem1: {
    marginRight: 10,
    width: 105,
    backgroundColor: Color.colorWhite,
    padding: 10,
    height:100,
    borderRadius: 10,
  },
  pharmacyName: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  pharmacyLocation: {
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    fontSize: 12,
  },
  onlineDoctorAmico1: {
    top: 197,
    left: 70,
    width: 190,
    height: 190,
    position: "absolute",
    overflow: "hidden",
  },
  uilcalenderIcon: {
    top: 67,
    left: 280,
    width: 35,
    height: 35,
    position: "absolute",
    overflow: "hidden",
  },
  myAppointments: {
    top: 70,
    left: 240,
    color: Color.colorBlack,
    width: 150,
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
    width: 250,
    fontWeight: "700",
    color: Color.colorGray_200,
    top: 20,
    left:0,
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  drugsTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  seeTypo: {
    height: 18,
    fontFamily: FontFamily.interRegular,
    fontSize: 15,
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
    top:0,
  },
  seeAll2: {
    marginLeft: 230 ,
  },
  seeAll3:{
    marginLeft: 230,
    fontWeight:"bold",
  },
  text: {
    top: 0,
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
    top: 365,
    left: 18,
    width: 398,
    height: 134,
    position: "absolute",
  },
  popularProduct1: {
    top: 470,
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
  title: {
    top: 40,
    left: 13,
    width: 345,
  },
  pharmacistBro1Icon: {
    top: 141,
    width: 327,
    height: 222,
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

export default DisplayPage;

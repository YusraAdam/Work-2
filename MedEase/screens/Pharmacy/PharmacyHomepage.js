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
  FlatList,
  Image,
  navigation,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
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
const PharmacyHomepage = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState("Search by medicine name");
  const [pharmacyName, setPharmacyName] = useState(null);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicWidth1 = deviceWidth * 0.93;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.05;
  const dynamicPaddingLeft5 = deviceWidth * 0.0;
  const dynamicPaddingLeft1 = deviceWidth * 0.73;
  const dynamicPaddingLeft2 = deviceWidth * 0.62;
  const dynamicPaddingLeft3 = deviceWidth * 0.23;
  const dynamicPaddingLeft4 = deviceWidth / 30;
  const dynamicPaddingRight = deviceWidth / 14;
  const [pharmacies, setPharmacies] = useState([]);
  const [meds, setMeds] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const navigateToDoctorsDisplay = () => {
    // Add your navigation logic here
    navigation.navigate('DrugsFav'); 
  };
  // Set the default search text when the component mounts
  useEffect(() => {
    setSearchText("Search by medicine name");
  }, []);
  const handleSearch = async () => {
    try {
      const medicineQuery = query(
        collection(FIREBASE_DB, "allMedicines"),
        where("name", "==", searchText)
      );
      const medicineQuerySnapshot = await getDocs(medicineQuery);

      if (medicineQuerySnapshot.size > 0) {
        // Medicine exists, fetch pharmacy information
        const pharmIds = medicineQuerySnapshot.docs[0].data().pharmId || [];

        const pharmacyDataPromises = pharmIds.map(async (pharmId) => {
          const pharmacyRef = doc(FIREBASE_DB, "allPharmacies", pharmId.id);
          const pharmacyDoc = await getDoc(pharmacyRef);

          if (pharmacyDoc.exists()) {
            const pharmacyData = pharmacyDoc.data();
            const pharmacyName = pharmacyData.name;
            return {
              id: pharmId.id,
              name: pharmacyName,
            };
          } else {
            return null;
          }
        });

        const pharmacyData = await Promise.all(pharmacyDataPromises);
        const filteredPharmacyData = pharmacyData.filter(Boolean);

        navigation.navigate('SearchResult', { searchText, pharmacyData: filteredPharmacyData });
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
            setSearchText("Search by medicine name");
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
  const BottomTabs = () => {
    const navigation = useNavigation();
  
    const handleTabPress = (screen) => {
      navigation.navigate(screen);
    };
  
    return (
      <View style={[styles.bottomTabsContainer, {left:dynamicPaddingLeft5}]}>
      <TouchableOpacity activeOpacity={0.4} style={styles.bottomTab} onPress={() => handleTabPress("HomePageWiki")}>
      <View style={styles.inARow}>
          <Text style={styles.bottomTabText}>Get Medicine Information..</Text>
          <Text style={styles.bottomTabText1}>Explore MedEase Wiki</Text>
          <Ionicons name="ios-arrow-forward" size={30} color="grey" left={190} top={-50}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  // const pharmacies = [
  //   { name: "Pharmacy 1", icon: require("../../assets/image-112.png") },
  //   { name: "Pharmacy 2", icon: require("../../assets/image-121.png") },
  //   { name: "Pharmacy 3", icon: require("../../assets/image-151.png") },
  //   { name: "Pharmacy 1", icon: require("../../assets/image-112.png") },
  //   { name: "Pharmacy 3", icon: require("../../assets/image-151.png") },
  //   { name: "Pharmacy 1", icon: require("../../assets/image-112.png") },
  //   { name: "Pharmacy 3", icon: require("../../assets/image-151.png") },
  //   { name: "Pharmacy 1", icon: require("../../assets/image-112.png") },
  //   // Add more pharmacies as needed
  // ];
  // const medicines = [
  //   { name: "Angised", icon: require("../../assets/med1.jpg") },
  //   { name: "Atarax", icon: require("../../assets/med2.jpg") },
  //   { name: "Betnesol", icon: require("../../assets/med3.jpg") },
  //   { name: "Duodart", icon: require("../../assets/med4.jpg") },
  //   { name: "Chewcal", icon: require("../../assets/med5.jpg") },
  //   { name: "Boostrix", icon: require("../../assets/med6.jpg") },
  //   { name: "Duricef", icon: require("../../assets/med7.jpg") },
  //   { name: "Ceporex", icon: require("../../assets/med1.jpg") },
  //   // Add more pharmacies as needed
  // ];
  
  useEffect(() => {
    const fetchPharmaciesData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "allPharmacies"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPharmacies(data);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchPharmaciesData();
  }, []);

  useEffect(() => {
    const fetchMedsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "allMedicines"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMeds(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchMedsData();
  }, []);

  // // Use useEffect to fetch image URLs after pharmaciesData has been set
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(FIREBASE_DB, "allPharmacies"));
  //       const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //       setPharmacies(data);

  //       const storage = getStorage(FIREBASE_APP);

  //       // Fetch image URLs for all pharmacies concurrently using Promise.all
  //       const imageURLPromises = data.map(async (item) => {
  //         if (item.logo) {
  //           const imageRef = ref(storage, `pharmacy/${item.logo}`);
  //           try {
  //             const url = await getDownloadURL(imageRef);
  //             return { id: item.id, url };
  //           } catch (error) {
  //             console.error(`Error fetching image URL for ${item.id}`, error);
  //             return { id: item.id, url: null };
  //           }
  //         } else {
  //           return { id: item.id, url: null };
  //         }
  //       });

  //       // Wait for all promises to resolve
  //       const imageURLs = await Promise.all(imageURLPromises);

  //       // Update the state with image URLs
  //       setPharmacies((prevData) =>
  //         prevData.map((pharmacy) => {
  //           const imageURL = imageURLs.find((img) => img.id === pharmacy.id);
  //           return imageURL ? { ...pharmacy, logoUrl: imageURL.url } : pharmacy;
  //         })
  //       );
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const renderPharmacy = ({ item, index }) => {
    if (!item.logo) {
      return null; // or a placeholder image
    }

    return (
      
      <View style={[styles.pharmacyItem, styles.categoryItem]}>
          <Image
            style={styles.pharmacyImage}
            source={{ uri: item.logo }}
            resizeMode="cover"
          />
          {/* <View style={styles.pharmacyDetails}>
            <Text style={styles.pharmacyName}>{item.name}</Text>
            <Text style={styles.pharmacyLocation}>{item.location}</Text>
            <Text style={styles.pharmacyTimings}>{item.time}</Text>
          </View> */}
        </View>
      
    );
  };
  const renderMedicine = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4}>
      <View style={[styles.pharmacyItem1, styles.categoryItem1]}>
      <Text style={[styles.doctorName2, styles.categoryText]}>{item.name}</Text>
      <Text style={[styles.doctorName3, styles.categoryText1]}>{item.medType}</Text>
        {/* <Image
      style={[styles.healthiconseye1, styles.eyesLayout, styles.categoryIcon1]}
      contentFit="cover"
      source={item.icon}
    /> */}
      </View>
    </TouchableOpacity>
  );
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
      <View style={styles.popularProduct}>
        <View style={[styles.sectionContainer, { width: dynamicWidth1 }]}>
            <Text style={styles.sectionTitle}>Pharmacies</Text>
            <TouchableOpacity
            style={styles.seeAll}
            activeOpacity={0.4}
            onPress={() => navigation.navigate("Pharmicies")}
          >
            <Text style={[styles.seeAll1, styles.seeTypo, {left:dynamicPaddingLeft4}]}>See all</Text>
          </TouchableOpacity>
          
            <FlatList
              data={pharmacies}
              horizontal
              renderItem={renderPharmacy}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
        
          </View>
      </View>

      <View style={styles.popularProduct1}>
        <View style={[styles.sectionContainer, { width: dynamicWidth1 }]}>
            <Text style={styles.sectionTitle}>Drugs</Text>
            <TouchableOpacity
            style={styles.seeAll}
            activeOpacity={0.4}
            onPress={() => navigation.navigate("Drugs")}
          >
            <Text style={[styles.seeAll1, styles.seeTypo, {left:dynamicPaddingLeft4}]}>See all</Text>
          </TouchableOpacity>
          
            <FlatList
              data={meds}
              horizontal
              renderItem={renderMedicine}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
        
          </View>
      </View>
      

      <View style={[styles.search, styles.searchLayout]}>
            <View style={[styles.searchChild, styles.searchLayout, { width: dynamicWidth }]} />
            <TextInput
              style={[styles.search1, styles.search1Typo]}
              placeholder="Search by medicine name"
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
                Track Medicines Easily
              </Text>
              <TouchableOpacity activeOpacity={0.4} onPress={navigateToDoctorsDisplay}>
                <Text style={[styles.myAppointments, styles.dentalTypo, { left: dynamicPaddingLeft2 }]}>
                  Saved Drugs
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
          </View>
          <TouchableOpacity activeOpacity={0.4}>
              <Image
            style={[styles.onlineDoctorAmico1, { left: dynamicPaddingLeft3 }]}
            resizeMode="cover"
            source={require("../../assets/pharmacistbro-1.png")}
          />
              </TouchableOpacity>
              <View style={[styles.bottomBox]}>
        <BottomTabs />
      </View>
    </LinearGradient>
    </ScrollView>
    <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    top:50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },  loadingContainer1: {
    top:50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pharmacyImage: {
    width: 80,
    height: 75,
    borderRadius: Border.br_smi,
  },
  scrollViewContent:{
    height:800,
  },
  bottomTab: {
    left:70,
    paddingVertical: 10,
  },
  bottomTabText: {
    top:-13,
    left:-50,
    fontSize: 18,
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  bottomTabText1: {
    top:-12,
    left:-45,
    fontSize: 15,
    color: Color.colorPurple,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  bottomTabsContainer: {
    top:30,
    height:45,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  bottomBox: {
    left:30,
    top:610,
    height:"10%",
    width: "85%",
    backgroundColor: Color.colorWhite,
    borderRadius:30,
    paddingTop: 10,
  },
  doctorName2: {
    fontWeight:"bold",
    fontSize:13,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
    top:0,
  },
  doctorName3: {
    fontWeight:"bold",
    fontSize:12,
    color: Color.colorPurple,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
    top:5,
  },
  healthiconseye1: {
    top: -20,
    left: 0,
    width: 75,
    height:50,
    overflow: "hidden",
    borderRadius: 10,
  },
  categoryText: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  categoryText1: {
    color: Color.colorPurple,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "center",
  },
  categoryItem: {
    marginRight: 7,
    alignItems: "center",
    backgroundColor: "transparent",
    top: 0,
    borderRadius: 10,
  },
  categoryItem1: {
    marginRight: 10,
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    top:10,
    borderRadius:10,
  },
  sectionTitle: {
    fontSize: 17,
    color: Color.colorGray_200,
    marginBottom: -20,
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
    height:120,
    borderRadius: 10,
  },
  pharmacyItem1: {
    marginRight: 10,
    width: 85,
    backgroundColor: Color.colorWhite,
    padding: 10,
    height:88,
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
    top: 200,
    left: 90,
    width: 200,
    height: 160,
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
    top: 68,
    left: 240,
    color: Color.colorBlack,
    width: 127,
    height: 25,
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
    width: 250,
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
    top: 480,
    left: 18,
    width: 398,
    height: 270,
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

export default PharmacyHomepage;
import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions, 
  FlatList,
  toggleMenu,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
import { getDocs, collection } from "@firebase/firestore";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import {
  FIREBASE_APP,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
const Pharmicies = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicWidth1 = deviceWidth * 0.93;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.05;
  const dynamicPaddingLeft1 = deviceWidth * 0.73;
  const dynamicPaddingLeft2 = deviceWidth * 0.62;
  const dynamicPaddingLeft3 = deviceWidth * 0.23;
  const dynamicPaddingLeft4 = deviceWidth * 0.01;
  const [pharmaciesData, setPharmaciesData] = useState([]);

  useEffect(() => {
    const fetchPharmaciesData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "allPharmacies"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPharmaciesData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchPharmaciesData();
  }, []);
  
  const splitDrugsData = (data, chunkSize) => {
    const result = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      result.push(data.slice(i, i + chunkSize));
    }
    return result;
  };
  const drugRows = splitDrugsData(pharmaciesData, 1);
  const navigateToPharmDrugs = (pharmId) => {
    navigation.navigate('PharmDrugs', { pharmId });
    
  };
  

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
   <LinearGradient
      style={styles.pharmicies}
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
                MedEase Pharmacies
              </Text>
            </View>
          </View>


       {/* Pharmacies List */}
       {isLoading ? ( // Show ActivityIndicator while loading
          <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Color.colorPurple} />
      </View>
    ) : (
      <>
          
      {drugRows.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.drugRow, {width:dynamicWidth1}]}>
          {row.map((item, index) => (
            <View
              key={index}
              style={[styles.pharmacyContainer]}
              
            >
              <Image
                style={styles.pharmacyImage}
                contentFit="cover"
                source={{ uri: item.logo}}
              />
              <View style={styles.pharmacyDetails}>
                <Text style={styles.pharmacyName}>{item.name}</Text>
                <Text style={styles.pharmacyLocation}>{item.location}</Text>
                <TouchableOpacity onPress={() =>navigateToPharmDrugs(item.id)}>
                <Text style={styles.drugType1}>View Available Medicines</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          ))}
        </View>
      ))}
      </>
    )}
      </LinearGradient>
      </ScrollView>
      <Navbar />
      
    </>
  );
};

const styles = StyleSheet.create({
  drugType1: {
    left:0,
    top: 2,
    fontSize: 13,
    fontWeight: "bold",
    color: Color.colorBlack,
    marginTop: 0,
  },
  container:{
    height:1000,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    top: 40,
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
    top: 20,
    left:-10,
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  pharmacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xl,
    marginVertical: 10,
    left:18,
    width:320,
    height:95,
    paddingLeft:20,
    top:100,
  },
  pharmacyImage: {
    width: 80,
    height: 75,
    borderRadius: Border.br_smi,
  },
  pharmacyDetails: {
    top:-2,
    marginLeft: 20,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
  },
  pharmacyLocation: {
    color: Color.colorPurple,
    width:200,
  },
  pharmacyTimings: {
    fontSize: FontSize.size_base,
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
  iconLayout1: {
    overflow: "hidden",
    width: "100%",
  },
  pharmiciesChildLayout: {
    height: 80,
    width: 324,
    left: 31,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xl,
    position: "absolute",
  },
  pharmiciesLayout: {
    width: 320,
    height: 80,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xl,
    position: "absolute",
  },
  iconPosition: {
    left: 33,
    width: 92,
    height: 80,
    position: "absolute",
  },
  iconLayout: {
    width: 91,
    left: 30,
    height: 80,
    position: "absolute",
  },
  image15IconPosition: {
    left: 29,
    top: 523,
    height: 80,
    position: "absolute",
  },
  dvagoContainerLayout: {
    lineHeight: 20,
    textAlign: "left",
  },
  alarmIconLayout: {
    height: 17,
    width: 18,
    overflow: "hidden",
  },
  mchsContainerPosition1: {
    left: 146,
    position: "absolute",
  },
  mchsContainerPosition: {
    left: 143,
    lineHeight: 20,
    textAlign: "left",
    position: "absolute",
  },
  pharmiciesChild: {
    top: 622,
  },
  navebarIcon: {
    top: 687,
    left: 0,
    width: 380,
    height: 125,
    position: "absolute",
  },
  pharmacies: {
    top: 50,
    left: 10,
    fontSize: FontSize.size_3xl,
    lineHeight: 32,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorGray_200,
    width: 224,
    height: 68,
    textAlign: "left",
    position: "absolute",
  },
  icon: {
    height: "100%",
    borderRadius: Border.br_3xs,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  button: {
    left: "2.13%",
    top: "54%",
    right: "87.2%",
    bottom: "6%",
    width: "10.67%",
    height: "40%",
    position: "absolute",
  },
  topBar: {
    height: "12.32%",
    top: "0%",
    right: "0%",
    bottom: "87.68%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  pharmiciesItem: {
    left: 34,
    top: 112,
  },
  pharmiciesInner: {
    left: 35,
    top: 215,
  },
  rectangleView: {
    top: 321,
  },
  pharmiciesChild1: {
    top: 422,
  },
  image11Icon: {
    width: 92,
    top: 112,
  },
  image12Icon: {
    borderRadius: Border.br_mini,
    width: 92,
    top: 215,
  },
  image13Icon: {
    borderRadius: Border.br_smi,
    width: 92,
    top: 321,
  },
  image14Icon: {
    borderRadius: Border.br_smi,
    top: 422,
  },
  pharmiciesChild2: {
    width: 326,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xl,
    top: 550,
  },
  image15Icon: {
    borderRadius: Border.br_2xs,
    width: 92,
  },
  dvagoPharmacy1: {
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
  },
  dvagoPharmacy: {
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
  },
  mchsKarachi1: {
    color: Color.colorDimgray_300,
  },
  am: {
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  mchsKarachi900Am: {
    fontSize: FontSize.size_base,
  },
  dvagoPharmacyMchsContainer: {
    top: 122,
    left: 147,
    position: "absolute",
  },
  alarmIcon: {
    top: 167,
    left: 165,
    position: "absolute",
  },
  tabiyatpkMchsKarachiContainer: {
    top: 230,
    lineHeight: 20,
    textAlign: "left",
  },
  kausarMedicoMchsContainer: {
    top: 330,
  },
  alarmIcon2: {
    top: 271,
    left: 173,
    position: "absolute",
  },
  alarmIcon3: {
    top: 370,
    left: 156,
    position: "absolute",
  },
  alkhidmatPharmacyMchsContainer: {
    top: 433,
  },
  alarmIcon4: {
    top: 474,
    height: 17,
    width: 18,
    overflow: "hidden",
  },
  oneHealthPharmacy: {
    fontSize: 19,
    color: Color.colorBlack,
  },
  oneHealthPharmacyContainer: {
    top: 533,
    left: 142,
    position: "absolute",
  },
  alarmIcon5: {
    top: 578,
    left: 159,
    position: "absolute",
  },
  image11Icon1: {
    top: 622,
  },
  dvagoPharmacyMchsContainer1: {
    top: 630,
    lineHeight: 20,
    textAlign: "left",
  },
  alarmIcon6: {
    top: 676,
    left: 157,
    position: "absolute",
  },
  pharmicies: {
    borderStyle: "solid",
    borderColor: Color.colorGray_300,
    borderWidth: 1,
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
  },
});

export default Pharmicies;

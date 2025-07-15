import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions, 
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "./../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
import { getDocs, collection, query, where, doc, updateDoc, getDoc, arrayRemove } from "@firebase/firestore";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import { useRoute } from "@react-navigation/native";
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
const DrugsFav = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicWidth1 = deviceWidth * 0.99;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.05;
  const dynamicPaddingLeft1 = deviceWidth * 0.745;
  const dynamicPaddingLeft2 = deviceWidth * 0.599;
  const dynamicPaddingLeft3 = deviceWidth * 0.23;
  const dynamicPaddingLeft4 = deviceWidth * 0.01;
  const [drugsData, setDrugsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigateToDoctorsDisplay = () => {
    // Add your navigation logic here
    navigation.navigate('Pharmicies'); 
  };
  const [heartFilled, setHeartFilled] = React.useState(false);
  const fetchFavoriteDrugs = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      const userId = user.uid;
      const favDrugsRef = doc(FIREBASE_DB, "favDrugs", userId);
      const favDrugsDoc = await getDoc(favDrugsRef);

      if (favDrugsDoc.exists()) {
        const favDrugsData = favDrugsDoc.data().medicines || {};
        const favDrugsArray = Object.values(favDrugsData);
        setDrugsData(favDrugsArray);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorite drugs:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Fetch favorite drugs every time the page comes into focus
      fetchFavoriteDrugs();
    });

    return unsubscribe;
  }, [navigation]);

  const removeFromFavorites = async (index, drugId, drugName, drugMedType) => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      const userId = user.uid;
  
      const favDrugsRef = doc(FIREBASE_DB, "favDrugs", userId);
  
      await updateDoc(favDrugsRef, {
        medicines: arrayRemove({
          id: drugId,
          name: drugName,
          medType: drugMedType,
        }),
      });
  
      setDrugsData((prevDrugsData) =>
        prevDrugsData.filter((drug) => drug.id !== drugId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };
  const navigateToSearchResult = async (medicineName) => {
    try {
      const medicineQuery = query(
        collection(FIREBASE_DB, "allMedicines"),
        where("name", "==", medicineName)
      );
      const medicineQuerySnapshot = await getDocs(medicineQuery);
        // console.log(medicineQuerySnapshot.medicineName);
      if (medicineQuerySnapshot.size > 0) {
        // Medicine exists, fetch pharmacy information
        const pharmIds = medicineQuerySnapshot.docs[0].data().pharmId || [];
  
        const pharmacyDataPromises = pharmIds.map(async (pharmId) => {
          const pharmacyRef = doc(
            FIREBASE_DB,
            "allPharmacies",
            pharmId.id
          );
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
  
        navigation.navigate("SearchResult", {
          searchText: medicineName,
          pharmacyData: filteredPharmacyData,
        });
      } else {
        // Medicine not found, navigate to NoResult screen
        navigation.navigate("NoResult", { searchText: medicineName });
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  
  const splitDrugsData = (data, chunkSize) => {
    const result = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      result.push(data.slice(i, i + chunkSize));
    }
    return result;
  };

  const drugRows = splitDrugsData(drugsData, 2);
  return (
    <>
    <LinearGradient
      style={styles.drugs}
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
                Your Saved Drugs
              </Text>
              
            </View>
            
          </View>

          {isLoading ? ( // Show ActivityIndicator while loading
          <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Color.colorPurple} />
      </View>
    ) : (
      <>
          {drugRows.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.drugRow, {width:dynamicWidth1}]}>
          {row.map((drug, index) => (
            <View
              key={index}
              style={styles.drugContainer}
              
            >
              
              <View style={styles.drugDetails}>
                <Text style={styles.drugName}>{drug.name}</Text>
                <Text style={styles.drugType}>{drug.medType}</Text>
                <TouchableOpacity onPress={() =>navigateToSearchResult(drug.name)}>
                <Text style={styles.drugType1}>View Availability</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.heartIconContainer}
                onPress={() => removeFromFavorites(index, drug.id, drug.name, drug.medType)}
              >
                <Image
                  style={[
                    styles.heartIcon, { tintColor: Color.colorPurple}
                  ]}
                  source={require("../../assets/mdiheartoutline.png")}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
      </>
    )}
    </LinearGradient>
    <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  myAppointments: {
    top: 40,
    left: 200,
    color: Color.colorBlack,
    width: 127,
    height: 19,
    fontSize: 15,
    textAlign: "left",
    position: "absolute",
  },
  uilcalenderIcon: {
    top: 67,
    left: 280,
    width: 35,
    height: 35,
    position: "absolute",
    overflow: "hidden",
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
    top: -10,
    left:-10,
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  drugRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  drugContainer: {
    position: 'relative',
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: Border.br_xl,
    marginBottom: -20,
    padding: 10,
    top:80,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 57,
    right: 18,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: Color.colorGray_200, // Default color
  },
  transparentImage: {
    width: 140,
    height: 88,
    borderRadius: Border.br_smi,
    marginBottom: 6,
  },
  drugDetails: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xl,
    padding: 15,
    height: 75,
    width: 148,
  },
  drugName: {
    left:4,
    top: -6,
    fontSize: 14.5,
    fontWeight: "bold",
    color: Color.colorBlack,
  },
  drugType: {
    left:4,
    top: -5,
    fontSize: 12,
    fontWeight: "bold",
    color: Color.colorPurple,
    marginTop: 0,
  },
  drugType1: {
    left:4,
    top: -2,
    fontSize: 12.5,
    fontWeight: "bold",
    color: Color.colorBlack,
    marginTop: 0,
  },
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  topBar1Position: {
    left: 0,
    position: "absolute",
  },
  drugsLayout: {
    height: 88,
    width: 88,
    top: 141,
    position: "absolute",
  },
  drugsInnerLayout: {
    height: 40,
    width: 128,
    borderColor: Color.colorPurple,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xl,
    top: 222,
    position: "absolute",
    borderWidth: 1,
    borderStyle: "solid",
  },
  plended10mgContainerLayout: {
    height: 27,
    width: 108,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "left",
    position: "absolute",
  },
  mdiheartIconLayout: {
    height: 14,
    width: 15,
    top: 245,
    position: "absolute",
    overflow: "hidden",
  },
  navebarIcon: {
    top: 687,
    width: 380,
    height: 125,
  },
  topBar1: {
    top: 0,
    width: 375,
    height: 44,
  },
  drugs1: {
    top: 60,
    fontSize: FontSize.size_3xl,
    lineHeight: 32,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorGray_200,
    width: 224,
    height: 68,
    textAlign: "left",
    left: 124,
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

  drugsChild: {
    left: 40,
  },
  drugsItem: {
    left: 222,
  },
  drugsInner: {
    left: 24,
  },
  xPlended: {
    fontSize: FontSize.size_3xs,
    color: Color.colorBlack,
  },
  mg1: {
    color: Color.colorDimgray_100,
  },
  text: {
    color: Color.colorDarkgray_100,
  },
  mg: {
    fontSize: FontSize.size_4xs,
  },
  xPlended10mgTabletContainer: {
    top: 229,
    left: 34,
  },
  mdiheartOutlineIcon: {
    left: 124,
    height: 14,
    width: 15,
    top: 245,
  },
  rectangleView: {
    left: 202,
  },
  xPlended10mgTabletContainer1: {
    top: 228,
    left: 212,
  },
  mdiheartOutlineIcon1: {
    left: 302,
  },
  drugs: {
    borderColor: Color.colorGray_300,
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
  },
});

export default DrugsFav;

import * as React from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions, 
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState,useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "./../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
import { getDocs, collection, query, where, doc, updateDoc, getDoc, setDoc, onSnapshot, arrayUnion, arrayRemove, serverTimestamp } from "@firebase/firestore";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
const PharmDrugs = ({route}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [pharmacyName, setPharmacyName] = useState("");
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicWidth1 = deviceWidth * 0.99;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.05;
  const dynamicPaddingLeft1 = deviceWidth * 0.75;
  const dynamicPaddingLeft2 = deviceWidth * 0.60;
  const dynamicPaddingLeft3 = deviceWidth * 0.23;
  const dynamicPaddingLeft4 = deviceWidth * 0.01;
  const { pharmId } = route.params;
  const navigateToDoctorsDisplay = () => {
    // Add your navigation logic here
    navigation.navigate('DrugsFav', { drugsData: drugsData });
  };
  const [heartFilled, setHeartFilled] = React.useState(false);
  const [drugsData, setDrugsData] = useState([]);
  useEffect(() => {
    const fetchPharmacyName = async () => {
      try {
        const pharmacyRef = doc(FIREBASE_DB, "allPharmacies", pharmId);
        const pharmacyDoc = await getDoc(pharmacyRef);

        if (pharmacyDoc.exists()) {
          setPharmacyName(pharmacyDoc.data().name);
        }
      } catch (error) {
        console.error("Error fetching pharmacy name:", error);
      }
    };

    fetchPharmacyName();
  }, [pharmId]);
  useEffect(() => {
    const fetchMedicinesData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "allMedicines"));
        const data = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Extract pharmacy IDs from references in the "pharmId" array
            pharmIds: doc.data().pharmId.map(pharmIdRef => pharmIdRef.id),
          }))
          .filter(medicine => medicine.pharmIds.includes(pharmId))
          .map(medicine => ({
            id: medicine.id,
            name: medicine.name,
            medType: medicine.medType,
          }));
  
        
        setDrugsData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching drugs data", error);
        setIsLoading(false);
      }
    };
  
    fetchMedicinesData();
  }, [pharmId]);
  
  

  const toggleHeart = async (index, drugId) => {
    setDrugsData((prevDrugsData) => {
      const updatedDrugsData = prevDrugsData.map((drug) =>
        drug.id === drugId ? { ...drug, heartFilled: !drug.heartFilled } : drug
      );

      const updateFirestore = async () => {
        const drugToUpdate = updatedDrugsData.find((drug) => drug.id === drugId);

        if (drugToUpdate) {
          try {
            const user = FIREBASE_AUTH.currentUser;
            const userId = user.uid;
            const docRef = doc(FIREBASE_DB, "allMedicines", drugId);

            // Toggle heartFilled in Firestore
            await updateDoc(docRef, { heartFilled: drugToUpdate.heartFilled });

            const favDrugsRef = doc(FIREBASE_DB, "favDrugs", userId);

            // Create user document if it doesn't exist
            const favDrugsDoc = await getDoc(favDrugsRef);
            if (!favDrugsDoc.exists()) {
              await setDoc(favDrugsRef, { userId }); // Create user document
            }

            // Update user's medicines array based on heartFilled status
            if (drugToUpdate.heartFilled) {
              await updateDoc(favDrugsRef, {
                medicines: arrayUnion({
                  id: drugId,
                  name: drugToUpdate.name,
                  medType: drugToUpdate.medType,
                }),
              });
            } else {
              await updateDoc(favDrugsRef, {
                medicines: arrayRemove({
                  id: drugId,
                  name: drugToUpdate.name,
                  medType: drugToUpdate.medType,
                }),
              });
            }
          } catch (error) {
            console.error("Error updating Firestore:", error);
          }
        }
      };

      updateFirestore();

      return updatedDrugsData;
    });
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
                Available Medicines in {pharmacyName}
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
              style={[styles.drugContainer]}
              
            >
              {/* <Image
                style={styles.transparentImage}
                contentFit="cover"
                source={{ uri: drug.logoUrl }}
              /> */}
              <View style={styles.drugDetails}>
                <Text style={styles.drugName}>{drug.name}</Text>
                <Text style={styles.drugType}>{drug.medType}</Text>
                
              </View>
              <TouchableOpacity
                style={styles.heartIconContainer}
                onPress={() => toggleHeart(index, drug.id)}
              >
                <Image
                  style={[
                    styles.heartIcon,
                    drug.heartFilled && { tintColor: Color.colorPurple },
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
    top: 35,
    left: 200,
    color: Color.colorBlack,
    width: 127,
    height: 19,
    fontSize: 15,
    textAlign: "left",
    position: "absolute",
  },
  uilcalenderIcon: {
    top: 63,
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
    width: 300,
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
    top:120,
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
    fontSize: 13,
    fontWeight: "bold",
    color: Color.colorPurple,
    marginTop: 0,
  },
  drugType1: {
    left:4,
    top: -5,
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

export default PharmDrugs;
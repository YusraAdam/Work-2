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
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
import { getDocs, collection, query, where, doc, updateDoc, getDoc, setDoc, onSnapshot, arrayUnion, arrayRemove, serverTimestamp } from "@firebase/firestore";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
const AllBlood = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bloodBankData, setBloodBankData] = useState([]);
  const [selectedBloodBankId, setSelectedBloodBankId] = useState(null);
  const [availableBloodGroups, setAvailableBloodGroups] = useState([]);
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
  const [heartFilled, setHeartFilled] = React.useState(false);
  const fetchUserSavedDrugs = async () => {
    const user = FIREBASE_AUTH.currentUser;
    const userId = user.uid;
  
    try {
      const favDrugsRef = doc(FIREBASE_DB, "favBloodBank", userId);
      const favDrugsDoc = await getDoc(favDrugsRef);
  
      if (favDrugsDoc.exists()) {
        const savedMedicineIds = Object.keys(favDrugsDoc.data().medicines || {});
  
        setBloodBankData((prevDrugsData) =>
          prevDrugsData.map((drug) => ({
            ...drug,
            heartFilled: savedMedicineIds.includes(drug.id),
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching user's saved blood banks:", error);
    }
  };
  const toggleHeart = async (index, drugId) => {
    setBloodBankData((prevDrugsData) => {
      const updatedDrugsData = prevDrugsData.map((drug) =>
        drug.id === drugId ? { ...drug, heartFilled: !drug.heartFilled } : drug
      );

      const updateFirestore = async () => {
        const drugToUpdate = updatedDrugsData.find((drug) => drug.id === drugId);

        if (drugToUpdate) {
          try {
            const user = FIREBASE_AUTH.currentUser;
            const userId = user.uid;
            const docRef = doc(FIREBASE_DB, "allBloodBank", drugId);

            // Toggle heartFilled in Firestore
            await updateDoc(docRef, { heartFilled: drugToUpdate.heartFilled });

            const favDrugsRef = doc(FIREBASE_DB, "favBloodBank", userId);

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
                  logo:drugToUpdate.blood_logo,
                  name: drugToUpdate.blood_name,
                  location: drugToUpdate.blood_location,
                }),
              });
            } else {
              await updateDoc(favDrugsRef, {
                medicines: arrayRemove({
                  id: drugId,
                  logo:drugToUpdate.blood_logo,
                  name: drugToUpdate.blood_name,
                  location: drugToUpdate.blood_location,
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
  useEffect(() => {
    const fetchBloodBankData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "allBloodBank"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBloodBankData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
      fetchUserSavedDrugs();
    };

    fetchBloodBankData();
  }, []);

  useEffect(() => {
    if (selectedBloodBankId) {
      fetchAvailableBloodGroups(selectedBloodBankId);
    }
  }, [selectedBloodBankId]);

  const fetchAvailableBloodGroups = async (bank_id) => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "allBloodGroup"));
      const data = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          bankIds: doc.data().bank_id.map(bankIdRef => bankIdRef.id),
        }))
        .filter(group => group.bankIds.includes(bank_id))
        .map(group => ({
          id: group.id,
          blood_group: group.blood_group,
        }));
      setAvailableBloodGroups(data);
      setIsLoading(false);
      setModalVisible(true); // Show the modal after fetching available blood groups
    } catch (error) {
      console.error("Error fetching blood groups data", error);
      setIsLoading(false);
    }
  };

  const splitbloodBankData = (data, chunkSize) => {
    const result = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      result.push(data.slice(i, i + chunkSize));
    }
    return result;
  };
  const bloodBankRows = splitbloodBankData(bloodBankData, 1);
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
                MedEase Blood Banks
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
          
      {bloodBankRows.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.drugRow, {width:dynamicWidth1}]}>
          {row.map((item, index) => (
            <View
              key={index}
              style={[styles.pharmacyContainer]}
              
            >
              <Image
                style={styles.pharmacyImage}
                contentFit="cover"
                source={{ uri: item.blood_logo}}
              />
              <View style={styles.pharmacyDetails}>
                <Text style={styles.pharmacyName}>{item.blood_name}</Text>
                <Text style={styles.pharmacyLocation}>{item.blood_location}</Text>
                <TouchableOpacity onPress={() =>setSelectedBloodBankId(item.id)}>
                <Text style={styles.drugType1}>View Available Blood Groups</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.heartIconContainer}
                onPress={() => toggleHeart(index, item.id)}
              >
                <Image
                  style={[
                    styles.heartIcon,
                    item.heartFilled && { tintColor: Color.colorPurple },
                  ]}
                  source={require("../../assets/mdiheartoutline.png")}
                />
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

      {/* Modal for Available Blood Groups */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Available Blood Groups</Text>
            <ScrollView>
  {availableBloodGroups.map((group, index) => (
    <Text key={index} style={styles.modalText}>{group.blood_group}</Text> 
  ))}
</ScrollView>
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  heartIconContainer: {
    position: 'absolute',
    top: 62.5,
    right: 4,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: Color.colorGray_200, // Default color
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    top:10,
    left:115,
    fontSize: 16,
    marginBottom: 8,
    fontWeight:'bold',
  },
  closeButton: {
    marginTop: 15,
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: Color.colorPurple,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
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
    left:16,
    width:325,
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

export default AllBlood;

import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FIREBASE_DB } from "../../firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import { Color, FontSize, FontFamily, Border, Padding } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';

const MedDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [medicineDetails, setMedicineDetails] = useState(null);
  const [totalCapsules, setTotalCapsules] = useState(0);
  const [remainingCapsules, setRemainingCapsules] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [remainingDays , setRemainingDays] = useState(0);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const docRef = doc(FIREBASE_DB, 'medReminder', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMedicineDetails(data);
          if (data.type === "Tablet") {
            const availableStock = data.availableStock || 0;
            const quantityPerDose = data.quantity || 0;
            setTotalCapsules(availableStock);
            // Calculate remaining capsules for each reminder time
            let remaining = availableStock;
            const start = new Date(data.startDate);
            const today = new Date();
            const elapsedDays = Math.floor((today - start) / (1000 * 60 * 60 * 24)); // Calculate elapsed days
            const dosesPerDay = data.reminderTimes.length;
            const totalDosesTaken = elapsedDays * dosesPerDay;
            remaining -= totalDosesTaken * quantityPerDose; // Subtract total doses taken from available stock
            setRemainingCapsules(remaining);
          }
          
          const totalDuration = data.duration || 0;
          setTotalDays(totalDuration);
          // Calculate remaining days based on start date
          const start = new Date(data.startDate); // Assuming startDate is provided in the data
          const today = new Date();
          const elapsedDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
          const remainingDays = totalDuration - elapsedDays;
          setRemainingDays(elapsedDays < 0 ? totalDuration : remainingDays); // Ensure remaining days are not negative
          setStartDate(start);
          
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching medicine details: ', error);
      }
    };
  
    fetchMedicineDetails();
  }, []);
  const getMedicineImage = (type) => {
    switch (type) {
      case 'Tablet':
        return require("../../assets/medicine.png");
      case 'Syrup':
        return require("../../assets/syrup.png");
      case 'Injection':
        return require("../../assets/injection.png");
      case "Insulin":
        return require("../../assets/insuline.png");
      case "Drops":
        return require("../../assets/eye-dropper.png");
      case "Inhaler":
        return require("../../assets/inhaler.png");
      default:
        return require("../../assets/medicine.png");
    }
  };
  const renderReminderTimes = () => {
    if (medicineDetails && medicineDetails.reminderTimes) {
      return (
        <View style={styles.reminderTimesContainer}>
          <Text style={styles.dosageTime}>Dosage time:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {medicineDetails.reminderTimes.map((time, index) => (
              <View key={index} style={styles.reminderTimeContainer}>
                <Text style={styles.reminderTime}>{time}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <LinearGradient
        style={styles.container}
        locations={[0, 0.3, 8.5, 1]}
        colors={[
          "rgba(252, 252, 252, 0)",
          "rgba(231, 205, 230, 0.2)",
          "rgba(172, 86, 188, 0.5)",
          "#a2429e",
        ]}
      >
        <View style={styles.topContainer}>
  {medicineDetails && (
    <>
    <TouchableOpacity activeOpacity={0.4}>
      <Image
        style={styles.medicineImage}
        source={getMedicineImage(medicineDetails.type)}
      />
      </TouchableOpacity>
      <Text style={styles.medicineName}>{medicineDetails.name}</Text>
    </>
  )}
</View>
        {renderReminderTimes()}
        {medicineDetails?.type === "Tablet" && (
          <View style={styles.quantityContainer}>
            <Text style={styles.dosageTime2}>Total tablets:</Text>
            <Text style={styles.quantity}>{totalCapsules}</Text>
            <Text style={styles.dosageTime1}>Remaining tablets:</Text>
            <Text style={styles.quantity1}>{remainingCapsules}</Text>
          </View>
        )}
        
          <View style={styles.quantityContainer1}>
            <Text style={styles.dosageTime2}>Total Days:</Text>
            <Text style={styles.quantity}>{totalDays}</Text>
            <Text style={styles.dosageTime1}>Remaining Days:</Text>
            <Text style={styles.quantity1}>{remainingDays}</Text>
          </View>
        
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.4}
            onPress={() => navigation.navigate("ChangeMed", { id: id })}
          >
            <Text style={styles.buttonText}>Edit Reminder</Text>
          </TouchableOpacity>
      </LinearGradient>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: -50,
    top:-100,
  },
  medicineImage: {
    width: 100,
    height: 100,
  },
  medicineName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  reminderTimesContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  dosageTime: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dosageTime1: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft:40,
  },
  dosageTime2: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft:0,
  },
  reminderTimeContainer: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 8,
    marginRight: 10,
    left:10,
  },
  reminderTime: {
    top:2,
    fontSize: 13,
    marginBottom: 5,
    marginRight: 2,
  },
  quantityContainer: {
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:30,
  },
  quantityContainer1: {
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:0,
  },
  quantity: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 5,
    color: Color.colorPurple,
  },
  quantity1: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 5,
    color: Color.colorPurple,
  },
  button: {
    height: "6.16%",
    width: "69.33%",
    top: 20,
    right: "15.2%",
    bottom: "36.58%",
    left: "0.47%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    alignItems: "center",
  },
  buttonText: {
    top: 10,
    color: "white",
    fontSize: 16,
  },
});

export default MedDetail;

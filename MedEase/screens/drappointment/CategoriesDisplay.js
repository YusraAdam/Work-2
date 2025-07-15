import * as React from "react";
import { useState , useEffect} from "react";
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
  FlatList,
  navigation,
  Modal
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getFirestore, collection, getDocs,query, where } from '@firebase/firestore';


const HospitalsDisplay = ({ navigation }) => {
  const [hospitalsData, setHospitalsData] = useState([]);
  const deviceWidth = Dimensions.get('window').width;
  const dynamicWidth = deviceWidth * 0.45;

  
  useEffect(() => {
    const fetchHospitalsData = async () => {
      const db = getFirestore();
      const hospitalsCollection = collection(db, 'allCategories'); // Replace with your Firestore collection name
      const hospitalsSnapshot = await getDocs(hospitalsCollection);
      const data = hospitalsSnapshot.docs.map(doc => doc.data());
      setHospitalsData(data);
    };

    fetchHospitalsData();
  }, []);
 
  



  const renderHospitalBoxes = ({ item }) => (
    <TouchableOpacity
      style={{
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        width: dynamicWidth,
        alignContent: "center",
      }}
            onPress={() => navigation.navigate('DoctorsList', { CategoryName: item.cat_name })}

    >
      <Image
        source={{ uri: item.cat_logo }} // Assuming hosp_logo is the field containing the image URL
        style={{ width: '100%', height: 100, borderRadius: 10,resizeMode: 'contain' }}
      />
      <Text style={{ fontWeight: 'bold', marginTop: 10 ,  justifyContent: 'center', textAlign: 'center'}}>{item.cat_name}</Text>
    </TouchableOpacity>
  );
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <><FlatList
      
      ListHeaderComponent={() => (
        <LinearGradient
         style={{ flex: 1, paddingTop: 10 ,paddingBottom: 480}}
          locations={[0, 0.3, 8.5, 1]}
          colors={['rgba(252, 252, 252, 0)', 'rgba(231, 205, 230, 0.2)', 'rgba(172, 86, 188, 0.5)', '#a2429e']}
       
        ><FlatList
              data={hospitalsData}
              renderItem={renderHospitalBoxes}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2} // You can adjust the number of columns as needed
          />
           {/* Modal for no doctors available
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              No doctors available for {selectedCategory}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{ backgroundColor: '#a2429e', padding: 10, borderRadius: 5 }}
            >
              <Text style={{ color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </LinearGradient>
      )}
          
    />
            
    </>
   
  );
};


export default HospitalsDisplay;

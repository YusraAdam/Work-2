import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, Modal , TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontSize, FontFamily, Border } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';

const AvailabilityScreen = ({ doctorsData }) => {
  const [categories, setCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get('window').width;
  const dynamicWidth = deviceWidth * 0.85;
  const [selectedDoctor, setSelectedDoctor] = useState(null);
const [isModalVisible, setModalVisible] = useState(false);

    const navigateToAppointment = (hospitalLink) => {
    Linking.openURL(hospitalLink);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const db = getFirestore();
      const categoriesCollection = collection(db, 'allCategories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesData = categoriesSnapshot.docs.map(doc => doc.data());
      setCategories(categoriesData);
    };

    const fetchDoctors = async () => {
      const db = getFirestore();
      const doctorsCollection = collection(db, 'alldrs');
      const doctorsSnapshot = await getDocs(doctorsCollection);
      const doctorsData = doctorsSnapshot.docs.map(doc => doc.data());
      setDoctors(doctorsData);
    };

    const fetchHospitals = async () => {
      const db = getFirestore();
      const hospitalsCollection = collection(db, 'allHospitals');
      const hospitalsSnapshot = await getDocs(hospitalsCollection);
      const hospitalsData = hospitalsSnapshot.docs.map(doc => doc.data());
      setHospitals(hospitalsData);


    };

    fetchCategories();
    fetchDoctors();
    fetchHospitals();
  }, []);

  const navigateToDisplay = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleSearch = () => {
    // Your search logic
  };

  useFocusEffect(
    React.useCallback(() => {
      // Your focus effect logic
    }, [])
  );


const handleDoctorPress = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDoctor(null);
  };
  const renderCategory = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4}  onPress={() => navigation.navigate('DoctorsList', { CategoryName: item.cat_name })}>
      <View style={{ marginRight: 20, width: 100, alignItems: 'center' }}>
        <View style={{ borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff', width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 50, height: 50 ,resizeMode: 'contain'}} source={{ uri: item.cat_logo }} />
          <Text style={{ marginTop: 5, textAlign: 'center' }}>{item.cat_name}</Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );
  const renderDoctor = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4} onPress={() => handleDoctorPress(item)}>
      <View style={{ marginRight: 20, width: 100, alignItems: 'center' }}>
        <View style={{ borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff', width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 50, height: 50,resizeMode: 'contain' }} source={{ uri: item.dr_pic }} />
          <Text style={{ marginTop: 5, textAlign: 'center' }}>{item.dr_name}</Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );

  const renderHospital = ({ item }) => (
    <TouchableOpacity activeOpacity={0.4}   onPress={() => navigation.navigate('DoctorsList', { hospitalName: item.hosp_name })}>
      <View style={{ marginRight: 20, width: 100, alignItems: 'center' }}>
        <View style={{ borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff', width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 100, height: 30,resizeMode: 'contain' }} source={{ uri: item.hosp_logo }} />
          <Text style={{ marginTop: 5, textAlign: 'center' }}>{item.hosp_name}</Text>

        </View>
        
      </View>
    </TouchableOpacity>
  );


  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          style={{ flex: 1, paddingTop: 10 ,paddingBottom: 80}}
          locations={[0, 0.3, 8.5, 1]}
          colors={['rgba(252, 252, 252, 0)', 'rgba(231, 205, 230, 0.2)', 'rgba(172, 86, 188, 0.5)', '#a2429e']}
        >
          {/* Search Bar Section */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop:40, }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize:25, fontWeight: 'bold', color: Color.colorDarkslateblue, marginLeft:4 }}>Find Your Required Doctor</Text>
            </View>
            <TouchableOpacity onPress={() => navigateToDisplay('DoctorsDisplay')}>
              <Image style={{ width: 50, height: 50, marginRight:3 }} source={require('../../assets/icons8-doctor-64.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flex: 1, borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff' , marginLeft:3, marginRight:3}}>
              <TextInput
                style={{ height: 40, borderColor:  Color.colorDarkslateblue, borderWidth: 1, paddingLeft: 10, borderRadius: 10 }}
                placeholder="Search by Category"
                placeholderTextColor="#8c8c8c"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                onSubmitEditing={handleSearch}
              />
            </View>
           </View>

          {/* Online Doctor Image Section */}
            <Image
              style={{ width:290, marginLeft:35, height: 250 ,marginTop:0}}
              resizeMode="cover"
              source={require('../../assets/online-doctoramico-1.png')}
            />
{/* Categories Section */}
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10,color: '#000' }}>Categories</Text>
              <TouchableOpacity onPress={() => navigateToDisplay('CategoriesDisplay')}>
                <Text style={{color: '#000', marginRight:8, fontSize: 16, fontWeight: 'bold'}}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>

          {/* Doctors Section */}
          <View style={{  marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10,color: '#000'}}>Doctors</Text>
              <TouchableOpacity onPress={() => navigateToDisplay('DoctorsDisplay')}>
                <Text style={{color: '#000', marginRight:8, fontSize: 16, fontWeight: 'bold' }}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={doctors}
              renderItem={renderDoctor}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>

          {/* Hospitals Section */}
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 20,  fontWeight: 'bold', paddingLeft: 10,color: '#000' }}>Hospitals</Text>
              <TouchableOpacity onPress={() => navigateToDisplay('HospitalsDisplay')}>
                <Text style={{ color: '#000', marginRight:8, fontSize: 16, fontWeight: 'bold' }}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={hospitals}
              renderItem={renderHospital}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>
        </LinearGradient>
      </ScrollView>
      <Navbar/>
    </>
  );
};

export default AvailabilityScreen;

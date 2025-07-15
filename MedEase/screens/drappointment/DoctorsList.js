// DoctorsList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,Dimensions, TouchableOpacity,Image, navigation } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, collection, getDocs, query, where } from '@firebase/firestore';
 import { LinearGradient } from "expo-linear-gradient";
import Modal from 'react-native-modal';


const DoctorsList = ({navigation}) => {
  const route = useRoute();
  const { hospitalName } = route.params;
  const { CategoryName } = route.params;
  const [doctorsList, setDoctorsList] = useState([]);
  const [isNoDoctorModalVisible, setNoDoctorModalVisible] = useState(false);
  const [isNoDoctorModalVisiblecat, setNoDoctorModalVisiblecat] = useState(false);

    
  useEffect(() => {
    const fetchDoctorsData = async () => {
      const db = getFirestore();
      const doctorsCollection = collection(db, 'alldrs');
      const doctorsQuery = query(doctorsCollection, where('dr_hosp', '==', hospitalName));
      const doctorsSnapshot = await getDocs(doctorsQuery);
      const data = doctorsSnapshot.docs.map(doc => doc.data());
        setDoctorsList(data);
        
        // Show modal if there are no doctors
        if (data.length === 0) {
            setNoDoctorModalVisible(true);
        }
    };
    
    const fetchDoctorsDataCat = async () => {
      try {
        const db = getFirestore();
        const doctorsCollection = collection(db, 'alldrs');
              const doctorsQuery = query(doctorsCollection, where('dr_sp', '==', CategoryName));
        const doctorsSnapshot = await getDocs(doctorsQuery);
        const allDoctorsData = doctorsSnapshot.docs.map(doc => doc.data());


        setDoctorsList(allDoctorsData);

         // Show modal if there are no doctors
        if (allDoctorsData.length === 0) {
          setNoDoctorModalVisiblecat(true);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctorsDataCat();
    fetchDoctorsData();
  }, [hospitalName],[CategoryName]);
    
    const closeModalhosp = () => {
        setNoDoctorModalVisible(false);
            navigation.navigate('HospitalsDisplay'); // Navigate back to HospitalsDisplay

    // Additional actions if needed
  };
  const closeModalcat = () => {
        setNoDoctorModalVisiblecat(false);
            navigation.navigate('CategoriesDisplay'); // Navigate back to HospitalsDisplay

    // Additional actions if needed
  };

  const calculateBoxWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    return (screenWidth - 12 * (2 + 1)) / 2; // Adjust 20 based on your desired spacing
  };

    
    const renderDoctorItem = ({ item }) => (
  <TouchableOpacity
    style={{ margin: 10, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, width: calculateBoxWidth() }}
    activeOpacity={0.8}
    onPress={() => navigateToAppointment(item.dr_hosp_link)}
  >
    <View style={{ overflow: 'hidden' }}>
      <Image
        style={{ width: '100%', height: 140, borderRadius: 10, resizeMode: 'cover' }}
        source={{ uri: item.dr_pic }}
      />
    </View>
    <Text style={{ fontWeight: 'bold', marginTop: 10, justifyContent: 'center', textAlign: 'center' }}>
      {item.dr_name}
    </Text>
    <Text style={{ color: 'gray', textAlign: 'center' }}>{item.dr_sp1}</Text>
    <Text style={{ color: 'gray', textAlign: 'center' }}>{item.dr_sp2}</Text>
    <Text style={{ fontWeight: '600', textAlign: 'center' }}>{item.dr_hosp}</Text>
    <View style={{ backgroundColor: '#a2429e', marginTop: 'auto', borderRadius: 20, padding: 10, alignSelf: 'bottom' }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Book appointment</Text>
    </View>
  </TouchableOpacity>
);

  return (
    
      <><FlatList
      
      ListHeaderComponent={() => (
        <LinearGradient
  style={{ flex: 1, paddingTop: 10 ,paddingBottom: 980 }}
  locations={[0, 0.3, 8.5, 1]}
  colors={[
    'rgba(252, 252, 252, 0)',
    'rgba(231, 205, 230, 0.2)',
    'rgba(172, 86, 188, 0.5)',
    '#a2429e',
  ]}
>
  <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginVertical: 10, paddingTop: 40 }}>
Available Doctors   </Text>
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
    {/* Render your hospital boxes here */}
    <FlatList
      data={doctorsList}
      renderItem={renderDoctorItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
    />
  </View>
</LinearGradient>
      )}
          
      />
          {/* Modal for No Doctor Available */}
<Modal isVisible={isNoDoctorModalVisible}>
  <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor:'rgba(172, 86, 188, 0.5)', }}>
    <Text style={{ color: 'white', marginTop: 20, textAlign: 'center' }}>No doctor available at this hospital</Text>
                  <TouchableOpacity onPress={closeModalhosp} style={{ marginTop: 20 }}>
                      
    <View style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#a2429e', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: 'white', fontSize: 16 }}>OK</Text>
                          </View>
    </TouchableOpacity>
  </View>
      </Modal>
             {/* Modal for No Doctor Available */}
<Modal isVisible={isNoDoctorModalVisiblecat}>
  <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor:'rgba(172, 86, 188, 0.5)', }}>
          <Text style={{ color: 'white', marginTop: 20, textAlign: 'center' }}>No doctor available for {CategoryName }</Text>
                  <TouchableOpacity onPress={closeModalcat} style={{ marginTop: 20 }}>
                      
    <View style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#a2429e', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: 'white', fontSize: 16 }}>OK</Text>
                          </View>
    </TouchableOpacity>
  </View>
</Modal>

            
    </>
  );
};

export default DoctorsList;

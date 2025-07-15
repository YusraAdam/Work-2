// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // Screens
// import ServicesPage from '../Homepage/ServicesPage';
// import Profile1 from '../Profile/Profile1';
// import Noti from '../Welcome-pages/HomeScreen1';

// //Screen names
// const servicesName = "Services";
// const profileName = "Profile";
// const notiName = "Notification";

// const Tab = createBottomTabNavigator();

// function Navbar() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName={servicesName}
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             let rn = route.name;

//             if (rn === servicesName) {
//               iconName = focused ? 'home' : 'home-outline';

//             } else if (rn === profileName) {
//               iconName = focused ? 'list' : 'list-outline';

//             } else if (rn === notiName) {
//               iconName = focused ? 'settings' : 'settings-outline';
//               <ion-icon name="home-outline"></ion-icon>
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: '#4C0B46',
//           inactiveTintColor: 'black',
//           labelStyle: { paddingBottom : 10, fontSize: 10 },
//          style : { padding: 10, height: 70}
//         }}
//         >

//         <Tab.Screen name="servicesName" component={ServicesPage} />
//         <Tab.Screen name="notiName" component={Noti} />
//         <Tab.Screen name="profileName" component={Profile1} />

//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// export default Navbar;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { NavigationContainer } from '@react-navigation/native';


// const Tab = createBottomTabNavigator();
// const BottomNavBar = () => {
//   const navigation = useNavigation();

//   const navigateTo = useCallback(
//     (tab) => {
//       navigation.navigate(tab);
//     },
//     [navigation]
//   );
// //Screens
// import ServicesPage from '../Homepage/ServicesPage';
// import Profile1 from '../Profile/Profile1';
// import Noti from '../Welcome-pages/HomeScreen1';

// //Screen names
// const servicesName = "Services";
// const profileName = "Profile";
// const notiName = "Notification";

// const Navbar = () => {
//   return (
    
//     <Tab.Navigator

//     screenOptions={({ route }) => ({
//           tabBarVisible: false,
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === servicesName ) {
//               iconName = 'home';
//             } else if (route.name === profileName) {
//               iconName = 'person';
//             } else if (route.name === notiName) {
//               iconName = 'notifications';
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: '#4C0B46',
//           inactiveTintColor: 'white',
//           style: {
//             backgroundColor: 'purple',
//             height: 90, // Adjust as needed
//             borderTopWidth: 0, // Remove top border
//           },
//         }}
//       >
//         <Tab.Screen 
//         name={servicesName} 
//         component={ServicesPage}
//         listeners={({ navigation }) => ({
//             tabPress: (e) => {
//               e.preventDefault();
//               navigateTo('Home');
//             },
//           })}
//           options={{
//             tabBarIcon: ({ color }) => (
//               <FontAwesome name="home" size={30} color={color} />
//             ),
//           }} />
//         <Tab.Screen name={notiName} component={Noti} />
//         <Tab.Screen name={profileName} component={Profile1} />
//     </Tab.Navigator>
//   );
// };

// export default Navbar;



// import React, { useCallback } from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesome } from '@expo/vector-icons';

// const Tab = createBottomTabNavigator();

// //Screens
// import ServicesPage from '../Homepage/ServicesPage';
// import Profile1 from '../Profile/Profile1';
// import Noti from '../Welcome-pages/HomeScreen1';

// //Screen names
// const servicesName = "Services";
// const profileName = "Profile";
// const notiName = "Notification";

// const BottomNavBar = () => {
//   const navigation = useNavigation();
//   const navigateTo = useCallback(
//     (tab) => {
//       navigation.navigate(tab);
//     },
//     [navigation]
//   );

//   return (
//       <Tab.Navigator
//         tabBarOptions={{
//           style: { backgroundColor: '#8A3887' },
//           activeTintColor: '#4C0B46',
//           inactiveTintColor: '#8A3887',
//         }}
//       >
//         <Tab.Screen
//           name={servicesName} 
//         component={ServicesPage}
//         initialParams={{ activeIcon: false }}
//           listeners={({ navigation }) => ({
//             tabPress: (e) => {
//               e.preventDefault();
//               navigateTo('ServicesPage');
//             },
//           })}
//           options={{
//             tabBarIcon: ({ color }) => (
//               <FontAwesome name="home" size={30} color={color} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name={notiName} component={Noti}
//           initialParams={{ activeIcon: false }}
//           listeners={({ navigation }) => ({
//             tabPress: (e) => {
//               e.preventDefault();
//               navigateTo('Noti');
//             },
//           })}
//           options={{
//             tabBarIcon: ({ color }) => (
//               <FontAwesome name="bell" size={30} color={color} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name={profileName} component={Profile1}
//           initialParams={{ activeIcon: false }}
//           listeners={({ navigation }) => ({
//             tabPress: (e) => {
//               e.preventDefault();
//               navigateTo('Profile1');
//             },
//           })}
//           options={{
//             tabBarIcon: ({ color }) => (
//               <FontAwesome name="user" size={30} color={color} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//   );
// };

// export default BottomNavBar;



// import React, { useCallback } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesome } from '@expo/vector-icons';

// const Tab = createBottomTabNavigator();

// // Screens
// import ServicesPage from '../Homepage/ServicesPage';
// import Profile1 from '../Profile/Profile1';
// import Noti from '../Welcome-pages/HomeScreen1';

// // Screen names
// const servicesName = "Services";
// const profileName = "Profile";
// const notiName = "Notification";

// const BottomNavBar = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   const getTabBarIconOpacity = (routeName) => {
//     const focusedRoute = route.state ? route.state.routes.find((r) => r.name === routeName) : null;
//     return focusedRoute ? 1 : 0.5;
//   };

//   const navigateTo = useCallback(
//     (tab) => {
//       navigation.navigate(tab);
//     },
//     [navigation]
//   );

//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         style: { backgroundColor: '#8A3887' },
//         activeTintColor: '#4C0B46',
//         inactiveTintColor: '#8A3887',
//       }}
//     >
//       <Tab.Screen
//         name={servicesName}
//         component={ServicesPage}
//         listeners={({ navigation }) => ({
//           tabPress: (e) => {
//             e.preventDefault();
//             navigateTo('ServicesPage');
//           },
//         })}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome
//               name="home"
//               size={30}
//               color={color}
//               style={{ opacity: getTabBarIconOpacity(servicesName) }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name={notiName}
//         component={Noti}
//         listeners={({ navigation }) => ({
//           tabPress: (e) => {
//             e.preventDefault();
//             navigateTo('Noti');
//           },
//         })}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome
//               name="bell"
//               size={30}
//               color={color}
//               style={{ opacity: getTabBarIconOpacity(notiName) }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name={profileName}
//         component={Profile1}
//         listeners={({ navigation }) => ({
//           tabPress: (e) => {
//             e.preventDefault();
//             navigateTo('Profile1');
//           },
//         })}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome
//               name="user"
//               size={30}
//               color={color}
//               style={{ opacity: getTabBarIconOpacity(profileName) }}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomNavBar;




// import { View, Text } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import {
//     SimpleLineIcons,
//     AntDesign,
//     MaterialIcons,
//     Fontisto,
//     MaterialCommunityIcons,
//     Entypo,
//     Ionicons,
// } from '@expo/vector-icons'
// import React from 'react'
// import { Platform } from 'react-native'
// import { COLORS } from '../../constants/theme'
// // Screens
// import ServicesPage from '../Homepage/ServicesPage';
// import Profile1 from '../Profile/Profile1';
// import Noti from '../Welcome-pages/HomeScreen1';
// import Chatbot from '../Chatbot/ChatPage';
// import Reminder from './../Med-Reminders/Reminder';
// //const ServicesPage = React.lazy(() => import('../navbar-footer/Navbar'));

// // Screen names
// const servicesName = "Services";
// const profileName = "Profile";
// const notiName = "Notification";
// const chatbot = "Chatbot";
// const reminder = "Reminder"

// const Tab = createBottomTabNavigator()

// const screenOptions = {
//     tabBarShowLabel: false,
//     headerShown: false,
//     tabBarHideOnKeyboard: true,
//     tabBarStyle: {
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         left: 0,
//         elevation: 0,
//         height: 60,
//         background: COLORS.primary,
//     },
// }
// const BottomTabNavigation = () => {
//     return (
//         <Tab.Navigator screenOptions={screenOptions}>
//             <Tab.Screen
//                  name={servicesName}
//                 component={ServicesPage}
//                 options={{
//                     tabBarIcon: ({ focused }) => {
//                         return (
//                             <Entypo
//                                 name="home"
//                                 size={35}
//                                // onPress={() => navigation.navigate("ServicesPage")}
//                                 color={
//                                     focused
//                                         ? COLORS.primary
//                                         : COLORS.secondaryBlack
//                                 }
//                             />
//                         )
//                     },
//                 }}
//             />
  

//             <Tab.Screen
//                 name={chatbot}
//                 component={Chatbot}
//                 options={{
//                     tabBarIcon: ({ focused }) => {
//                         return (
//                             <View
//                                 style={{
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     backgroundColor: COLORS.primary,
//                                     height: Platform.OS == 'ios' ? 50 : 60,
//                                     width: Platform.OS == 'ios' ? 50 : 60,
//                                     top: Platform.OS == 'ios' ? -10 : -20,
//                                     borderRadius:
//                                         Platform.OS == 'ios' ? 25 : 30,
//                                     borderWidth: 2,
//                                     borderColor: COLORS.white,
//                                 }}
//                             >
//                                 <MaterialCommunityIcons
//                                     name="robot-happy"
//                                     size={35}
//                                     color={COLORS.white}
//                                 />
//                             </View>
//                         )
//                     },
//                 }}
//             />

//             <Tab.Screen
//                 name={profileName}
//                 component={Profile1}
//                 options={{
//                     tabBarIcon: ({ focused }) => {
//                         return (
//                             <Ionicons
//                                 name="person"
//                                 size={35}
//                                 color={
//                                     focused
//                                         ? COLORS.primary
//                                         : COLORS.secondaryBlack
//                                 }
//                             />
//                         )
//                     },
//                 }}
//             />
//         </Tab.Navigator>
//     )
// }

// export default BottomTabNavigation



import { View, TouchableOpacity } from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import { collection, getDoc, doc, getFirestore } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';

const BottomTabNavigation = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchUserType = async () => {
      const userId = FIREBASE_AUTH.currentUser.uid;
      // console.log(userId);
      try {
        const userDocRef = doc(FIREBASE_DB, "usersInfo", userId);
        const usersInfoDoc = await getDoc(userDocRef);
        // console.log(usersInfoDoc);
        const hspDocRef = doc(FIREBASE_DB, "hspInfo", userId);
        const hspInfoDoc = await getDoc(hspDocRef);

        if (usersInfoDoc.exists()) {
          setUserType('patient');
        } else if (hspInfoDoc.exists()) {
          setUserType('hsp');
          
        }
      } catch (error) {
        console.error('Error fetching user information', error);
      }
    };

    fetchUserType();
  }, []);

  const renderTouchableIcon = (iconComponent, screenName) => (
    <TouchableOpacity
      style={styles.tabBarButton}
      onPress={() => navigation.navigate(screenName)}
      activeOpacity={0.7}
    >
      {iconComponent}
    </TouchableOpacity>
  );

  // Set default screen names for patient
  // console.log(userType);
  let homeScreenName = 'ServicesPage';
  let profileScreenName = 'Profile1';

  // Update screen names for hsp
  if (userType === 'hsp') {
    // console.log(userType);
    homeScreenName = 'ServicesPageHSP';
    profileScreenName = 'ProfileDisplayHSP';
  }

  return (
    <View style={styles.container}>
      {renderTouchableIcon(
        <Entypo name="home" size={35} color={COLORS.secondaryBlack} />,
        homeScreenName
        
      )}
      {renderTouchableIcon(
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            height: Platform.OS == 'ios' ? 50 : 60,
            width: Platform.OS == 'ios' ? 50 : 60,
            top: Platform.OS == 'ios' ? -10 : -20,
            borderRadius: Platform.OS == 'ios' ? 25 : 30,
            borderWidth: 2,
            borderColor: COLORS.white,
          }}
        >
          <MaterialCommunityIcons
            name="robot-happy"
            size={35}
            color={COLORS.white}
          />
        </View>,
        'ChatPage'
      )}
      {renderTouchableIcon(
        <Ionicons name="person" size={35} color={COLORS.secondaryBlack} />,
        profileScreenName
      )}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default BottomTabNavigation;


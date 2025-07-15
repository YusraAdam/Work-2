//Pushed 28 jan 2024
const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Favourites from "./screens/Med-wiki/Favourites";
import HomePageBloodbank from "./screens/Bloodbank/HomePageBloodbank";
import ChatPage from "./screens/Chatbot/ChatPage";
import HomePageChatbot from "./screens/Chatbot/HomePageChatbot";
import Drugs from "./screens/Pharmacy/Drugs";
import Pharmicies from "./screens/Pharmacy/Pharmicies";
import DrugsFav from "./screens/Pharmacy/DrugsFav";
import SearchResult from "./screens/Pharmacy/SearchResult";
import HomePagePharmacy from "./screens/Pharmacy/HomePagePharmacy";
import ChangeMed from "./screens/Med-Reminders/ChangeMed";
import MedDetail from "./screens/Med-Reminders/MedDetail";
import Reminder from "./screens/Med-Reminders/Reminder";
import RemoveArticle from "./screens/News-board/RemoveArticle";
import SavedArticles from "./screens/News-board/SavedArticles";
import DetailedArticle from "./screens/News-board/DetailedArticle";
import AllNews from "./screens/News-board/AllNews";
import HomePageNewsboard from "./screens/News-board/HomePageNewsboard";
//import HomeScreen from "./screens/Med-wiki/HomeScreen";
import MedicinesPage from "./screens/Med-wiki/MedicinesPage";
import HomePageWiki from "./screens/Med-wiki/HomePageWiki";
import DoctorsDisplay from "./screens/drappointment/DoctorsDisplay";
import BookedAppointment from "./screens/drappointment/BookedAppointment";
import AvailabilityScreen from "./screens/drappointment/AvailabilityScreen";
import HomePageDoctorApp from "./screens/drappointment/HomePageDoctorApp";
import AddMed from "./screens/Med-Reminders/AddMed";
import HomePageReminders from "./screens/Med-Reminders/HomePageReminders";
import ServicesPage from "./screens/Homepage/ServicesPage";
 import ProfileSetupPatient from "./screens/Profile/ProfileSetupPatient";
 import ProfileSetupHSP from "./screens/Profile/ProfileSetupHSP";
 import SignUp from "./screens/signup/SignUp";
 import PharmacyHomepage from "./screens/Pharmacy/PharmacyHomepage";
import Login from "./screens/login/Login";
 import HomeScreen2 from "./screens/Welcome-pages/HomeScreen2";
 import Profile1 from "./screens/Profile/Profile1";
 import ProfileDisplayHSP from "./screens/Profile/ProfileDisplayHSP";
import DisplayEmergency from './screens/Emergency/DisplayEmergency'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import HomeScreen1 from './screens/Welcome-pages/HomeScreen1';
import Navbar from './screens/navbar-footer/Navbar';
import ResetPasswordEmail from './screens/login/ResetPasswordEmail';
import DisplayPage from './screens/Bloodbank/DisplayPage';
import AllBlood from './screens/Bloodbank/AllBlood';
import HomepageEmergency from "./screens/Emergency/HomepageEmergency";
import TypeDetail from "./screens/Emergency/TypeDetail";
import HomepageTest from "./screens/Testschedule/HomepageTest";
import DisplayTest from "./screens/Testschedule/DisplayTest";
import ManageTest from "./screens/Testschedule/ManageTest";
import HeartRateInput from "./screens/Testschedule/HeartRateInput";
import SearchResults from "./screens/News-board/SearchResults";
import DetailedHelp from "./screens/Emergency/DetailedHelp";
import SavedHelp from "./screens/Emergency/SavedHelp";
import ServicesPageHSP from "./screens/Homepage/ServicesPageHSP";
import SeeAllHelpline from "./screens/Emergency/SeeAllHelpline";
import SeeAllFirstAid from "./screens/Emergency/SeeAllFirstAid";
import SeeAllDisaster from "./screens/Emergency/SeeAllDisaster";
import HospitalsDisplay from "./screens/drappointment/HospitalsDisplay";
import CategoriesDisplay from "./screens/drappointment/CategoriesDisplay";
import SearchResultBlood from "./screens/Bloodbank/SearchResultBlood";
import DoctorsList from "./screens/drappointment/DoctorsList";
import NoResult from "./screens/Pharmacy/NoResult";
import PharmDrugs from "./screens/Pharmacy/PharmDrugs";
import SavedBloodBank from "./screens/Bloodbank/SavedBloodBank";
import BloodSugar from "./screens/Testschedule/BloodSugar";
import BloodPressure from "./screens/Testschedule/BloodPressure"
import { useState,useEffect } from "react";
import SeeAllArticles from "./screens/News-board/SeeAllArticles";
import LabTests from "./screens/Testschedule/LabTests";
import { getAuth } from 'firebase/auth';
import HomeScreen from "./screens/Med-wiki/HomeScreen";
window.navigator.userAgent = "ReactNative"; // javascript
const App = ({}) => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(authUser => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 6000);
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
    
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {user ? (
          <>
          <Stack.Screen 
          name="ServicesPage" 
          component={ServicesPage} 
          options={{ headerShown: false }}
          />
          <Stack.Screen
              name="ServicesPageHSP"
              component={ServicesPageHSP}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="BloodPressure"
              component={BloodPressure}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SeeAllArticles"
              component={SeeAllArticles}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SavedBloodBank"
              component={SavedBloodBank}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PharmDrugs"
              component={PharmDrugs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NoResult"
              component={NoResult}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DoctorsList"
              component={DoctorsList} 
              options={{ headerShown: false }}
              />

            <Stack.Screen
              name="ProfileSetupHSP"
              component={ProfileSetupHSP}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileDisplayHSP"
              component={ProfileDisplayHSP}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="BloodSugar"
              component={BloodSugar} 
              options={{ headerShown: false }}
              />
            
            <Stack.Screen
              name="SearchResultBlood"
              component={SearchResultBlood}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HospitalsDisplay"
              component={HospitalsDisplay}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CategoriesDisplay"
              component={CategoriesDisplay}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="LabTests"
              component={LabTests}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SeeAllDisaster"
              component={SeeAllDisaster}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SeeAllFirstAid"
              component={SeeAllFirstAid}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="DetailedHelp"
              component={DetailedHelp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SavedHelp"
              component={SavedHelp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SeeAllHelpline"
              component={SeeAllHelpline}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SearchResults"
              component={SearchResults}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="HomePageBloodbank"
              component={HomePageBloodbank}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="HeartRateInput"
              component={HeartRateInput}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DisplayPage"
              component={DisplayPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchResult"
              component={SearchResult}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BookedAppointment"
              component={BookedAppointment}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="ManageTest"
              component={ManageTest}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomepageTest"
              component={HomepageTest}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favourites"
              component={Favourites}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="DisplayTest"
              component={DisplayTest}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="AllBlood"
              component={AllBlood}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatPage"
              component={ChatPage}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="TypeDetail"
              component={TypeDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePageChatbot"
              component={HomePageChatbot}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Drugs"
              component={Drugs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Pharmicies"
              component={Pharmicies}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DrugsFav"
              component={DrugsFav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePagePharmacy"
              component={HomePagePharmacy}
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="ChangeMed"
              component={ChangeMed}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MedDetail"
              component={MedDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Reminder"
              component={Reminder}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RemoveArticle"
              component={RemoveArticle}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SavedArticles"
              component={SavedArticles}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetailedArticle"
              component={DetailedArticle}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllNews"
              component={AllNews}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePageNewsboard"
              component={HomePageNewsboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreen"
                component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MedicinesPage"
              component={MedicinesPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePageWiki"
              component={HomePageWiki}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DoctorsDisplay"
              component={DoctorsDisplay}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AvailabilityScreen"
              component={AvailabilityScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePageDoctorApp"
              component={HomePageDoctorApp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddMed"
              component={AddMed}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePageReminders"
              component={HomePageReminders}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DisplayEmergency"
              component={DisplayEmergency}
    
              options={{ headerShown: false }}

            />
            <Stack.Screen
              name="HomepageEmergency"
              component={HomepageEmergency}
    
              options={{ headerShown: false }}

            />
            <Stack.Screen
              name="ProfileSetupPatient"
              component={ProfileSetupPatient}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PharmacyHomepage"
              component={PharmacyHomepage}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="Profile1"
              component={Profile1}
              options={{ headerShown: false }}
            /> 
          </>
        ) : (
          <>
          {!hideSplashScreen && (
  <Stack.Screen name="HomeScreen1" component={HomeScreen1} options={{ headerShown: false }}/>
)}

            <Stack.Screen name="HomeScreen2" component={HomeScreen2} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen
              name="ResetPasswordEmail"
              component={ResetPasswordEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
      
    </>
  );
};
export default App;

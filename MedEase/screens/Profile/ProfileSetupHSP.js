import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { FontFamily, Color, Border, FontSize, Padding } from "../../GlobalStyles";
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from '../../firebaseConfig';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadString, uploadBytes,getDownloadURL } from "firebase/storage";

const ProfileSetupHSP = () => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.001; 
  const dynamicWidth = deviceWidth * 0.83;
  const dynamicPaddingTopIcon = deviceHeight * 0.063; 
  const dynamicPaddingTopIcon1 = deviceHeight * 0.145;
  const dynamicPaddingLeftIcon = deviceHeight * 0.009; 
  const dynamicPaddingLeftIcon1 = deviceHeight * 0.03; 
  const dynamicPaddingLeft = deviceWidth * 0.33;
  const dynamicPaddingLeft1 = deviceWidth * 0.005;
  const dynamicPaddingLeft2 = deviceWidth * 0.01;
  const dynamicPaddingRight = deviceWidth * 10;
  const [selectedGender, setSelectedGender] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [isBloodGroupDropdownOpen, setIsBloodGroupDropdownOpen] = useState(false);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [medicalHistoryError, setMedicalHistoryError] = useState("");
  const [bodyWeightError, setBodyWeightError] = useState("");
  const [bloodGroupError, setBloodGroupError] = useState("");
  const validateFields = () => {
    let isValid = true;

    if (!selectedGender) {
      setGenderError("Gender is required");
      isValid = false;
    } else {
      setGenderError("");
    }

    if (!dob) {
      setDobError("Date of Birth is required");
      isValid = false;
    } else {
      setDobError("");
    }

    if (!age) {
      setAgeError("Age is required");
      isValid = false;
    } else {
      setAgeError("");
    }

    // if (!medicalHistory) {
    //   setMedicalHistoryError("Medical history is required");
    //   isValid = false;
    // } else {
    //   setMedicalHistoryError("");
    // }

    // if (!bodyWeight) {
    //   setBodyWeightError("Body Weight is required");
    //   isValid = false;
    // } else {
    //   setBodyWeightError("");
    // }

    // if (!selectedBloodGroup) {
    //   setBloodGroupError("Blood Group is required");
    //   isValid = false;
    // } else {
    //   setBloodGroupError("");
    // }

    return isValid;
  };
  const updateUserInfo = async (userId, downloadURL) => {
    try {
      // Fetch the existing user information
      const userDocRef = doc(FIREBASE_DB, "hspInfo", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      // Get the existing user data
      const existingUserData = userDocSnapshot.data();

      // Update the user information
      const updatedUserData = {
        ...existingUserData,
        profilePhoto: downloadURL, // Save download URL of profile image
        gender: selectedGender,
            dob: dob,
            age: age,
            speciality: speciality,
            experience: experience,
            practice: practice,
      };

      // Save the updated user information back to Firestore
      await setDoc(userDocRef, updatedUserData);

      console.log("Written");

      // Navigate to the next screen (ServicesPage)
      navigation.navigate("ServicesPageHSP");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };
  const uploadProfileImage = async (userId) => {
    if (profileImage) {
      const imageUri = profileImage;
      const response = await fetch(imageUri);
      const imageBlob = await response.blob();
  
      // Get the file extension of the selected image
      const fileExtension = imageUri.split('.').pop().toLowerCase();
      
      // Ensure that the file extension is either PNG or JPG
      if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
        // Construct the storage path with the desired file extension
        const storagePath = `profilePhotos/${userId}.${fileExtension}`;
  
        // Upload the image blob to Firebase Storage using uploadBytes
        const storageRef = ref(FIREBASE_STORAGE, storagePath);
        await uploadBytes(storageRef, imageBlob); // Use uploadBytes instead of uploadBlob
  
        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
  
        // Proceed with updating user information with the download URL
        updateUserInfo(userId, downloadURL); // Pass userId to updateUserInfo function
      } else {
        console.error('Unsupported image format. Please select a PNG or JPG image.');
      }
    } else {
      console.error('Profile image is required');
    }
  };
  const navigateToServicesPage = async () => {
    if (validateFields()) {
      const authenticatedUser = FIREBASE_AUTH.currentUser;
  
      if (authenticatedUser) {
        const userId = authenticatedUser.uid; // Retrieve the userId from the authenticated user
  
        try {
          // Upload profile image to Firebase Storage
          await uploadProfileImage(userId); // Pass userId to uploadProfileImage function
  
          // Function to update user information after successful image upload
          const updateUserInfo = async (downloadURL) => {
            // Fetch the existing user information
            const userDocRef = doc(FIREBASE_DB, "hspInfo", userId);
            const userDocSnapshot = await getDoc(userDocRef);
  
            // Get the existing user data
            const existingUserData = userDocSnapshot.data();
  
            // Update the user information
            const updatedUserData = {
              ...existingUserData,
              profilePhoto: downloadURL, // Save download URL of profile image
        gender: selectedGender,
            dob: dob,
            age: age,
            speciality: speciality,
            experience: experience,
            practice: practice,
            };
  
            // Save the updated user information back to Firestore
            await setDoc(userDocRef, updatedUserData);
  
            console.log("Written");
  
            // Navigate to the next screen (ServicesPage)
            navigation.navigate("ServicesPageHSP");
          };
  
          console.log("Profile image uploaded successfully");
        } catch (error) {
          console.error("Error updating user information:", error);
        }
      }
    }
  };
  const toggleBloodGroupDropdown = () => {
    setIsBloodGroupDropdownOpen(!isBloodGroupDropdownOpen);
  };
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  const [gender, setGender] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [practice, setPractice]= useState('');
  const [bodyWeight, setBodyWeight] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(date.toLocaleDateString());
    hideDatePicker();
  };
  const genderOptions = ['Male', 'Female'];
  const bloodGroupOptions = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ];
  const [bloodGroupPaddingLeft, setBloodGroupPaddingLeft] = useState(30);

  const handleBloodGroupSelection = (selectedItem, index) => {
    setBloodGroupPaddingLeft(selectedItem === 'Select Blood Group' ? -60 : 0);
    setSelectedBloodGroup(selectedItem);
    setBloodGroup(selectedItem === 'Select Blood Group' ? '' : selectedItem);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <LinearGradient
      style={styles.profilesetupPatient}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >
    <View style={[styles.topBar, styles.topBarPosition, {left: dynamicPaddingLeft1}]}>
        <View style={styles.rectangle} />
        <View style={styles.title}>
          <Text style={[styles.findANear, styles.dentalTypo]}>
          Set Up Your Profile
          </Text>
      
      </View>
      </View>
      <TouchableOpacity
        style={[styles.button]}
        activeOpacity={0.7}
        onPress={navigateToServicesPage}
      >
        <Text style={[styles.letsGo, {left:dynamicPaddingLeft2}]}>Done</Text>
      </TouchableOpacity>
      <View style={[styles.container, {left:dynamicPaddingLeft}]}>
                {
                    profileImage  && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200 }} />
                }
                    <View style={styles.uploadBtnContainer}>
                        <TouchableOpacity onPress={pickImage} style={styles.uploadBtn} >
                            <Text style={styles.upload}>{profileImage ? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} top={4} color="black" />
                        </TouchableOpacity>
                    </View>
            </View>
      <View style={[styles.inputFields, {width:dynamicWidth}]}>
      <SelectDropdown
          data={genderOptions}
          defaultButtonText={selectedGender || "Select gender"}
          onSelect={(selectedItem, index) => {
            setSelectedGender(selectedItem === "Select gender" ? "" : selectedItem);
            toggleDropdown();
          }}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
          buttonStyle={[styles.input, styles.inputLayout1, { color: '#808080', paddingLeft: -10}]}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          containerStyle={styles.dropdownContainer}
          renderCustomizedButtonChild={() => (
            <Text style={[styles.dropdownButtonText, { color: selectedGender ? "#000000" : "#808080" }]}>
              {selectedGender || "Select gender"}
            </Text>
          )}
          onDropdownOpen={() => toggleDropdown()}
          onDropdownClose={() => toggleDropdown()}

        />
        {/* <Text style={{ color: "red" }}>{genderError}</Text> */}
        {/* <TextInput
          style={[styles.input, styles.inputLayout]}
          placeholder="Gender"
          placeholderTextColor="#a0a8b0"
        /> */}
        <Image
            style={[styles.iconlylightOutlinesearch, styles.iconLayout, {left:dynamicPaddingLeftIcon}]}
            contentFit="cover"
            source={require("../../assets/icons8-gender-50.png")}
          />
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={[styles.input1, styles.inputLayout, { color: '#000000' }]}
            placeholder="dd/mm/yyyy"
            placeholderTextColor="#808080"
            value={dob}
            editable={false}
            onChangeText={(text) => setDob(text)}
          />
          {/* <Text style={{ color: "red" }}>{dobError}</Text> */}
          <Image
            style={[styles.iconlylightOutlinesearch1, styles.iconLayout, { left: dynamicPaddingLeftIcon1 }]}
            contentFit="cover"
            source={require("../../assets/icons8-person-calendar-50.png")}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input1, styles.inputLayout]}
          placeholder="Age"
          placeholderTextColor="#808080"
          value={age}
          onChangeText={(text)=>setAge(text)}
          keyboardType="numeric"
        />
        <Image
            style={[styles.iconlylightOutlinesearch2, styles.iconLayout, {left:dynamicPaddingLeftIcon}]}
            contentFit="cover"
            source={require("../../assets/icons8-age-48.png")}
          />
        <TextInput
          style={[styles.input1, styles.inputLayout]}
          placeholder="Speciality"
          placeholderTextColor="#808080"
          value={speciality}
          onChangeText={(text)=>setSpeciality(text)}
        />
        {/* <Text style={{ color: "red" }}>{medicalHistoryError}</Text> */}
        <Image
            style={[styles.iconlylightOutlinesearch3, styles.iconLayout, {left:dynamicPaddingLeftIcon}]}
            contentFit="cover"
            source={require("../../assets/icons8-medical-50.png")}
          />
        <TextInput
          style={[styles.input1, styles.inputLayout]}
          placeholder="Experience (in years)"
          placeholderTextColor="#808080"
          value={experience}
          onChangeText={(text)=>setExperience(text)}
          keyboardType="numeric"
        />
        <Image
            style={[styles.iconlylightOutlinesearch4, styles.iconLayout, {left:dynamicPaddingLeftIcon}]}
            contentFit="cover"
            source={require("../../assets/icons8-weight-pound-50.png")}
          />
          <TextInput
          style={[styles.input1, styles.inputLayout]}
          placeholder="Practicing hospital"
          placeholderTextColor="#808080"
          value={practice}
          onChangeText={(text)=>setPractice(text)}
        />
        <Image
            style={[styles.iconlylightOutlinesearch5, styles.iconLayout, {left:dynamicPaddingLeftIcon}]}
            contentFit="cover"
            source={require("../../assets/hospitalhsp.png")}
          />
        {/* <SelectDropdown
          data={bloodGroupOptions}
          defaultButtonText={selectedBloodGroup || "Select Blood Group"}
          onSelect={(selectedItem, index) => {
            setSelectedBloodGroup(selectedItem === "Select Blood Group" ? "" : selectedItem);
            toggleBloodGroupDropdown();
          }}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
          buttonStyle={[styles.input, styles.inputLayout2, { color: '#808080', paddingLeft: -10}]}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          containerStyle={styles.dropdownContainer}
          renderCustomizedButtonChild={() => (
            <Text style={[styles.dropdownButtonText, { color: selectedBloodGroup ? "#000000" : "#808080" }]}>
              {selectedBloodGroup || "Select Blood Group"}
            </Text>
          )}
          onDropdownOpen={() => toggleBloodGroupDropdown()}
          onDropdownClose={() => toggleBloodGroupDropdown()}
        />
        {/* <Text style={{ color: "red" }}>{bloodGroupError}</Text> */}
        {/* <Image
            style={[styles.iconlylightOutlinesearch5, styles.iconLayout, {left:dynamicPaddingLeftIcon}]}
            contentFit="cover"
            source={require("../../assets/icons8-blood-sample-50.png")}
          />  */}
      </View>
      <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      {/* <View style={styles.icons8gender} />
      <TouchableOpacity onPress={pickImage}> */}
        {/* <Image
          style={styles.solarcameraBrokenIcon}
          contentFit="cover"
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../assets/solarcamerabroken.png")
          }
        /> */}
      {/* </TouchableOpacity> */}
    </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdownButtonText: {
    left:70,
    fontSize:17,
  },
  dropdownButton1: {
    left:-35,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor:"transparent",
    borderRadius:10,
    borderWidth:2,
  },
  dropdown: {
    marginTop:-38,
    width:320,
    backgroundColor: 'white',
    borderColor:"transparent",
    borderRadius:15,
    borderWidth:2,
  },
  dropdownRow: {
    padding: 10,
  },
  buttonLayout: {
    width: 327,
    position: "absolute",
  },
  input10: {
    fontFamily: FontFamily.interRegular,
    height: 56,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_5xl,
    alignItems: "center",
    width: 327,
    fontSize: FontSize.size_base,
    paddingVertical: Padding.p_0,
  },
  input1: {
    paddingHorizontal: Padding.p_5xl,
    marginTop: 16,
  },
  iconLayout: {
    position: "absolute",
    overflow: "hidden",
  },
  iconlylightOutlinesearch: {
    height: 27,
  width: 30,
  top: 22,
  left: 26.5,
  },
  iconlylightOutlinesearch1: {
    height: 27,
  width: 27,
  top: 30,
  left: 26.5,
  },
  iconlylightOutlinesearch2: {
    height: 27,
  width: 27,
  top: 167,
  left: 26.5,
  },
  iconlylightOutlinesearch3: {
    height: 27,
  width: 27,
  top: 237,
  left: 26.5,
  },
  iconlylightOutlinesearch4: {
    height: 27,
  width: 27,
  top: 310,
  left: 28.5,
  },
  iconlylightOutlinesearch5: {
    height: 27,
  width: 27,
  top: 380,
  left: 28.5,
  },
  upload:{
    top:4,
  },
  container:{
    top:110,
    left:140,
    height:140,
    width:140,
    backgroundColor:Color.colorWhite,
    position:'relative',
    borderRadius:999,
    overflow:'hidden',
},
uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'#C88FC6',
    width:'100%',
    height:'36%',
},
uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
},
  inputLayout: {
    fontFamily: FontFamily.interRegular,
    flexDirection: "row",
    height: 56,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_5xl,
    alignItems: "center",
    width: 327,
    fontSize: FontSize.size_base,
    paddingVertical: Padding.p_0,
  },
  inputLayout1: {
    color:'grey',
    fontFamily: FontFamily.interRegular,
    flexDirection: "row",
    height: 56,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_5xl,
    alignItems: "center",
    width: 327,
    
    fontSize: FontSize.size_base,
    paddingVertical: Padding.p_0,
  },
  inputLayout2: {
    color:'grey',
    fontFamily: FontFamily.interRegular,
    flexDirection: "row",
    height: 56,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_5xl,
    alignItems: "center",
    width: 327,
    top:15,
    fontSize: FontSize.size_base,
    paddingVertical: Padding.p_0,
  },
  profilesetupPatientChild: {
    top: 776,
    left: 0,
    width: 375,
    height: 36,
    position: "absolute",
  },
  profilesetupPatientItem: {
    top: 116,
    left: 138,
    width: 100,
    height: 100,
    position: "absolute",
  },
  setUpYour: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_200,
    textAlign: "center",
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
  title: {
    top: 68,
    left: 0,
    width: 345,
    height: 66,
    position: "absolute",
  },
  findANear: {
    fontSize: FontSize.size_5xl,
    lineHeight: 34,
    width: 250,
    fontWeight: "700",
    color: Color.colorGray_200,
    left: 75,
    top: -7,
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  letsGo: {
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    width: 80,
    height: 29,
    fontSize: FontSize.size_base,
    textAlign: "center",
  },
  button: {
    height: "6.16%",
    width: "69.33%",
    top: "87.25%",
    right: "12.27%",
    bottom: "9.85%",
    left: "16.4%",
    borderRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    justifyContent: "center",
    paddingHorizontal: 87,
    paddingVertical: Padding.p_0,
    alignItems: "flex-end",
    position: "absolute",
  },
  input: {
    paddingHorizontal: 70,
  },
  input1: {
    paddingHorizontal: 70,
    marginTop: 16,
  },
  inputFields: {
    top: 260,
    left: 30,
    height: 256,
    width:340,
    paddingTop: Padding.p_5xs,
    alignItems: "center",
    position: "absolute",
  },
  uitcalenderIcon: {
    top: 558,
    left: 247,
    width: 2,
    height: 2,
    position: "absolute",
    overflow: "hidden",
  },
  icons8gender: {
    top: 526,
    left: 89,
    width: 32,
    height: 32,
    position: "absolute",
    overflow: "hidden",
  },
  solarcameraBrokenIcon: {
    top: 182,
    left: 209,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  profilesetupPatient: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default ProfileSetupHSP;
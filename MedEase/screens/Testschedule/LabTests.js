// // // // // // import React, { useState } from 'react';
// // // // // // import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Button, Modal } from 'react-native';
// // // // // // import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker for file upload
// // // // // // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// // // // // // import { FIREBASE_DB } from '../../firebaseConfig'; // Import your Firebase DB instance

// // // // // // const FolderItem = ({ folderName, folderImage }) => {
// // // // // //   const [expanded, setExpanded] = useState(false);

// // // // // //   const handleAddTest = async () => {
// // // // // //     // Implement logic to add a test file and store it in Firebase
// // // // // //     try {
// // // // // //       // Example code to add a document to the 'allTests' collection in Firebase
// // // // // //       await addDoc(collection(FIREBASE_DB, 'allTests'), {
// // // // // //         folder_name: folderName,
// // // // // //         test_data: 'Example test data', // Replace this with the actual test data
// // // // // //         // You can add more fields as needed
// // // // // //       });
// // // // // //       console.log('Test added successfully!');
// // // // // //     } catch (error) {
// // // // // //       console.error('Error adding test: ', error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginBottom: 20 }}>
// // // // // //       <Image source={folderImage} style={{ width: 100, height: 100 }} />
// // // // // //       <Text style={{ textAlign: 'center' }}>{folderName}</Text>
// // // // // //       {expanded && (
// // // // // //         <TouchableOpacity onPress={handleAddTest} style={{ position: 'absolute', bottom: 0, right: 0 }}>
// // // // // //           <Image source={require('../../assets/urology.png')} style={{ width: 40, height: 40 }} />
// // // // // //         </TouchableOpacity>
// // // // // //       )}
// // // // // //     </TouchableOpacity>
// // // // // //   );
// // // // // // };

// // // // // // const LabTests = () => {
// // // // // //   const folderData = [
// // // // // //     { name: 'General Tests', image: require('../../assets/blood-test.png') },
// // // // // //     { name: 'Ultrasounds', image: require('../../assets/ultrasound.png') },
// // // // // //     { name: 'Cardiovascular', image: require('../../assets/Cardiologist-bro.png') },
// // // // // //     { name: 'Urologic', image: require('../../assets/urology.png') },
// // // // // //     { name: 'Radiology', image: require('../../assets/Radiography-amico.png') },
// // // // // //     { name: 'Endoscopy', image: require('../../assets/endoscopy.png') },
// // // // // //     { name: 'Dermatology', image: require('../../assets/dermatology.png') },
// // // // // //     { name: 'ENT', image: require('../../assets/head.png') },
// // // // // //     { name: 'Gastrointestinal', image: require('../../assets/gastrointestinal-tract.png') },
// // // // // //     { name: 'Hematology', image: require('../../assets/donator.png') },
// // // // // //     { name: 'Neurological', image: require('../../assets/neurology.png') },
// // // // // //     { name: 'Obstetric / Gynaecological', image: require('../../assets/maternity.png') },
// // // // // //     { name: 'Pulmonary', image: require('../../assets/respiratory-system.png') },
// // // // // //     { name: 'Rheumatologic', image: require('../../assets/Rheumatology-amico.png') },
// // // // // //     ]; const [isModalVisible, setIsModalVisible] = useState(false);
// // // // // //   const [newFolderName, setNewFolderName] = useState('');
// // // // // //   const [selectedFiles, setSelectedFiles] = useState([]);

// // // // // //   const toggleModal = () => {
// // // // // //     setIsModalVisible(!isModalVisible);
// // // // // //   };

// // // // // //    const handleFileUpload = async () => {
// // // // // //     try {
// // // // // //       const file = await DocumentPicker.getDocumentAsync({ type: '*/*' });
// // // // // //       if (file.type === 'success') {
// // // // // //         setSelectedFiles([...selectedFiles, file]);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error uploading file: ', error);
// // // // // //     }
// // // // // //   };

// // // // // // const handleRemoveFile = (indexToRemove) => {
// // // // // //     const updatedFiles = selectedFiles.filter((file, index) => index !== indexToRemove);
// // // // // //     setSelectedFiles(updatedFiles);
// // // // // //   };

// // // // // //   const saveNewFolder = async () => {
// // // // // //     try {
// // // // // //       if (!newFolderName.trim()) {
// // // // // //         alert('Please enter a folder name.');
// // // // // //         return;
// // // // // //       }

// // // // // //       const newFolderData = {
// // // // // //         folder_name: newFolderName,
// // // // // //         test_data: selectedFiles,
// // // // // //         createdAt: serverTimestamp(), // Add timestamp for when the folder is created
// // // // // //       };

// // // // // //       await addDoc(collection(FIREBASE_DB, 'allTests'), newFolderData);
// // // // // //       alert(`Folder "${newFolderName}" created successfully!`);
// // // // // //       setIsModalVisible(false); // Close the modal
// // // // // //       setNewFolderName(''); // Clear input field
// // // // // //       setSelectedFiles([]); // Clear selected files
// // // // // //     } catch (error) {
// // // // // //       console.error('Error saving new folder: ', error);
// // // // // //       alert('Failed to create folder. Please try again later.');
// // // // // //     }
// // // // // //   };

// // // // // //     return (
// // // // // //       <>
// // // // // //     <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 20 }}>
// // // // // //       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Test Diary</Text>
// // // // // //       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
// // // // // //         {folderData.map((folder, index) => (
// // // // // //           <FolderItem key={index} folderName={folder.name} folderImage={folder.image} />
// // // // // //         ))}
// // // // // //         {/* Add option to make a new folder */}
// // // // // //          <TouchableOpacity
// // // // // //         style={{
// // // // // //           position: 'absolute',
// // // // // //           bottom: 20,
// // // // // //           right: 20,
// // // // // //           backgroundColor: 'blue',
// // // // // //           borderRadius: 30,
// // // // // //           width: 60,
// // // // // //           height: 60,
// // // // // //           justifyContent: 'center',
// // // // // //           alignItems: 'center',
// // // // // //         }}
// // // // // //         onPress={toggleModal}
// // // // // //       >
// // // // // //         <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
// // // // // //       </TouchableOpacity>

// // // // // //       {/* Modal for adding new folder */}
    
// // // // // //           {/* <Modal visible={isModalVisible} >
// // // // // //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // // // //               <View style={{ width: '80%', height: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
// // // // // //                 <TouchableOpacity onPress={toggleModal} style={{ position: 'absolute', top: 10, right: 10 }}>
// // // // // //                   <Text>X</Text>
// // // // // //                 </TouchableOpacity>
// // // // // //                 <TextInput
// // // // // //                   style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
// // // // // //                   placeholder="Enter folder name"
// // // // // //                   value={newFolderName}
// // // // // //                   onChangeText={setNewFolderName}
// // // // // //                 />
// // // // // //                 <Button title="Upload File" onPress={handleFileUpload} />
// // // // // //                 <View style={{ marginTop: 10 }}>
// // // // // //                   {selectedFiles.map((file, index) => (
// // // // // //                     <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
// // // // // //                       <Text>{file.name}</Text>
// // // // // //                       <TouchableOpacity onPress={() => handleRemoveFile(index)} style={{ marginLeft: 10 }}>
// // // // // //                         <Text style={{ color: 'red' }}>X</Text>
// // // // // //                       </TouchableOpacity>
// // // // // //                     </View>
// // // // // //                   ))}
// // // // // //                 </View>
// // // // // //                 <Button title="Save" onPress={saveNewFolder} />
// // // // // //               </View>
// // // // // //             </View>
// // // // // //           </Modal> */}
            

// // // // // //             {/* Modal */}
// // // // // //           <Modal visible={isModalVisible} animationType="slide">
// // // // // //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // // // //               <View style={{ width: '80%', height: '60%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
// // // // // //                 <TouchableOpacity onPress={toggleModal} style={{ position: 'absolute', top: 10, right: 10 }}>
// // // // // //                   <Text>X</Text>
// // // // // //                 </TouchableOpacity>
// // // // // //                 <TextInput
// // // // // //                   style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
// // // // // //                   placeholder="Enter folder name"
// // // // // //                   value={newFolderName}
// // // // // //                   onChangeText={setNewFolderName}
// // // // // //                 />
// // // // // //                 <Button title="Upload File" onPress={handleFileUpload} />
// // // // // //                 <View style={{ marginTop: 10 }}>
// // // // // //                   {selectedFiles.map((file, index) => (
// // // // // //                     <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
// // // // // //                       <Text>{file.name}</Text>
// // // // // //                       <TouchableOpacity onPress={() => handleRemoveFile(index)} style={{ marginLeft: 10 }}>
// // // // // //                         <Text style={{ color: 'red' }}>X</Text>
// // // // // //                       </TouchableOpacity>
// // // // // //                     </View>
// // // // // //                   ))}
// // // // // //                 </View>
// // // // // //                 <Button title="Save" onPress={saveNewFolder} />
// // // // // //               </View>
// // // // // //             </View>
// // // // // //           </Modal>
// // // // // //           </View>
        
// // // // // //         </ScrollView>
// // // // // //                 {/* Modal */}
// // // // // //             {/* <Modal  visible={isModalVisible}>
// // // // // //   <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor:'rgba(172, 86, 188, 0.5)', }}>
// // // // // //     <TouchableOpacity onPress={toggleModal} style={{ position: 'absolute', top: 10, right: 10 }}>
// // // // // //                   <Text>X</Text>
// // // // // //                 </TouchableOpacity>
// // // // // //                 <TextInput
// // // // // //                   style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
// // // // // //                   placeholder="Enter folder name"
// // // // // //                   value={newFolderName}
// // // // // //                   onChangeText={setNewFolderName}
// // // // // //                 />
// // // // // //                 <Button title="Upload File" onPress={handleFileUpload} />
// // // // // //                 <View style={{ marginTop: 10 }}>
// // // // // //                   {selectedFiles.map((file, index) => (
// // // // // //                     <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
// // // // // //                       <Text>{file.name}</Text>
// // // // // //                       <TouchableOpacity onPress={() => handleRemoveFile(index)} style={{ marginLeft: 10 }}>
// // // // // //                         <Text style={{ color: 'red' }}>X</Text>
// // // // // //                       </TouchableOpacity>
// // // // // //                     </View>
// // // // // //                   ))}
// // // // // //               </View>
// // // // // //                 <Button title="Save" onPress={saveNewFolder} />
// // // // // //               </View>
            
// // // // // //           </Modal>  */}
// // // // // //         </>
        
// // // // // //   );
// // // // // // };

// // // // // // export default LabTests;



// // // // // import React, { useState } from 'react';
// // // // // import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Button, Modal } from 'react-native';
// // // // // import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker for file upload
// // // // // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// // // // // import { FIREBASE_DB } from '../../firebaseConfig'; // Import your Firebase DB instance

// // // // // const FolderItem = ({ folderName, folderImage }) => {
// // // // //   const [expanded, setExpanded] = useState(false);

// // // // //   const handleAddTest = async () => {
// // // // //     // Implement logic to add a test file and store it in Firebase
// // // // //     try {
// // // // //       // Example code to add a document to the 'allTests' collection in Firebase
// // // // //       await addDoc(collection(FIREBASE_DB, 'allTests'), {
// // // // //         folder_name: folderName,
// // // // //         test_data: 'Example test data', // Replace this with the actual test data
// // // // //         // You can add more fields as needed
// // // // //       });
// // // // //       console.log('Test added successfully!');
// // // // //     } catch (error) {
// // // // //       console.error('Error adding test: ', error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginBottom: 20 }}>
// // // // //       <Image source={folderImage} style={{ width: 100, height: 100 }} />
// // // // //       <Text style={{ textAlign: 'center' }}>{folderName}</Text>
// // // // //       {expanded && (
// // // // //         <TouchableOpacity onPress={handleAddTest} style={{ position: 'absolute', bottom: 0, right: 0 }}>
// // // // //           <Image source={require('../../assets/urology.png')} style={{ width: 40, height: 40 }} />
// // // // //         </TouchableOpacity>
// // // // //       )}
// // // // //     </TouchableOpacity>
// // // // //   );
// // // // // };

// // // // // const LabTests = () => {
// // // // //   const folderData = [
// // // // //     { name: 'General Tests', image: require('../../assets/blood-test.png') },
// // // // //     { name: 'Ultrasounds', image: require('../../assets/ultrasound.png') },
// // // // //     { name: 'Cardiovascular', image: require('../../assets/Cardiologist-bro.png') },
// // // // //     { name: 'Urologic', image: require('../../assets/urology.png') },
// // // // //     { name: 'Radiology', image: require('../../assets/Radiography-amico.png') },
// // // // //     { name: 'Endoscopy', image: require('../../assets/endoscopy.png') },
// // // // //     { name: 'Dermatology', image: require('../../assets/dermatology.png') },
// // // // //     { name: 'ENT', image: require('../../assets/head.png') },
// // // // //     { name: 'Gastrointestinal', image: require('../../assets/gastrointestinal-tract.png') },
// // // // //     { name: 'Hematology', image: require('../../assets/donator.png') },
// // // // //     { name: 'Neurological', image: require('../../assets/neurology.png') },
// // // // //     { name: 'Obstetric / Gynaecological', image: require('../../assets/maternity.png') },
// // // // //     { name: 'Pulmonary', image: require('../../assets/respiratory-system.png') },
// // // // //     { name: 'Rheumatologic', image: require('../../assets/Rheumatology-amico.png') },
// // // // //   ];

// // // // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // // // //   const [newFolderName, setNewFolderName] = useState('');
// // // // //   const [selectedFiles, setSelectedFiles] = useState([]);

// // // // //   const toggleModal = () => {
// // // // //     setIsModalVisible(!isModalVisible);
// // // // //   };
// // // // // const handleFileUpload = async () => {
// // // // //   console.log('Attempting to upload file...');
// // // // //   try {
// // // // //     const file = await DocumentPicker.getDocumentAsync({ type: '*/*' });
// // // // //     console.log('File selected:', file);
// // // // //     if (!file.cancelled) {
// // // // //       console.log('File successfully selected:', file);
// // // // //       setSelectedFiles([...selectedFiles, file]);
// // // // //       console.log('Selected Files:', selectedFiles); // Log the selected files
// // // // //     } else {
// // // // //       console.log('No file selected or file selection canceled.');
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error('Error uploading file: ', error);
// // // // //   }
// // // // // };


// // // // //   const handleRemoveFile = (indexToRemove) => {
// // // // //     const updatedFiles = selectedFiles.filter((file, index) => index !== indexToRemove);
// // // // //     setSelectedFiles(updatedFiles);
// // // // //   };

// // // // //   const saveNewFolder = async () => {
// // // // //     try {
// // // // //       if (!newFolderName.trim()) {
// // // // //         alert('Please enter a folder name.');
// // // // //         return;
// // // // //       }

// // // // //       const newFolderData = {
// // // // //         folder_name: newFolderName,
// // // // //         test_data: selectedFiles,
// // // // //         createdAt: serverTimestamp(), // Add timestamp for when the folder is created
// // // // //       };

// // // // //       await addDoc(collection(FIREBASE_DB, 'allTests'), newFolderData);
// // // // //       alert(`Folder "${newFolderName}" created successfully!`);
// // // // //       setIsModalVisible(false); // Close the modal
// // // // //       setNewFolderName(''); // Clear input field
// // // // //       setSelectedFiles([]); // Clear selected files
// // // // //     } catch (error) {
// // // // //       console.error('Error saving new folder: ', error);
// // // // //       alert('Failed to create folder. Please try again later.');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 20 }}>
// // // // //         <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Test Diary</Text>
// // // // //         <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
// // // // //           {folderData.map((folder, index) => (
// // // // //             <FolderItem key={index} folderName={folder.name} folderImage={folder.image} />
// // // // //           ))}
// // // // //           {/* Add option to make a new folder */}
// // // // //           <TouchableOpacity
// // // // //             style={{
// // // // //               position: 'absolute',
// // // // //               bottom: 20,
// // // // //               right: 20,
// // // // //               backgroundColor: 'blue',
// // // // //               borderRadius: 30,
// // // // //               width: 60,
// // // // //               height: 60,
// // // // //               justifyContent: 'center',
// // // // //               alignItems: 'center',
// // // // //             }}
// // // // //             onPress={toggleModal}
// // // // //           >
// // // // //             <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
// // // // //           </TouchableOpacity>

// // // // //           {/* Modal */}
// // // // //           <Modal visible={isModalVisible} animationType="slide">
// // // // //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // // //               <View style={{ width: '80%', height: '60%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
// // // // //                 <TouchableOpacity onPress={toggleModal} style={{ position: 'absolute', top: 10, right: 10 }}>
// // // // //                   <Text>X</Text>
// // // // //                 </TouchableOpacity>
// // // // //                 <TextInput
// // // // //                   style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
// // // // //                   placeholder="Enter folder name"
// // // // //                   value={newFolderName}
// // // // //                   onChangeText={setNewFolderName}
// // // // //                 />
// // // // //                 <Button title="Upload File" onPress={handleFileUpload} />
// // // // //                 <View style={{ marginTop: 10 }}>
// // // // //                   {selectedFiles.map((file, index) => (
// // // // //                     <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
// // // // //                       <Text>{file.name}</Text>
// // // // //                       <TouchableOpacity onPress={() => handleRemoveFile(index)} style={{ marginLeft: 10 }}>
// // // // //                         <Text style={{ color: 'red' }}>X</Text>
// // // // //                       </TouchableOpacity>
// // // // //                     </View>
// // // // //                   ))}
// // // // //                 </View>
// // // // //                 <Button title="Save" onPress={saveNewFolder} />
// // // // //               </View>
// // // // //             </View>
// // // // //           </Modal>

// // // // //         </View>
// // // // //       </ScrollView >
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default LabTests;

// // // // import React, { useState } from 'react';
// // // // import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Button, Modal } from 'react-native';
// // // // import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker for file upload
// // // // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// // // // import { FIREBASE_DB } from '../../firebaseConfig'; // Import your Firebase DB instance


// // // // const FolderItem = ({ folderName, folderImage }) => {
// // // //   // State to manage selected files
// // // //   const [selectedFiles, setSelectedFiles] = useState([]);
// // // //   const [expanded, setExpanded] = useState(false);

// // // //   const handleFileUpload = async () => {
// // // //     console.log('Attempting to upload file...');
// // // //     try {
// // // //       const file = await DocumentPicker.getDocumentAsync({ type: '*/*' });
// // // //       console.log('File selected:', file);
// // // //       if (!file.cancelled) {
// // // //         console.log('File successfully selected:', file);
// // // //         setSelectedFiles([...selectedFiles, file]);
// // // //         console.log('Selected Files:', selectedFiles); // Log the selected files
// // // //       } else {
// // // //         console.log('No file selected or file selection canceled.');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error uploading file: ', error);
// // // //     }
// // // //   };

// // // //   const handleRemoveFile = (index) => {
// // // //     setSelectedFiles(selectedFiles.filter((file, i) => i !== index));
// // // //   };

// // // //   const handleSaveFolder = async () => {
// // // //     try {
// // // //       const folderData = {
// // // //         folder_name: folderName,
// // // //         test_data: selectedFiles,
// // // //         createdAt: serverTimestamp(),
// // // //       };
// // // //       await addDoc(collection(FIREBASE_DB, 'allTests'), folderData);
// // // //       console.log('Folder saved successfully:', folderData);
// // // //     } catch (error) {
// // // //       console.error('Error saving folder:', error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginBottom: 20 }}>
// // // //       <Image source={folderImage} style={{ width: 100, height: 100 }} />
// // // //       <Text style={{ textAlign: 'center' }}>{folderName}</Text>
// // // //       {expanded && (
// // // //         <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
// // // //           <Button title="Upload File" onPress={handleFileUpload} />
// // // //           {selectedFiles.map((file, index) => (
// // // //             <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
// // // //               <Text>{file.name}</Text>
// // // //               <TouchableOpacity onPress={() => handleRemoveFile(index)}>
// // // //                 <Text style={{ marginLeft: 5, color: 'red' }}>X</Text>
// // // //               </TouchableOpacity>
// // // //             </View>
// // // //           ))}
// // // //           <Button title="Save" onPress={handleSaveFolder} />
// // // //         </View>
// // // //       )}
// // // //     </TouchableOpacity>
// // // //   );
// // // // };
// // // // const toggleModal = () => {
// // // //     setIsModalVisible(!isModalVisible);
// // // //   };
// // // // const LabTests = () => {
// // // //   const folderData = [
// // // //     { name: 'General Tests', image: require('../../assets/blood-test.png') },
// // // //     { name: 'Ultrasounds', image: require('../../assets/ultrasound.png') },
// // // //     { name: 'Cardiovascular', image: require('../../assets/Cardiologist-bro.png') },
// // // //     { name: 'Urologic', image: require('../../assets/urology.png') },
// // // //     { name: 'Radiology', image: require('../../assets/Radiography-amico.png') },
// // // //     { name: 'Endoscopy', image: require('../../assets/endoscopy.png') },
// // // //     { name: 'Dermatology', image: require('../../assets/dermatology.png') },
// // // //     { name: 'ENT', image: require('../../assets/head.png') },
// // // //     { name: 'Gastrointestinal', image: require('../../assets/gastrointestinal-tract.png') },
// // // //     { name: 'Hematology', image: require('../../assets/donator.png') },
// // // //     { name: 'Neurological', image: require('../../assets/neurology.png') },
// // // //     { name: 'Obstetric / Gynaecological', image: require('../../assets/maternity.png') },
// // // //     { name: 'Pulmonary', image: require('../../assets/respiratory-system.png') },
// // // //     { name: 'Rheumatologic', image: require('../../assets/Rheumatology-amico.png') },
// // // //   ];

// // // //   return (
// // // //     <>
// // // //       <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 20 }}>
// // // //         <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Test Diary</Text>
// // // //         <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
// // // //           {folderData.map((folder, index) => (
// // // //             <FolderItem key={index} folderName={folder.name} folderImage={folder.image} />
// // // //           ))}
// // // //         </View>
// // // //          {/* Add option to make a new folder */}
// // // //            <TouchableOpacity
// // // //             style={{
// // // //               position: 'absolute',
// // // //               bottom: 20,
// // // //               right: 20,
// // // //               backgroundColor: 'blue',
// // // //               borderRadius: 30,
// // // //               width: 60,
// // // //               height: 60,
// // // //               justifyContent: 'center',
// // // //               alignItems: 'center',
// // // //             }}
// // // //             onPress={toggleModal}
// // // //           >
// // // //             <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
// // // //           </TouchableOpacity>
// // // //       </ScrollView>
// // // //     </>
// // // //   );
// // // // };

// // // // export default LabTests;

// // // import React, { useState } from 'react';
// // // import { View, Text, TouchableOpacity, Image, ScrollView, Button, Modal, TextInput } from 'react-native';
// // // import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker for file upload
// // // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// // // import { FIREBASE_DB } from '../../firebaseConfig'; // Import your Firebase DB instance

// // // const FolderItem = ({ folderName, folderImage }) => {
// // //   const [expanded, setExpanded] = useState(false);
// // //   const [isModalVisible, setIsModalVisible] = useState(false);
// // //   const [newFolderName, setNewFolderName] = useState('');
// // //   const [selectedFiles, setSelectedFiles] = useState([]);

// // //   const toggleModal = () => {
// // //     setIsModalVisible(!isModalVisible);
// // //   };

// // //   const handleFileUpload = async () => {
// // //     try {
// // //       const file = await DocumentPicker.getDocumentAsync({ type: '*/*' });
// // //       if (file.type === 'success') {
// // //         setSelectedFiles([...selectedFiles, file]);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error uploading file: ', error);
// // //     }
// // //   };

// // //   const handleRemoveFile = (index) => {
// // //     setSelectedFiles(selectedFiles.filter((file, i) => i !== index));
// // //   };

// // //   const handleSaveFolder = async () => {
// // //     try {
// // //       const folderData = {
// // //         folder_name: newFolderName,
// // //         test_data: selectedFiles,
// // //         createdAt: serverTimestamp(),
// // //       };
// // //       await addDoc(collection(FIREBASE_DB, 'allTests'), folderData);
// // //       setIsModalVisible(false); // Close the modal
// // //       setNewFolderName(''); // Clear folder name
// // //       setSelectedFiles([]); // Clear selected files
// // //     } catch (error) {
// // //       console.error('Error saving folder:', error);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginBottom: 20 }}>
// // //         <Image source={folderImage} style={{ width: 100, height: 100 }} />
// // //         <Text style={{ textAlign: 'center' }}>{folderName}</Text>
// // //       </TouchableOpacity>
// // //       {expanded && (
// // //         <View>
// // //           <Button title="Upload File" onPress={toggleModal} />
// // //           <Modal visible={isModalVisible} animationType="slide">
// // //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // //               <TextInput
// // //                 placeholder="Enter folder name"
// // //                 value={newFolderName}
// // //                 onChangeText={setNewFolderName}
// // //               />
// // //               <Button title="Upload File" onPress={handleFileUpload} />
// // //               <ScrollView>
// // //                 {selectedFiles.map((file, index) => (
// // //                   <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
// // //                     <Text>{file.name}</Text>
// // //                     <TouchableOpacity onPress={() => handleRemoveFile(index)}>
// // //                       <Text style={{ marginLeft: 5, color: 'red' }}>X</Text>
// // //                     </TouchableOpacity>
// // //                   </View>
// // //                 ))}
// // //               </ScrollView>
// // //               <Button title="Save" onPress={handleSaveFolder} />
// // //               <Button title="Close" onPress={toggleModal} />
// // //             </View>
// // //           </Modal>
// // //         </View>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // const LabTests = () => {
// // //   const folderData = [
// // //     { name: 'General Tests', image: require('../../assets/blood-test.png') },
// // //     { name: 'Ultrasounds', image: require('../../assets/ultrasound.png') },
// // //     { name: 'Cardiovascular', image: require('../../assets/Cardiologist-bro.png') },
// // //     { name: 'Urologic', image: require('../../assets/urology.png') },
// // //     { name: 'Radiology', image: require('../../assets/Radiography-amico.png') },
// // //     { name: 'Endoscopy', image: require('../../assets/endoscopy.png') },
// // //     { name: 'Dermatology', image: require('../../assets/dermatology.png') },
// // //     { name: 'ENT', image: require('../../assets/head.png') },
// // //     { name: 'Gastrointestinal', image: require('../../assets/gastrointestinal-tract.png') },
// // //     { name: 'Hematology', image: require('../../assets/donator.png') },
// // //     { name: 'Neurological', image: require('../../assets/neurology.png') },
// // //     { name: 'Obstetric / Gynaecological', image: require('../../assets/maternity.png') },
// // //     { name: 'Pulmonary', image: require('../../assets/respiratory-system.png') },
// // //     { name: 'Rheumatologic', image: require('../../assets/Rheumatology-amico.png') },
// // //   ];

// // //   return (
// // //     <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 20 }}>
// // //       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Test Diary</Text>
// // //       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
// // //         {folderData.map((folder, index) => (
// // //           <FolderItem key={index} folderName={folder.name} folderImage={folder.image} />
// // //         ))}
// // //       </View>
// // //     </ScrollView>
// // //   );
// // // };

// // // export default LabTests;


// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, Image, ScrollView, Button, Modal, TextInput } from 'react-native';
// // import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker for file upload
// // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// // import { FIREBASE_DB } from '../../firebaseConfig'; // Import your Firebase DB instance

// // const FolderItem = ({ folderName, folderImage }) => {
// //   const [expanded, setExpanded] = useState(false);
// //   const [isModalVisible, setIsModalVisible] = useState(false);
// //   const [newFolderName, setNewFolderName] = useState('');
// //   const [selectedFiles, setSelectedFiles] = useState([]);

// //   const toggleModal = () => {
// //     setIsModalVisible(!isModalVisible);
// //   };

// //   const handleFileUpload = async () => {
// //     try {
// //       const file = await DocumentPicker.getDocumentAsync({ type: '*/*' });
// //       if (file.type === 'success') {
// //         setSelectedFiles([...selectedFiles, file]);
// //       }
// //     } catch (error) {
// //       console.error('Error uploading file: ', error);
// //     }
// //   };

// //   const handleRemoveFile = (index) => {
// //     setSelectedFiles(selectedFiles.filter((file, i) => i !== index));
// //   };

// //   const handleSaveFolder = async () => {
// //     try {
// //       const folderData = {
// //         folder_name: newFolderName,
// //         test_data: selectedFiles,
// //         createdAt: serverTimestamp(),
// //       };
// //       await addDoc(collection(FIREBASE_DB, 'allTests'), folderData);
// //       setIsModalVisible(false); // Close the modal
// //       setNewFolderName(''); // Clear folder name
// //       setSelectedFiles([]); // Clear selected files
// //     } catch (error) {
// //       console.error('Error saving folder:', error);
// //     }
// //   };

// //   return (
// //     <>
// //       <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginBottom: 20 }}>
// //         <Image source={folderImage} style={{ width: 100, height: 100 }} />
// //         <Text style={{ textAlign: 'center' }}>{folderName}</Text>
// //       </TouchableOpacity>
// //       {expanded && (
// //         <View>
// //           <Button title="Upload File" onPress={toggleModal} />
// //           <Modal visible={isModalVisible} animationType="slide">
// //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //               <TextInput
// //                 placeholder="Enter folder name"
// //                 value={newFolderName}
// //                 onChangeText={setNewFolderName}
// //               />
// //               <Button title="Upload File" onPress={handleFileUpload} />
// //               <ScrollView>
// //                 {selectedFiles.map((file, index) => (
// //                   <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
// //                     <Text>{file.name}</Text>
// //                     <TouchableOpacity onPress={() => handleRemoveFile(index)}>
// //                       <Text style={{ marginLeft: 5, color: 'red' }}>X</Text>
// //                     </TouchableOpacity>
// //                   </View>
// //                 ))}
// //               </ScrollView>
// //               <Button title="Save" onPress={handleSaveFolder} />
// //               <Button title="Close" onPress={toggleModal} />
// //             </View>
// //           </Modal>
// //         </View>
// //       )}
// //     </>
// //   );
// // };

// // const LabTests = () => {
// //   const folderData = [
// //     { name: 'General Tests', image: require('../../assets/blood-test.png') },
// //     { name: 'Ultrasounds', image: require('../../assets/ultrasound.png') },
// //     { name: 'Cardiovascular', image: require('../../assets/Cardiologist-bro.png') },
// //     { name: 'Urologic', image: require('../../assets/urology.png') },
// //     { name: 'Radiology', image: require('../../assets/Radiography-amico.png') },
// //     { name: 'Endoscopy', image: require('../../assets/endoscopy.png') },
// //     { name: 'Dermatology', image: require('../../assets/dermatology.png') },
// //     { name: 'ENT', image: require('../../assets/head.png') },
// //     { name: 'Gastrointestinal', image: require('../../assets/gastrointestinal-tract.png') },
// //     { name: 'Hematology', image: require('../../assets/donator.png') },
// //     { name: 'Neurological', image: require('../../assets/neurology.png') },
// //     { name: 'Obstetric / Gynaecological', image: require('../../assets/maternity.png') },
// //     { name: 'Pulmonary', image: require('../../assets/respiratory-system.png') },
// //     { name: 'Rheumatologic', image: require('../../assets/Rheumatology-amico.png') },
// //   ];

// //   return (
// //     <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 20 }}>
// //       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Test Diary</Text>
// //       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
// //         {folderData.map((folder, index) => (
// //           <FolderItem key={index} folderName={folder.name} folderImage={folder.image} />
// //         ))}
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // export default LabTests;


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, Modal, Button } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker from Expo package
// import * as FileSystem from 'expo-file-system'; // Import FileSystem from Expo package
// import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique file IDs
// import { firebaseConfig } from '../../firebaseConfig\'; // Adjust the path as necessary
// import firebase from 'firebase/app';
// import 'firebase/firestore'; // Import Firestore

// const folderData = [
//     { name: 'General Tests', image: require('../../assets/blood-test.png') },
//     { name: 'Ultrasounds', image: require('../../assets/ultrasound.png') },
//     { name: 'Cardiovascular', image: require('../../assets/Cardiologist-bro.png') },
//     { name: 'Urologic', image: require('../../assets/urology.png') },
//     { name: 'Radiology', image: require('../../assets/Radiography-amico.png') },
//     { name: 'Endoscopy', image: require('../../assets/endoscopy.png') },
//     { name: 'Dermatology', image: require('../../assets/dermatology.png') },
//     { name: 'ENT', image: require('../../assets/head.png') },
//     { name: 'Gastrointestinal', image: require('../../assets/gastrointestinal-tract.png') },
//     { name: 'Hematology', image: require('../../assets/donator.png') },
//     { name: 'Neurological', image: require('../../assets/neurology.png') },
//     { name: 'Obstetric / Gynaecological', image: require('../../assets/maternity.png') },
//     { name: 'Pulmonary', image: require('../../assets/respiratory-system.png') },
//     { name: 'Rheumatologic', image: require('../../assets/Rheumatology-amico.png') },
//   ];

// const TestDiary = () => {
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [folderContent, setFolderContent] = useState([]);

//   const openFolder = async (folderName) => {
//     setSelectedFolder(folderName);
//     setModalVisible(true);
//     // Fetch data from local storage based on folderName
//     const data = await retrieveFiles(folderName);
//     setFolderContent(data);
//   };
// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
//   const addFileToFolder = async () => {
//     try {
//       const file = await DocumentPicker.getDocumentAsync({
//         type: '*/*',
//         copyToCacheDirectory: false,
//       });

//       if (file.type === 'success') {
//         const fileName = file.name;
//         const fileType = fileName.split('.').pop();
//         const filePath = file.uri;
//         const fileId = uuidv4(); // Generate unique file ID
//         const folderName = selectedFolder;

//         // Move the file to the app's directory for persistent storage
//         const newFilePath = `${FileSystem.documentDirectory}${fileId}.${fileType}`;
//         await FileSystem.moveAsync({
//           from: filePath,
//           to: newFilePath,
//         });

//         // Save file information to local storage
//         const fileInfo = { id: fileId, fileName: fileName, filePath: newFilePath };
//         await saveFile(folderName, fileInfo);

//         // Update folder content
//         const updatedContent = [...folderContent, fileInfo];
//         setFolderContent(updatedContent);
//       }
//     } catch (error) {
//       console.error('Error adding file:', error);
//     }
//   };

//   const deleteFile = async (fileId) => {
//     try {
//       // Find the file by ID
//       const deletedFile = folderContent.find(file => file.id === fileId);

//       // Delete the file from local storage
//       await FileSystem.deleteAsync(deletedFile.filePath);

//       // Remove the file from folder content
//       const updatedContent = folderContent.filter(file => file.id !== fileId);
//       setFolderContent(updatedContent);
//     } catch (error) {
//       console.error('Error deleting file:', error);
//     }
//   };
//   // Function to save file information to Firestore
// const saveFile = async (folderName, fileInfo) => {
//   try {
//     // Access Firestore methods
//     await firebase.firestore().collection('allTests').add({
//       folder_name: folderName,
//       file_name: fileInfo.fileName,
//       file_path: fileInfo.filePath,
//       // Add any other relevant file information you want to store
//     });
//     console.log(`File ${fileInfo.fileName} saved to folder ${folderName}`);
//   } catch (error) {
//     console.error('Error saving file:', error);
//   }
// };

// // Function to retrieve files from Firestore based on folderName
// const retrieveFiles = async (folderName) => {
//   try {
//     // Access Firestore methods
//     const snapshot = await firebase.firestore().collection('allTests').where('folder_name', '==', folderName).get();
//     const files = snapshot.docs.map(doc => doc.data());
//     return files;
//   } catch (error) {
//     console.error('Error retrieving files:', error);
//     return [];
//   }
// };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Your Test Diary</Text>
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
//         {folderData.map((folder, index) => (
//           <TouchableOpacity key={index} onPress={() => openFolder(folder.name)}>
//             <View style={{ width: '30%', aspectRatio: 1, marginBottom: 20, borderColor: '#4C0B46', borderWidth: 2, borderRadius: 10 }}>
//               <Image source={folder.image} style={{ width: '100%', height: '70%', resizeMode: 'contain' }} />
//               <Text style={{ textAlign: 'center', marginTop: 5 }}>{folder.name}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(false);
//           setSelectedFolder(null);
//         }}
//       >
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>{selectedFolder}</Text>
//           {/* Display folder content here */}
//           {folderContent.map((file, index) => (
//             <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//               <Text>{file.fileName}</Text>
//               <TouchableOpacity onPress={() => deleteFile(file.id)}>
//                 <Text style={{ color: 'red', marginLeft: 10 }}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//           <Button title="Add File" onPress={addFileToFolder} />
//           <Button title="Close" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default TestDiary;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Button , Dimensions} from 'react-native';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

 import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker from Expo package
 import * as FileSystem from 'expo-file-system'; // Import FileSystem from Expo package
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique file IDs
import { FIREBASE_DB } from '../../firebaseConfig'; // Import Firestore instance from your Firebase configuration file

const folderData = [
    { name: 'General Tests', image: require('../../assets/blood-test.png') },
    { name: 'Ultrasounds', image: require('../../assets/ultrasound.png') },
    { name: 'Cardiovascular', image: require('../../assets/Cardiologist-bro.png') },
    { name: 'Urologic', image: require('../../assets/urology.png') },
    { name: 'Radiology', image: require('../../assets/Radiography-amico.png') },
    { name: 'Endoscopy', image: require('../../assets/endoscopy.png') },
    { name: 'Dermatology', image: require('../../assets/dermatology.png') },
    { name: 'ENT', image: require('../../assets/head.png') },
    { name: 'Gastrointestinal', image: require('../../assets/gastrointestinal-tract.png') },
    { name: 'Hematology', image: require('../../assets/donator.png') },
    { name: 'Neurological', image: require('../../assets/neurology.png') },
    { name: 'Gynaecological', image: require('../../assets/maternity.png') },
    { name: 'Pulmonary', image: require('../../assets/respiratory-system.png') },
  { name: 'Rheumatologic', image: require('../../assets/Rheumatology-amico.png') },
    { name: 'Dental', image: require('../../assets/tooth.png') },
    { name: 'Eye', image: require('../../assets/eye.png') },
];

const TestDiary = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
  const [folderContent, setFolderContent] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
const [innerModalVisible, setInnerModalVisible] = useState(false); // Add inner modal state

    const openFolder = (folderName) => {
        setSelectedFolder(folderName);
        setModalVisible(true);
    };

    const selectFile = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: false,
            });

            if (file.type === 'success') {
                setSelectedFile(file);
                setInnerModalVisible(true); // Open inner modal after selecting a file
            }
        } catch (error) {
            console.error('Error selecting file:', error);
        }
    };
//  const openFolder = (folderName) => {
//         setSelectedFolder(folderName);
//         setModalVisible(true);
//     };

//     const selectFile = async () => {
//         try {
//             const file = await DocumentPicker.getDocumentAsync({
//                 type: '*/*',
//                 copyToCacheDirectory: false,
//             });

//             if (file.type === 'success') {
//                 setSelectedFile(file);
//             }
//         } catch (error) {
//             console.error('Error selecting file:', error);
//         }
//     };

    const saveFileToDatabase = async () => {
        try {
            if (!selectedFile) {
                throw new Error('No file selected');
            }

            const fileId = uuidv4(); // Generate unique file ID
            const folderName = selectedFolder;

            // Save file information to Firestore
            await addDoc(collection(FIREBASE_DB, 'allTests'), {
                folder_name: folderName,
                file_name: selectedFile.name,
                file_type: selectedFile.type,
                file_path: selectedFile.uri,
                file_id: fileId,
                created_at: new Date().toISOString(),
            });

            console.log(`File ${selectedFile.name} saved to folder ${folderName}`);

            // Clear selected file and close modal
            setSelectedFile(null);
            setModalVisible(false);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };

    const addFileToFolder = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: false,
            });

            if (file.type === 'success') {
                const fileName = file.name;
                const fileType = fileName.split('.').pop();
                const filePath = file.uri;
                const fileId = uuidv4(); // Generate unique file ID
                const folderName = selectedFolder;

                // Save file information to Firestore
                await saveFile(folderName, { fileName, fileType, filePath, fileId });

                // Update folder content
                const updatedContent = [...folderContent, { fileName, fileType, filePath, fileId }];
                setFolderContent(updatedContent);
            }
        } catch (error) {
            console.error('Error adding file:', error);
        }
    };

    const deleteFile = async (fileId) => {
    try {
        if (!fileId) {
            throw new Error('File ID is undefined');
        }

        // Delete file from Firestore
        await deleteFileFromFirestore(fileId);

        // Remove the file from folder content
        const updatedContent = folderContent.filter(file => file.fileId !== fileId);
        setFolderContent(updatedContent);
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};


    const saveFile = async (folderName, fileInfo) => {
        try {
            await addDoc(collection(FIREBASE_DB, 'allTests'), {
                folder_name: folderName,
                file_name: fileInfo.fileName,
                file_type: fileInfo.fileType,
                file_path: fileInfo.filePath,
                file_id: fileInfo.fileId,
                created_at: new Date().toISOString(),
            });
            console.log(`File ${fileInfo.fileName} saved to folder ${folderName}`);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };

    const retrieveFiles = async (folderName) => {
        try {
            const q = query(collection(FIREBASE_DB, 'allTests'), where('folder_name', '==', folderName));
            const querySnapshot = await getDocs(q);
            const files = querySnapshot.docs.map(doc => doc.data());
            return files;
        } catch (error) {
            console.error('Error retrieving files:', error);
            return [];
        }
    };

    const deleteFileFromFirestore = async (fileId) => {
        try {
            const q = query(collection(FIREBASE_DB, 'allTests'), where('file_id', '==', fileId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            console.log(`File with ID ${fileId} deleted from Firestore`);
        } catch (error) {
            console.error('Error deleting file from Firestore:', error);
        }
  };
  // Calculate box width dynamically based on screen width
    const { width } = Dimensions.get('window');
    const boxWidth = (width - 60) / 3; // 60 is the total horizontal padding


    return (
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 30 }}>Your Test Diary</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {folderData.map((folder, index) => (
                    <TouchableOpacity key={index} onPress={() => openFolder(folder.name)}>
                        <View style={{ width: boxWidth, aspectRatio: 1, marginBottom: 20, borderColor: '#4C0B46', borderWidth: 2, borderRadius: 10 }}>
                            <Image source={folder.image} style={{ width: '100%', height: '70%', resizeMode: 'contain' }} />
                            <Text style={{ textAlign: 'center', marginTop: 5 }}>{folder.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
  
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: '#d8bfd8', padding: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4C0B46', marginBottom: 20, marginTop: 30 }}>{selectedFolder}</Text>
                    {/* Display folder content here */}
                    {/* Add inner modal trigger */}
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={innerModalVisible}
                        onRequestClose={() => setInnerModalVisible(false)}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d8bfd8', padding: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4C0B46', marginBottom: 20 }}>Select Your File</Text>
                            <Button title="Select File" onPress={selectFile} color="#4C0B46" />
                            {/* Display selected file */}
                            {selectedFile && (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ color: '#4C0B46' }}>Selected File: {selectedFile.name}</Text>
                                    <Button title="Save" onPress={saveFileToDatabase} color="#4C0B46" />
                                </View>
                )}
                <View style={{ position: 'absolute', bottom: 4, left: 20, width: 90, height: 80, }}>
                        <Button title="Close" onPress={() => setInnerModalVisible(false)} color="#4C0B46" />
                    </View>
                            
                        </View>
                    </Modal>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 40, right: 20 }} onPress={() => setInnerModalVisible(true)}>
                        <View style={{ backgroundColor: '#4C0B46', borderRadius: 50, width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 44, color: '#FFFFFF' }}>+</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', bottom: 4, left: 20, width: 90, height: 80, }}>
                        <Button title="Close" onPress={() => setModalVisible(false)} color="#4C0B46" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TestDiary;

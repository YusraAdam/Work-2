// UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userType: '',
    userId: '',
  });

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        // Check if the user is authenticated before accessing uid
        const currentUser = FIREBASE_AUTH.currentUser;
  
        if (currentUser) {
          const userId = currentUser.uid;
  
          const userDocRef = doc(FIREBASE_DB, 'usersInfo', userId);
          const usersInfoDoc = await getDoc(userDocRef);
  
          const hspDocRef = doc(FIREBASE_DB, 'hspInfo', userId);
          const hspInfoDoc = await getDoc(hspDocRef);
  
          if (usersInfoDoc.exists()) {
            setUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              userType: 'patient',
              userId,
            }));
          } else if (hspInfoDoc.exists()) {
            setUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              userType: 'hsp',
              userId,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching user information', error);
      }
    };
  
    fetchUserType();
  }, []);

  const updateUserType = (newUserType) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      userType: newUserType,
    }));
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

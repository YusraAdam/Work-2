import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";

const Menu = ({ navigation, toggleMenu }) => {
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  const navigateToHome = () => {
    navigation.navigate('Services');
    toggleMenu();
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
    toggleMenu();
  };

  const logout = () => {
    navigation.navigate('HomeScreen2');
    toggleMenu();
  };

  const navigateToSettings = () => {
    navigation.navigate('HomeScreen2');
    toggleMenu();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => toggleMenu());
  };

  return (
    <>
      <Animated.View style={[styles.overlay, { left: slideAnim }]} onTouchStart={closeMenu} />
      <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={styles.menuItem}>Back to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile}>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToSettings}>
          <Text style={styles.menuItem}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 0,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "70%",
    backgroundColor: Color.colorGray_100,
    padding: 20,
    zIndex: 1,
  },
  menuItem: {
    fontSize: FontSize.size_base,
    marginBottom: 10,
  },
});

export default Menu;

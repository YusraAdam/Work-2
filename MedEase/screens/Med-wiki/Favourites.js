import * as React from "react";
import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily, Padding } from "../../GlobalStyles";
import Navbar from './../navbar-footer/Navbar';

const Favourites = () => {
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const dynamicPaddingTop = deviceHeight * 0.0;
  const dynamicWidth = deviceWidth * 0.87;
  const dynamicPaddingTop1 = deviceHeight * 0.65;
  const dynamicPaddingLeft = deviceWidth * 0.001;
  const dynamicPaddingLeft1 = deviceWidth * 0.79;
  const dynamicPaddingLeft2 = deviceWidth * 0.63;
  const dynamicPaddingLeft3 = deviceWidth * 0.195;
  const dataForBoxes = [
    { title: "Amikacin", subtitle: "GlaxoSmithKline" },
    { title: "Adoxa", subtitle: "Doxycycline" },
    { title: "Bactroban", subtitle: "Mupirocin" },
    { title: "Mavik", subtitle: "Trandolapril" },
  ];
  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <LinearGradient
      style={styles.favourites}
      locations={[0, 0.3, 8.5, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.2)",
        "rgba(172, 86, 188, 0.5)",
        "#a2429e",
      ]}
    >

          
          <View style={[styles.topBar, styles.topBarPosition, { left: dynamicPaddingLeft }]}>
            <View style={styles.rectangle} />
            <View style={styles.title}>
              <Text style={[styles.findANear, styles.dentalTypo]}>
                Your Saved Wiki
              </Text>
            </View>
            
          </View>
          <View style={styles.display}>
            {dataForBoxes.map((data, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.article, styles.searchBorder, { width: dynamicWidth, top: 10 + index * 10 }]}
          activeOpacity={0.4}
          onPress={() => navigation.navigate("MedDescription", { data })}
        >
          {/* Your existing code for the box */}
          <View
            style={styles.materialSymbolsplayArrowOu}
            activeOpacity={0.4}
            onPress={() => navigation.navigate("MedDescription", { data })}
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../../assets/materialsymbolsplayarrowoutline.png")}
            />
          </View>
          <View
            style={styles.amikinParent}
            activeOpacity={0.4}
            onPress={() => navigation.navigate("MedDescription", { data })}
          >
            <Text style={[styles.amikin, styles.amikinTypo]}>{data.title}</Text>
            <Text style={styles.glaxosmithkline}>{data.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
          </View>
    </LinearGradient>
    </ScrollView>
    <Navbar/>
    </>
  );
};

const styles = StyleSheet.create({
  amikin: {
    lineHeight: 16,
    width: 101,
    height: 18,
    textAlign: "left",
  },
  glaxosmithkline: {
    fontSize: FontSize.size_1xs,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorPurple,
    height: 50,
    width: 155,
    textAlign: "left",
  },
  amikinTypo: {
    color: Color.colorGray_200,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "400",
  },
  amikinParent: {
    height: 33,
    marginLeft: 7,
    width: 155,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  icon: {
    height: "100%",
  },
  materialSymbolsplayArrowOu: {
    width: 30,
    height: 35,
    left:5,
  },
  searchBorder: {
    flexDirection: "row",
    borderColor: Color.colorAzure,
    width: 360,
    borderWidth: 0,
    borderStyle: "solid",
  },
  display:{
    top:110,
    left:23,
  },
  featured: {
    left: 3,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_base,
    top: 0,
  },
  article: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhite,
    height: 55,
    top:10,
    paddingHorizontal: Padding.p_8xs,
    paddingVertical: Padding.p_5xs,
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
  rectangle: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  title: {
    top: 70,
    left: 21,
    width: 345,
    height: 66,
    position: "absolute",
  },
  findANear: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    width: 250,
    fontWeight: "700",
    color: Color.colorGray_200,
    top: -7,
    left:0,
    fontFamily: FontFamily.interBold,
    position: "absolute",
  },
  dentalTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  favourites: {
    borderStyle: "solid",
    borderColor: Color.colorGray_300,
    borderWidth: 1,
    flex: 1,
    height: 812,
    overflow: "hidden",
    backgroundColor: "transparent",
    width: "100%",
  },
});

export default Favourites;

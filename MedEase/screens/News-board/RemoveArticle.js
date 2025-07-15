import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, Color, FontFamily, Border } from "../../GlobalStyles";

const RemoveArticle = () => {
  return (
    <LinearGradient
      style={styles.removearticle}
      locations={[0, 0.22, 0.86, 1]}
      colors={[
        "rgba(252, 252, 252, 0)",
        "rgba(231, 205, 230, 0.26)",
        "rgba(172, 86, 168, 0.89)",
        "#a2429e",
      ]}
    >
      <Image
        style={[styles.navebarIcon, styles.topBarPosition]}
        contentFit="cover"
        source={require("../../assets/navebar4.png")}
      />
      <View style={[styles.topBar, styles.topBarPosition]}>
        <View style={styles.rectangle} />
        <View style={styles.title}>
          <Text style={styles.yourSavedArticles}>Your Saved Articles</Text>
        </View>
        <Image
          style={styles.buttonIcon}
          contentFit="cover"
          source={require("../../assets/button.png")}
        />
      </View>
      <View style={styles.relatedArticles}>
        <View style={[styles.article, styles.articleLayout]}>
          <View style={[styles.articleChild, styles.articleLayout]} />
          <Image
            style={[styles.pepiconsPencildotsY, styles.pepiconsLayout]}
            contentFit="cover"
            source={require("../../assets/pepiconspencildotsy.png")}
          />
          <View
            style={[
              styles.beautyTipsForFace10DosAParent,
              styles.parentPosition,
            ]}
          >
            <Text style={[styles.beautyTipsFor, styles.beautyTipsForTypo]}>
              Beauty Tips For Face: 10 Dos and Don'ts for Naturally Beautiful
              Skin
            </Text>
            <Image
              style={[styles.maskGroupIcon, styles.maskGroupLayout]}
              contentFit="cover"
              source={require("../../assets/mask-group.png")}
            />
            <View style={[styles.jun82021Wrapper, styles.wrapperLayout]}>
              <Text style={styles.jun82021}>{`Jun 8, 2021 `}</Text>
            </View>
            <Text style={[styles.byWorldHealth, styles.worldTypo]}>
              By World Health Organization
            </Text>
          </View>
        </View>
        <View style={[styles.article1, styles.articleLayout]}>
          <View style={[styles.articleChild, styles.articleLayout]} />
          <Image
            style={[styles.maskGroupIcon1, styles.maskGroupLayout]}
            contentFit="cover"
            source={require("../../assets/mask-group1.png")}
          />
          <View
            style={[styles.pepiconsPencildotsYParent, styles.parentPosition]}
          >
            <Image
              style={[styles.pepiconsPencildotsY1, styles.pepiconsLayout]}
              contentFit="cover"
              source={require("../../assets/pepiconspencildotsy.png")}
            />
            <Text
              style={[
                styles.traditionalHerbalMedicine,
                styles.beautyTipsForTypo,
              ]}
            >
              Traditional Herbal Medicine Treatments for COVID-19
            </Text>
            <View style={[styles.jun92021Wrapper, styles.wrapperLayout]}>
              <Text style={styles.jun82021}>{`Jun 9, 2021 `}</Text>
            </View>
            <Text style={[styles.byWorldHealth1, styles.worldTypo]}>
              By World Health Organization
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.removingButton}>
        <View style={styles.removingButtonChild} />
        <Text style={styles.removeFromSaved}>Remove from saved</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  topBarPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  articleLayout: {
    height: 96,
    width: 335,
    left: 0,
    position: "absolute",
  },
  pepiconsLayout: {
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  parentPosition: {
    height: 81,
    top: 8,
    position: "absolute",
  },
  beautyTipsForTypo: {
    height: 44,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    top: 7,
    textAlign: "left",
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  maskGroupLayout: {
    width: 59,
    height: 81,
    position: "absolute",
  },
  wrapperLayout: {
    height: 15,
    width: 50,
    top: 66,
    position: "absolute",
  },
  worldTypo: {
    color: Color.colorPurple,
    fontSize: FontSize.size_2xs,
    top: 47,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  navebarIcon: {
    top: 687,
    height: 125,
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
  yourSavedArticles: {
    fontSize: FontSize.size_5xl,
    lineHeight: 32,
    textAlign: "left",
    color: Color.colorGray_200,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    height: 68,
    width: 224,
    top: 0,
    left: 0,
    position: "absolute",
  },
  title: {
    top: 60,
    left: 78,
    height: 68,
    width: 224,
    position: "absolute",
  },
  buttonIcon: {
    top: 54,
    left: 8,
    width: 40,
    height: 40,
    position: "absolute",
  },
  topBar: {
    height: 100,
    top: 0,
  },
  articleChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorAzure,
    borderWidth: 1,
    top: 0,
  },
  pepiconsPencildotsY: {
    left: 303,
    top: 8,
  },
  beautyTipsFor: {
    left: 71,
    width: 209,
  },
  maskGroupIcon: {
    top: 0,
    left: 0,
  },
  jun82021: {
    fontSize: FontSize.size_4xs,
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    height: 15,
    width: 50,
    textAlign: "left",
    top: 0,
    left: 0,
    position: "absolute",
  },
  jun82021Wrapper: {
    left: 70,
  },
  byWorldHealth: {
    left: 70,
  },
  beautyTipsForFace10DosAParent: {
    left: 6,
    width: 280,
  },
  article: {
    top: 112,
  },
  maskGroupIcon1: {
    left: 5,
    top: 8,
  },
  pepiconsPencildotsY1: {
    left: 228,
    top: 0,
  },
  traditionalHerbalMedicine: {
    width: 196,
    left: 0,
  },
  jun92021Wrapper: {
    left: 0,
  },
  byWorldHealth1: {
    left: 0,
  },
  pepiconsPencildotsYParent: {
    left: 76,
    width: 252,
  },
  article1: {
    top: 0,
  },
  relatedArticles: {
    top: 128,
    left: 18,
    height: 208,
    width: 335,
    position: "absolute",
  },
  removingButtonChild: {
    height: "131.92%",
    marginLeft: -44,
    top: "-8.08%",
    bottom: "-23.85%",
    left: "50%",
    borderTopLeftRadius: Border.br_13xl,
    borderBottomRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_13xl,
    backgroundColor: Color.colorPurple,
    width: 95,
    position: "absolute",
  },
  removeFromSaved: {
    height: "41.15%",
    width: "93.33%",
    top: "38.46%",
    left: "6.41%",
    fontSize: 6,
    lineHeight: 9,
    color: Color.colorWhite,
    textAlign: "center",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  removingButton: {
    height: "3.2%",
    width: "20.8%",
    top: "20.07%",
    right: "14.13%",
    bottom: "76.72%",
    left: "65.07%",
    position: "absolute",
  },
  removearticle: {
    flex: 1,
    height: 812,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
});

export default RemoveArticle;

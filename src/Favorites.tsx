import * as React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";

const FavoritesPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.favoritesPage}>
      <Text style={[styles.favorites, styles.favoritesFlexBox]}>FAVORITES</Text>

      <View style={[styles.faverecipe1box, styles.boxWidth]}>
        <View style={[styles.box1, styles.boxWidth]} />
        <Image
          style={[styles.recipe1pic, styles.boxWidth]}
          source={require("../assets/faverecipe1.png")}
        />
        <View style={[styles.rect1, styles.boxWidth]} />
        <Text style={styles.recipeName}>{'Special Pork Belly\nRamen'}</Text>
        <Text style={styles.calorie}>1022 Cal</Text>
      </View>

      <View style={[styles.faverecipe2box, styles.favoritesFlexBox]}>
        <View style={[styles.box2, styles.boxWidth]} />
        <Image
          style={[styles.recipe2pic, styles.boxWidth]}
          source={require("../assets/faverecipe2.png")}
        />
        <View style={[styles.rect1, styles.boxWidth]} />
        <Text style={styles.recipeName}>{'Ginger Chicken and\nSpinach Ramen'}</Text>
        <Text style={styles.calorie}>674 Cal</Text>
      </View>

      <Image
        style={styles.addFavoriteIcon}
        source={require("../assets/add-favorite.png")}
      />
      <Text style={[styles.addFavorite, styles.favoritesFlexBox]}>
        Add Favorite
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  favorites: {
    top: 60,
    left: 20,
    fontSize: 30,
    fontFamily: FontFamily.archivoBlackRegular,
    width: 220,
  },
  favoritesFlexBox: {
    textAlign: "left",
    color: Color.white,
    position: "absolute",
  },
  faverecipe1box: {
    left: 20,
    height: 151,
    top: 130,
  },
  rect1: {
    top: 104,
    height: 19,
    backgroundColor: '#f9f9f9',
    width: 115,
    left: 0,
  },
  boxWidth: {
    width: 125,
    position: "absolute",
  },
  recipeName: {
    width: 111,
    height: 30,
    color: Color.black,
    fontFamily: FontFamily.basicRegular,
    fontSize: 10,
    fontWeight: 'bold',
    left: 4,
    top: 107,
    textAlign: "left",
    position: "absolute",
  },
  recipe1pic: {
    height: 108,
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  box1: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 115,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    left: 0,
    top: 0,
    height: 155,
  },
  calorie: {
    top: 135,
    width: 39,
    height: 15,
    fontFamily: FontFamily.beVietnam,
    color: Color.black,
    fontSize: 10,
    left: 4,
    textAlign: "left",
    position: "absolute",
  },
  faverecipe2box: {
    left: 160,
    width: 116,
    position: "absolute",
    height: 151,
    top: 130,
  },
  box2: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 115,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    left: 0,
    top: 0,
    height: 155,
  },
  recipe2pic: {
    height: 108,
    width: 125,
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  addFavoriteIcon: {
    top: 160,
    left: 303,
    width: 75,
    height: 75,
    position: "absolute",
  },
  addFavorite: {
    top: 240,
    left: 305,
    fontSize: 13,
    lineHeight: 26,
    fontFamily: FontFamily.didactGothicRegular,
  },
  favoritesPage: {
    backgroundColor: Color.maroon,
    flex: 1,
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
});

export default FavoritesPage;

import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Color, FontFamily } from "../GlobalStyles";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for the stack navigator's parameters
type RootStackParamList = {
  Onboarding0: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
};

// Define the navigation prop type for Onboarding1 component
type Onboarding1NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding1'>;

// Define the props interface for Onboarding1 component
interface Onboarding1Props {
  navigation: Onboarding1NavigationProp;
}

const Onboarding1: React.FC<Onboarding1Props> = ({ navigation }) => {
  const goToNextScreen = () => {
    navigation.navigate('Onboarding2');
  };

  const goToPreviousScreen = () => {
    // Define the logic to navigate to the previous screen
    navigation.goBack();
  };
  
  return (
    <View style={styles.onboarding2}>
      <Image
        style={[styles.rays]}
        source={require("../assets/rays.png")}
      />
      <Image
        style={styles.shadow}
        source={require("../assets/shadow2.png")}
      />
      <Image
        style={styles.bowl2}
        source={require("../assets/bowl2.png")}
      />
      <Text style={[styles.customize, styles.title]}>Customize</Text>
      <Text style={[styles.recipes, styles.title]}>Recipes</Text>
      <Text
        style={[styles.unleash, styles.title]}
      >{`AND UNLEASH YOUR\nINNER CHEF`}</Text>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={goToNextScreen}>
        <Image
          style={styles.arrowIcon}
          source={require("../assets/arrow-next.png")}
        />
      </TouchableOpacity>

      {/* Previous Button */}
      <TouchableOpacity style={styles.previousButton} onPress={goToPreviousScreen}>
        <Image
          style={styles.arrowIcon}
          source={require("../assets/arrow-previous.png")}
        />
      </TouchableOpacity>

      {/* Pagination Bullets */}
      <View style={styles.paginationContainer}>
        <View style={styles.paginationBullet}></View>
        <View style={[styles.paginationBullet, styles.activeBullet]}></View>
        <View style={styles.paginationBullet}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Color.maroon,
    left: "50%",
    position: "absolute",
  },
  rays: {
    left: "50%",
    position: "absolute",
    marginLeft: -493,
    top: -21,
    width: 985,
    height: 1187,
  },
  shadow: {
    top: 670,
    left: 70,
    width: 250,
    height: 160,
    position: "absolute",
  },
  bowl2: {
    top: 230,
    left: -35,
    width: 458,
    height: 590,
    position: "absolute",
  },
  customize: {
    marginTop: -335,
    marginLeft: -148,
    fontFamily: FontFamily.hiraKakuStdNW8,
    lineHeight: 45,
    fontSize: 48,
    top: "50%",
    color: Color.maroon,
  },
  recipes: {
    marginTop: -288,
    marginLeft: -112,
    fontFamily: FontFamily.hiraKakuStdNW8,
    lineHeight: 45,
    fontSize: 48,
    top: "50%",
    color: Color.maroon,
  },
  unleash: {
    marginLeft: -62,
    top: 210,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
  },
  onboarding2: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  nextButton: {
    position: 'absolute',
    bottom: 43,
    right: 20,
    padding: 10,
  },
  previousButton: {
    position: 'absolute',
    bottom: 43,
    left: 20,
    padding: 10,
  },
  arrowIcon: {
    width: 40,
    height: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  paginationBullet: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Color.white,
    marginHorizontal: 5,
  },
  activeBullet: {
    backgroundColor: Color.maroon,
  },
});

export default Onboarding1;

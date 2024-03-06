import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Color, FontFamily } from "../GlobalStyles";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for the stack navigator's parameters
type RootStackParamList = {
  Login: undefined;
};

// Define the navigation prop type for Login component
type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Define the props interface for Login component
interface Onboarding2Props {
  navigation: LoginNavigationProp;
}

const Onboarding2: React.FC<Onboarding2Props> = ({ navigation }) => {
  const goToNextScreen = () => {
    navigation.navigate('Login');
  };

  const goToPreviousScreen = () => {
    // Define the logic to navigate to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.onboarding3}>
      <Image
        style={[styles.image, styles.textPosition]}
        source={require("../assets/obg3.png")}
      />
      <Image
        style={styles.vectorIcon}
        source={require("../assets/vector.png")}
      />
      <Text style={[styles.pantryToPlate, styles.textPosition]}>
      {`Pantry to\nPlate`}
      </Text>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={goToNextScreen}>
        <Image
          style={styles.arrowIcon}
          source={require("../assets/arrow-next-w.png")}
        />
      </TouchableOpacity>

      {/* Previous Button */}
      <TouchableOpacity
        style={styles.previousButton}
        onPress={goToPreviousScreen}
      >
        <Image
          style={styles.arrowIcon}
          source={require("../assets/arrow-previous-w.png")}
        />
      </TouchableOpacity>

      {/* Pagination Bullets */}
      <View style={styles.paginationContainer}>
        <View style={styles.paginationBullet}></View>
        <View style={styles.paginationBullet}></View>
        <View style={[styles.paginationBullet, styles.activeBullet]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textPosition: {
    left: "50%",
    position: "absolute",
  },
  image: {
    marginLeft: -463,
    top: -242,
    width: 1048,
    height: 1321,
  },
  vectorIcon: {
    height: "46.53%",
    width: "100.86%",
    top: "24.29%",
    right: "39.98%",
    bottom: "29.17%",
    left: "-40.84%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  pantryToPlate: {
    marginTop: -47,
    marginLeft: -182,
    top: "50%",
    fontSize: 48,
    lineHeight: 50,
    fontFamily: FontFamily.hiraKakuStdNW8,
    color: Color.white,
    textAlign: "left",
  },
  onboarding3: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.white,
  },
  nextButton: {
    position: "absolute",
    bottom: 43,
    right: 20,
    padding: 10,
  },
  previousButton: {
    position: "absolute",
    bottom: 43,
    left: 20,
    padding: 10,
  },
  arrowIcon: {
    width: 40,
    height: 40,
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
  },
  paginationBullet: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Color.gray,
    marginHorizontal: 5,
  },
  activeBullet: {
    backgroundColor: Color.maroon,
  },
});

export default Onboarding2;

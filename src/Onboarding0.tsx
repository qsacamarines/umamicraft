import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for the stack navigator's parameters
type RootStackParamList = {
  Onboarding0: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
};

// Define the navigation prop type for Onboarding0 component
type Onboarding0NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding0'>;

// Define the props interface for Onboarding0 component
interface Onboarding0Props {
  navigation: Onboarding0NavigationProp;
}

const Onboarding0: React.FC<Onboarding0Props> = ({ navigation }) => {
  const goToNextScreen = () => {
    navigation.navigate('Onboarding1');
  };

  const goToPreviousScreen = () => {
    // Define the logic to navigate to the previous screen
    // Disabled button
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.onboarding1}>

        <Image
          style={[styles.logoIcon, styles.logoIconPosition]}
          source={require("../assets/logo.png")}
        />

        <Image
          style={styles.shadow}
          source={require("../assets/shadow1.png")}
        />

        <Image
          style={styles.bowl1}
          source={require("../assets/bowl1.png")}
        />

        <Image
          style={styles.tag1}
          source={require("../assets/tag1.png")}
        />

        <Text style={styles.showOffYour}>SHOW OFF YOUR</Text>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={goToNextScreen}>
          <Image
            style={styles.arrowIcon}
            source={require("../assets/arrow-next.png")}
          />
        </TouchableOpacity>

        {/* Previous Button */}
        <TouchableOpacity
          style={styles.previousButton}
          onPress={goToPreviousScreen}
          disabled={true} // Disable the button
        >
          <Image
            style={styles.arrowIcon}
            source={require("../assets/arrow-previous.png")}
          />
        </TouchableOpacity>

        {/* Pagination Bullets */}
        <View style={styles.paginationContainer}>
          <View style={[styles.paginationBullet, styles.activeBullet]}></View>
          <View style={styles.paginationBullet}></View>
          <View style={styles.paginationBullet}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  onboarding1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    backgroundColor: '#841D06',
    borderRadius: 800 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -110,
    left:-130,
    width: 650,
    height: 650,
  },
  logoIcon: {
    marginTop: -365,
    marginLeft: -18,
    top: "50%",
    width: 36,
    height: 36,
    overflow: "hidden",
  },
  logoIconPosition: {
    left: "50%",
    position: "absolute",
  },
  shadow: {
    top: 580,
    width: 255,
    height: 190,
    position: "absolute",
    justifyContent: 'center',
  },
  bowl1: {
    width: 385,
    height: 513,
    top: 193,
    position: "absolute",
    justifyContent: 'center',
  },
  tag1: {
    width: 380,
    height: 300,
    top: 155,
    position: "absolute",
    justifyContent: 'center',
  },
  showOffYour: {
    marginLeft: -50,
    top: 155,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    textAlign: "center",
    color: Color.white,
    left: "50%",
    position: "absolute",
  },
  logo: {
    height: 17,
    display: "none",
    width: 17,
    justifyContent: 'center',
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
    marginTop: 50,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
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

export default Onboarding0;

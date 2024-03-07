import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type LoadingSplashProps = {
  navigation: NavigationProp<ParamListBase>;
};

const LoadingSplash: React.FC<LoadingSplashProps> = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("Onboarding0"); // Go to the onboarding screens
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup function to clear timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.loading}>
      <Image
        style={[styles.naruto1Icon, styles.iconPosition]}
        source={require("../assets/naruto.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  naruto1Icon: {
    marginTop: -27,
    marginLeft: -26,
    width: 52,
    height: 54,
  },
  loading: {
    backgroundColor: "#F3D9A4",
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
});

export default LoadingSplash;
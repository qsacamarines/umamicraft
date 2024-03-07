import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationScreenProp } from 'react-navigation';
import Onboarding0 from './Onboarding0';
interface Props {
  navigation: NavigationScreenProp<any, any>
}

const AppLoader: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding0');
    }, 3000);
  }, []);
 
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./assets/loading-animation-2.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3D9A4', 
  },
  animation: {
    width: 52,
    height: 52,
  },
});

export default AppLoader;

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { Color, FontFamily } from "../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '.././firebase'; // Import the Firebase app instance

// Define the type for the stack navigator's parameters
type RootStackParamList = {
  Register: undefined;
  Home: undefined;
};

// Define the navigation prop type for Login and Register component
type RegisterNavigationProp = NavigationProp<RootStackParamList, 'Register'>;
type LoginNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

// Define the authentication
const auth = getAuth(firebaseApp);

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = React.useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const navigation = useNavigation<RegisterNavigationProp>();
  const navigation2 = useNavigation<LoginNavigationProp>();

  // Go to Login Screen
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }
    return isValid;
  };

  // Handle Login Button Function
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // Login Successful Alert
        Alert.alert('Login Successful', 'User registered successfully!');
        setLoginSuccessful(true);
      } catch (error) {
        // Handle login errors
        Alert.alert('Login Unsuccessful', 'Invalid email or password!');
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // useEffect will be called after the component is mounted
    // If login was successful, navigate to the Home screen
    if (email && password && loginSuccessful) {
      // Navigate to the Home screen after successful login
      navigation2.navigate('Home');
    }
  }, [email, password, loginSuccessful, navigation2]);

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{  alignItems: 'center' }}>
          <Text  style={ styles.login }>LOGIN</Text>
          <Image source={require('../assets/welcome.png')} style={{ width: 320, height: 110}} />
          <Image source={require('../assets/jang-jorim.png')} style={{ width: 200, height: 200 }} />
          <Image source={require('../assets/irasshaimase.png')} style={{ width: 228.36, height: 50, marginBottom: 20 }} />
        </View>

        <View style={styles.input}>
          <Icon name="envelope" style={styles.icon} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.textinput}
          />
        </View>
        
        <View style={styles.input}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.textinput}
          secureTextEntry
        />
        </View>
      
        <View style={{  alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={ handleLogin }>
            <Text style={styles.buttontext}>Log In</Text>
          </TouchableOpacity>
        </View>


        {/* "Or login with..." text */}
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
          <View style={{flex: 1, height: 1, backgroundColor: '#841D06', marginHorizontal: 5 }} />
          <Text style={{marginHorizontal: 10, fontFamily: FontFamily.poppinsRegular}}>Or log in with...</Text>
          <View style={{flex: 1, height: 1, backgroundColor: '#841D06', marginHorizontal: 5 }} />
        </View>

        {/* Google, Facebook, and Twitter icons */}
        <View style={styles.icons}>
          <View style={styles.oneicon}>
              <Image source={require('../assets/google.png')} style={styles.imageicon}/>
          </View>
          
          <View style={styles.oneicon}>
              <Image source={require('../assets/facebook.png')} style={styles.imageicon}/>
          </View>

          <View style={styles.oneicon}>
              <Image source={require('../assets/twitter.png')} style={styles.imageicon}/>
          </View>
        </View>


        
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
          <Text style={{color: 'black', fontFamily: FontFamily.didactGothicRegular}}>Don't have an account yet?</Text>
          <Text style={{color: '#841D06', fontFamily: FontFamily.didactGothicRegular}} onPress={handleRegister}> Register</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30
  },
  login: {
    fontSize: 48, 
    color: '#841D06',
    fontFamily: FontFamily.archivoBlackRegular
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, 
    marginBottom: 20 
  },
  oneicon: {
    width: 69, 
    height: 48, 
    borderWidth: 1, 
    borderColor: 'rgba(132, 29, 6, 0.6)', 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 20
  },
  imageicon: {
    width: 30, 
    height: 30 
  },
  input: {
    flexDirection: 'row', 
    borderRadius: 24, 
    marginBottom: 20, 
    backgroundColor: 'lightgray',
    alignItems: 'center'
  },
  icon: {
    textAlign: 'center',
    marginLeft: 20,
    width: 30,
    fontSize: 30,
    color: 'gray'
  },
  textinput: {
    width: '90%', 
    fontFamily: FontFamily.didactGothicRegular,
    marginLeft: 10,
    fontSize: 20, 
    paddingTop: 10, 
    paddingBottom: 10
  },
  button: {
    padding: 10, width: '70%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 45, 
    borderRadius: 20, 
    backgroundColor: '#841D06'
  },
  buttontext: {
    color: 'white',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 20
  }
});

export default LoginPage;

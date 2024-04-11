import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Color, FontFamily } from "../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseApp from '.././firebase'; // Import the Firebase app instance

// Define the type for the stack navigator's parameters
type RootStackParamList = {
  Login: undefined;
};

// Define the navigation prop type for Register component
type LoginNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

// Define the authentication
const auth = getAuth(firebaseApp);

// Define the firestore
const db = getFirestore(firebaseApp);

const RegisterPage: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  // Go to Login Screen
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      setPasswordError(
        'Password must include at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long'
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  // Handle Sign Up Button Function
// Handle Sign Up Button Function
const handleSignUp = async () => {
  if (validateForm()) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email, // Make sure to include email
        username: username,
        password: password, // Storing passwords in plaintext is not recommended
      });

      // If the additional information is stored successfully:
      Alert.alert('Registration Successful', 'User registered successfully!');
      setRegistrationSuccessful(true);

      // Optionally, navigate to the login screen or another relevant screen
      navigation.navigate('Login');

    } catch (error) {
      // Handle both registration and Firestore errors
      console.error(error);
      // You may want to display a different message based on the error type
      Alert.alert('Registration Unsuccessful', 'There was an error during the registration process.');
    }
  }
};

  

  useEffect(() => {
    // useEffect will be called after the component is mounted
    // If registration was successful, navigate to the Login screen
    if (registrationSuccessful) {
      // Navigate to the login screen after successful registration
      navigation.navigate('Login');
    }
  }, [registrationSuccessful, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{  alignItems: 'center' }}>
          <Image source={require('../assets/ramen.png')} style={{ paddingTop: 20, width: 200, height: 200 }} />
          
          <Text style={styles.signup}>SIGN UP</Text>

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

          <Text style={{ color: 'white', fontFamily: FontFamily.didactGothicRegular }}>Or sign up with</Text>
        </View>

        <View style={styles.input1}>
          <Icon name="user" style={styles.icon} />
          <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name" placeholderTextColor="white"
          style={styles.textinput}
        />
        </View>
        <Text style={[styles.errorText, !nameError && { display: 'none' }]}>
          {nameError}
        </Text>

        <View style={styles.input1}>
        <Icon name="envelope" style={styles.icon} />
          <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email" placeholderTextColor="white"
          style={styles.textinput}
        />
        </View>
        <Text style={[styles.errorText, !emailError && { display: 'none' }]}>
          {emailError}
        </Text>

        <View style={styles.input1}>
          <Icon name="user-circle" style={styles.icon} />
          <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username" placeholderTextColor="white"
          style={styles.textinput}
        />
        </View>
        <Text style={[styles.errorText, !usernameError && { display: 'none' }]}>
          {usernameError}
        </Text>
        
        <View style={styles.input1}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password" placeholderTextColor="white"
          style={styles.textinput}
          secureTextEntry
        />
        </View>
        <Text style={[styles.errorText, !passwordError && { display: 'none' }]}>
          {passwordError}
        </Text>

        <View style={styles.input2}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password" placeholderTextColor="white"
          style={styles.textinput}
          secureTextEntry
        />
        </View>
        <Text style={[styles.errorText, !confirmPasswordError && { display: 'none' }]}>
          {confirmPasswordError}
        </Text>

        <View style={{  alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={ handleSignUp }>
            <Text style={styles.buttontext}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
          <Text style={{color: 'white', fontFamily: FontFamily.didactGothicRegular}}>Already a member?</Text>
          <Text style={{color: '#FECC81', fontFamily: FontFamily.didactGothicRegular}} onPress={handleLogin}> Login</Text>
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
    backgroundColor: '#841D06',
    padding: 30
  },
  signup: {
    fontSize: 40, 
    color: 'white',
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
    borderColor: 'rgba(255, 255, 255, 0.6)', 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 20
  },
  imageicon: {
    width: 30, 
    height: 30 
  },
  input1: {
    flexDirection: 'row', 
    borderRadius: 24, 
    borderBottomWidth: 1, 
    borderBottomColor: 'white',
    marginTop: 20
  },
  input2: {
    flexDirection: 'row', 
    borderRadius: 24, 
    borderBottomWidth: 1, 
    borderBottomColor: 'white',
    marginTop: 20
  },
  icon: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    width: 22,
    textAlign: 'center',
    color: 'white'
  },
  textinput: {
    width: '90%', 
    fontFamily: FontFamily.didactGothicRegular,
    marginLeft: 10,
    fontSize: 15, 
    paddingTop: 5, 
    paddingBottom: 5, 
    color: 'white'
  },
  button: {
    padding: 10, 
    width: '70%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 45, 
    borderRadius: 20, 
    backgroundColor: 'white',
    marginTop: 30
  },
  buttontext: {
    color: '#841D06', 
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 20, 
    fontWeight: 'bold'
  },
  errorText: {
    paddingLeft: 20,
    fontFamily: FontFamily.poppinsRegular,
    color: 'red',
    textAlign: 'left',
    marginTop: 10
  },
});

export default RegisterPage;

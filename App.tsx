import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingSplash from './src/Splash'; // Import the LoadingSplash component
import Onboarding0 from './src/Onboarding0'; // Import the Onboarding0 component
import Onboarding1 from './src/Onboarding1' // Import the Onboarding1 component
import Onboarding2 from './src/Onboarding2'; // Import the Onboarding2 component
import Login from './src/Login'; // Import the Login component
import Register from './src/Register'; // Import the Register component
import HomeScreen from "./src/Home"; // Import the Register component
import RecipePage from "./src/oneRecipePage"; // Import the Recipe component
import ProfileScreen from "./src/Profile"; // Import the Profile component
import FavoritesPage from "./src/Favorites"; // Import the Favorites component
import MoreScreen from "./src/More"; // Import the More component
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


function Home() {
  return (
    <HomeScreen />
  );
}

function Recipes() {
  return (
    <RecipePage />
  );
}

function Profile() {
  return (
    <ProfileScreen />
  );
}

function Favorites() {
  return (
    <FavoritesPage />
  );
}

function More() {
  return (
    <MoreScreen />
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute', height: 65 },
        tabBarLabelStyle: { height: 10 },
        tabBarActiveTintColor: '#841D06',
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ color }) => (
          <Text style = {{ color:color, fontSize:12, marginTop:-7}}>Home</Text>),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={Recipes}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style = {{ color:color, fontSize:12, marginTop:-7}}>Recipes</Text>),
            tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cutlery" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style = {{ color:color, fontSize:12, marginTop:-7}}>Profile</Text>),
            tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style = {{ color:color, fontSize:12, marginTop:-7}}>Favorites</Text>),
            tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style = {{ color:color, fontSize:12, marginTop:-7}}>More</Text>),
            tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="grip-lines" size={size} color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App: React.FC = () => {
  const [fontsLoaded, error] = useFonts({
    "ArchivoBlack-Regular": require("./assets/fonts/ArchivoBlack-Regular.ttf"),
    "OrelegaOne-Regular": require("./assets/fonts/OrelegaOne-Regular.ttf"),
    "DidactGothic-Regular": require("./assets/fonts/DidactGothic-Regular.ttf"),
    "Basic-Regular": require("./assets/fonts/Basic-Regular.ttf"),
    "HiraKakuStdN-W8": require("./assets/fonts/HiraKakuStdN-W8.otf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "HiraKakuProN-W3": require("./assets/fonts/HiraKakuProN-W3.otf"),
    "HiraKakuPro-W3": require("./assets/fonts/HiraKakuPro-W3.otf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Candal-Regular": require("./assets/fonts/Candal-Regular.ttf")
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingSplash"
        screenOptions={{
          headerShown: false, // Hide the header for all screens
        }}>
        <Stack.Screen name="LoadingSplash" component={LoadingSplash} />
        <Stack.Screen name="Onboarding0" component={Onboarding0} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../Home";
import RecipePage from "../oneRecipePage";
import Profile from "../Profile";
import Favorites from "../Favorites";
import More from "../More";
import { Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
        return (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                tabBarStyle: { position: 'absolute', height: 65 },
                tabBarLabelStyle: { height: 10 },
                tabBarActiveTintColor: '#841D06',
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: ({ color }) => (
                  <Text style = {{ color:color, fontSize:12, marginTop:-7}}>Home</Text>),
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Recipe"
                component={RecipePage}
                options={{
                  tabBarLabel: ({ color }) => (
                    <Text style = {{ color:color, fontSize:12, marginTop:-7}}>Recipes</Text>),
                    tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="book" size={size} color={color} />
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
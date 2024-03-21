import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { FontFamily } from "../GlobalStyles";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseApp from '.././firebase';

type MenuItemProps = {
  title: string;
  isDanger?: boolean;
  showDivider?: boolean;
};


const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('Loading...');
  const [username, setUsername] = useState('Loading...');

    // Initialize Firestore and get the current user's ID
    const db = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    useEffect(() => {
      const fetchUserData = async () => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name);
            setUsername(userData.username);
          } else {
            console.log("No such document!");
          }
        }
      };

      
    fetchUserData();
  }, [user]);

    return (
        <ScrollView style={Profilestyles.container}>
        <View>
          <Text style={Profilestyles.headerText}>My Profile</Text>
        </View>
        <View style={Profilestyles.avatarSection}>
          <View style={Profilestyles.avatarContainer}>
            <Image
              source={require('../assets/profile.png')} 
              style={Profilestyles.avatar}
            />
            <TouchableOpacity style={Profilestyles.editIcon}>
              <AntDesign name="edit" size={24} color="maroon" />
            </TouchableOpacity>
          </View>
          <Text style={Profilestyles.name}>{name}</Text>
          <Text style={Profilestyles.username}>@{username}</Text>
        </View>
        <View style={Profilestyles.socialContainer}>
          <FontAwesome name="facebook-f" size={24} style={Profilestyles.socialIcon} />
          <FontAwesome name="instagram" size={24} style={Profilestyles.socialIcon} />
          <Feather name="twitter" size={24} style={Profilestyles.socialIcon} />
        </View>
        <View>
          <MenuItem title="Privacy Policy" />
          <MenuItem title="Terms of Service" showDivider />
          <MenuItem title="Umami Craft Community Guidelines" showDivider />
          <MenuItem title="Frequently Asked Questions" />
          <MenuItem title="How-to Use" showDivider />
          <MenuItem title="Log Out" />
          <MenuItem title="Delete Account" />
        </View>
        <View style={Profilestyles.footer} />
      </ScrollView>
    );
  }


const iconMapping: { [key: string]: { name: string; library: React.ElementType; } } = {
    "Privacy Policy": { name: "settings-sharp", library: Ionicons },
    "Terms of Service": { name: "file-text-o", library: FontAwesome },
    "Umami Craft Community Guidelines": { name: "account-group-outline", library: MaterialCommunityIcons },
    "Frequently Asked Questions": { name: "frequently-asked-questions", library: MaterialCommunityIcons },
    "How-to-Use": { name: "help-circle", library: Feather },
    "Log Out": { name: "logout", library: AntDesign },
    "Delete Account": { name: "cross", library: Entypo },
};

const MenuItem: React.FC<MenuItemProps> = ({ title, isDanger, showDivider }) => {
  const iconSize = 19;
  const defaultIconDetails = { name: "right", library: AntDesign };
  const { name: iconName, library: IconLibrary } = iconMapping[title] || defaultIconDetails;
  
  return (
    <View>
      <TouchableOpacity style={[Profilestyles.menuItem, isDanger ? Profilestyles.menuItemDanger : null]}>
        <IconLibrary name={iconName} size={iconSize} color={isDanger ? "#ff5c5c" : "maroon"} style={Profilestyles.menuIcon} />
        <Text style={[Profilestyles.menuItemText, isDanger ? Profilestyles.menuItemTextDanger : null]}>{title}</Text>
      </TouchableOpacity>
      {showDivider && <View style={Profilestyles.divider} />}
    </View>
  );
};

const Profilestyles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 35,
        paddingBottom: 0,
      },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
  
    avatarContainer: {
     borderRadius: 60,
     width: 120,
     height: 120,
     marginBottom: 10,
     position: 'relative', 
     alignItems: 'center',
     justifyContent: 'center',
   },
   avatar: {
     width: '100%',
     height: '100%',
     borderRadius: 60,
   },
   editIcon: {
     position: 'absolute',
     right: 0,
     bottom: 0,
     backgroundColor: 'white',
     padding: 6,
     borderRadius: 20, 
   },
   headerText: {
     fontFamily: FontFamily.archivoBlackRegular,
     fontSize: 20,
     fontWeight: 'bold',
     color: 'maroon', 
     alignSelf: 'center',
     marginTop: 50, 
   },
  
   name: {
     fontFamily: FontFamily.orelegaOneRegular, 
     fontSize: 22,
     fontWeight: 'bold',
     color: 'maroon', 
   },
   username: {
     fontFamily: FontFamily.orelegaOneRegular, 
     fontSize: 16,
     color: 'maroon',
   },
   socialIcon: {
     fontSize: 24,
     color: 'maroon', 
     marginHorizontal: 10,
   },
   
   avatarSection: {
     alignItems: 'center',
     marginTop: 10, 
   },
  
   nameSection: {
     alignItems: 'center', 
     marginVertical: 8, 
   },
  
    menuIcon: {
     marginRight: 16, 
     width: 20, 
     height: 20, 
     alignItems: 'center',
     justifyContent: 'center'
   },
  
    menuItem: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingVertical: 10,
     paddingHorizontal: 30,
     backgroundColor: '#fff',
     marginTop: 10,
   },
  
   divider: {
     height: 2,
     backgroundColor: 'maroon',
     marginVertical: 8,
     alignSelf: 'center', 
     width: '85%', 
   },
  
   iconContainer: {
     marginRight: 20, 
     width: 24, 
     alignItems: 'center', 
   },
   menuItemText: {
     fontFamily: FontFamily.didactGothicRegular, 
     fontSize: 13,
     color: 'maroon',
     flex: 1, 
   },
   menuItemDanger: {
     backgroundColor: '#ffcccc',
   },
   menuItemTextDanger: {
     color: '#ff5c5c',
   },
   footer: {
     height: 50, 
   },
   container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
   })
  

export default ProfileScreen;
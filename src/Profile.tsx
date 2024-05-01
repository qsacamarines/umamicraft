import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { doc, getDoc, getFirestore, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
import firebaseApp from '../firebase';

// Define styles before they are used
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
    justifyContent: 'center',
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
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'maroon',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

type MenuItemProps = {
  title: string;
  isDanger?: boolean;
  showDivider?: boolean;
  onPress?: () => void;
};

const ProfileScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('Loading...');
  const [username, setUsername] = useState('Loading...');
  const [unsubscribeFromFirestore, setUnsubscribeFromFirestore] = useState<() => void>(() => { });
  const navigation = useNavigation<StackNavigationProp<any>>();
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", user.uid);

      // Listen for real-time updates with onSnapshot
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name);
          setUsername(userData.username);
        } else {
          console.log("No such document!");
        }
      }, (error) => {
        console.error("Error getting document:", error);
      });

      // Save the unsubscribe function so we can call it on logout
      setUnsubscribeFromFirestore(() => unsubscribe);
    }

    // Return a function that unsubscribes from the listener when the component unmounts
    return () => {
      if (unsubscribeFromFirestore) {
        unsubscribeFromFirestore();
      }
    };
  }, [user]);

  const handleLogout = async () => {
    // Unsubscribe from Firestore listener before signing out
    if (unsubscribeFromFirestore) {
      unsubscribeFromFirestore();
    }

    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);
        await deleteUser(user);
        setShowModal(true);
      } else {
        console.log('No user is currently signed in');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const iconMapping = {
    "Privacy Policy": { name: "settings-sharp", library: Ionicons },
    "Terms of Service": { name: "file-text-o", library: FontAwesome },
    "Umami Craft Community Guidelines": { name: "account-group-outline", library: MaterialCommunityIcons },
    "Frequently Asked Questions": { name: "frequently-asked-questions", library: MaterialCommunityIcons },
    "How-to-Use": { name: "help-circle", library: Feather },
    "Log Out": { name: "logout", library: AntDesign },
    "Delete Account": { name: "cross", library: Entypo },
  };

  const MenuItem: React.FC<MenuItemProps> = ({ title, isDanger, showDivider, onPress }) => {
    const iconSize = 19;
    const defaultIconDetails = { name: "right", library: AntDesign };
    const { name: iconName, library: IconLibrary } = iconMapping[title] || defaultIconDetails;

    return (
      <View>
        <TouchableOpacity
          style={[Profilestyles.menuItem, isDanger ? Profilestyles.menuItemDanger : null]}
          onPress={onPress}
        >
          <IconLibrary name={iconName} size={iconSize} color={isDanger ? "#ff5c5c" : "maroon"} style={Profilestyles.menuIcon} />
          <Text style={[Profilestyles.menuItemText, isDanger ? Profilestyles.menuItemTextDanger : null]}>{title}</Text>
        </TouchableOpacity>
        {showDivider && <View style={Profilestyles.divider} />}
      </View>
    );
  };

  return (
    <View style={Profilestyles.container}>
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
            <TouchableOpacity style={Profilestyles.editIcon} onPress={() => navigation.navigate('editProfile')}>
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
          <MenuItem title="Log Out" onPress={handleLogout} />
          <MenuItem title="Delete Account" isDanger onPress={handleDeleteAccount} />
        </View>
        <View style={Profilestyles.footer} />
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Account deleted successfully</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

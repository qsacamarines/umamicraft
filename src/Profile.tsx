import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { doc, getFirestore, deleteDoc, onSnapshot } from 'firebase/firestore';
import firebaseApp from '../firebase';

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'maroon',
    alignSelf: 'center',
    marginTop: 50,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 120,
    height: 120,
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
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'maroon',
    textAlign: 'center',
  },
  username: {
    fontSize: 16,
    color: 'maroon',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  menuItemText: {
    flex: 1,
    fontSize: 13,
    color: 'maroon',
  },
  menuItemDanger: {
    backgroundColor: '#ffcccc',
  },
  menuItemTextDanger: {
    color: '#ff5c5c',
  },
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
  onPress?: () => void;
};

const ProfileScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('Loading...');
  const [username, setUsername] = useState('Loading...');
  const navigation = useNavigation<StackNavigationProp<any>>();
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const unsubscribeRef = useRef<() => void>();

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const snapshotUnsubscribe = onSnapshot(docRef, (docSnap) => {
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
        unsubscribeRef.current = snapshotUnsubscribe;
      } else {
        setName('Loading...');
        setUsername('Loading...');
        if (unsubscribeRef.current) {
          unsubscribeRef.current(); // Unsubscribe when user logs out
        }
      }
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current(); // Clean up on component unmount
      }
      authUnsubscribe();
    };
  }, [auth, db]);

  const handleLogout = async () => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current(); // Ensure Firestore listeners are unsubscribed before logout
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
    if (auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await deleteDoc(userDocRef);
      await deleteUser(auth.currentUser);
      setShowModal(true);
    } else {
      console.log('No user is currently signed in');
    }
  };

  const MenuItem = ({ title, isDanger, onPress }: MenuItemProps) => {
    const iconMapping = {
      "Privacy Policy": { name: "settings-sharp", library: Ionicons },
      "Terms of Service": { name: "file-text-o", library: FontAwesome },
      "Umami Craft Community Guidelines": { name: "account-group-outline", library: MaterialCommunityIcons },
      "Frequently Asked Questions": { name: "frequently-asked-questions", library: MaterialCommunityIcons },
      "How-to-Use": { name: "help-circle", library: Feather },
      "Log Out": { name: "logout", library: AntDesign },
      "Delete Account": { name: "cross", library: Entypo },
    };
    const { name: iconName, library: IconLibrary } = iconMapping[title];

    return (
      <TouchableOpacity style={[styles.menuItem, isDanger && styles.menuItemDanger]} onPress={onPress}>
        <IconLibrary name={iconName} size={24} color={isDanger ? "#ff5c5c" : "maroon"} />
        <Text style={[styles.menuItemText, isDanger && styles.menuItemTextDanger]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>My Profile</Text>
        <View style={styles.avatarContainer}>
          <Image source={require('../assets/profile.png')} style={styles.avatar} />
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProfile')}>
            <AntDesign name="edit" size={24} color="maroon" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
        <MenuItem title="Privacy Policy" onPress={() => {}} />
        <MenuItem title="Terms of Service" onPress={() => {}} />
        <MenuItem title="Umami Craft Community Guidelines" onPress={() => {}} />
        <MenuItem title="Frequently Asked Questions" onPress={() => {}} />
        <MenuItem title="How-to-Use" onPress={() => {}} />
        <MenuItem title="Log Out" isDanger onPress={handleLogout} />
        <MenuItem title="Delete Account" isDanger onPress={handleDeleteAccount} />
      </ScrollView>

      <Modal visible={showModal} transparent animationType="fade">
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

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, updatePassword } from 'firebase/auth';
import firebaseApp from '../firebase';

const EditProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    marginBottom: 10,
    fontSize: 16,
    paddingVertical: 5,
  },
  saveButton: {
    backgroundColor: 'maroon',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: 'maroon',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const EditProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name ?? '');
          setUsername(userData.username ?? '');
          // Do not fetch the password. It's not stored in Firestore for security reasons.
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserData();
  }, [user]);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const saveProfile = async () => {
       // Validate the password if it's not empty
       if (password && !validatePassword(password)) {
        Alert.alert('Invalid Password', 'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
        return;
      }
    setShowModal(false);
    try {
        
      if (password.trim().length > 0) {
        // Update the password
        await updatePassword(user, password);
      }
      // Update the user document in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        name: name,
        username: username,
      });
      Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Update Failed', 'There was an issue updating your profile.');
    }
  };

  return (
    <ScrollView style={EditProfileStyles.container}>
      <View style={EditProfileStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={EditProfileStyles.headerText}>Edit Profile</Text>
      </View>
      <View style={EditProfileStyles.avatarContainer}>
        <Image
          source={require('../assets/profile.png')}
          style={EditProfileStyles.avatar}
        />
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text style={{ color: 'maroon' }}>Change Profile Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={EditProfileStyles.inputContainer}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={EditProfileStyles.inputField}
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={EditProfileStyles.inputField}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password (leave blank to keep unchanged)"
          secureTextEntry
          style={EditProfileStyles.inputField}
        />
      </View>
      <TouchableOpacity
        style={EditProfileStyles.saveButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={EditProfileStyles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={EditProfileStyles.modalContainer}>
          <View style={EditProfileStyles.modalContent}>
            <Text>Are you sure you want to update your profile?</Text>
            <TouchableOpacity
              style={EditProfileStyles.modalButton}
              onPress={saveProfile}
            >
              <Text style={EditProfileStyles.modalButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={EditProfileStyles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={EditProfileStyles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EditProfile;

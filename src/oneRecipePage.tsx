import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';
import { getFirestore, doc, onSnapshot, deleteDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type RecipeNavigatorParamList = {
  OneRecipePage: { recipeId: string };
};

const OneRecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RecipeNavigatorParamList, 'OneRecipePage'>>();
  const recipeId = route.params.recipeId;
  const unsubscribeListeners = useRef<(() => void)[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeRef = ref(database, `recipes/${recipeId}`);
      try {
        const snapshot = await get(recipeRef);
        if (snapshot.exists()) {
          setRecipe(snapshot.val());
          checkFavoriteStatus();
        } else {
          console.log('Recipe does not exist.');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    const checkFavoriteStatus = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userFavoritesRef = doc(db, 'users', user.uid, 'favorites', recipeId);

        const unsubscribeFavorite = onSnapshot(userFavoritesRef, (snapshot) => {
          setIsFavorited(snapshot.exists());
        });

        unsubscribeListeners.current.push(unsubscribeFavorite);
      }
    };

    fetchRecipe();

    return () => {
      unsubscribeListeners.current.forEach((unsubscribe) => unsubscribe());
      unsubscribeListeners.current = [];
    };
  }, [recipeId]);

  const handleBackClick = () => {
    navigation.goBack();
  };

  const handleHeartClick = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userFavoritesRef = doc(db, 'users', user.uid, 'favorites', recipeId);

      if (isFavorited) {
        try {
          await deleteDoc(userFavoritesRef);
          setIsFavorited(false);
        } catch (error) {
          console.error('Error removing from favorites:', error);
        }
      } else {
        try {
          await setDoc(userFavoritesRef, recipe);
          setIsFavorited(true);
        } catch (error) {
          console.error('Error adding to favorites:', error);
        }
      }
    }
    setModalVisible(!isFavorited);
    setRemoveModalVisible(isFavorited);
  };

  const closeModal = () => {
    setModalVisible(false);
    setRemoveModalVisible(false);
  };

  if (!recipe) {
    return <View><Text>Loading...</Text></View>;
  }

  const { name, image_url, ingredients, instructions, category } = recipe;

  return (
    <ScrollView>
      {/* Navigation header */}
      <View style={styles.navigationHeader}>
        {/* Back button */}
        <TouchableOpacity onPress={handleBackClick}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {/* Recipe name */}
        <Text style={styles.recipeName}>{name}</Text>
        {/* Heart icon */}
        <TouchableOpacity onPress={handleHeartClick}>
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Recipe image */}
      <Image source={{ uri: image_url }} style={styles.recipeImage} />

      {/* Recipe details */}
      <View style={styles.details}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories:</Text>
          <Text>{category.join(', ')}</Text>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {ingredients.map((item, index) => (
            <Text key={index}>{`${item.quantity} ${item.unit} ${item.ingredient}`}</Text>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions:</Text>
          {instructions.map((item, index) => (
            <Text key={index}>{`${index + 1}. ${item.instruction}`}</Text>
          ))}
        </View>
      </View>

      {/* Modal for adding to favorites */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Added to Favorites!</Text>
            <TouchableOpacity style={styles.buttonClose} onPress={closeModal}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for removing from favorites */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isRemoveModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Removed from Favorites!</Text>
            <TouchableOpacity style={styles.buttonClose} onPress={closeModal}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#841D06', // Or your choice of header color
    paddingTop: 10,
  },
  recipeImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  details: {
    padding: 20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default OneRecipePage;

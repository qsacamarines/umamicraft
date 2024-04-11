import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, get } from 'firebase/database';
import { database } from '../firebase'; // Make sure this path matches your Firebase configuration file
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type RecipeNavigatorParamList = {
  OneRecipePage: { recipeId: string }; // Define other screens and their params in a similar manner
};

const OneRecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [isHeartFull, setIsHeartFull] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RecipeNavigatorParamList, 'OneRecipePage'>>();
  const recipeId = route.params.recipeId;

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeRef = ref(database, `recipes/${recipeId}`);
      try {
        const snapshot = await get(recipeRef);
        if (snapshot.exists()) {
          setRecipe(snapshot.val());
        } else {
          console.log('Recipe does not exist.');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleBackClick = () => {
    navigation.goBack();
  };

  const handleHeartClick = () => {
    setIsHeartFull(!isHeartFull);
    setModalVisible(!isHeartFull);
    setRemoveModalVisible(isHeartFull);
  };

  const closeModal = () => {
    setModalVisible(false);
    setRemoveModalVisible(false);
  };

  if (!recipe) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navigationHeader}>
        <TouchableOpacity onPress={handleBackClick}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.recipeName}>{recipe?.name || 'Loading...'}</Text>
        <TouchableOpacity onPress={handleHeartClick}>
          <Ionicons
            name={isHeartFull ? 'heart' : 'heart-outline'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: recipe.image_url }} style={styles.recipeImage} />

      <View style={styles.details}>
        <Text style={styles.recipeTitle}>{recipe.name}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {recipe.ingredients.map((item, index) => (
            <Text key={index}>{`${item.quantity} ${item.unit} ${item.ingredient}`}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions:</Text>
          {recipe.instructions.map((item, index) => (
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

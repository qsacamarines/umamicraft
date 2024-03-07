import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation, ParamListBase} from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { createStackNavigator } from '@react-navigation/stack';
import CustomizeRecipe from './customizeRecipePage';
import firebase from '../firebase';
import { database } from '../firebase';
import { get, ref } from 'firebase/database';

const Stack = createStackNavigator();

const RecipePage: React.FC = () => {
  const [isHeartFull, setIsHeartFull] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleHeartClick = () => {
    setIsHeartFull(!isHeartFull);
    if (!isHeartFull) {
      setModalVisible(true);
    } else {
      setRemoveModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setRemoveModalVisible(false);
  };


  return (
      <Stack.Navigator initialRouteName="Recipe">
        <Stack.Screen name="Recipe" component={RecipeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CustomizeRecipe" component={CustomizeRecipe} options={{ headerShown: false }} />
      </Stack.Navigator>
  );

  function RecipeScreen() {
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const snapshot = await get(ref(database, 'recipes/recipe1'));
          const recipeData = snapshot.val();
          console.log('Recipe Data:', recipeData);
          setRecipe(recipeData);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };

      fetchRecipe();
    }, []);

    return (
      <ScrollView style={styles.container}>
      <View style={styles.header} />


      <View style={styles.navigationHeader}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.recipeName}>Recipe Name</Text>
        <TouchableOpacity onPress={() => handleHeartClick()}>
          <Ionicons
            name={isHeartFull ? 'heart' : 'heart-outline'}
            size={24}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.recipeTitle}>{recipe?.recipe_name || 'Loading...'}</Text>
      </View>

      <View style={styles.ImageContainer}>
        <Image source={{ uri: recipe?.image_url || 'https://picsum.photos/200' }} style={styles.recipeImage} />
      </View>

      <View style={styles.stepsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {recipe?.ingredients?.map((ingredient: string, index: number) => (
            <Text key={index}>- {ingredient}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cooking Steps:</Text>
          {recipe?.steps?.map((step: string, index: number) => (
            <Text key={index}>{`${index + 1}. ${step}`}</Text>
          ))}
        </View>
      </View>
      
     {/* Added to favorites modal */}
     <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Great!</Text>
              <Text style={styles.additionalText}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>You added this recipe to your favorites.</Text>
                {"\n"}{"\n"}
                <Text style={{ fontSize: 16 }}>You can customize this recipe to your liking.</Text>
              </Text>
              <TouchableOpacity
                style={styles.customizeButton}
                onPress={() => {
                  closeModal();
                  navigation.navigate('CustomizeRecipe' as never);
                }}
              >
                <Text style={styles.buttonText}>Customize</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      {/* Remove from favorites modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isRemoveModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Remove Recipe?</Text>
            <Text style={styles.additionalText}>
              <Text style={{ fontSize: 16 }}>
                You're going to be removing this recipe from favorites.
              </Text>
            </Text>
            <TouchableOpacity style={styles.customizeButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      
    </ScrollView>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#841D06',
    width: 450,
    height: 450,
    borderRadius: 450 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -100,
    left:-30,
  },
  recipeImage: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 40, 
    opacity:50,
  },
  recipeTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
    marginTop: 16,
    zIndex: 1,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginTop: 16,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ImageContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
  },
  titleContainer:{
    flex:1,
    paddingTop: 30,
    paddingLeft: 50,
  },
  stepsContainer:{
    alignItems:"center",
    padding: 20,
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    backgroundColor: '#841D06',
  },
  icon: {
    marginRight: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 40,
    width: '90%',
    alignItems: 'center', 
    marginBottom:10,
  },
  modalHeader: {
    color: '#841D06',
    fontSize: 39, 
    fontWeight: 'bold', 
    marginBottom: 10,
  },
  additionalText: {
    fontSize: 18, 
    textAlign: 'center',
    marginBottom: 10,
  },
  customizeButton: {
    backgroundColor: '#841D06',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
    width: '90%', 
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize:20,
    fontWeight: "700",
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default RecipePage;
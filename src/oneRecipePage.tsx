import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, Image, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { createStackNavigator } from '@react-navigation/stack';
import CustomizeRecipe from './customizeRecipePage';
import firebase from '../firebase';
import { database } from '../firebase';
import { get, ref } from 'firebase/database';
import { FontFamily } from '../GlobalStyles';


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

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.recipeNameNav}>Recipe Name</Text>

          <TouchableOpacity onPress={() => handleHeartClick()}>
            <Ionicons
              name={isHeartFull ? 'heart' : 'heart-outline'}
              size={24}
              color="#fff"
              style={styles.icon}
            />
          </TouchableOpacity>

        </View>

        <View style={styles.recipe}>

          <View style={styles.recipeNameMain}>
            <Text style={styles.recipeTitle}>{recipe?.recipe_name || 'Recipe Name'}</Text>
          </View>

          <View style={styles.ImageContainer}>
            <Image source={{ uri: recipe?.image_url || 'https://picsum.photos/200' }} style={styles.recipeImage} />
          </View>

          <View style={styles.nfcol}>

            <View style={styles.nfrow1}>

              <View style={styles.nfrow2}>
                <Text style={styles.nftype}>CALORIES</Text>
                <Text style={styles.nfvalue}>00g</Text>
              </View>

              <View style={styles.nfrow2}>
                <Text style={styles.nftype}>CARBS</Text>
                <Text style={styles.nfvalue}>00g</Text>
              </View>

            </View>

            <View style={styles.nfrow1}>

              <View style={styles.nfrow2}>
                <Text style={styles.nftype}>PROTEINS</Text>
                <Text style={styles.nfvalue}>00g</Text>
              </View>

              <View style={styles.nfrow2}>
                <Text style={styles.nftype}>FAT</Text>
                <Text style={styles.nfvalue}>00g</Text>
              </View>

            </View>

          </View>

          <View style={styles.categories}>

            <View style={styles.catItem}>
              <View style={styles.catIcon}></View>
              <Text style={styles.catText}>Lorem</Text>
            </View>

            <View style={styles.catItem}>
              <View style={styles.catIcon}></View>
              <Text style={styles.catText}>Lorem</Text>
            </View>

            <View style={styles.catItem}>
              <View style={styles.catIcon}></View>
              <Text style={styles.catText}>Lorem</Text>
            </View>

          </View>

          <View style={styles.recipeDesc}>
            <Text style={styles.p}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque dictum justo, eu fermentum neque feugiat quis. Suspendisse porttitor urna nec leo feugiat ullamcorper.
            </Text>
          </View>

          {/*  
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
            */}

          <View style={styles.ingredients}>

            <Text style={styles.h3}>
              Ingredients
            </Text>

            <View style={styles.ingredientList}>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

              <View style={styles.ingredientLine}>

                <Text style={styles.p}>
                  Lorem Ipsum
                </Text>

                <Text style={styles.p}>
                  1
                </Text>

              </View>

            </View>

          </View>

          <View style={styles.instructions}>

            <Text style={styles.h3}>
              Cooking Instructions
            </Text>

            <View style={styles.cookInstructions}>

              <Text style={styles.p2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc a pharetra varius. Morbi consectetur nisl vitae vulputate tincidunt.
              </Text>

              <Text style={styles.p2}>
                Sed tempor a tortor vehicula aliquam. Nunc sed porttitor est. Phasellus finibus dignissim tortor vel laoreet. Etiam vitae feugiat ipsum.
              </Text>

              <Text style={styles.p2}>
                Sed eget sapien pretium, ultricies eros non, elementum turpis. Nam quis laoreet libero. Maecenas condimentum lacus imperdiet velit dictum, imperdiet egestas elit venenatis.
              </Text>

              <Text style={styles.p2}>
                Maecenas id diam ac dui pharetra pretium. Duis varius turpis quis porta tempor. Vestibulum lobortis bibendum augue, non pellentesque enim congue id.
              </Text>

              <Text style={styles.p2}>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus lacinia arcu est, eget tincidunt libero condimentum eu.
              </Text>

            </View>

          </View>

          <TouchableOpacity
            onPress={handleHeartClick}
            style={styles.addToFavorites}
          >
            <Text style={styles.addToFavoritesText}>Add to Favorites</Text>
          </TouchableOpacity>

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
  addToFavoritesText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#841D06"
  },
  addToFavorites: {
    height: 48,
    width: 334,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#841D06",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  recipe: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 36,
    paddingBottom: 80,
    alignItems: 'center',
    marginTop: 16,
  },
  instructions: {
    width: 334,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  cookInstructions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  p2: {
    width: 334,
    fontSize: 12,
    fontWeight: '600'
  },
  ingredients: {
    width: 334,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#841D06'
  },
  ingredientList: {
    gap: 12,
  },
  ingredientLine: {
    width: 334,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recipeDesc: {
    width: 334,
  },
  p: {
    fontSize: 12,
    fontFamily: FontFamily.hiraKakuProW3
  },
  categories: {
    height: 48,
    width: 334,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#F3D9A4",
    borderRadius: 62,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  catItem: {
    width: 60,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  catIcon: {
    height: 24,
    width: 24,
    backgroundColor: "#000000",
    borderRadius: 56,
  },
  catText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  nfcol: {
    height: 34,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  nfrow1: {
    width: 334,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nfrow2: {
    width: 144,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nftype: {
    fontSize: 12,
    fontFamily: FontFamily.hiraKakuProW3
  },
  nfvalue: {
    fontSize: 12,
    color: '#841D06',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#841D06',
    width: 524,
    height: 524,
    borderRadius: 450 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -143,
    left: -47,
  },
  recipeImage: {
    height: 256,
    width: 334,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  recipeTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    zIndex: 1,
  },
  recipeNameMain: {
    width: 334,
    height: 74,
    alignItems: 'left',
  },
  recipeNameNav: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  ImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stepsContainer: {
    alignItems: "center",
    padding: 20,
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: '#841D06',
    marginBottom: 16,
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
    marginBottom: 10,
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
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default RecipePage;
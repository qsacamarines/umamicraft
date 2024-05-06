import React, { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue, off } from "firebase/database";
import { database } from '../firebase'; // Your configured firebase file
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, setDoc, doc } from 'firebase/firestore';
import { Color, FontFamily } from '../GlobalStyles';
import { ParamListBase, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Recipe = {
  id: string;
  name: string;
  image_url: string;
};

const RecipesScreen: React.FC = () => {
  const unsubscribeListeners = useRef<(() => void)[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [favoritedRecipes, setFavoritedRecipes] = useState<string[]>([]);
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [favoritedMap, setFavoritedMap] = useState<Record<string, boolean>>({});

  const cleanupListeners = () => {
    unsubscribeListeners.current.forEach((unsubscribe) => unsubscribe());
    unsubscribeListeners.current = [];
  };

useEffect(() => {
  // Fetch the recipes from your realtime database
  const recipesRef = ref(database, 'recipes');
  const unsubscribeRecipes = onValue(recipesRef, (snapshot) => {
    const rawData = snapshot.val();
    const fetchedRecipes: Recipe[] = Object.keys(rawData).map((key) => ({
      id: key,
      name: rawData[key].name,
      image_url: rawData[key].image_url,
    }));
    setRecipes(fetchedRecipes);

    // Create a map of recipe IDs to their favorited state
    const favoritedMap = fetchedRecipes.reduce((acc, recipe) => {
      acc[recipe.id] = favoritedRecipes.includes(recipe.id);
      return acc;
    }, {});

    // Set the favorited map as state
    setFavoritedMap(favoritedMap);
  });

  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Authenticated user ID:', user.uid);
      setUserId(user.uid);
      const userFavoritesRef = collection(db, 'users', user.uid, 'favorites');
      const unsubscribeFavorites = onSnapshot(userFavoritesRef, (snapshot) => {
        console.log('Fetching favorited recipes...');
        const favoriteIds = snapshot.docs.map((doc) => doc.id);
        setFavoritedRecipes(favoriteIds);
      });

      unsubscribeListeners.current.push(unsubscribeFavorites); // Store the cleanup function
    } else {
      console.log('User signed out');
      setUserId(null);
      setFavoritedRecipes([]);
      setFavoritedMap({});

      // Call the cleanup functions when the user logs out
      unsubscribeListeners.current.forEach((unsubscribe) => unsubscribe());
      unsubscribeListeners.current = []; // Reset the array after cleanup
    }
  });

  unsubscribeListeners.current.push(unsubscribeRecipes);
  unsubscribeListeners.current.push(unsubscribeAuth);

  return () => {
    cleanupListeners();
  };
}, [auth, db]);

  useEffect(() => {
    // Create a map of recipe IDs to their favorited state
    const favoritedMap = recipes.reduce((acc, recipe) => {
      acc[recipe.id] = favoritedRecipes.includes(recipe.id);
      return acc;
    }, {});

    // Set the favorited map as state
    setFavoritedMap(favoritedMap);
  }, [recipes, favoritedRecipes]);

  const handleFavorite = async (recipe: Recipe) => {
    if (!userId) {
      console.log('User must be logged in to save favorites');
      return;
    }
  
    const userFavoritesRef = collection(db, 'users', userId, 'favorites');
    const recipeRef = doc(userFavoritesRef, recipe.id);
  
    if (favoritedRecipes.includes(recipe.id)) {
      // Remove the recipe from favorites
      try {
        await deleteDoc(recipeRef);
        setFavoritedRecipes(favoritedRecipes.filter((id) => id !== recipe.id));
        setFavoritedMap({ ...favoritedMap, [recipe.id]: false }); // Update favoritedMap
      } catch (error) {
        console.error('Error removing recipe from favorites:', error);
      }
    } else {
      // Add the recipe to favorites
      try {
        await setDoc(recipeRef, recipe);
        setFavoritedRecipes([...favoritedRecipes, recipe.id]);
        setFavoritedMap({ ...favoritedMap, [recipe.id]: true }); // Update favoritedMap
      } catch (error) {
        console.error('Error adding recipe to favorites:', error);
      }
    }
  };

  const isFavorited = (recipeId: string) => favoritedMap[recipeId] || false;

  const handlePressRecipe = (recipe: Recipe) => {
    navigation.navigate('OneRecipePage', { recipeId: recipe.id });
  };

  const renderItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => handlePressRecipe(item)}
    >
      <Image style={styles.recipeImage} source={{ uri: item.image_url }} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.recipeName}>{item.name}</Text>
      </View>
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          handleFavorite(item);
        }}
        style={styles.favoriteButton}
      >
        <Ionicons
          name={isFavorited(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color="maroon"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECIPES</Text>
      <ScrollView horizontal={false} contentContainerStyle={styles.recipeList}>
        {recipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCardContainer}>
            {renderItem({ item: recipe })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
 };
 
 const screenWidth = Dimensions.get('window').width;

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.maroon,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.archivoBlackRegular,
    color: Color.white,
    marginBottom: 20,
  },
  recipeItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  recipeName: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: FontFamily.basicRegular,
    fontWeight: 'bold',
    color: Color.black,
  },
  recipeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 50, 
  },
  favoriteButton: {
    marginLeft: 8,
  },
  recipeCardContainer: {
    width: '98%', // Adjusted width for two columns
  },
});
 
 export default RecipesScreen;
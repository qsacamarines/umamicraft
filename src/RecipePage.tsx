import * as React from "react";
import { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import oneRecipePage from './oneRecipePage';
import { ref, onValue, off } from "firebase/database";
import { database } from '../firebase'; // Your configured firebase file
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, setDoc, doc } from 'firebase/firestore';

type Recipe = {
  id: string;
  name: string;
  image_url: string;
};

const Recipes: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isHeartFull, setIsHeartFull] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [favoritedRecipes, setFavoritedRecipes] = useState<string[]>([]);
  const auth = getAuth();
  const db = getFirestore();
  const [favoritedMap, setFavoritedMap] = useState<Record<string, boolean>>({});

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

    // Listen for auth state changes and fetch the user's favorited recipes from Firestore
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const userFavoritesRef = collection(db, 'users', user.uid, 'favorites');
        const unsubscribeFavorites = onSnapshot(userFavoritesRef, (snapshot) => {
          const favoriteIds = snapshot.docs.map((doc) => doc.id);
          setFavoritedRecipes(favoriteIds);
        });
        return unsubscribeFavorites;
      } else {
        setUserId(null);
        setFavoritedRecipes([]);
        setFavoritedMap({}); // Reset the favorited map when the user logs out
      }
    });

    return () => {
      unsubscribeRecipes();
      unsubscribeAuth();
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
      await deleteDoc(recipeRef);
      setFavoritedRecipes(favoritedRecipes.filter((id) => id !== recipe.id));
      setFavoritedMap({ ...favoritedMap, [recipe.id]: false }); // Update favoritedMap
    } else {
      // Add the recipe to favorites
      await setDoc(recipeRef, recipe);
      setFavoritedRecipes([...favoritedRecipes, recipe.id]);
      setFavoritedMap({ ...favoritedMap, [recipe.id]: true }); // Update favoritedMap
    }
  };

  const isFavorited = (recipeId: string) => favoritedMap[recipeId] || false;

  const handlePressRecipe = (recipe: Recipe) => {
    navigation.navigate('OneRecipePage', { recipeId: recipe.id });
  };

  const renderItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeCardContainer}
      onPress={() => handlePressRecipe(item)}
    >
      <View style={styles.recipeCard}>
        <Image style={styles.recipeImage} source={{ uri: item.image_url }} />
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <View style={styles.detailsCont}>
            <Text style={styles.recipeCal}>658 Cal.</Text>
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
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );


  //////


  return (
    <ScrollView style={styles.scrollCont}>
      <View style={styles.container}>
        <Text style={styles.title}>RECIPES</Text>
        <View style={styles.vertFlex}>
          <View style={styles.horiFlex}>
            {recipes.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCardContainer}>
                {renderItem({ item: recipe })}
              </View>
            ))}
          </View>
          <View style={styles.horiFlex}>
            {recipes.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCardContainer}>
                {renderItem({ item: recipe })}
              </View>
            ))}
          </View>
          <View style={styles.horiFlex}>
            {recipes.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCardContainer}>
                {renderItem({ item: recipe })}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsCont:{
    width: "92%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  recipeDetails: {
    height: 67,
    width: 168,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  recipeCal: {
    fontSize: 12,
  },
  recipeName: {
    color: Color.black,
    fontFamily: FontFamily.basicRegular,
    fontSize: 14,
    fontWeight: 'bold',
  },
  recipeImage: {
    width: 168,
    height: 150,
    resizeMode: 'cover',
  },
  recipeCard: {
    width: 168,
    height: 217,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    overflow: 'hidden',
  },
  horiFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  },
  vertFlex: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.archivoBlackRegular,
    color: 'white',
  },
  scrollCont: {
    backgroundColor: "#841D06"
  },
  container: {
    display: 'flex',
    marginHorizontal: 20,
    marginTop: 80,
  },
  favorites: {
    top: 75,
    left: 20,
    fontSize: 25,
    fontFamily: FontFamily.archivoBlackRegular,
    width: 220,
  },
  favoritesFlexBox: {
    textAlign: "left",
    color: Color.white,
    position: "absolute",
  },
  faverecipe1box: {
    left: 20,
    height: 217,
    top: 118,
  },
  rect1: {
    top: 153,
    height: 19,
    backgroundColor: '#f9f9f9',
    width: 115,
    left: 0,
  },
  boxWidth: {
    width: 168,
    position: "absolute",
  },
  recipe1pic: {
    height: 155,
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  box1: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 168,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    left: 0,
    top: 0,
    height: 217,
  },
  calorie: {
    top: 200,
    width: 39,
    height: 15,
    fontFamily: FontFamily.beVietnam,
    color: Color.black,
    fontSize: 10,
    left: 4,
    textAlign: "left",
    position: "absolute",
  },
  faverecipe2box: {
    left: 200,
    width: 169,
    position: "absolute",
    height: 217,
    top: 118,
  },
  box2: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 115,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    left: 0,
    top: 0,
    height: 217,
  },
  recipe2pic: {
    height: 155,
    width: 125,
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  favoritesPage: {
    backgroundColor: Color.maroon,
    flex: 1,
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  faverecipe3box: {
    left: 20,
    height: 217,
    top: 348,
  },
  box3: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 168,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    left: 0,
    top: 0,
    height: 217,
  },
  recipe3pic: {
    height: 155,
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  faverecipe4box: {
    left: 200,
    height: 217,
    top: 348,
  },
  box4: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 168,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    left: 0,
    top: 0,
    height: 217,
  },
  recipe4pic: {
    height: 155,
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  faverecipe5box: {
    left: 20,
    height: 217,
    top: 578,
  },
  box5: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 168,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    left: 0,
    top: 0,
    height: 217,
  },
  recipe5pic: {
    height: 155,
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  faverecipe6box: {
    left: 200,
    height: 217,
    top: 578,
  },
  box6: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 168,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    left: 0,
    top: 0,
    height: 217,
  },
  recipe6pic: {
    height: 155,
    borderRadius: 5,
    left: 0,
    top: 0,
  },
  icon: {
    top: 185,
    left: 135,
  }

});

export default Recipes;

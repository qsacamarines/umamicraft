import * as React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, useIsFocused } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

type Recipe = {
  id: string;
  name: string;
  image_url: string;
};

const FavoritesPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [favoritedRecipes, setFavoritedRecipes] = React.useState<Recipe[]>([]);
  const [userId, setUserId] = React.useState<string | null>(null);
  const isFocused = useIsFocused();

  const auth = getAuth();
  const db = getFirestore();

  React.useEffect(() => {
    // Fetch the recipes from the Realtime Database
    const recipesRef = ref(database, "recipes");
    const unsubscribeRecipes = onValue(recipesRef, (snapshot) => {
      const rawData = snapshot.val();
      const fetchedRecipes: Recipe[] = Object.keys(rawData).map((key) => ({
        id: key,
        name: rawData[key].name,
        image_url: rawData[key].image_url,
        calories: rawData[key].calories,
      }));
      setRecipes(fetchedRecipes);
    });

    // Listen for auth state changes and fetch the user's favorited recipes from Firestore
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const userFavoritesRef = collection(db, "users", user.uid, "favorites");
        const unsubscribeFavorites = onSnapshot(userFavoritesRef, (snapshot) => {
          const favoriteRecipes: Recipe[] = [];
          snapshot.docs.forEach((doc) => {
            const recipe = doc.data() as Recipe;
            favoriteRecipes.push(recipe);
          });
          setFavoritedRecipes(favoriteRecipes);
        });
        return unsubscribeFavorites;
      } else {
        setUserId(null);
        setFavoritedRecipes([]);
      }
    });

    return () => {
      unsubscribeRecipes();
      unsubscribeAuth();
    };
  }, [auth, db, isFocused]);

  return (
    <View style={styles.favoritesPage}>
      <Text style={styles.favorites}>FAVORITES</Text>
      <View style={styles.recipeList}>
        {favoritedRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Image style={styles.recipeImage} source={{ uri: recipe.image_url }} />
            <View style={styles.recipeDetails}>
              <Text style={styles.recipeName}>{recipe.name}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favoritesPage: {
    flex: 1,
    backgroundColor: Color.maroon,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  favorites: {
    fontSize: 30,
    fontFamily: FontFamily.archivoBlackRegular,
    color: Color.white,
    marginBottom: 20,
  },
  recipeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recipeCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recipeDetails: {
    padding: 10,
  },
  recipeName: {
    fontFamily: FontFamily.basicRegular,
    fontSize: 14,
    fontWeight: "bold",
    color: Color.black,
  },
  calorie: {
    fontFamily: FontFamily.beVietnam,
    fontSize: 12,
    color: Color.black,
  },
});

export default FavoritesPage;
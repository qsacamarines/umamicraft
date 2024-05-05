import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { ref, onValue, getDatabase } from "firebase/database";
import { StackNavigationProp } from "@react-navigation/stack";

type Recipe = {
  id: string;
  name: string;
  image_url: string;
};

type RootStackParamList = {
  OneRecipePage: { recipeId: string };
  Favorites: { category: string };
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OneRecipePage'>;

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const auth = getAuth();
  const db = getFirestore();
  const realtimeDB = getDatabase();
  const unsubscribes = useRef<(() => void)[]>([]);
  const navigation = useNavigation<ScreenNavigationProp>();  // Typed correctly here

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, user => {
      clearSubscriptions();
      if (user) {
        fetchFavorites(user.uid);
      } else {
        setFavorites([]);
      }
    });

    return () => {
      authUnsub();
      clearSubscriptions();
    };
  }, [auth]);

  const clearSubscriptions = () => {
    unsubscribes.current.forEach(unsub => unsub());
    unsubscribes.current = [];
  };

  const fetchFavorites = (userId: string) => {
    const favoritesRef = collection(db, `users/${userId}/favorites`);
    const unsub = onSnapshot(favoritesRef, snapshot => {
      const ids = snapshot.docs.map(doc => doc.id);
      fetchFavoriteRecipesDetails(ids);
    }, error => {
      console.error("Error fetching favorites:", error);
    });
    unsubscribes.current.push(unsub);
  };

  const fetchFavoriteRecipesDetails = (ids: string[]) => {
    setFavorites([]); // Reset favorites before fetching new details
    ids.forEach(id => {
      const recipeRef = ref(realtimeDB, `recipes/${id}`);
      const unsub = onValue(recipeRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          setFavorites(prev => [...prev, { id, ...data }]);
        }
      }, { onlyOnce: true });
      unsubscribes.current.push(() => unsub());
    });
  };

  const handlePressRecipe = (recipeId: string) => {
    navigation.navigate('OneRecipePage', { recipeId });  // Navigate to OneRecipePage with the recipeId
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      {favorites.map(recipe => (
        <TouchableOpacity key={recipe.id} onPress={() => handlePressRecipe(recipe.id)}>
          <View style={styles.recipeCard}>
            <Image style={styles.recipeImage} source={{ uri: recipe.image_url }} />
            <Text style={styles.recipeName}>{recipe.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.maroon,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.archivoBlackRegular,
    color: Color.white,
    marginBottom: 20,
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
  recipeName: {
    fontFamily: FontFamily.basicRegular,
    fontSize: 14,
    fontWeight: "bold",
    color: Color.black,
  },
});

export default FavoritesPage;

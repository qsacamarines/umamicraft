import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { Color, FontFamily } from "../GlobalStyles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { ref, onValue, getDatabase } from "firebase/database";

type Recipe = {
  id: string;
  name: string;
  image_url: string;
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const auth = getAuth();
  const db = getFirestore();
  const realtimeDB = getDatabase();
  const unsubscribes = useRef<(() => void)[]>([]);

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, (user) => {
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
    unsubscribes.current.forEach((unsub) => unsub());
    unsubscribes.current = [];
  };

  const fetchFavorites = (userId: string) => {
    const favoritesRef = collection(db, `users/${userId}/favorites`);
    const unsub = onSnapshot(
      favoritesRef,
      (snapshot) => {
        const ids = snapshot.docs.map((doc) => doc.id);
        fetchFavoriteRecipesDetails(ids);
      },
      (error) => {
        console.error("Error fetching favorites:", error);
      }
    );
    unsubscribes.current.push(unsub);
  };

  const fetchFavoriteRecipesDetails = (ids: string[]) => {
    setFavorites([]); // Reset favorites before fetching new details
    ids.forEach((id) => {
      const recipeRef = ref(realtimeDB, `recipes/${id}`);
      const unsub = onValue(
        recipeRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setFavorites((prev) => [...prev, { id, ...data }]);
          } else {
            console.log(`Recipe with ID ${id} not found in Realtime Database.`);
          }
        },
        { onlyOnce: true }
      );
      unsubscribes.current.push(() => unsub());
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      {favorites.map((recipe) => (
        <View key={recipe.id} style={styles.recipeItem}>
          <Image
            style={styles.recipeImage}
            source={{ uri: recipe.image_url }}
          />
          <Text style={styles.recipeName}>{recipe.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Add this line to make the ScrollView take up the remaining space
    backgroundColor: Color.maroon,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 80,
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
});

export default FavoritesPage;
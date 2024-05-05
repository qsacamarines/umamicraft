import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation parameter types
type RootStackParamList = {
  OneRecipePage: { recipeId: string };
  CategSearchResults: { category: string };
};

// Define the navigation prop types
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OneRecipePage'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CategSearchResults'>;

const CategSearchResults = ({
  route,
  navigation,
}: {
  route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
}) => {
  const { category } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const recipesRef = ref(db, 'recipes');
    const unsubscribe = onValue(recipesRef, (snapshot) => {
      const recipesList = [];
      snapshot.forEach((childSnapshot) => {
        const recipe = childSnapshot.val();
        if (recipe.category && recipe.category.includes(category)) {
          recipesList.push({ ...recipe, key: childSnapshot.key });
        }
      });
      setRecipes(recipesList);
      setLoading(false);
    }, { onlyOnce: true });
    return () => unsubscribe();
  }, [category]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!recipes.length) {
    return (
      <View style={styles.centered}>
        <Text>No recipes found for this category.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('OneRecipePage', { recipeId: item.key })}
    >
      <Image source={{ uri: item.image_url }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes for {category}</Text>
      <FlatList data={recipes} renderItem={renderItem} keyExtractor={(item) => item.key} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
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
  },
});

export default CategSearchResults;
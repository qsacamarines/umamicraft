import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, FontFamily } from '../GlobalStyles';
// Define the navigation parameter types
type RootStackParamList = {
  OneRecipePage: { recipeId: string };
  SearchResultsName: { searchQuery: string };
};

// Define the navigation prop types
type SearchResultsNameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SearchResultsName'
>;
type SearchResultsNameScreenRouteProp = RouteProp<RootStackParamList, 'SearchResultsName'>;

const SearchResultsName = ({
  route,
}: {
  route: SearchResultsNameScreenRouteProp;
}) => {
  const navigation = useNavigation<SearchResultsNameScreenNavigationProp>();
  const { searchQuery } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const recipesRef = ref(db, 'recipes');
    const unsubscribe = onValue(recipesRef, (snapshot) => {
      const recipesList = [];
      snapshot.forEach((childSnapshot) => {
        const recipe = childSnapshot.val();
        if (recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          recipesList.push({ ...recipe, key: childSnapshot.key });
        }
      });
      setRecipes(recipesList);
      setLoading(false);
    }, { onlyOnce: true });
    return () => unsubscribe();
  }, [searchQuery]);

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
        <Text>No recipes found matching "{searchQuery}".</Text>
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
      <Text style={styles.header}>Recipes matching "{searchQuery}"</Text>
      <FlatList data={recipes} renderItem={renderItem} keyExtractor={(item) => item.key.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: Color.maroon,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontFamily: FontFamily.archivoBlackRegular,
    color: Color.white,
    marginBottom: 20,
    textAlign: 'center',
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

export default SearchResultsName;
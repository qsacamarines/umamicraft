import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  ViewAllIngredients: undefined;
  SearchResultsIngredients: { searchQuery: string[] };
};

type ViewAllIngredientsScreenRouteProp = RouteProp<RootStackParamList, 'ViewAllIngredients'>;
type ViewAllIngredientsScreenNavigationProp = NavigationProp<RootStackParamList, 'ViewAllIngredients'>;

const ingredients = [
  { name: 'Bacon', image: require('../assets/bacon.png') },
  { name: 'Bell Pepper', image: require('../assets/pepper.png') },
  { name: 'Black Pepper', image: require('../assets/blackpepper.png') },
  { name: 'Broccoli', image: require('../assets/broccoli.png') },
  { name: 'Carrot', image: require('../assets/carrot.png') },
  { name: 'Cheese', image: require('../assets/cheese.png') },
  { name: 'Chicken', image: require('../assets/chicken.png') },
  { name: 'Chili Pepper', image: require('../assets/chili.png') },
  { name: 'Corn', image: require('../assets/corn.png') },
  { name: 'Egg', image: require('../assets/egg.png') },
  { name: 'Garlic', image: require('../assets/garlic.png') },
  { name: 'Milk', image: require('../assets/milk.png') },
  { name: 'Mushroom', image: require('../assets/mushroom.png') },
  { name: 'Onion', image: require('../assets/onion.png') },
  { name: 'Pork', image: require('../assets/steak.png') },  // Check if this should be pork.png
  { name: 'Salmon', image: require('../assets/salmon.png') },
  { name: 'Salt', image: require('../assets/salt.png') },
  { name: 'Tofu', image: require('../assets/tofu.png') },
];

const ViewAllIngredients = () => {
  const navigation = useNavigation<ViewAllIngredientsScreenNavigationProp>();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const toggleIngredient = (ingredientName: string) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredientName));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  const handleSearch = () => {
    navigation.navigate('SearchResultsIngredients', { searchQuery: selectedIngredients });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>View All Ingredients</Text>
      <ScrollView contentContainerStyle={styles.ingredientsList}>
        {ingredients.map((item, index) => (
          <TouchableOpacity key={index} style={[
            styles.ingredientItem,
            selectedIngredients.includes(item.name) ? styles.selected : null
          ]} onPress={() => toggleIngredient(item.name)}>
            <Image source={item.image} style={styles.ingredientImage} />
            <Text style={styles.ingredientText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedIngredients.length > 0 && (
        <Button title="Search with selected ingredients" onPress={handleSearch} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  backButton: {
    marginLeft: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  ingredientItem: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 45,
    backgroundColor: '#f0f0f0',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selected: {
    borderColor: 'orange',
    borderWidth: 2,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ingredientText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    color: '#333',
  },
});

export default ViewAllIngredients;

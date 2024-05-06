import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Color, FontFamily } from '../GlobalStyles';

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
        <Ionicons name="arrow-back" size={24} color={Color.maroon} />
      </TouchableOpacity>
      <Text style={styles.header}>View All Ingredients</Text>
      <ScrollView contentContainerStyle={styles.ingredientsList}>
        {ingredients.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.ingredientItem}
            onPress={() => toggleIngredient(item.name)}
          >
            <View style={[
              styles.imageContainer,
              selectedIngredients.includes(item.name) ? styles.selected : null
            ]}>
              <Image source={item.image} style={styles.ingredientImage} />
            </View>
            <Text style={styles.ingredientText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedIngredients.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button title="Search with selected ingredients" onPress={handleSearch} color={Color.maroon} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingTop: 50,
  },
  backButton: {
    marginLeft: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 1,
    borderRadius: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.maroon,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: FontFamily.archivoBlackRegular,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderColor: 'transparent', 
    borderWidth: 3,
    borderRadius: 50,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  ingredientItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  selected: {
    borderColor: Color.maroon,
    borderWidth: 3,
    borderRadius: 50,
  },
  ingredientImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  ingredientText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    color: Color.darkGray,
    fontFamily: FontFamily.basicRegular,
  },
});

export default ViewAllIngredients;

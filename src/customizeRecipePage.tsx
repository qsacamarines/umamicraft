import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomizeRecipe: React.FC<{ navigation: any }> = ({ navigation }) => {


  const showAlert = () => {
    Alert.alert(
      'Customization Successful!',
      'You have customized this recipe successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.navigationHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#841D06" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.customizeHeaderText}>Customize Recipe</Text>
        </View>
        
        <View style={styles.content}>

        <View style={styles.titleContainer}>
          <Text style={styles.recipeTitle}>Delicious Recipe</Text>
        </View>

        <View style={styles.ImageContainer}>
          <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.recipeImage} />
        </View>

        <View style={styles.editIngredients}>

          <Text style={styles.h3}>Ingredients</Text>

          <View style={styles.ingredientItems}>

            <View style={styles.ingredient}>
              <Text style={styles.ingredientName}>Lorem Ipsum</Text>
              <View style={styles.ingredientAmount}>
                <Text style={styles.amount}>00g</Text>
              </View>
            </View>

            <View style={styles.ingredient}>
              <Text style={styles.ingredientName}>Lorem Ipsum</Text>
              <View style={styles.ingredientAmount}>
                <Text style={styles.amount}>00g</Text>
              </View>
            </View>

            <View style={styles.ingredient}>
              <Text style={styles.ingredientName}>Lorem Ipsum</Text>
              <View style={styles.ingredientAmount}>
                <Text style={styles.amount}>00g</Text>
              </View>
            </View>

            <View style={styles.ingredient}>
              <Text style={styles.ingredientName}>Lorem Ipsum</Text>
              <View style={styles.ingredientAmount}>
                <Text style={styles.amount}>00g</Text>
              </View>
            </View>

            <View style={styles.ingredient}>
              <Text style={styles.ingredientName}>Lorem Ipsum</Text>
              <View style={styles.ingredientAmount}>
                <Text style={styles.amount}>00g</Text>
              </View>
            </View>

          </View>

          <TouchableOpacity
            style={styles.addIngredientButton}
            onPress={() => { showAlert(); }}
          >
            <Text style={styles.addIngredientButtonText}>Add Ingredient</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.calorieCount}>
          <View style={styles.calCol}>

            <View style={styles.calRow}>
              <Text style={styles.p}>Carbs</Text>
              <Text style={styles.calAmount}>00g</Text>
            </View>

            <View style={styles.calRow}>
              <Text style={styles.p}>Carbs</Text>
              <Text style={styles.calAmount}>00g</Text>
            </View>

            <View style={styles.calRow}>
              <Text style={styles.p}>Carbs</Text>
              <Text style={styles.calAmount}>00g</Text>
            </View>

          </View>

          <View style={styles.totalCal}>
            <Text style={styles.totalText}>Total Calories</Text>
            <Text style={styles.calTotalAmount}>00g</Text>
          </View>

        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={() => {
            showAlert();
          }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        </View>

      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 36,
    paddingBottom: 40,
    alignItems: 'center',
    marginTop: 16,
  },
  addIngredientButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: "#ffffff",
  },
  addIngredientButton: {
    backgroundColor: "#841D06",
    height: 48,
    width: 334,
    borderRadius: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  editIngredients: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  ingredientItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  amount: {
    textAlign: 'right',
    fontSize: 12,
    paddingHorizontal: 4,
  },
  ingredientAmount: {
    height: 17,
    width: 48,
    backgroundColor: "#F3D9A4",
    borderRadius: 6,
  },
  ingredient: {
    width: 334,
    height: 65,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3D9A4",
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calAmount: {
    fontSize: 16,
    fontWeight: '600'
  },
  p: {
    fontSize: 12,
  },
  calTotalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#841D06',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600'
  },
  totalCal: {
    width: 334,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calRow: {
    width: 334,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  calCol: {
    width: 334,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  calorieCount: {
    width: 334,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  titleContainer: {
    width: 334,
    height: 56,
    alignItems: 'left',
  },
  recipeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#841D06',
    zIndex: 1,
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  icon: {
    marginRight: 'auto',
  },
  customizeHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#841D06',
  },
  ImageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  recipeImage: {
    width: 334,
    height: 256,
    resizeMode: 'cover',
    borderRadius: 16,
    opacity: 100,
  },
  buttonsContainer: {
    display: 'flex',
    width: 334,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    width: 161,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#841D06',
  },
  saveButton: {
    backgroundColor: '#841D06',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#841D06',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomizeRecipe;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Pressable, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import { FontAwesome } from '@expo/vector-icons';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import firebaseApp from '.././firebase';
import { ScrollView } from 'react-native-gesture-handler';

const ViewAllIngredients: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.color}>
      <ScrollView>

        <View style={styles.home}>

          <View style={styles.inline}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={36} color="#841D06" />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.h1}>View All Ingredients</Text>
          </View>

          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder='Search Ingredients'
              style={styles.textInput} />
            <FontAwesome name="search"
              style={styles.searchBtn}
              size={24}
              color='#841D06' />
          </View>

          <View>
            <Text style={[styles.h2]}>
              Search by Ingredients
            </Text>
          </View>

          <View style={styles.ingredientList}>

            <View style={styles.row}>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Egg.png")}
                />
                <Text style={[styles.ingredientsText]}>Egg</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/onion.png")}
                />
                <Text style={[styles.ingredientsText]}>Onion</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/garlic.png")}
                />
                <Text style={[styles.ingredientsText]}>Garlic</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Steak.png")}
                />
                <Text style={[styles.ingredientsText]}>Steak</Text>
              </View>

            </View>

            <View style={styles.row}>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/cheese.png")}
                />
                <Text style={[styles.ingredientsText]}>Cheese</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/bread.png")}
                />
                <Text style={[styles.ingredientsText]}>Bread</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Milk.png")}
                />
                <Text style={[styles.ingredientsText]}>Milk</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/butter.png")}
                />
                <Text style={[styles.ingredientsText]}>Butter</Text>
              </View>

            </View>

            <View style={styles.row}>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Carrot.png")}
                />
                <Text style={[styles.ingredientsText]}>Carrot</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Banana.png")}
                />
                <Text style={[styles.ingredientsText]}>Banana</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Strawberry.png")}
                />
                <Text style={[styles.ingredientsText]}>Strawberry</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Potato.png")}
                />
                <Text style={[styles.ingredientsText]}>Potato</Text>
              </View>

            </View>

            <View style={styles.row}>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Rice.png")}
                />
                <Text style={[styles.ingredientsText]}>Rice</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Avocado.png")}
                />
                <Text style={[styles.ingredientsText]}>Avocado</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Bacon.png")}
                />
                <Text style={[styles.ingredientsText]}>Bacon</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Tomato.png")}
                />
                <Text style={[styles.ingredientsText]}>Tomato</Text>
              </View>

            </View>

            <View style={styles.row}>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/broccoli.png")}
                />
                <Text style={[styles.ingredientsText]}>Broccoli</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/chili.png")}
                />
                <Text style={[styles.ingredientsText]}>Chili Pepper</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/flour.png")}
                />
                <Text style={[styles.ingredientsText]}>Flour</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/mayo.png")}
                />
                <Text style={[styles.ingredientsText]}>Mayonnaise</Text>
              </View>

            </View>

            <View style={styles.row}>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/Salmon.png")}
                />
                <Text style={[styles.ingredientsText]}>Salmon</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/blackpepper.png")}
                />
                <Text style={[styles.ingredientsText]}>Black Pepper</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/cannedtuna.png")}
                />
                <Text style={[styles.ingredientsText]}>Canned Tuna</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/salt.png")}
                />
                <Text style={[styles.ingredientsText]}>Salt</Text>
              </View>

            </View>

            <View style={styles.row}>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/tofu.png")}
                />
                <Text style={[styles.ingredientsText]}>Tofu</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/sausage.png")}
                />
                <Text style={[styles.ingredientsText]}>Sausage</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/mushroom.png")}
                />
                <Text style={[styles.ingredientsText]}>Mushroom</Text>
              </View>

              <View style={styles.ingredient}>
                <Image
                  style={styles.ingredientIcon}
                  source={require("../assets/corn.png")}
                />
                <Text style={[styles.ingredientsText]}>Corn</Text>
              </View>

            </View>

          </View>

        </View>

      </ScrollView>

      <View style={styles.floatButton}>
        <Text style={styles.floatText}>
          Search with selected ingredients
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  color: {
    backgroundColor: 'white',
    height: "100%",
  },
  floatText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  floatButton: {
    display: 'flex',
    position: 'absolute',
    height: 54,
    width: 340,
    top: 800,
    left: 37,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'linear-gradient(180deg, rgba(241,128,71,1) 0%, rgba(222,80,8,1) 100%)',
  },
  home: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 72,
    gap: 24,
    backgroundColor: 'white',
    height: "100%",
  },
  inline: {
    display: 'flex',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 16,
  },
  ingredientList: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  h1: {
    color: Color.maroon,
    fontFamily: FontFamily.archivoBlackRegular,
    fontSize: 32,
    textAlign: "left",
  },
  textInput: {
    paddingHorizontal: 20,
    backgroundColor: Color.white,
    width: "85%",
    borderRadius: 24,
    fontSize: 15,
    height: 44,
  },
  searchBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: "100%",
    flexDirection: 'row',
    gap: 10,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: Color.maroon,
  },
  searchBtn: {
    backgroundColor: Color.white,
    padding: 8.5,
    borderRadius: 24,
    right: 16,
  },
  h2: {
    fontFamily: FontFamily.archivoBlackRegular,
    fontSize: 20,
    color: Color.maroon,
    textAlign: "left",
  },
  searchIngredients: {
    left: 1,
    width: 265,
    height: 25,
    color: Color.maroon,
  },
  ingredientsText: {
    textAlign: "center",
    color: Color.darkGray,
    fontFamily: FontFamily.basicRegular,
    fontSize: 14.5,
  },
});

export default ViewAllIngredients;

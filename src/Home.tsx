import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, NavigationProp, RouteProp } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import { FontAwesome } from '@expo/vector-icons';
import { doc, getDoc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '.././firebase';

const categoryImages = {
  shoyu: require('../assets/shoyu.png'),
  shio: require('../assets/shio.png'),
  miso: require('../assets/miso.png'),
  tonkotsu: require('../assets/tonkotsu.png'),
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [name, setName] = useState('Loading...');
  const [searchQuery, setSearchQuery] = useState('');

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    let unsubscribeUser = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);

        unsubscribeUser = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setName(docSnap.data().name); // Assuming there is a 'name' field in the document
          } else {
            console.log('No user data found in Firestore');
          }
        }, (error) => {
          console.log('Error getting document:', error);
        });
      } else {
        // Handle user being logged out
        setName('Guest');
      }
    });

    return () => {
      unsubscribeAuth(); // Detach auth listener on cleanup
      unsubscribeUser(); // Detach user data listener on cleanup
    };
  }, []);

  const handleSearch = () => {
    // Navigate to SearchResultsName with the current search query
    navigation.navigate("SearchResultsName", { searchQuery });
  };


  return (
    <View style={styles.home}>
      {/* Header */}
      <View style={styles.header}>
      <Text style={styles.welcome}>Welcome,</Text>
      <Text style={styles.carlo}>{ name || 'Guest' }!</Text>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput 
          placeholder="Search recipes"
          style={styles.textInput}
          onChangeText={setSearchQuery} 
          value={searchQuery} 
        />
        <Pressable onPress={handleSearch} style={styles.searchBtn}>
          <FontAwesome name="search" size={24} color='#841D06' />
        </Pressable>
      </View>

      {/* Search by Ingredients */}
      </View>
      <View style={[styles.searchByIngredientsContainer, styles.ingredientsLayout]}>
  <Text style={[styles.searchIngredients, styles.titles]}>
    Search by Ingredients
  </Text>
  <Pressable
    style={styles.viewAll}
    onPress={() => navigation.navigate("ViewAllIngredients")}
  >
    <Text style={[styles.underlined, styles.ingredientsText]}>View all</Text>
  </Pressable>
  <View style={[styles.rowOfIngredientsWrapper, styles.ingredientsLayout]}>
    <View>
      {/* Egg */}
      <Pressable style={[styles.eggPosition, styles.ingredientsIconsLayout1]}
        onPress={() => navigation.navigate("SearchResultsIngredients", { searchQuery: ['egg'] })}>
        <Image style={styles.circlesLayout}
          source={require("../assets/circle1.png")} />
        <Image style={[styles.eggIcon, styles.ingredientsIconsLayout2]}
          source={require("../assets/egg.png")} />
        <Text style={[styles.eggText, styles.ingredientsText]}>Egg</Text>
      </Pressable>

      {/* Garlic */}
      <Pressable style={[styles.garlicPosition, styles.ingredientsIconsLayout1]}
        onPress={() => navigation.navigate("SearchResultsIngredients", { searchQuery: ['garlic'] })}>
        <Image style={styles.circlesLayout}
          source={require("../assets/circle2.png")} />
        <Image style={[styles.garlicIcon, styles.ingredientsIconsLayout2]}
          source={require("../assets/garlic.png")} />
        <Text style={[styles.garlicText, styles.ingredientsText]}>Garlic</Text>
      </Pressable>

      {/* Onion */}
      <Pressable style={[styles.onionPosition, styles.ingredientsIconsLayout1]}
        onPress={() => navigation.navigate("SearchResultsIngredients", { searchQuery: ['onion'] })}>
        <Image style={styles.circlesLayout}
          source={require("../assets/circle3.png")} />
        <Image style={[styles.onionIcon, styles.ingredientsIconsLayout2]}
          source={require("../assets/onion.png")} />
        <Text style={[styles.onionText, styles.ingredientsText]}>Onion</Text>
      </Pressable>

      {/* Pork */}
      <Pressable style={[styles.porkPosition, styles.ingredientsIconsLayout1]}
        onPress={() => navigation.navigate("SearchResultsIngredients", { searchQuery: ['pork'] })}>
        <Image style={styles.circlesLayout}
          source={require("../assets/circle4.png")} />
        <Image style={[styles.porkIcon, styles.ingredientsIconsLayout2]}
          source={require("../assets/pork.png")} />
        <Text style={[styles.porkText, styles.ingredientsText]}>Pork</Text>
      </Pressable>
    </View>
  </View>
</View>


      {/* Search by Category */}
      <View style={styles.searchByCategory}>
  <Text style={styles.titles}>Search by Category</Text>
  {Object.keys(categoryImages).map((category, index) => (
    <Pressable
      key={index}
      style={[styles[category], styles.categLayout]}
      onPress={() => navigation.navigate("SearchResultsCateg", { category })}
    >
      <View style={styles.categContainer} />
      <Text style={styles.categName}>{category}</Text>
      <Image
        style={styles.categIcon}
        source={categoryImages[category]}
      />
    </Pressable>
  ))}
</View>
      {/* Card */}
      <View style={[styles.card, styles.cardPosition]}>
        <View style={[styles.cardChild]} />
        <Text style={[styles.title, styles.titlePosition]}>{`Where Ingredients\nMeet Inspiration!`}</Text>
        <Text
          style={[styles.subtitle, styles.titlePosition]}>
            {`Discover personalized recipes tailored to your taste,\nhealth goals, and allergies, all at your fingertips!`}
            </Text>
        <Image
          style={styles.ramenImg}
          source={require("../assets/ramen-topview.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.maroon,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 40,
    position: "absolute",
    width: "100%",
    height: 200,
  },
  welcome: {
    top: 45,
    left: 28,
    fontSize: 15,
    color: Color.white,
    textAlign: "left",
    fontFamily: FontFamily.basicRegular,
    position: "absolute",
  },
  carlo: {
    top: 62,
    width: 220,
    color: Color.white,
    fontFamily: FontFamily.archivoBlackRegular,
    fontSize: 25,
    textAlign: "left",
    left: 28,
    position: "absolute",
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 20,
    backgroundColor: Color.white,
    width: "75%",
    borderRadius: 8,
    fontSize: 15,
  },
  searchBarContainer: {
    marginTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  searchBtn: {
    backgroundColor: Color.white,
    padding: 8.5,
    borderRadius: 8,
  },
  titles: {
    fontFamily: FontFamily.archivoBlackRegular,
    fontSize: 18,
    color: Color.maroon,
    top: 0,
    left: 0,
    textAlign: "left",
    position: "absolute",
  },
  searchByIngredientsContainer: {
    top: 228,
    height: 130,
    left: 13,
  },
  searchIngredients: {
    left: 1,
    width: 265,
    height: 25,
    color: Color.maroon,
  },
  viewAll: {
    left: 303,
    top: 1,
    position: "absolute",
  },
  underlined: {
    textDecorationLine: 'underline',
    color: Color.darkGray,
    width: 65,
  },
  ingredientsText: {
    textAlign: "center",
    color: Color.darkGray,
    fontFamily: FontFamily.basicRegular,
    fontSize: 14.5,
  },
  rowOfIngredientsWrapper: {
    top: 39,
    height: 91,
    left: 0,
  },
  /* DRAFT FOR CIRCLES (NOT IMAGES)
  circle1: {
    backgroundColor: '#2A695E',
    borderRadius: 99,
    position: 'absolute',
    width: 75,
    height: 75,
    top: 0,
    left: 0,
  }, */
  ingredientsLayout: {
    width: 377,
    position: "absolute",
  },
  ingredientsIconsLayout1: {
    height: 90,
    top: 2,
    width: 76,
    position: "absolute"
  },
  ingredientsIconsLayout2: {
    height: "49.39%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  circlesLayout: {
    height: 74,
    left: 0,
    width: 76,
    top: 0,
    position: "absolute",
  },
  eggPosition: {
    left: 0,
  },
  eggIcon: {
    width: "44.05%",
    top: "15.08%",
    right: "27.65%",
    bottom: "35.53%",
    left: "28.31%",
  },
  eggText: {
    top: 78,
    left: 20,
    width: 35,
    position: "absolute",
  },
  garlicPosition: {
    left: 97,
  },
  garlicIcon: {
    height: "56.09%",
    width: "55.03%",
    top: "10.95%",
    right: "21.69%",
    bottom: "32.96%",
    left: "23.28%",
    position: "absolute",
  },
  garlicText: {
    width: 50,
    left: 14,
    top: 77,
    position: "absolute",
  },
  onionPosition: {
    left: 194,
  },
  onionIcon: {
    height: "59.11%",
    width: "66.27%",
    top: "13.41%",
    right: "15.34%",
    bottom: "27.49%",
    left: "18.39%",
    position: "absolute",
  },
  onionText: {
    width: 44,
    left: 16,
    top: 77,
    position: "absolute",
  },
  porkPosition: {
    left: 293,
  },
  porkIcon: {
    width: "60.05%",
    top: "17.77%",
    right: "19.97%",
    bottom: "32.85%",
    left: "19.97%",
  },
  porkText: {
    left: 18,
    width: 40,
    top: 77,
    position: "absolute",
  },
  searchByCategory: {
    top: 395,
    width: 380,
    height: 128,
    left: 13,
  },
  categLayout: {
    height: 87,
    width: 87,
    position: "absolute",
  },
  categContainer: {
    backgroundColor: Color.yellow,
    borderRadius: 15,
    height: 83,
    width: 83,
    top: 0,
    position: "absolute",
  },
  categName: {
    fontFamily: FontFamily.candalRegular,
    fontSize: 12,
    top: 63,
    textAlign: "center",
    color: Color.maroon,
    position: "absolute",
    left: 5,
    width: 75,
  },
  categIcon: {
    height: 55,
    width: 59,
    top: 5,
    left: 13,
    position: "absolute",
  },
  shoyu: {
    top: 41,
    width: 87,
    left: 0,
  },
  shio: {
    left: 93,
    top: 41,
    width: 87,
  },
  miso: {
    left: 187,
    top: 41,
    width: 87,
  },
  tonkotsu: {
    left: 280,
    top: 41,
    width: 87,
  },
  card: {
    top: 495,
    width: 400,
    height: 280,
  },
  cardPosition: {
    left: 9,
    position: "absolute",
  },
  cardChild: {
    top: 120,
    borderRadius: 5,
    backgroundColor: "#fdfdfd",
    width: 373,
    height: 146,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowColor: "rgba(0, 0, 0, 1)",
    left: 0,
    position: "absolute",
  },
  title: {
    top: 150,
    fontSize: 22,
    width: 207,
    lineHeight: 25,
    fontFamily: FontFamily.orelegaOneRegular,
    color: Color.maroon,
  },
  titlePosition: {
    left: 19,
    textAlign: "left",
    position: "absolute",
  },
  subtitle: {
    top: 220,
    width: 340,
    color: Color.darkGray,
    left: 19,
    //fontSize: FontSize.size_mini,
    fontFamily: FontFamily.basicRegular,
  },
  ramenImg: {
    left: 10,
    width: 393,
    height: 262,
    top: 0,
    position: "absolute",
  },
  home: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default HomeScreen;
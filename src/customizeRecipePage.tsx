import React from 'react';
import { View, ScrollView, Text, StyleSheet,TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomizeRecipe: React.FC<{ navigation: any }> = ({ navigation }) => {

    const longText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel facilisis elit, sit amet fringilla dolor. Proin non augue vel neque semper malesuada.';

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
  
          <View style={styles.titleContainer}>
            <Text style={styles.recipeTitle}>Delicious Recipe</Text>
          </View>
  
          <View style={styles.ImageContainer}>
            <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.recipeImage} />
          </View>
  
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>
          <Text style={styles.longText}>{longText}</Text>

          
  
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
        </ScrollView>
      </View>
    );
  };
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    titleContainer:{
        paddingTop: 30,
        paddingLeft: 20,
    },
    recipeTitle:{
        fontSize: 40,
        fontWeight: '900',
        color: '#841D06',
        marginTop: 16,
        zIndex: 1,
    },
    navigationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 80,
      },
      icon: {
        marginRight: 'auto', 
      },
      customizeHeaderText: {
        flex: 1,  
        textAlign: 'center',  
        fontSize: 20,
        fontWeight: 'bold',
        color: '#841D06',
      },
      ImageContainer:{
        paddingTop: 20 ,
        alignItems:"center",
        justifyContent:"center",
      },
      recipeImage: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        opacity: 50,
      },
      longText: {
        padding: 20,
        fontSize: 16,
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        
      },
      button: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        width:70,
      },
      cancelButton: {
        backgroundColor: '#fff',
        marginRight: 8,
        borderWidth: 2,
        borderColor:'#841D06',
      },
      saveButton: {
        backgroundColor: '#841D06',
        marginLeft: 8,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      cancelButtonText: {
        color: '#841D06',
        fontSize: 18,
        fontWeight: 'bold',
      },
});
  
  export default CustomizeRecipe;
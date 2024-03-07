
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { FontFamily } from "../GlobalStyles";
import * as React from "react";
import { ImageSourcePropType } from 'react-native';


const screenWidth = Dimensions.get('window').width;

type DeveloperProfileProps = {
    name: string;
    image: ImageSourcePropType;
  };
  
const MoreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  aboutSection: {
    backgroundColor: 'white',
    padding: 20,
  },
  aboutTitle: {
    fontFamily: FontFamily.archivoBlackRegular,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'maroon',
    textAlign: 'center',
    marginTop: 30,
  },
  aboutDescription: {
    fontFamily: FontFamily.basicRegular,
    fontSize: 14,
    color: 'black',
  },
  developersSection: {
    backgroundColor: 'maroon',
    paddingVertical: 15,
    borderTopRightRadius: screenWidth / 0.5,
    borderTopLeftRadius: screenWidth / 0.5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  developerProfiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  developerProfile: {
    alignItems: 'center',
    marginBottom: 20,
    width: '33%',
  },
  developerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  nameContainer: {
    alignItems: 'center',
  },
  developerLastName: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F3D9A4',
  },
  developerFirstName: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 10,
    color: '#F3D9A4',
  },
  developersTitle: {
    fontFamily: FontFamily.archivoBlackRegular,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3D9A4',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 35,
  },
  logoImage: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});


const MoreScreen: React.FC = () => {
 
    return (
      <ScrollView style={MoreStyles.container}>
        <View style={MoreStyles.aboutSection}>
          <Text style={MoreStyles.aboutTitle}>ABOUT UMAMI CRAFT</Text>
          <Image source={require('../assets/Umami.png')} style={MoreStyles.logoImage} />
          <Text style={MoreStyles.aboutDescription}>
            Umami Craft is an innovative application designed to enhance your culinary experience by curating personalized ramen recipes based on the ingredients the user inputs. The application aims to provide users with a customized and delightful cooking experience.
          </Text>
        </View>
        <View style={MoreStyles.developersSection}>
          <Text style={MoreStyles.developersTitle}>DEVELOPERS</Text>
          <View style={MoreStyles.developerProfiles}>
            <DeveloperProfile name="Sophia Angela G. CAMARINES" image={require('../assets/camarines.png')} />
            <DeveloperProfile name="Shen Jeuz D. HERRERA" image={require('../assets/herrera.png')} />
            <DeveloperProfile name="Raven Anne S.J. LIMOS" image={require('../assets/limos.png')} />
            <DeveloperProfile name="Lance Jarem G. SERRANO" image={require('../assets/serrano.png')} />
            <DeveloperProfile name="Kyla Rosette I. TUMPALAN" image={require('../assets/tumpalan.png')} />
          </View>
        </View>
      </ScrollView>
    );
  }


  const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ name, image }) => {
    const names = name.split(' ');
    const lastName = names.length > 1 ? names.pop() || '' : '';
    const firstName = names.join(' ');
  
    return (
      <View style={MoreStyles.developerProfile}>
        <Image style={MoreStyles.developerImage} source={image} />
        <View style={MoreStyles.nameContainer}>
          <Text style={MoreStyles.developerLastName}>{lastName ? lastName.toUpperCase() : ''}</Text>
          <Text style={MoreStyles.developerFirstName}>{firstName}</Text>
        </View>
      </View>
    );
};

  
export default MoreScreen;

import * as React from "react";
import { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import oneRecipePage from './oneRecipePage';

const CategoryPage1: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [isHeartFull, setIsHeartFull] = useState<boolean>(false);

    return (
        <View style={styles.color}>
            <ScrollView>

                <View style={styles.body}>

                    <View style={styles.inline}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={36} color="#841D06" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.favorites}>Shoyu Ramen</Text>
                    </View>

                    <View style={styles.recipes}>

                        <View style={styles.row}>

                            <Pressable onPress={() => navigation.navigate('oneRecipePage')}>
                                <View style={[styles.faverecipe1box, styles.boxWidth]}>
                                    <View style={[styles.box1, styles.boxWidth]} />
                                    <Image
                                        style={[styles.recipe1pic, styles.boxWidth]}
                                        source={require("../assets/recipe1.png")}
                                    />
                                    <View style={[styles.rect1, styles.boxWidth]} />
                                    <Text style={styles.recipeName}>{'Easy Chicken\nRamen'}</Text>
                                    <Text style={styles.calorie}>658 Cal</Text>
                                    <TouchableOpacity onPress={() => handleHeartClick()}>
                                        <Ionicons
                                            name={isHeartFull ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color='maroon'
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate('oneRecipePage')}>
                                <View style={[styles.faverecipe2box, styles.favoritesFlexBox]}>
                                    <View style={[styles.box2, styles.boxWidth]} />
                                    <Image
                                        style={[styles.recipe2pic, styles.boxWidth]}
                                        source={require("../assets/recipe2.png")}
                                    />
                                    <View style={[styles.rect1, styles.boxWidth]} />
                                    <Text style={styles.recipeName}>{'Tonkotsu\nRamen'}</Text>
                                    <Text style={styles.calorie}>1262 Cal</Text>
                                    <TouchableOpacity onPress={() => handleHeartClick()}>
                                        <Ionicons
                                            name={isHeartFull ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color='maroon'
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>

                        </View>

                        <View style={styles.row}>

                            <Pressable onPress={() => navigation.navigate('oneRecipePage')}>
                                <View style={[styles.faverecipe3box, styles.favoritesFlexBox]}>
                                    <View style={[styles.box3, styles.boxWidth]} />
                                    <Image
                                        style={[styles.recipe3pic, styles.boxWidth]}
                                        source={require("../assets/recipe3.png")}
                                    />
                                    <View style={[styles.rect1, styles.boxWidth]} />
                                    <Text style={styles.recipeName}>{'Chili Lime Shrimp\nRamen Noodles'}</Text>
                                    <Text style={styles.calorie}>862 Cal</Text>
                                    <TouchableOpacity onPress={() => handleHeartClick()}>
                                        <Ionicons
                                            name={isHeartFull ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color='maroon'
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate('oneRecipePage')}>
                                <View style={[styles.faverecipe4box, styles.favoritesFlexBox]}>
                                    <View style={[styles.box4, styles.boxWidth]} />
                                    <Image
                                        style={[styles.recipe4pic, styles.boxWidth]}
                                        source={require("../assets/faverecipe2.png")}
                                    />
                                    <View style={[styles.rect1, styles.boxWidth]} />
                                    <Text style={styles.recipeName}>{'Ginger Chicken and\nSpinach Ramen'}</Text>
                                    <Text style={styles.calorie}>357 Cal</Text>
                                    <TouchableOpacity onPress={() => handleHeartClick()}>
                                        <Ionicons
                                            name={isHeartFull ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color='maroon'
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>

                        </View>

                        <View style={styles.row}>

                            <Pressable onPress={() => navigation.navigate('oneRecipePage')}>
                                <View style={[styles.faverecipe5box, styles.favoritesFlexBox]}>
                                    <View style={[styles.box5, styles.boxWidth]} />
                                    <Image
                                        style={[styles.recipe5pic, styles.boxWidth]}
                                        source={require("../assets/recipe5.png")}
                                    />
                                    <View style={[styles.rect1, styles.boxWidth]} />
                                    <Text style={styles.recipeName}>{'Spicy Miso\nRamen'}</Text>
                                    <Text style={styles.calorie}>492 Cal</Text>
                                    <TouchableOpacity onPress={() => handleHeartClick()}>
                                        <Ionicons
                                            name={isHeartFull ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color='maroon'
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate('oneRecipePage')}>
                                <View style={[styles.faverecipe6box, styles.favoritesFlexBox]}>
                                    <View style={[styles.box6, styles.boxWidth]} />
                                    <Image
                                        style={[styles.recipe6pic, styles.boxWidth]}
                                        source={require("../assets/faverecipe1.png")}
                                    />
                                    <View style={[styles.rect1, styles.boxWidth]} />
                                    <Text style={styles.recipeName}>{'Pork Belly\nRamen'}</Text>
                                    <Text style={styles.calorie}>674 Cal</Text>
                                    <TouchableOpacity onPress={() => handleHeartClick()}>
                                        <Ionicons
                                            name={isHeartFull ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color='maroon'
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>

                        </View>

                    </View>

                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    color: {
        backgroundColor: 'white',
        height: "100%"
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 72,
        gap: 24,
        backgroundColor: 'white',
    },
    recipes: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        gap: 20,
        width: "100%"
    },
    row: {
        display: 'flex',
        width:"100%",
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    favorites: {
        fontSize: 25,
        fontFamily: FontFamily.archivoBlackRegular,
        width: 220,
        textAlign: "left",
        color: Color.maroon,
    },
    faverecipe1box: {
        height: 217,
    },
    rect1: {
        top: 153,
        height: 19,
        backgroundColor: '#f9f9f9',
        width: 115,
        left: 0,
    },
    boxWidth: {
        width: 168,
        position: "absolute",
    },
    recipeName: {
        width: 161,
        height: 48,
        color: Color.black,
        fontFamily: FontFamily.basicRegular,
        fontSize: 14,
        fontWeight: 'bold',
        left: 4,
        top: 158,
        textAlign: "left",
        position: "absolute",
    },
    recipe1pic: {
        height: 155,
        borderRadius: 5,
        left: 0,
        top: 0,
    },
    box1: {
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2.5,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: 168,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        left: 0,
        top: 0,
        height: 217,
    },
    calorie: {
        top: 200,
        width: 39,
        height: 15,
        fontFamily: FontFamily.beVietnam,
        color: Color.black,
        fontSize: 10,
        left: 4,
        textAlign: "left",
        position: "absolute",
    },
    faverecipe2box: {
        width: 169,
        height: 217,
    },
    box2: {
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2.5,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: 115,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        left: 0,
        top: 0,
        height: 217,
    },
    recipe2pic: {
        height: 155,
        width: 125,
        borderRadius: 5,
        left: 0,
        top: 0,
    },
    faverecipe3box: {
        width: 169,
        height: 217,
    },
    box3: {
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2.5,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: 168,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        left: 0,
        top: 0,
        height: 217,
    },
    recipe3pic: {
        height: 155,
        borderRadius: 5,
        left: 0,
        top: 0,
    },
    faverecipe4box: {
        width: 169,
        height: 217,
    },
    box4: {
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2.5,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: 168,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        left: 0,
        top: 0,
        height: 217,
    },
    recipe4pic: {
        height: 155,
        borderRadius: 5,
        left: 0,
        top: 0,
    },
    faverecipe5box: {
        width: 169,
        height: 217,
    },
    box5: {
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2.5,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: 168,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        left: 0,
        top: 0,
        height: 217,
    },
    recipe5pic: {
        height: 155,
        borderRadius: 5,
        left: 0,
        top: 0,
    },
    faverecipe6box: {
        width: 169,
        height: 217,
    },
    box6: {
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2.5,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: 168,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        left: 0,
        top: 0,
        height: 217,
    },
    recipe6pic: {
        height: 155,
        borderRadius: 5,
        left: 0,
        top: 0,
    },
    icon: {
        top: 185,
        left: 135,
    }

});

export default CategoryPage1;

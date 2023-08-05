import {StyleSheet, View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons, Ionicons, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	useFonts,
	Montserrat_200ExtraLight,
	Montserrat_300Light,
	Montserrat_400Regular,
	Montserrat_500Medium,
	Montserrat_700Bold,
	Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";

const Header = ({login,goBack,label}) => {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
	    Montserrat_300Light,
	    Montserrat_400Regular,
	    Montserrat_500Medium,
	    Montserrat_700Bold,
	    Montserrat_800ExtraBold
    })

	const signOutUser = async() => {
			AsyncStorage.clear()
			navigation.navigate('Login');
	}

    return fontsLoaded && (
		login ? (
			<View style={styles.container}>
				<View style={styles.headerLeftSide}>
					{
						goBack ? (
							<TouchableOpacity
								style={{ marginLeft: 10 }}
								onPress={goBack}
							>
								<AntDesign name="arrowleft" size={24} color="white" />
							</TouchableOpacity>
						) : (
								<Image style={styles.logo} resizeMode='contain' source={require('../assets/logo.png')} />
							)
					}
					{
						label && (
							<Text style={styles.headerTitle}>{label}</Text>
						)
					}
				</View>
				<View style={styles.headerIcons}>
					{
						goBack ? (
							<TouchableOpacity activeOpacity={0.5} onPress={() => {
								navigation.navigate("Search")
							}}>
								<MaterialIcons name="search" size={30} color="white" style={{ marginRight: 15 }} />
							</TouchableOpacity>
						) : (
								<TouchableOpacity activeOpacity={0.5} onPress={() => {
									navigation.navigate("Search")
								}}>
									<MaterialIcons name="search" size={35} color="white" style={{ marginRight: 15 }} />
								</TouchableOpacity>
							)
					}
					{
						goBack ? (
							<TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
								<Image style={styles.avatar2} resizeMode='contain' source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }} />
							</TouchableOpacity>
						) : (
								<TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
									<Image style={styles.avatar} resizeMode='contain' source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }} />
								</TouchableOpacity>
							)
					}
				</View>
			</View>
		) : (
				<View style={styles.container2}>
					<Image style={styles.logo2} resizeMode='contain' source={require('../assets/netflixlogo2.png')} />
				</View>
			)
	)
}

export default Header
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingRight: 25,
        paddingLeft: 25,
        width: '100%',
    },
    headerLeftSide:{
        flexDirection:'row',
    },
    logo:{
        width: 23,
        height: 45,
    },
    logo2:{
		width: 125,
		height: 145
    },
    headerTitle:{
        color: 'white',
        marginLeft: 15,
        fontSize: 18,
        fontFamily:'Montserrat_400Regular', 
    },
	headerIcons:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar2:{
		width: 40,
		height: 30,
		borderRadius: 20
	},
	avatar:{
		width: 50,
		height: 35,
		borderRadius: 20
	},
	container2:{
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: '20',
		width: '100%'
	}	
});
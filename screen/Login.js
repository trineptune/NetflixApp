import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { TextInput, View, ScrollView, StyleSheet, Dimensions, Text, KeyboardAvoidingView, Platform, ImageBackground,TouchableOpacity } from 'react-native'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logInUser} from '../redux/actions/userActions'
import Header from '../components/Header'
const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    var user = null

    const getUser = async() => {
        const value = await AsyncStorage.getItem('user')
        user = JSON.parse(value)
        if (user)
        {         
                navigation.replace("BottomStack"); //replace bottom stack
                setPassword('');
                setEmail("");
                setLoading(false);
        }
        else{
            setLoading(false)
            alert('wrong email or password')
        }
    }

    const login = async() => {
        setLoading(true);
        if (!email || !password) {
            alert("All fields are mandatory");
            setPassword("");
            setEmail("");
            setLoading(false);
            return;
        }
        const userTemp = {
            email: email,
            password: password
        }
        AsyncStorage.clear()
        dispatch(logInUser(userTemp))
        console.log(user)
        setTimeout(getUser,3000)
        
    }
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ImageBackground source={{ uri: 'https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg' }} resizeMode="cover" style={{ flex: 1, height: Dimensions.get("window").height }}>
            <View style={styles.overlay}>
            <Header login={false}/>
                <View style={styles.formWrapper}>
                    <View style={styles.form}>
                        <Text style={styles.signInText}>Sign In</Text>
                        <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor='grey' value={email} onChangeText={(text) => setEmail(text)} />
                        <TextInput style={styles.input} placeholder="Password" placeholderTextColor='grey' secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />

                        <TouchableOpacity 
                        onPress={login} 
                        disabled={loading}
                        style = {styles.submitForm}>
                            <Text style={styles.buttonText}>
                                {loading ? "Loading..." : "Sign In"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={styles.newToNetflixTextWrapper} 
                        activeOpacity={0.5} 
                        onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.newToNetflixText}>New to Netflix ? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ImageBackground>
        </View>
        
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000'
    },
    formWrapper:{
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
        height: '80%'
    },
    overlay:{
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1
    },
    form:{
        height: 400,
        width: '90%',
        backgroundColor: 'black',
        flexDirection: 'column',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center'
    },
    submitForm:{
        width: '100%',
        height: 50,
        color: 'white',
        borderRadius: 10,
        border: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7442E',
        marginTop:20
    },
    buttonText:{
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
        color: 'white'
    },
    input:{
        width: '100%',
        height: 50,
        border: 'none',
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#333333',
        color: 'white',
        marginTop: 10
    },
    signInText:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        textAlign: 'left'
    },
    newToNetflixTextWrapper:{
        width: '100%'
    },
    newToNetflixText:{
        fontSize: 15,
        fontWeight: 500,
        textAlign: 'center',
        color: '#ccc',
        margin: 15,
        textAlign: 'center'
    }
    
});
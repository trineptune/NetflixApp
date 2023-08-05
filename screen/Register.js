import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { TextInput, View, ScrollView, StyleSheet, Dimensions, Text, KeyboardAvoidingView, Platform, ImageBackground,TouchableOpacity } from 'react-native'
import {createUserWithEmailAndPassword} from 'firebase/auth'

import { useDispatch, useSelector } from 'react-redux';
import { registerUser} from '../redux/actions/userActions'
import  AsyncStorage  from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
    const dispatch = useDispatch()
	const dbUser = useSelector((state) => state.users)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const register = () => {
        setLoading(true);
        if (!email || !password || !firstName || !lastName) {
            alert("All fields are mandatory");
            setPassword("");
            setEmail("");
            setLoading(false);
            return;
        }

        const user = {
            firstName : firstName,
            lastName : lastName,
            email: email,
            password: password,
            timeExpired: 0
        }
        console.log(user)
        dispatch(registerUser(user))
        navigation.replace("Login");
        setPassword('');
        setEmail("");
        setLoading(false);
    }

    return ( 
            
            <View style={styles.container}>
            <StatusBar style="light" />
                <ImageBackground source={{ uri: 'https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg' }} resizeMode="cover" style={{ flex: 1, height: Dimensions.get("window").height }}>
                    <View style={styles.overlay}>
                        <View style={styles.formWrapper}>
                            <View style={styles.form}>
                                <KeyboardAvoidingView style={{ width: '100%' }}>
                                    <Text style={styles.signInText}>Sign Up</Text>
                                    <View style={styles.inputsWrapper}>
                                        <View style={styles.halfInputWrapper}>
                                            <TextInput style={styles.halfInput} placeholderTextColor='grey' placeholder="First Name" value={firstName} onChangeText={text => setFirstName(text)} />
                                            <TextInput style={styles.halfInput} placeholderTextColor='grey' placeholder="Last Name" value={lastName} onChangeText={text => setLastName(text)} />
                                        </View>
                                        <TextInput
                                        style={styles.input}
                                        placeholderTextColor='grey' 
                                        placeholder="Enter your email" 
                                        value={email} 
                                        onChangeText={(text) => setEmail(text)} />
                                        <TextInput
                                        style={styles.input}
                                        placeholderTextColor='grey' 
                                        placeholder="Password" 
                                        value={password} 
                                        secureTextEntry onChangeText={(text) => setPassword(text)} />

                                        <TouchableOpacity
                                            style={styles.submitForm} 
                                            onPress={register} 
                                            disabled={loading}>
                                            <Text style={styles.newToNetflixText}>{loading ? 'Loading...' : "Sign Up"}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                        style={styles.newToNetflixTextWrapper} 
                                        activeOpacity={0.5} 
                                        onPress={() => navigation.navigate("Login")}>

                                        <Text style={styles.newToNetflixText}>Already have an account ? Sign In</Text>

                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
    )
}

export default Register
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
    },
    halfInputWrapper:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    halfInput:{
    width: '50%',
    height: '50',
    border: 'none',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#333333',
    color: 'white',
    marginRight: 5,
    marginTop: 10,
    },
    inputsWrapper:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
});
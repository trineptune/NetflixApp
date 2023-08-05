import { StyleSheet, View, Text,StatusBar } from 'react-native'
import React,{useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Splash = ({navigation}) => {
  const [user,setUser] = useState(null)
  const getUser = async() => {
    try{
      //debug
      AsyncStorage.clear()
      const value = await AsyncStorage.getItem('user')
      setUser(value)
      console.log(user)
    }catch(e){
      console.log(e)
    }
    if (user) {
      navigation.replace("BottomStack")
    } else {
      navigation.replace("Login")
  }
  }
  getUser()
  
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <Text>here</Text>
    </View>
  )
}

export default Splash
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center'
  }
});
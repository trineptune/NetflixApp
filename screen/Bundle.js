import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {Fontisto} from '@expo/vector-icons'
import { useDispatch, useSelector} from 'react-redux';
import {extendUser} from '../redux/actions/userActions'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Bundle = ({navigation}) => {

    const dispatch = useDispatch()
    var currentUser = null
    const buyBundle = async() =>{
        currentUser = JSON.parse(await AsyncStorage.getItem('user'))
        dispatch(extendUser(currentUser.map(item=>{return item.email})))
        AsyncStorage.clear()
        navigation.replace("Login")
    }

    const goBack=()=>{
      AsyncStorage.clear()
      navigation.replace('Login')
    }
    return(
        <SafeAreaView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Choose the plan that is right to you
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Feather name="check" size={24} color="#E50914" />
            <Text style={{ marginLeft: 6, fontSize: 17, fontWeight: "600" }}>
              Watch all you want ad free
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Feather name="check" size={24} color="#E50914" />
            <Text style={{ marginLeft: 6, fontSize: 17, fontWeight: "600" }}>
              Recommendation just for you
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Feather name="check" size={24} color="#E50914" />
            <Text style={{ marginLeft: 6, fontSize: 17, fontWeight: "600" }}>
              Cancle your plan any time
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Pressable 
          style={{ height: 150, borderRadius: 7, borderColor: "#E59014", borderWidth: 0.5, padding: 15, margin: 10 }}
          onPress={buyBundle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ backgroundColor: "#E50914", padding: 10, width: 120, borderRadius: 7, fontWeight: "600" }}>
                <Text style={{ textAlign: 'center', color: "white", fontSize: 16, fontWeight: "600" }}>Mobile</Text>
              </View>
              <Text style={{ fontSize: 20, fontWeight: 600 }}>Price: 200000</Text>
            </View>
            <View style={{marginTop:15,flexDirection:'row',justifyContent:'space-between',alignItems:"500"}}>
              <View>
                <Text style={{color:"gray",fontSize:15,fontWeight:"500"}}>Sale: 50%</Text>
                <Text style={{fontSize:16,fontWeight:"500",marginTop:3}}>Day Extend: 7</Text>
              </View>
              <Fontisto size={24} color="black" name="netflix"/>
            </View>
          </Pressable>
        </View>
        <Pressable 
          style={{ height: 150, borderRadius: 7, borderColor: "#E59014", borderWidth: 0.5, padding: 15, margin: 10 }}
          onPress={goBack}>
            <Text>go back</Text>
          </Pressable>
      </SafeAreaView>
    )
}

export default Bundle

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
});
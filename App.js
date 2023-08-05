import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {KeyboardAvoidingView} from 'react-native'
import { createStackNavigator, TransitionPresets, create} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import {Provider} from 'react-redux'
import store from './redux/stores/store'
import Login from './screen/Login'
import Register from './screen/Register';
import Splash from './screen/Splash';
import Home from './screen/Home'
import ViewMovie from './screen/ViewMovie'
import MyList from './screen/MyList'
import searchScreen from './screen/searchScreen'
import Bundle from './screen/Bundle'
import FullScreen from'./screen/FullScreen'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  function BottomStackScreen(){
    return (

      <Tab.Navigator 
      screenOptions={{
        // tabBarItemStyle: { flexDirection: 'row' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: "#5B5B5B",
        tabBarStyle: [{display: "flex"}, styles.bottomStack],
        headerShown: false
      }}
      >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} style={{ marginBottom: -10 }} />
      }} />
      <Tab.Screen name="Coming Soon" component={Home} options={{
        tabBarIcon: ({ color }) => <MaterialIcons name="video-library" size={24} color={color} style={{ marginBottom: -10 }} />
      }} />
      <Tab.Screen name="Downloads" component={Home} options={{
        tabBarIcon: ({ color }) => <AntDesign name="download" size={24} color={color} style={{ marginBottom: -10 }} />
      }} />

      </Tab.Navigator>  
    )
  }


  const screenOptions = {
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS,
  }


  return (
    <Provider store={store}>
    <NavigationContainer>
      <KeyboardAvoidingView 
      behavior={Platform.OS ==='ios' ? "padding" : "height"} 
      style={styles.kbAvoid}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={Login} options={{
        gestureEnabled: true,
        animationEnabled: true,
        gestureDirection: "horizontal",
      }} />
      <Stack.Screen name="Register" component={Register} options={{
        gestureEnabled: true,
        animationEnabled: true,
        gestureDirection: "horizontal",
      }} />

      <Stack.Screen name="BottomStack" component={BottomStackScreen} />
      <Stack.Screen name="MyList" component ={MyList} />
      <Stack.Screen name='ViewMovie' component = {ViewMovie} />
      <Stack.Screen name='Search' component = {searchScreen}/>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="bundle" component ={Bundle} />
      <Stack.Screen name="FullScreen" component ={FullScreen}/>
      </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kbAvoid:{
    flex:1
  },
  bottomStack: {
    backgroundColor: '#141414',
    borderTopWidth: 0,
    elevation: 0,   // for Android
    shadowOffset: {
      width: 0, height: 0 // for iOS
    },
    height: 60,
    paddingBottom: 10
  },
});

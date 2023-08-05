import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
const FullScreen = ({navigation, route}) => {
    const setOrientation=()=> {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
          //Device is in portrait mode, rotate to landscape mode.
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        else {
          //Device is in landscape mode, rotate to portrait mode.
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
      }
    return(
        <View style={styles.container}>

      <StatusBar style="auto" />
      
        <Video
          source={{ uri: route.params.linkVideo }}
          resizeMode="cover"
          shouldPlay
          onFullscreenUpdate={setOrientation}
          useNativeControls

          style={{ width: Dimensions.get('window').width, height: 200 }}
        />

        </View>
    )
    
};

export default FullScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});
import { View } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
export default function Splash() {
const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            checkGoogleSignIn()
        },5000)
 
    })

    const checkGoogleSignIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        console.log(isSignedIn)
        if (isSignedIn) {
          navigation.navigate('Home');
        }else{
            navigation.navigate('Welcome');  
        }
      };


  return (
    <View className=" bg-black flex-1 justify-center items-center">
    <Animatable.Image source={require('../assets/logo.png' )}
    duration={5000}
    animation='fadeInDownBig'
    />

    </View>
  )
}
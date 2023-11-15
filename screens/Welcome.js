import React, { useEffect,useState } from 'react'
import { View, Text, Image,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  '../config/firebase'
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider } from 'firebase/auth'
export default function Welcome ({navigation}) {

 
  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '934520177210-23or782ejkd9hd8sm5i0s4of8f07j3l7.apps.googleusercontent.com'
    });
 
  
  },[])




  const signIn = async () => {
   
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();

      const googleCredentials = GoogleAuthProvider.credential(idToken);
    await firebase.auth().signInWithCredential(googleCredentials)
    await GoogleSignin.signIn();
    navigation.navigate('Home');
    } catch (error) {
      console.log('got error: ',error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };



  return (
    <SafeAreaView className="flex-1 bg-black">
     <View className=" flex h-full flex-col justify-center items-center bg-black">
       <Image
         source={require("../assets/logo.png")}
         className=" w-auto h-auto mx-0 rounded-lg mt-5"
       />

       <Text className=" text-white mx-2 text-center mt-10 mb-10 text-base">
         MathMoney AI models are specifically designed to analyze massive
         amounts of market data in real-time to identify patterns and
         trends.Combining a set of complex mathematical algorithoms and
         pseudo-scientific techniques,we help users to forecast timing of the
         market.
       </Text>

       <View className=" h-10" />

       <View className=" flex justify-center items-center h-10 w-11/12 rounded-full bg-[#1E90FF]">
         <Text className="text-white">Sign in with email</Text>
       </View>

       <View className=" flex flex-row justify-between h-10 w-11/12 my-5">
         <TouchableOpacity onPress={signIn} className=" w-auto h-10 rounded-full flex justify-center items-center bg-[#1A1A1A] border-white border">
           <Text className=" items-center text-white mx-12">Google</Text>
         </TouchableOpacity>

         <View className=" w-auto h-10 rounded-full flex justify-center items-center bg-[#1A1A1A] border-white border">
           <Text className=" items-center text-white mx-12">Apple</Text>
         </View>
       </View>
    
    

     </View>
   </SafeAreaView>
  )
}

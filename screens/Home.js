import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, PermissionsAndroid,
  Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Snackbar from 'react-native-snackbar';
import Geolocation from '@react-native-community/geolocation';
import  "../config/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import  showAlert  from 'react-native-alert-async';
import Loading from "./Loading";

export default function Home ({navigation}) {
  const[data,setdata] = useState([])
  const[feedback,setFeedback] = useState('')
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [ currentLatitude,setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus ] = useState('');
  const [dayData, setdayData] = useState('today')
  const [userLoading, setUserLoading] = useState(true);
  const showCustomAlert = async () => {
    const result = await showAlert(
      'Select an option:',
      'Choose one of the following options:',
      [
        { text: 'Today', onPress: () => handleOption('today') },
        { text: 'Yesterday', onPress: () => handleOption('yesterday') },
        { text: 'Tomorrow', onPress: () => handleOption('tomorrow') },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleOption = (selectedOption) => {
    setdayData(selectedOption)
    fetchData()
  };


  useEffect(()=>{
      fetchData() 
  },[])

   const fetchData = async() => {
    const response = await fetch(`https://astro-app-backend-kie26bslwq-uc.a.run.app/koosappa/${dayData}/nse`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const json = await response.json()
    setdata(json.result.data)
    setUserLoading(false)
   }

   const handleFeedback = async() =>{
    if(feedback === ''){
Snackbar.show({
  text: 'Please enter the feedback',
  backgroundColor: 'red',
});
    }else{
      firebase.firestore().collection("test").add({
        feedback: feedback,
        latitude: currentLatitude,
        longitude: currentLongitude
    })
    .then((docRef) => {
      Snackbar.show({
        text: 'your feeddback is saved',
        backgroundColor: 'green',
      });
        console.log("Document written with ID: ", docRef.id);
        setFeedback('')
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    }
    
  



   }

   useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
 
  return (
    <SafeAreaView className=" flex-1 bg-black">
 <KeyboardAvoidingView enabled={true}>
 <ScrollView>
 <View className=" flex flex-col">
        {/* Top View */}
        <View className=" flex flex-row justify-between mt-5">
          {/* DropDown View */}
          <TouchableOpacity onPress={showCustomAlert} className=" w-auto ml-4 px-4 py-2 flex flex-row rounded-lg bg-[#1E90FF] justify-evenly">
            <Text className=" text-white font-normal mr-4">Today</Text>
            <Image source={require("../assets/expand.png")} className=" w-5 h-5"/>
       
          </TouchableOpacity>

          {/* Nifty View */}
          <View className="flex flex-row">
            <View className="bg-[#1A1A1A] rounded justify-center items-center">
              <Text className="items-center text-white px-2 font-bold text-xs ">
                NIFTY 50
              </Text>
            </View>
            <Text className=" text-white text-xs font-light mt-2 ml-1">
              17560.34
            </Text>
            <Image
              source={require("../assets/up.png")}
              className="w-auto h-auto"
            />
            <Text className=" text-white text-xs font-light mt-2 mx-4">
              1.8%
            </Text>
          </View>
        </View>

        <View className="flex justify-center items-center mt-4 mb-1">
          <View className="w-11/12 h-auto bg-[#333333] rounded-sm px-2  py-1">
            <Text className=" text-white font-medium text-base">
              Market Timing Sentiment
            </Text>
            <Text className=" text-white font-light text-xs">
              The Sentiment score of Market and Trader for the day
            </Text>

            <View className=" flex justify-between flex-row">
              {/* Traders */}
              <View className="flex flex-row">
                {/* Taders View */}
                <View className="rounded-full h-6 bg-[#FFAB1E] mx-2 my-3 justify-center">
                  <Text className=" items-center text-center text-white px-5 font-normal text-sm">
                    Traders
                  </Text>
                </View>
                <Text className=" text-white mt-3.5">37%</Text>
              </View>
              {/* Market */}
              <View className="flex flex-row">
                {/* MArket View */}
                <Text className=" text-white mt-3.5">37%</Text>
                <View className="rounded-full h-6 bg-[#4CD964] mx-2 my-3 justify-center">
                  <Text className=" items-center text-center text-white px-5 font-normal text-sm">
                    Market
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className=" w-11/12 h-0.5 bg-[#333333] rounded-full mx-4" />

        <View className=" flex flex-row justify-end items-end mx-21">
          <View className=" flex flex-row">
            <View className="w-2.5 h-2.5 mt-1 rounded-full bg-[#FF2D55]" />
            <Text className="text-white mt-0 mx-2">Fear</Text>
          </View>

          <View className=" flex flex-row mt-1 mx-2">
            <Image
              source={require("../assets/green.png")}
              className="w-2.5 h-2.5 mt-1"
            />
            <Text className="text-white mt-0 mx-2">Greed</Text>
          </View>
        </View>

  <View className=" mt-3 mx-2 flex-row flex justify-around">
  <Text className=" text-white mx-2 font-normal text-sm">Time</Text>
  <Text className=" text-white mx-1 font-normal text-sm">Planet</Text>
  <Text className=" text-white mx-4 font-normal text-sm">S</Text>
  <Text className=" text-white mx-4 font-normal text-sm">M</Text>
  <Text className=" text-white mx-4 font-normal text-sm">XL</Text>
  <Text className=" text-white mx-5 font-normal text-sm">Trader</Text>
  </View>

  <View>
    {userLoading? (<Loading/>): (
 
      <View>
      {data.map((element,index)=>{
        return(
          <View key={index} className=" flex flex-row mx-3 justify-around">
   <View className="rounded-md bg-[#333333] py-1 ml-0 mt-2 w-10">
              <Text className=" text-center text-white text-sm px-0">{element.Time}</Text>
            </View>
            <View className="rounded-md bg-[#333333] py-1 ml-0 mt-2 w-10">
              <Text className=" text-center text-white text-sm px-0">{element.Planet}</Text>
            </View>

            <View className="rounded-md bg-[#333333] py-1 ml-0 mt-2 w-10">
              <Text className=" text-center text-white text-sm px-0">{element.RL_of_Lagna_S}</Text>
            </View>

            <View className="rounded-md bg-[#333333] py-1 ml-0 mt-2 w-10">
              <Text className=" text-center text-white text-sm px-0">{element.NL_of_Lagna_M}</Text>
            </View>

            <View className="rounded-md bg-[#333333] py-1  mr-0 mt-2 w-10">
              <Text className=" text-center text-white text-sm px-0">{element.SL_of_Lagna_XL}</Text>
            </View>

            <View className="rounded-md bg-[#333333] py-1 ml-0 mt-2 w-20">
              <Text className=" text-center text-white text-sm px-0">{element.Natal_score}</Text>
            </View>

          </View>
        )
      })}
    </View>

    )}
  </View>

   


        {/* Table View */}
        
        <View className=" w-11/12 h-0.5 bg-[#333333] rounded-full mx-4 mt-3" />

        <View className=" w-11/12 h-auto bg-[#1A1A1A] mx-4 my-2 flex flex-row justify-evenly">
        <TextInput className=" px-2 py-1 h-auto w-10/12 text-white text-sm text-start pt-1" placeholder="Enter Feedback" placeholderTextColor={'white'}  value={feedback}
          onChangeText={value => setFeedback(value)}/>
        <TouchableOpacity onPress={()=> handleFeedback()} className=" w-auto ml-0 px-1 py-2 flex flex-row rounded-lg bg-[#1E90FF] justify-center items-center">
            <Text className=" text-white font-normal text-xs">Feedback</Text>
          </TouchableOpacity>
        </View>

      </View>
 </ScrollView>
 </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
};



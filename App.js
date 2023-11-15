import React from 'react'


import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import Home from './screens/Home';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();

function App () {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash'>
    <Stack.Screen options={{headerShown: false}} name="Splash" component={Splash} />
        <Stack.Screen options={{headerShown: false}} name="Welcome" component={Welcome} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
    </Stack.Navigator>
</NavigationContainer>

);
  
}

export default App;


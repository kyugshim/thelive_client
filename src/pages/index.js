import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, Header } from '@react-navigation/stack';
import Signin from './Signin/Signin'
import FeedIndex from './Feed/index'
import Signup from './Signup/Signup'
import Oauth from './Signin/Oauth'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="Oauth" component={Oauth} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="FeedIndex" component={FeedIndex} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
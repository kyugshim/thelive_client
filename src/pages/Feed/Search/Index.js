import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search'
import Watching from '../Watching/Watching'
import SellerIndex from '../../SellerHome/Index.js'
import Feed from '../Feed'
import Signin from '../../Signin/Signin';

const Stack = createStackNavigator();
export default function SearchIndex() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Watching" component={Watching} />
            <Stack.Screen name="SellerHome" component={SellerIndex} />
        </Stack.Navigator>
    )
}

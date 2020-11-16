import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetail from '../ProductDetail/ProductDetail'
import Watching from '../Feed/Watching/Watching'
import SellerHome from './SellerHome'

const Stack = createStackNavigator();
export default function SellerHomeIndex() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="SellerHome" component={SellerHome} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Watching" component={Watching} />
        </Stack.Navigator>
    )
}

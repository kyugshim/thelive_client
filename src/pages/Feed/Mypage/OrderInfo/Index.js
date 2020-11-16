import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OrderInfo from './OrderInfo'
import ProductDetail from '../../../ProductDetail/ProductDetail'

const Stack = createStackNavigator();
export default function OrderInfoIndex() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="OrderInfo" component={OrderInfo} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    )
}

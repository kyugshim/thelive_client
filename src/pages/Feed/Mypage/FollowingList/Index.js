import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import FollowingList from './FollowingList'
import SellerHomeIndex from '../../../SellerHome/Index'
import Watching from '../../Watching/Watching'

const Stack = createStackNavigator();
export default function FollowingListIndex() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="FollowingList" component={FollowingList} />
            <Stack.Screen name="SellerHome" component={SellerHomeIndex} />
            <Stack.Screen name="Watching" component={Watching} />
        </Stack.Navigator>
    )
}

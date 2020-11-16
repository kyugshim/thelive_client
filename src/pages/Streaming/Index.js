import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OnAir from './OnAir/OnAir'
import StreamingReady from './Streaming'

const Stack = createStackNavigator();
export default function SellerHomeIndex(props) {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Ready" component={StreamingReady} initialParams={{ handleVisible: props.route.params.handleVisible, userInfo: props.route.params.userInfo }} />
            <Stack.Screen name="OnAir" component={OnAir} />
        </Stack.Navigator>
    )
}

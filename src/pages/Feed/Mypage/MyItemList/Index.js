import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyItemList from './MyItemList'
import AddItem from './AddItem/AddItem'
import TextEditor from '../../../../components/TextEditor'
import ProductDetail from '../../../ProductDetail/ProductDetail'

const Stack = createStackNavigator();
export default function MyItemListIndex() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="MyItemList" component={MyItemList} />
            <Stack.Screen name="AddItem" component={AddItem} />
            <Stack.Screen name="TextEditor" component={TextEditor} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    )
}

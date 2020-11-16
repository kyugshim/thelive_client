import Axios from 'axios'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, Header } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { SERVER } from '../pages/config'


export const CustomHeader = (props) => {

    const handleSignout = () => {
        Axios.get(`${SERVER}/signout`)
            .then(() => {
                props.navigation.navigate('Signin')
            })
    }
    const { index, routes } = props.navigation.dangerouslyGetState();
    const currentRoute = routes[index].name;

    return (<Header
        containerStyle={{ height: 70, borderBottomWidth: 0, elevation: 5 }}
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
            useAngle: true,
            angle: 91.5,
            colors: ['#E2E2E2', '#C9D6FF']
        }}
        centerComponent={
            <Text style={styles.headerTitle} onPress={(() => this.FlatList.current.scrollToOffset({ animated: true, offset: 0 }))}>
                THE LIVE</Text>}
        rightContainerStyle={{ flex: 1 }}
        rightComponent={currentRoute === "Mypage" && <Button type='clear' title="SIGN OUT"
            containerStyle={{ justifyContent: 'center', }}
            buttonStyle={{ width: 80, height: 30, }}
            titleStyle={{ fontFamily: 'sans-serif-medium', fontSize: 14, letterSpacing: -0.5, color: 'slateblue' }}
            onPress={handleSignout} />}
    />)
}

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 22,
        padding: 5,
        fontFamily: "sans-serif-light",
    },
})
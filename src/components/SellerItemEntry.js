import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Image } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { SERVER } from '../pages/config';



export default class SellerItemEntry extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let { navigation } = this.props
        let { navigate } = navigation
        let { itm } = this.props
        let imgSrc = itm.image
        return (
            <View key={itm.title}
                style={{
                    borderRadius: 20,
                    padding: 3,
                    marginBottom: 10,
                    alignItems: "center",
                    elevation: 3,
                    backgroundColor: "whitesmoke"
                }} >
                <Image
                    style={{ height: 140, width: 140, marginTop: 5, borderRadius: 20 }}
                    source={{ uri: `${SERVER}${imgSrc}` }}
                    onPress={() => {
                        navigate('ProductDetail', { info: itm });
                    }}
                ></Image>
                <Text style={{
                    textAlign: "center",
                    padding: 10,
                    marginTop: 5,
                    width: 150,
                    fontFamily: "sans-serif",
                    letterSpacing: -0.5
                }} numberOfLines={1} ellipsizeMode="tail"
                    onPress={() => navigate('ProductDetail', { info: itm })} >
                    {itm.title}
                </Text>
                <Text style={{
                    fontSize: 12,
                    textAlign: "center",
                    marginTop: -8,
                    marginBottom: 10,
                    width: 130,
                    letterSpacing: 1,
                    fontFamily: "sans-serif-light"
                }} numberOfLines={1} ellipsizeMode="tail">
                    ￦ {itm.price}
                </Text>
            </View>
        )
    }
}

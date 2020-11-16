import Axios from 'axios';
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { BoxShadow } from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SERVER } from '../pages/config';



export default class SellerInfoHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sellerInfo: [
                { Rate: (Math.random() * 10).toFixed(1) },
                { Products: "193" },
                { Followers: `${(Math.random() * 10).toFixed(1)}k` }
            ]
        }
    }

    render() {
        let { navigation } = this.props
        let { navigate } = navigation
        const { index, routes } = this.props.navigation.dangerouslyGetState();
        const currentRoute = routes[index].name;
        return (
            <>
                <View style={styles.sellerInfoContainer}>
                    {this.state.sellerInfo.map(function (obj) {
                        return (Object.keys(obj).map(function (key) {
                            return (
                                <View>
                                    <Text style={styles.sellerContainerText}>
                                        {key}
                                        {"\n"}
                                        {obj[key]}
                                    </Text>
                                </View>
                            )
                        })
                        )
                    })}
                </View>
                {currentRoute !== 'SellerHome' ?
                    <View style={{ alignItems: "center" }}>
                        <BoxShadow setting={shadowOpt} style={{ alignItems: 'center' }}>
                            <Icon.Button onPress={() => {
                                this.props.handleVisible();
                                navigate('SellerHome', { list: this.props.list, sellerInfo: this.state.sellerInfo });
                            }}
                                name="shopping-bag"
                                borderRadius={15}
                                iconStyle={{ padding: 5 }}
                                size={15}
                                style={{ justifyContent: 'center', backgroundColor: 'slateblue' }}>
                                Go to Seller Home
                            </Icon.Button>
                        </BoxShadow>
                    </View> : <></>}
            </ >
        )
    }
}

const shadowOpt = {
    width: 200,
    height: 38,
    color: "#708090",
    border: 5,
    radius: 10,
    opacity: 0.3,
    x: 0,
    y: 5,
    style: {
        marginVertical: 11,
    }
}

const styles = StyleSheet.create({

    sellerInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        textAlign: "auto",
        marginTop: 10,
        marginBottom: 20
    },
    sellerContainerText: {
        textAlign: "center",
        padding: 5,
        fontFamily: 'sans-serif-light',
    },
    sellerItms: {
        justifyContent: "space-evenly",
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "center",
    }
})
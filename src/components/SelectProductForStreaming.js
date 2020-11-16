import Axios from 'axios'
import React, { Children } from 'react'
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Button, Input, Image, ListItem, ButtonGroup } from 'react-native-elements'
import { SERVER } from '../pages/config'

export default class SelectProductForStreaming extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let { productInfo } = this.props
        let { id, price, title, quantity, image } = productInfo

        return (
            <TouchableOpacity onPress={() => {
                console.log("info", this.props)
                this.props.handleSelectProduct(productInfo)
                this.props.handleModal()
            }}>
                <View style={{
                    width: `${85}%`,
                    alignSelf: "center",
                    // justifyContent: "center",
                    flexDirection: "row",
                    marginBottom: `${3}%`,
                    padding: 5,
                    margin: 5,
                    marginBottom: 10,
                    paddingLeft: 20,
                    borderRadius: 20,
                    backgroundColor: 'whitesmoke',
                    elevation: 8,
                }}>
                    {image ? <Image source={{ uri: `${SERVER + image}` }} style={{ width: 65, height: 65, marginRight: `${5}%`, borderRadius: 10 }} />
                        : <View style={{ width: 65, height: 65, marginRight: `${5}%`, backgroundColor: 'rgba(200, 200, 200, 1)', borderRadius: 10 }} />}
                    <View style={{ width: `${80}%` }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.text}>{`${title.toUpperCase()}`}</Text>
                        </View>
                        <Text style={styles.buttonText}>￦ {price}</Text>
                        <Text style={styles.buttonText}>{`Available`.toUpperCase()} : {quantity}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const shadowOpt = {
    width: 60,
    height: 30,
    color: "#708090",
    border: 6,
    radius: 10,
    opacity: 0.3,
    x: 0,
    y: 1,
}

const styles = StyleSheet.create({

    body: {
        padding: 20,
        paddingBottom: -20,
        flex: 1,
        alignItems: 'center',
    },
    title: {
        padding: 5,
        color: "slateblue",
        letterSpacing: -0.5,
        fontSize: 17,
        fontFamily: "sans-serif",
    },
    InputContainer: {
        marginBottom: 5,
    },
    Input: {
        fontSize: 13,
        letterSpacing: -0.5,
        fontFamily: "sans-serif-light",
    },
    loginButton: {
        justifyContent: "center",
        backgroundColor: "white",
        width: 60,
        height: 30,
    },
    text: {
        fontSize: 15,
        color: "slateblue",
        fontFamily: "sans-serif",
    },
    buttonText: {
        fontSize: 13,
        color: "slategrey",
        fontFamily: "sans-serif-light",
    }
})
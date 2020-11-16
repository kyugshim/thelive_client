import React, { Children } from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { Text, Button, Input, Image, ListItem, ButtonGroup } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SERVER } from '../pages/config'
import Axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import { BoxShadow } from 'react-native-shadow'

export default class MyItemListEntry extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productInfo: this.props.productInfo
        }
    }

    render() {
        let { id, price, title, quantity, image } = this.state.productInfo
        let { handleDelete } = this.props
        return (
            <TouchableOpacity onPress={() => console.log('go to detail')}>
                <View style={{
                    width: `${95}%`,
                    alignSelf: "center",
                    justifyContent: "center",
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
                    <View style={{ alignSelf: "center", width: `${45}%` }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.text}>{`${title.toUpperCase()}`}</Text>
                        </View>
                        <Text style={styles.buttonText}>￦ {price}</Text>
                        <Text style={styles.buttonText}>{`Available`.toUpperCase()} : {quantity}</Text>
                    </View>
                    <View style={{ alignSelf: "center" }}>
                        <BoxShadow setting={shadowOpt} style={{ alignItems: 'center' }}>
                            <Icon.Button
                                name="minus-square-o" style={styles.loginButton}
                                size={12}
                                iconStyle={{ color: "slateblue", }}
                                borderRadius={10}
                                onPress={() => handleDelete(id)}
                            >
                                <Text style={styles.buttonText}>DEL</Text>
                            </Icon.Button>
                        </BoxShadow>
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
import Axios from 'axios'
import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import MyItemListEntry from '../../../../components/MyItemListEntry'
import { BoxShadow } from 'react-native-shadow';
import { SERVER } from '../../../config'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class MyItemList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
        this.getItems = this.getItems.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    getItems() {
        Axios.get(`${SERVER}/myitem`)
            .then(data => {
                this.setState({ list: data.data })
                console.log(this.state.list)
            })
    }

    componentDidMount = () => {
        this.getItems();
    }

    handleDelete = (id) => {
        Axios.post(`${SERVER}/deleteitem`, { productId: id })
            .then(() => {
                this.getItems()
                alert('성공적으로 삭제되었습니다')
            })
    }

    render() {
        let { list } = this.state

        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']}>
                <View style={{ padding: 20, paddingBottom: 0, height: `${100}%` }}>
                    <Text style={styles.headerTitle}>MY ITEMLIST</Text>
                    <View style={{ alignItems: "center", marginBottom: 5 }}>
                        <BoxShadow setting={shadowOpt} style={{ alignItems: 'center' }}>
                            <Icon.Button name="plus-square-o" style={styles.loginButton}
                                iconStyle={{ color: "slateblue" }}
                                borderRadius={15}
                                onPress={() => this.props.navigation.navigate('AddItem', { refreshList: this.getItems })} >
                                <Text style={styles.buttonText}>ADD ITEM</Text>
                            </Icon.Button>
                        </BoxShadow>
                    </View>
                    <ScrollView contentContainerStyle={{ alignContent: "center", padding: 10 }}>
                        {list.map((item, index) =>
                            <MyItemListEntry key={index} productInfo={item} navigation={this.props.navigation} handleDelete={this.handleDelete} />)}
                    </ScrollView>
                </View>
            </LinearGradient>
        )
    }
}


const shadowOpt = {
    width: 200,
    height: 38,
    color: "#708090",
    border: 5,
    radius: 15,
    opacity: 0.17,
    x: 0,
    y: 0.5,
    style: {
        marginTop: 20,
    }
}

const styles = StyleSheet.create({

    body: {
        padding: 20,
        paddingBottom: -20,
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 25,
        padding: 28,
        paddingBottom: -10,
        fontFamily: "sans-serif-light",
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
        width: 200,
        height: 35,
    },
    buttonText: {
        color: "slateblue",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
    }
})
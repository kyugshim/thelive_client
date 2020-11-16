import React, { Children } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Button, Input, Image, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SERVER } from '../pages/config'
import OrderInfo from '../pages/Feed/Mypage/OrderInfo/OrderInfo'


export default class OrderListEntry extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { order, navigation } = this.props
        let { title, price, image } = order.products[0]
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { info: orderInfo.product })} >
                <View style={{ flexDirection: "row", marginBottom: 15, width: "100%", justifyContent: "space-between" }}>
                    <Image source={{ uri: `${SERVER}${image}` }} style={{ width: 90, height: 90 }} />
                    <View>
                        <ListItem.Title style={{ letterSpacing: 1.5 }}>{title.toUpperCase()}</ListItem.Title>
                        <ListItem.Subtitle style={{ letterSpacing: 2, textAlign: "right" }}>{price}원</ListItem.Subtitle>
                        <ListItem.Subtitle style={{ letterSpacing: 2, textAlign: "right" }}>{order.order_quantity}개</ListItem.Subtitle>
                        <ListItem.Subtitle style={{ letterSpacing: 2, textAlign: "right" }}>{order.amount}원</ListItem.Subtitle>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

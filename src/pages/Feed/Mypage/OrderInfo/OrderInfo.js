import Axios from 'axios'
import React from 'react'
import { View } from 'react-native'
import { Text, Button, Input, ListItem, Card } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import OrderListEntry from '../../../../components/OrderListEntry'
import { SERVER } from '../../../config'

export default class OrderInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: null
        }
    }

    componentDidMount = () => {
        Axios.get(`${SERVER}/myorder`).then(data => { this.setState({ orders: data.data }); console.log(data.data) })
    }

    render() {
        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, }}>
                <View style={{ padding: 20, height: "100%" }}>
                    <Text h4 style={{ textAlign: "left", marginBottom: 20 }}>Orders</Text>
                    <ScrollView style={{ padding: 10 }}>
                        {this.state.orders && this.state.orders.map((order, key) => {
                            return <Card containerStyle={{ padding: 10, borderRadius: 15 }} key={key}>
                                <OrderListEntry order={order} navigation={this.props.navigation} />
                                <Card.Divider />
                                <Text>Order Number : {order.id}</Text>
                                <Text>Address : {order.address + order.addressDtail}</Text>
                                <Text>Status : {order.payment_status} </Text>
                            </Card>
                        })}
                    </ScrollView>
                </View>
            </LinearGradient>
        )
    }
}


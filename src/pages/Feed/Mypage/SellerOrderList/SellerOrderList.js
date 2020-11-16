import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, Image, ScrollView } from 'react-native'
import { Picker } from '@react-native-community/picker';
import { Card, Text, Button } from 'react-native-elements'
import Axios from 'axios'
import { or } from 'react-native-reanimated'
import { SERVER } from '../../../config'
import OrderListEntry from '../../../../components/OrderListEntry'

export default class SellerOrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            order: null,
            orderStatus: null,
            orderid: null,
        }
        this.orderStatus = ['Select', 'Processing', 'Shipped out', 'In Delevery', 'Delivered', 'Completed']
    }

    componentDidMount = () => {
        Axios.get(`${SERVER}/sellerorder`).then(data => { this.setState({ orders: data.data }); console.log(data.data) })
    }

    handleChangeStatus = () => {
        Axios.post(`${SERVER}/sellerOrderStatus`, { id: this.state.orderid, status: this.state.orderStatus })
            .then(data => {
                alert("주문 상태가 변경되었습니다.")
                this.setState({ orderStatus: "Select" })
                Axios.get(`${SERVER}/sellerorder`).then(data => { this.setState({ orders: data.data }); console.log(data.data) })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ height: "100%", width: "100%" }}>
                <Text h4 style={{ textAlign: "left", marginTop: 20 }}>Orders</Text>
                <View style={{ padding: 10, height: "100%", width: "100%", alignItems: "center" }}>
                    <ScrollView style={{ padding: 10, width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
                        {this.state.orders && this.state.orders.map((order, key) => {
                            return <View style={{ width: "90%", backgroundColor: "white", padding: 10, borderRadius: 15, marginBottom: 15 }} key={key} >
                                <OrderListEntry order={order} navigation={this.props.navigation} />
                                <Card.Divider />
                                <View style={{ flexDirection: "row", alignSelf: "center", alignContent: "flex-end" }} >
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={this.state.orderStatus}
                                        style={{ height: 30, width: 150, margin: 5, color: "slateblue" }}
                                        itemStyle={{
                                            fontFamily: "sans-serif-light",
                                            letterSpacing: -0.5,
                                        }}
                                        onValueChange={(value) => {
                                            if (value !== "Select Status") { this.setState({ orderStatus: value, orderid: order.id }) }
                                        }} >
                                        {this.orderStatus.map((item, idx) => <Picker.Item label={item} value={item} key={idx} color="slategrey" />)}
                                    </Picker>
                                    <Button title="Change" onPress={this.handleChangeStatus} />
                                </View>
                                <View>
                                    <Text>Order Number : {order.id}</Text>
                                    <Text>Address : {order.address + order.addressDtail}</Text>
                                    <Text>Status : {order.payment_status} </Text>
                                </View>
                            </View>
                        })}
                    </ScrollView >
                </View >
            </LinearGradient >
        )
    }
}
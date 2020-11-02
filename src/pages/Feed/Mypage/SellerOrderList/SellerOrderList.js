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
        this.orderStatus = ['Select Status', 'Processing', 'Shipped out', 'In Delevery', 'Delivered', 'Completed']
    }

    componentDidMount = () => {
        Axios.get(`${SERVER}/sellerorder`).then(data => { this.setState({ orders: data.data }); console.log(data.data) })
    }

    handleChangeStatus = () => {
        Axios.post(`${SERVER}/sellerOrderStatus`, { id: this.state.orderid, status: this.state.orderStatus })
            .then(data => {
                alert("주문 상태가 변경되었습니다.")
                this.setState({ orderStatus: "Select Status" })
                Axios.get(`${SERVER}/sellerorder`).then(data => { this.setState({ orders: data.data }); console.log(data.data) })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, }}>
                <View style={{ padding: 20, height: "100%" }}>
                    <Text h4 style={{ textAlign: "left" }}>Orders</Text>
                    <ScrollView style={{ padding: 10 }}>
                        {this.state.orders && this.state.orders.map((order, key) => {
                            return <Card containerStyle={{ padding: 15, borderRadius: 15 }} key={key}>
                                <OrderListEntry order={order} navigation={this.props.navigation} />
                                <View style={{ flexDirection: "row", alignSelf: "center" }} >
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={this.state.orderStatus}
                                        style={{ height: 30, width: 200, margin: 5, color: "slateblue" }}
                                        itemStyle={{
                                            fontFamily: "sans-serif-light",
                                            letterSpacing: -0.5,
                                            marginLeft: 100
                                        }}
                                        onValueChange={(value) => {
                                            if (value !== "Select Status") {
                                                this.setState({ orderStatus: value, orderid: order.id })
                                            }
                                        }} >
                                        {this.orderStatus.map((item, idx) => <Picker.Item label={item} value={item} key={idx} color="slategrey" />)}
                                    </Picker>
                                    <Button title="Change" onPress={this.handleChangeStatus} />
                                </View>
                                <Text>Order Number : {order.id}</Text>
                                <Text>Address : {order.address + order.addressDtail}</Text>
                                <Text>Status : {order.payment_status} </Text>
                            </Card>
                        })}
                    </ScrollView >
                </View >
            </LinearGradient >
        )
    }
}
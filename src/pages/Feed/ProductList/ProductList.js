import Axios from 'axios'
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Text, Button, Input, Header } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { CustomHeader } from '../../../components/CustomHeader'
import ProductListEntry from '../../../components/ProductListEntry'
import { SERVER } from '../../config'

export default class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: null
        }
    }

    componentDidMount = () => {
        Axios.get(`${SERVER}/allitem`).then(data => {
            console.log(data.data)
            this.setState({ products: data.data })
        })
    }

    render() {
        return (
            <>
                <CustomHeader navigation={this.props.navigation} />
                <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, }}>
                    <ScrollView style={{ padding: 30, paddingTop: -30 }}>
                        <View style={{ marginLeft: 13, padding: 5, }}>
                            <Text style={{
                                fontSize: 20, letterSpacing: 1, fontFamily: 'sans-serif-light', marginTop: 5, color: "slateblue"
                            }}>SHOP</Text>
                            <Text style={{ fontSize: 16, letterSpacing: 1, fontFamily: 'sans-serif-thin', }}>TRENDING</Text>
                        </View>
                        {this.state.products && this.state.products.map((product, index, array) => {
                            let images = [];
                            if (product.image) { images.push(product.image) }
                            if (product.image2) { images.push(product.image2) }
                            if (product.image3) { images.push(product.image3) }
                            return <ProductListEntry key={index} list={array} productInfo={product} navigation={this.props.navigation} handleVisible={this.props.route.params.handleVisible} images={images} />
                        })}
                    </ScrollView>
                </LinearGradient>
            </>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 25,
        padding: 5,
        fontFamily: "sans-serif-light",

    },
})

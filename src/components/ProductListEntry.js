import React, { Children } from 'react'
import { View, Modal, Dimensions } from 'react-native'
import { Text, Button, Input, Image, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient'
import { SERVER } from '../pages/config'


export default class ProductListEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSlide: 0
        }
        this._renderItem = this._renderItem.bind(this)
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 10, padding: 10, alignItems: "center", }} >
                <Image source={{ uri: `${SERVER}${item}` }} style={{ width: 230, height: 230, borderRadius: 20, }} />
            </View>
        );
    }
    get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={this.props.images.length}
                activeDotIndex={activeSlide}
                containerStyle={{ marginTop: -40, marginBottom: -10 }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 1,
                    backgroundColor: 'slateblue',
                    elevation: 3
                }}
                inactiveDotStyle={{
                    backgroundColor: 'slategrey'
                }}
                animatedDuration={100}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }
    render() {
        let { productInfo, navigation, list } = this.props
        let { title, price } = productInfo
        const sliderWidth = 300;
        const itemWidth = 300;
        const itemHeight = 180;
        return (
            <ListItem bottomDivider style={{ width: "100%", }}
                containerStyle={{ margin: 5, borderRadius: 30, backgroundColor: 'whitesmoke', elevation: 5, height: 390 }}
                onPress={() => navigation.navigate('ProductDetail', { info: productInfo, handleVisible: this.props.handleVisible, images: this.props.images })}
            >
                <ListItem.Content style={{ alignItems: "center" }}>
                    <Carousel ref={(c) => { this._carousel = c; }}
                        inactiveSlideScale={0.9}
                        data={this.props.images}
                        renderItem={this._renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        itemHeight={itemHeight}
                        onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    />
                    {this.pagination}
                    <ListItem.Title style={{ letterSpacing: -0.5, fontFamily: "sans-serif", fontSize: 18 }}>{title}</ListItem.Title>
                    <ListItem.Subtitle style={{ letterSpacing: 2, padding: 5, marginBottom: 8, fontFamily: "sans-serif-light", fontSize: 16 }}>￦ {price}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
}

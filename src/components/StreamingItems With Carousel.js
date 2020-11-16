import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { Card, Image } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';

export default class StremingItems extends React.Component {
    constructor(props) {
        super(props)
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ alignSelf: "center", width: `${60}%`, }}>
                <Card>
                    <Card.Title style={{ fontSize: 15, }} numberOfLines={1} ellipsizeMode="tail">{item.title}</Card.Title>
                    <Card.Divider />
                    <View style={{ alignSelf: "center" }}>
                        <Image source={{ uri: item.image[0] }} style={{ width: 100, height: 100, borderWidth: 1, borderColor: "black" }} />
                    </View>
                    <Text style={{ textAlign: "center", marginTop: `${5}%`, marginBottom: `${5}%`, letterSpacing: 1.5 }}>{item.price}</Text>
                    <Text style={{ fontSize: 8, color: "gray" }} numberOfLines={2} ellipsizeMode="tail" >{item.body}</Text>
                </Card>
            </View>
        )
    }

    render() {
        let { list } = this.props
        let horizontalMargin = 0
        let slideWidth = Dimensions.get('window').width;
        let sliderWidth = Dimensions.get('window').width;
        let itemWidth = slideWidth + horizontalMargin * 2;
        let itemHeight = 250;

        return (
            <ScrollView horizontal style={{ height: `${50}%`, borderColor: "black", borderWidth: 2 }}>
                <ScrollView style={{ height: `${100}%`, backgroundColor: 'rgba(0, 0, 0, 0.0)', }}>
                    <Carousel
                        ref={(c) => { this.carousel = c; }}
                        data={list}
                        renderItem={this.renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        itemHeight={itemHeight}
                    />
                </ScrollView>
            </ScrollView>
        )
    }
}
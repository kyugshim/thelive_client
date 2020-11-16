import React from 'react';
import { Dimensions, ScrollView, Text, View, PanResponder, Animated } from 'react-native'
import { Card, Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import { SERVER } from '../pages/config';

export default class StreamingItems extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pan: new Animated.ValueXY()
        }

        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y },
            ]),
            onPanResponderRelease: (e, gestureState) => {
                this.state.pan.setOffset({ x: this._val.x, y: this._val.y });
                this.state.pan.setValue({ x: 0, y: 0 });
            },
        });
    };

    componentDidMount = () => {
        this._val = { x: 0, y: 0 }
        this.state.pan.addListener((value) => this._val = value)
    }

    // renderItem = ({ item, index }) => {
    //     return (
    //         <View style={{ width: `${38}%`, justifyContent: "center" }}>
    //             <Card containerStyle={{ padding: 8, borderRadius: 20, paddingTop: 8 }}>
    //                 <Card.Title style={{ fontSize: 13, fontFamily: "sans-serif-thin", color: "slateblue" }} numberOfLines={1} ellipsizeMode="tail">{item.title}</Card.Title>
    //                 <View style={{ alignSelf: "center" }}>
    //                     <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductDetail", { info: item, previous: 'Watching', list: this.props.list })}>
    //                         <Image source={{ uri: item.image[0] }} style={{ width: 70, height: 70 }} />
    //                     </TouchableOpacity>
    //                 </View>
    //                 <Text style={{ textAlign: "center", marginTop: `${8}%`, marginBottom: `${8}%`, fontSize: 11, fontFamily: "sans-serif-light", letterSpacing: 1.2, color: "slategrey" }}>{item.price}</Text>
    //             </Card>
    //         </View>
    //     )
    // }

    render() {
        let { info } = this.props
        let panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        let horizontalMargin = 5
        let slideWidth = Dimensions.get('window').width;
        let sliderWidth = Dimensions.get('window').width;
        let itemWidth = slideWidth + horizontalMargin * 2;
        let itemHeight = 100;
        let images = [];
        if (info.products[0].image) { images.push(info.products[0].image) }
        if (info.products[0].image2) { images.push(info.products[0].image2) }
        if (info.products[0].image3) { images.push(info.products[0].image3) }
        return (
            // <ScrollView
            //     style={{

            //         marginLeft: `${60}%`,
            //         width: `${40}%`,
            //         backgroundColor: 'rgba(0, 0, 0, 0.0)',
            //     }}>
            //     <Carousel
            //         ref={(c) => { this.carousel = c; }}
            //         data={list}
            //         renderItem={this.renderItem}
            //         sliderWidth={sliderWidth}
            //         itemWidth={itemWidth}
            //         itemHeight={itemHeight}
            //     />
            // </ScrollView>

            <View style={{ width: `${38}%`, justifyContent: "center" }}>
                <Card containerStyle={{ padding: 8, borderRadius: 20, paddingTop: 8 }}>
                    <Card.Title style={{ fontSize: 13, fontFamily: "sans-serif-thin", color: "slateblue" }} numberOfLines={1} ellipsizeMode="tail">{info.products[0].title}</Card.Title>
                    <View style={{ alignSelf: "center" }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ProductDetail", { previous: 'Watching', info: info.products[0], images: images })}>
                            <Image source={{ uri: `${SERVER}${info.products[0].image}` }} style={{ width: 70, height: 70 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ textAlign: "center", marginTop: `${8}%`, marginBottom: `${8}%`, fontSize: 11, fontFamily: "sans-serif-light", letterSpacing: 1.2, color: "slategrey" }}>{info.products[0].price}</Text>
                </Card>
            </View>
        )
    }
}
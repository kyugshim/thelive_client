import React, { Children } from 'react'
import { View, ScrollView, Dimensions, StyleSheet, InteractionManager } from 'react-native'
import { Text, Button, Input, Image, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel';
import { useScrollToTop } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import SellerItemEntry from '../../components/SellerItemEntry';
import SellerHomeIndex from '../SellerHome/Index';
import SellerInfoHome from '../../components/SellerInfoHome';



export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inWishlist: false,
        }
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this._renderItem = this._renderItem.bind(this)
    }
    componentDidMount() {
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
    }


    handleButtonPress = (index) => {
        switch (index) {
            case 0:
                this.setState({ inWishlist: !this.state.inWishlist })
                if (this.state.inWishlist) {
                    alert('This item has added on your wish list')
                } else {
                    alert(' No more interesting? ')
                }
        }
    }
    _renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 10, padding: 10, alignItems: "center" }} key={item.title}>
                <Image source={{ uri: item }} style={{ width: 300, height: 300, borderRadius: 20 }} />
            </View>
        );
    }
    render() {
        let { title, body, price } = this.props.route.params.info
        const horizontalMargin = 20;
        const slideWidth = 280;
        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = slideWidth + horizontalMargin * 2;
        const itemHeight = 200;

        return (
            <LinearGradient colors={{ useAngle: true, angle: 45 }, ['#FFFFFF', '#EEE5E2']} style={{ flex: 1, }}>
                <Text h4 style={{ textAlign: 'left' }}>it's ProductDetail Page</Text>
                <ScrollView showsVerticalScrollIndicator={false} ref='_scrollView' onContentSizeChange={
                    () => this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true })
                }>
                    <View style={{ alignItems: "center" }}  >
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.props.route.params.info.image}
                            renderItem={this._renderItem}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            itemHeight={itemHeight}
                        />
                    </View>
                    <Text h4 style={{ letterSpacing: 1.5, textAlign: "center" }}>{title}</Text>
                    <Text style={{ letterSpacing: 2, fontSize: 15, textAlign: "center", marginTop: 10, }}>{price}</Text>
                    <Text style={styles.itmInfoText}>{body}</Text>
                    <ButtonGroup
                        onPress={this.handleButtonPress}
                        buttons={['Add to wishlist', 'Buy now']}
                    />
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        {this.props.route.params.info.image.map((itm) => {
                            return (
                                <Image
                                    key={itm.title}
                                    source={{ uri: itm }}
                                    style={{
                                        width: 270,
                                        height: 270,
                                        padding: 5,
                                        margin: 10
                                    }}
                                />
                            )
                        })}
                    </View>
                    <View style={styles.sellerContainer}>
                        <Text style={styles.sellerTitle}>{this.props.route.params.info.name.toUpperCase()}</Text>
                        <SellerInfoHome navigation={this.props.navigation} />
                    </View>
                    {this.props.route.params.list ?
                        <View style={styles.sellerItms} >
                            {this.props.route.params.list.map((itm) => <SellerItemEntry itm={itm} navigation={this.props.navigation} />)}
                        </View>
                        : <Text>no image to render</Text>}
                </ScrollView >
            </LinearGradient >
        )
    }
}

const styles = StyleSheet.create({
    sellerContainer: {
        margin: 15,
        padding: 15
    },
    sellerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,
        marginTop: 10,
        marginLeft: 10
    },
    itmInfoText: {
        textAlign: "center",
        padding: 35,
        marginBottom: 5,
    },
    sellerItms: {
        justifyContent: "space-evenly",
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "center",
    }
})
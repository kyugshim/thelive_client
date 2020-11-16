import React, { Children } from 'react'
import { View, ScrollView, Dimensions, StyleSheet, InteractionManager } from 'react-native'
import { Text, Button, Input, Image, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useScrollToTop } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import SellerItemEntry from '../../components/SellerItemEntry';
import SellerHomeIndex from '../SellerHome/Index';
import SellerInfoHome from '../../components/SellerInfoHome';
import Axios from 'axios';
import { SERVER } from '../config';
import HTML from 'react-native-render-html';
import { requestPayment } from '../../payments/payment';
import NumericInput from 'react-native-numeric-input'
import { HeaderBackButton } from '@react-navigation/stack';



export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inWishlist: false,
            quantity: 1,
            isPaymentPending: false, // request payment 메소드에 대응하는 state 추가
            activeSlide: 0,
            orderInfo: {
                quantity: null,
                productId: this.props.route.params.info.id,
                amount: null,
                sellerId: this.props.route.params.info.userId,
            },
            sellerItem: null,
        }
        this.handleButtonPress = this.handleButtonPress.bind(this)
        // this._renderItem = this._renderItem.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
        if (this.props.route.params.previous !== "Watching") {
            this.props.route.params.handleVisible();
        }
        Axios.post(`${SERVER}/selleritem`, { userId: this.props.route.params.info.userId })
            .then(data => this.setState({ sellerItem: data.data }))
    }

    componentWillUnmount() {
        this.props.route.params.handleVisible();
    }

    handleOpenPayment = () => {
        this.setState({ isPaymentPending: true });
        this.setState({ orderInfo: Object.assign(this.state.orderInfo, { quantity: this.state.quantity, amount: (this.state.quantity * this.props.route.params.info.price) }) })
        requestPayment(this.state.orderInfo);
    }

    handleButtonPress = (index) => {
        switch (index) {
            case 0:
                this.setState({ inWishlist: !this.state.inWishlist })
                if (!this.state.inWishlist) {
                    Axios.post(`${SERVER}/addwishlist`, { productId: this.props.route.params.info.id })
                        .then(data => {
                            alert('This item has added on your wish list')
                        })
                } else {
                    Axios.post(`${SERVER}/deletewishlist`, { productId: this.props.route.params.info.id })
                        .then(data => {
                            alert(' No more interesting? ')
                        })
                }
                break;
            case 1: {
                this.handleOpenPayment();
                break;
            }
        }
    }
    _renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 5, padding: 5, alignItems: "center" }} key={item.title}>
                <Image source={{ uri: `${SERVER}${item}` }} style={{ width: 250, height: 250, borderRadius: 20, elevation: 2, margin: 5, }} />
            </View>
        );
    }
    get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={this.props.route.params.images.length}
                activeDotIndex={activeSlide}
                containerStyle={{ margin: -20 }}
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
        let { title, body, price } = this.props.route.params.info
        const horizontalMargin = 20;
        const slideWidth = 280;
        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = slideWidth + horizontalMargin * 2;
        const itemHeight = 200;

        return (
            <>
                <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, padding: 5, paddingTop: 20 }}>
                    <View style={{ padding: 10 }}>
                        <HeaderBackButton onPress={() => {
                            this.props.navigation.goBack();
                        }} />
                        <ScrollView showsVerticalScrollIndicator={false} ref='_scrollView' onContentSizeChange={
                            () => this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true })
                        }>
                            <Text style={{ fontSize: 19, letterSpacing: -0.5, textAlign: "center", fontFamily: 'sans-serif', color: "slateblue" }}>{title}</Text>
                            <Text style={{ letterSpacing: 2, fontSize: 15, textAlign: "center", marginTop: 10, fontFamily: 'sans-serif-light' }}>￦ {price}</Text>
                            <View style={{ alignItems: "center", }}  >
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.props.route.params.images}
                                    renderItem={this._renderItem}
                                    sliderWidth={sliderWidth}
                                    itemWidth={itemWidth}
                                    itemHeight={itemHeight}
                                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                                />
                                {this.pagination}
                                <View style={{ marginTop: 10, }}>
                                    <NumericInput
                                        textColor="slategrey"
                                        inputStyle={{ color: "slateblue" }}
                                        minValue={1}
                                        initValue={1}
                                        totalWidth={110}
                                        totalHeight={25}
                                        onChange={value => this.setState({ quantity: value })}
                                    />
                                </View>

                            </View>
                            <View style={styles.itmInfoText} >
                                <HTML html={body} tagsStyles={{
                                    div: {
                                        fontFamily: 'sans-serif-thin',
                                        textAlign: 'center',
                                        letterSpacing: -0.25
                                    }
                                }} />
                            </View>
                            <View style={styles.sellerContainer}>
                                <Text style={styles.sellerTitle}>{this.props.route.params.info.seller_nickname.toUpperCase()}</Text>
                                <SellerInfoHome
                                    navigation={this.props.navigation}
                                    list={this.props.route.params.list}
                                    handleVisible={this.props.route.params.handleVisible} />
                            </View>
                            {this.state.sellerItem &&
                                <View style={styles.sellerItms} >
                                    {this.state.sellerItem.map((itm, idx) => <SellerItemEntry key={idx} itm={itm} navigation={this.props.navigation} />)}
                                </View>}
                        </ScrollView >
                    </View>
                </LinearGradient >
                <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']}>
                    <ButtonGroup
                        onPress={this.handleButtonPress}
                        buttons={['ADD TO WISHLIST', 'BUY NOW']}
                        containerStyle={{ borderRadius: 20, backgroundColor: 'whitesmoke' }}
                        innerBorderStyle={{ width: 0.5 }}
                        textStyle={{
                            fontFamily: "sans-serif-light",
                            letterSpacing: 0.5,
                            color: 'slategrey'
                        }}
                    />
                </LinearGradient>
            </>
        )
    }
}

const styles = StyleSheet.create({
    sellerContainer: {
        margin: 10,
        padding: 13
    },
    sellerTitle: {
        fontSize: 20,
        padding: 5,
        marginLeft: 10,
        fontFamily: 'sans-serif',
        color: 'slateblue'
    },
    itmInfoText: {
        padding: 40,
    },
    sellerItms: {
        justifyContent: "space-evenly",
        marginTop: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

})
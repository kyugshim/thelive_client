import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WatchingIndex from './Watching/Index'
import SearchIndex from './Search/Index'
import MypageIndex from './Mypage/Index'
import StreamingIndex from '../Streaming/Index';
import ProductListIndex from './ProductList/Index';
import Axios from 'axios';
import { SERVER } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();
export default class FeedIndex extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSeller: false,
            visible: true,
            userInfo: {},
        }
        this.handleSellerState = this.handleSellerState.bind(this)
        this.handleVisible = this.handleVisible.bind(this)
    }

    componentDidMount() {
        Axios.get(`${SERVER}/userInfo`)
            .then(data => {
                let { is_seller } = data.data
                this.setState({ userInfo: Object.assign(this.state.userInfo, data.data) })
                console.log(this.state)
                if (is_seller) {
                    this.setState({ isSeller: true })
                }
            })
    }

    handleSellerState = (boolean) => {
        this.setState({ isSeller: boolean })
    }

    handleVisible = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        let { isSeller } = this.state
        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, }}>
                <Tab.Navigator
                    tabBarOptions={{
                        labelStyle: {
                            fontSize: isSeller ? 11 : 11.5,
                            letterSpacing: -0.5,
                            textAlignVertical: "center",
                            height: 45
                        },
                        keyboardHidesTabBar: true,
                        style: {
                            height: 50,
                            backgroundColor: "rgb(0,0,0,0)",
                            elevation: 0.8
                        },
                        activeTintColor: 'slateblue',
                        inactiveTintColor: 'slategrey',
                    }}>
                    <Tab.Screen name="FEED" component={WatchingIndex} options={{ tabBarVisible: this.state.visible }} initialParams={{ userInfo: this.state.userInfo, handleVisible: this.handleVisible }} />
                    <Tab.Screen name="PRODUCTS" component={ProductListIndex} options={{ tabBarVisible: this.state.visible }} initialParams={{ handleVisible: this.handleVisible }} />
                    {isSeller && <Tab.Screen name="STREAMING" component={StreamingIndex} options={{ tabBarVisible: this.state.visible }} initialParams={{ userInfo: this.state.userInfo, handleVisible: this.handleVisible }} />}
                    <Tab.Screen name="SEARCH" component={SearchIndex} />
                    <Tab.Screen name="MY PAGE" children={() => <MypageIndex handleSellerState={this.handleSellerState} />} />
                </Tab.Navigator>
            </LinearGradient>
        )
    }
}

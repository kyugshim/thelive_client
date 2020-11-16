import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FollowingListIndex from './FollowingList/Index'
import MyItemListIndex from './MyItemList/Index'
import OrderInfoIndex from './OrderInfo/Index'
import UserInfoEdit from './UserInfoEdit/UserInfoEdit.js'
import WishList from './WishList/WishList.js'
import Mypage from './Mypage'
import SellerOrderList from './SellerOrderList/SellerOrderList'
import Axios from 'axios';
import { SERVER } from '../../config';


const Drawer = createDrawerNavigator();

export default class MypageIndex extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSeller: false
        }
        this.handleSellerState = this.handleSellerState.bind(this)
    }

    componentDidMount() {
        Axios.get(`${SERVER}/userInfo`)
            .then(data => {
                let { is_seller } = data.data
                if (is_seller) {
                    this.setState({ isSeller: true })
                }
            })
    }

    handleSellerState = (boolean) => {
        this.setState({ isSeller: boolean })
        this.props.handleSellerState(boolean)
    }


    render() {
        let { isSeller } = this.state // isSeller를 DB로부터 받아서 MyItempage 접근 권한을 조정했습니다.
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Mypage" component={Mypage} />
                <Drawer.Screen name="UserInfoEdit" children={() => <UserInfoEdit handleSellerState={this.handleSellerState} />} />
                <Drawer.Screen name="OrderInfo" component={OrderInfoIndex} />
                <Drawer.Screen name="FollowingList" component={FollowingListIndex} />
                { isSeller && <Drawer.Screen name="MyItemLIst" component={MyItemListIndex} />}
                <Drawer.Screen name="WishList" component={WishList} />
                { isSeller && <Drawer.Screen name="SellerOrderList" component={SellerOrderList} />}
            </Drawer.Navigator>
        )
    }
}

import React, { Children } from 'react'
import { View, Modal } from 'react-native'
import { Text, Button, Input, Image, ListItem, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class FollowingListEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { followingInfo, navigation } = this.props
        let { email, nickname, liveStatus } = followingInfo
        let { navigate } = navigation
        return (
            <ListItem bottomDivider style={{ width: "100%" }} containerStyle={{ margin: 0 }}>
                <ListItem.Content>
                    <ListItem.Title>{nickname}</ListItem.Title>
                    {liveStatus ? <Text> <Button title='onAir' onPress={() => navigate('Watching')} /> <Button title='Visit' style={{ width: 100 }} onPress={() => navigate('SellerHome')} /> </Text>
                        : <Button title='Visit seller' onPress={() => navigate('SellerHome')} />}
                </ListItem.Content>
            </ListItem>
        )
    }
}

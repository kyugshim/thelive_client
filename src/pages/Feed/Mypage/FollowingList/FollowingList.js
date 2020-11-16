import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FollowingListEntry from '../../../../components/FollwoingListEntry'

export default class FollowingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            followingInfo: [
                { id: "1001", email: "seller1@test.com", nickname: "seller1", liveStatus: false },
                { id: "1002", email: "seller2@test.com", nickname: "seller2", liveStatus: true },
                { id: "1003", email: "seller3@test.com", nickname: "seller3", liveStatus: false },
                { id: "1004", email: "seller4@test.com", nickname: "seller4", liveStatus: false },
                { id: "1005", email: "seller5@test.com", nickname: "seller5", liveStatus: false },
                { id: "1006", email: "seller6@test.com", nickname: "seller6", liveStatus: true },
                { id: "1007", email: "seller7@test.com", nickname: "seller7", liveStatus: false },
                { id: "1008", email: "seller8@test.com", nickname: "seller8", liveStatus: false },
                { id: "1009", email: "seller9@test.com", nickname: "seller9", liveStatus: true },
                { id: "1010", email: "seller10@test.com", nickname: "seller10", liveStatus: false },
            ]
        }
    }

    render() {
        let { followingInfo } = this.state
        let { navigation } = this.props
        return (
            <ScrollView style={{ padding: 30 }}>
                <Text>it's FollowingList Page</Text>
                {followingInfo.map(following => <FollowingListEntry key={following.id} followingInfo={following} navigation={navigation} />)}
            </ScrollView>
        )
    }
}


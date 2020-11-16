import React, { Children } from 'react'
import { View, TextInput, Keyboard, ScrollView } from 'react-native'
import { Input, Text, Button, Image, Icon } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

export default class ChatOutput extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        this.scrollView.scrollToEnd();
    }

    render() {
        return (
            <ScrollView ref={r => this.scrollView = r} contentContainerStyle={{ height: `100%` }} >
                {this.props.messages.map((message, key) =>
                    <View key={key} style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', borderRadius: 15, margin: 5, padding: 5, flexDirection: "row" }}>
                        <Text style={{ fontFamily: "sans-serif-medium", fontSize: 16, marginRight: 10, color: "white" }}>{message[0]}</Text>
                        <Text style={{ fontFamily: "sans-serif-light", marginLeft: 5, fontSize: 15, color: "white" }}>{message[1]}</Text>
                    </View>
                )}
            </ScrollView>
        )
    }
}



import React, { Children } from 'react'
import { View, TextInput, Keyboard, SafeAreaView } from 'react-native'
import { Input, Text, Button, Image, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import ChatOutput from './ChatOutput'

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    handlePressSend = () => {
        this.props.handleSendChat()
        Keyboard.dismiss();
        this.chatInput.clear();
    }

    render() {
        let { handleInputValue, handlePressHeart, messages } = this.props
        return (
            <KeyboardAccessoryView
                alwaysVisible={true}
                androidAdjustResize
                style={{ height: "100%", backgroundColor: "rgba(0, 0, 0, 0)", }}
                hideBorder={true}
            >
                <View style={{ width: "100%", height: 200, }}>
                    <ChatOutput messages={messages} />
                </View>
                <View style={{ width: `${100}%`, flexDirection: "row", alignItems: "center", alignSelf: "baseline" }}>
                    <TextInput
                        ref={r => this.chatInput = r}
                        placeholder="chat"
                        style={{ zIndex: 2, width: `${75}%`, height: `${45}%`, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 25, margin: 15, marginRight: 0, paddingLeft: 13, textAlignVertical: "center", color: "#484848" }}
                        onChangeText={e => handleInputValue(e)}
                    />
                    <TouchableOpacity onPress={this.handlePressSend}>
                        <Icon name="send" color="skyblue" size={28} style={{ marginLeft: 5, marginRight: 7 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressHeart}>
                        <Image source={require('../images/ico_heart.png')} style={{ width: 28, height: 28 }} />
                    </TouchableOpacity>
                </View>
            </KeyboardAccessoryView >
        )
    }
}



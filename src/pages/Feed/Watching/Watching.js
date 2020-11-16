import React from 'react'
import { Dimensions, SafeAreaView, View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { NodePlayerView } from 'react-native-nodemediaclient'
import ChatInput from '../../../components/ChatInput'
import FloatingHearts from '../../../components/floatingHeart/FloatingHearts'
import { SERVER, RTMP_SERVER } from '../../config'
import StreamingItems from '../../../components/StreamingItems'
import SocketManager from '../../../socketManager'
import Axios from 'axios'
import { HeaderBackButton } from '@react-navigation/stack'


export default class Watching extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            chatInput: null,
            count: 0,
            messages: [],
            userInfo: this.props.route.params.userInfo,
            title: this.props.route.params.title,
            streamerId: this.props.route.params.streamerId
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handlePressHeart = this.handlePressHeart.bind(this)
        this.handleSendChat = this.handleSendChat.bind(this)
    }

    componentDidMount() {
        let { title, userInfo } = this.state
        let { nickname } = userInfo
        console.log(this.props)
        this.props.route.params.handleVisible()
        SocketManager.instance.emitJoinRoom({ nickName: nickname, title })
        SocketManager.instance.listenSendChat(this.handleIncomingChat)
        SocketManager.instance.listenSendHeart(this.handleIncomingHeart)
    }

    componentWillUnmount() {
        let { nickName, title } = this.state
        this.NodePlayerView.stop(); // watching 페이지를 나갔음에도 play상태가 유지되는 것을 방지하기 위해, unmount시 player를 멈춥니다.
        this.props.route.params.handleVisible()
        SocketManager.instance.emitLeaveRoom({ nickName, title })
    }

    handleGoback = () => {
        this.props.navigation.goBack();
        this.NodePlayerView.stop();
    }

    handleInputValue = (e) => {
        this.setState({ chatInput: e })
    }

    handlePressHeart = () => {
        SocketManager.instance.emitSendHeart({ title: this.state.title });
    }

    handleSendChat = () => {
        let { chatInput, userInfo, title } = this.state
        let { nickname } = userInfo;
        let message = { nickName: nickname, title: title, message: chatInput }
        SocketManager.instance.emitSendChat(message);
    }

    handleIncomingChat = (message) => {
        let temp = this.state.messages
        temp.push(message)
        this.setState({ messages: temp })
    }

    handleIncomingHeart = () => {
        this.setState({ count: this.state.count + 1 })
    }

    render() {
        let inputUrl = `${RTMP_SERVER}/live/${this.state.streamerId}`
        let deviceHeight = Dimensions.get('window').height
        let deviceWidth = Dimensions.get('window').width
        let { messages, count } = this.state
        let { info } = this.props.route.params
        return (
            <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
                <View style={{ flex: 1 }}>
                    <NodePlayerView
                        style={{ position: 'absolute', top: 0, left: 0, height: deviceHeight, width: deviceWidth }}
                        ref={(vb) => { this.NodePlayerView = vb }}
                        inputUrl={inputUrl}
                        scaleMode={"ScaleAspectFill"}
                        bufferTime={300}
                        maxBufferTime={1000}
                        autoplay
                    />
                    <HeaderBackButton
                        onPress={this.handleGoback}
                        tintColor="slategrey"
                        style={{ padding: 10, }}
                    />
                </View>
                <StreamingItems info={info} navigation={this.props.navigation} />
                <FloatingHearts count={count} />
                <View style={{ zIndex: 1, marginTop: 20 }}>
                    <ChatInput
                        handleInputValue={this.handleInputValue}
                        handleSendChat={this.handleSendChat}
                        handlePressHeart={this.handlePressHeart}
                        messages={messages}
                    />
                </View>
            </SafeAreaView>
        )
    }
}


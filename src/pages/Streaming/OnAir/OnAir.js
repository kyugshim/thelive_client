import React from 'react';
import { View, Dimensions, PermissionsAndroid, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';
import { NodeCameraView } from 'react-native-nodemediaclient';
import ChatInput from '../../../components/ChatInput';
import { RTMP_SERVER } from '../../config'
import FloatingHearts from '../../../components/floatingHeart/FloatingHearts'
import StreamingItems from '../../../components/StreamingItems';
import SocketManager from '../../../socketManager'
import { Socket } from 'socket.io-client';
import { HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class OnAir extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            liveStatus: false,
            messages: [],
            chatInput: null,
            count: 0,
            title: this.props.route.params.title,
            userInfo: this.props.route.params.userInfo,
        }
        this.setCameraRef = this.setCameraRef.bind(this)
        this.handleLiveStatus = this.handleLiveStatus.bind(this)
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleSendChat = this.handleSendChat.bind(this)
        this.handlePressHeart = this.handlePressHeart.bind(this)
    }

    componentDidMount() {
        let { title } = this.state
        let { nickname } = this.state.userInfo

        this.requestCameraPermission();
        this.props.route.params.handleVisible();

        SocketManager.instance.emitJoinRoom({ nickName: nickname, title: title })
        SocketManager.instance.listenSendChat(this.handleIncomingChat)
        SocketManager.instance.listenSendHeart(this.handleIncomingHeart)
    }

    componentWillUnmount() {
        let { title } = this.state
        let { nickname } = this.state.userInfo
        this.props.route.params.handleVisible();
        this.nodeCameraViewRef.stop()
        SocketManager.instance.emitLeaveRoom({ nickName: nickname, title })
    }

    handleLiveStatus = () => {
        if (!this.state.liveStatus) {
            this.nodeCameraViewRef.start()
            this.setState({ liveStatus: true })
        } else {
            this.nodeCameraViewRef.stop()
            this.setState({ liveStatus: false })
        }
        this.setState({ liveStatus: !this.state.liveStatus })
    }

    handleInputValue = (e) => {
        this.setState({ chatInput: e })
    }

    handlePressHeart = () => {
        SocketManager.instance.emitSendHeart({ title: this.state.title });
    }

    handleSendChat = () => {
        let { chatInput, title } = this.state
        let { nickname } = this.state.userInfo
        let message = { nickName: nickname, title: title, message: chatInput }
        SocketManager.instance.emitSendChat(message);
    }

    handleIncomingChat = (message) => {
        let temp = this.state.messages
        temp.push(message)
        this.setState({ messages: temp })
        console.log(this.state.messages)
    }

    handleIncomingHeart = () => {
        this.setState({ count: this.state.count + 1 })
    }

    handleGoback = () => {
        if (this.state.liveStatus) {
            alert("방송중에는 뒤로 갈 수 없습니다.")
        } else {
            this.props.navigation.goBack();
        }
    }

    handleSwitchCamera = () => {
        this.nodeCameraViewRef.switchCamera();
    }
    handleGoback = () => {
        this.props.navigation.goBack();
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO], {
                title: '카메라 권한 허용',
                message: '스트리밍을 위해서는 카메라 권한이 필요합니다.',
                buttonNeutral: 'Ask me Later',
                buttonNegative: 'cancle',
                buttonPositive: 'OK'
            }
            );
            let cameraPermission = granted['android.permission.CAMERA']
            let auidoPermission = granted['android.permission.RECORD_AUDIO']
            if (cameraPermission === 'granted' && auidoPermission === 'granted') {
                console.log("You can use the camera&audio");
                this.nodeCameraViewRef.startPreview();
            } else {
                console.log("Permisson denied")
            }
        } catch (err) {
            console.warn(err);
        }
    };

    setCameraRef = (ref) => {
        this.nodeCameraViewRef = ref;
    };

    render() {
        let { liveStatus, count, messages, userInfo } = this.state
        let deviceHeight = Dimensions.get('window').height - StatusBar.currentHeight
        let deviceWidth = Dimensions.get('window').width

        let outputURL = `${RTMP_SERVER}/live/${userInfo.id}` // 영상을 전송받을 URL을 정의

        return (
            <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
                <View style={{ flex: 1 }}>
                    <NodeCameraView
                        style={{ position: 'absolute', top: 0, left: 0, height: deviceHeight, width: deviceWidth }}
                        ref={this.setCameraRef}
                        outputUrl={outputURL} // URL이 확정되면 해당 URL로 영상을 전송
                        camera={{ cameraId: 1, cameraFrontMirror: false }}
                        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                        video={{ preset: 1, bitrate: 400000, profile: 0, fps: 30, videoFrontMirror: false }}
                        autopreview={true}
                    />
                    <View style={{ marginBottom: -10, flexDirection: "row", }}>
                        <HeaderBackButton
                            onPress={this.handleGoback}
                            tintColor="slategrey"
                            style={{ padding: 10, }}
                        />
                        <View style={{ paddingLeft: "45%", paddingTop: "3%", flexDirection: "row", }}>
                            <Icon.Button
                                name="camera"
                                onPress={this.handleSwitchCamera}
                                borderRadius={15}
                                size={30}
                                // style={{ justifyContent: "center", backgroundColor: 'slateblue', width: 60, height: 35, alignSelf: "center" }}
                                backgroundColor={`rgba(0, 0, 0, 0)`}
                            >
                                {/* <Text style={{ color: "white", fontFamily: "sans-serif-thin", fontSize: 13 }}>카메라 전환</Text> */}
                            </Icon.Button>
                            <Icon.Button
                                onPress={this.handleLiveStatus}
                                name={liveStatus ? 'stop' : 'play'}
                                borderRadius={15}
                                size={30}
                                // style={{ justifyContent: "center", backgroundColor: 'slateblue', width: 30, height: 35, alignSelf: "center" }}
                                backgroundColor={`rgba(0, 0, 0, 0)`}
                            >
                                {/* <Text style={{ color: "white", fontFamily: "sans-serif-thin", fontSize: 13 }}>{liveStatus ? '방송 종료' : '방송 시작'}</Text> */}
                            </Icon.Button>
                        </View>
                    </View>
                </View>
                <FloatingHearts count={count} />
                <View style={{ zIndex: 1, height: 300 }} >
                    <ChatInput
                        handleInputValue={this.handleInputValue}
                        handleSendChat={this.handleSendChat}
                        handlePressHeart={this.handlePressHeart}
                        messages={messages}
                    />
                </View>
            </SafeAreaView >
        )
    }
}


import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { Text, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Postcode from 'react-native-daum-postcode'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'
import { SERVER } from '../pages/config'
import { BoxShadow } from 'react-native-shadow'

export default class UserInfoEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOn: false,
            userInfo: null,
        }
    }

    componentDidMount() {
        axios.get(`${SERVER}/userInfo`).then(res => this.setState({ userInfo: res.data }))
    }

    handleSelectAddress = (data) => {
        this.props.handleFormValues('address', data.address)
        this.setState({
            isModalOn: false
        })
    }

    handleChoosePhoto = () => {
        ImagePicker.openPicker({ multiple: false })
            .then((image) => { this.props.handleFormValues('photo', image) })
    }

    render() {
        let { handleFormValues, newUserinfo } = this.props
        let { isModalOn, userInfo } = this.state
        console.log(this.props)
        return (
            <View style={styles.InputContainer}>
                <View>
                    <Text style={styles.headerTitle}>내정보 설정</Text>
                    <Text style={styles.title} >비밀번호 변경</Text>
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.Input}
                        placeholder="현재 비밀번호"
                        onChangeText={val => handleFormValues('oldPassword', val)}
                        leftIcon={<Icon name="unlock-alt" type="font-awesome" size={22}
                            style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />}
                        secureTextEntry={true}
                    />
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.Input}
                        placeholder="새로운 비밀번호"
                        onChangeText={val => handleFormValues('newPassword', val)}
                        leftIcon={<Icon name="unlock-alt" type="font-awesome" size={22}
                            style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />}
                        secureTextEntry={true} />
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.Input}
                        placeholder="비밀번호 입력확인"
                        onChangeText={val => handleFormValues('passwordCheck', val)}
                        leftIcon={<Icon name="unlock-alt" type="font-awesome" size={22}
                            style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />}
                        secureTextEntry={true} />

                    <Text style={styles.title}>현재 닉네임 : {userInfo ? userInfo.nickname : ""}</Text>
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.Input}
                        placeholder="NEW NICKNAME"
                        onChangeText={val => handleFormValues('nickname', val)}
                        leftIcon={<Icon name="user" type="font-awesome" size={22}
                            style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />} />
                    <View style={{ alignItems: "center" }}>
                        <BoxShadow setting={shadowOpt} >
                            <Icon.Button name="map"
                                iconStyle={{ color: "slategrey" }}
                                borderRadius={15}
                                style={styles.loginButton}
                                onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}>
                                <Text style={styles.buttonText}>SEARCH ADDRESS</Text>
                            </Icon.Button>
                        </BoxShadow>
                    </View>
                    <View style={{ padding: 10, marginTop: 7 }}>

                        {this.props.newUserinfo.address &&
                            <>
                                <View style={{
                                    padding: 10,
                                    flex: 1,
                                }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", letterSpacing: -0.5, color: "slateblue", fontFamily: "sans-serif" }} >선택한 주소 </Text>
                                    <Text style={{ fontSize: 14, letterSpacing: -0.5 }}>{newUserinfo.address}</Text>
                                </View>
                                <Input
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    style={styles.Input}
                                    placeholder="상세 주소"
                                    onChangeText={val => handleFormValues('addressDetail', val)}
                                    leftIcon={<Icon name="home" type="font-awesome" size={22}
                                        style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey", fontFamily: "sans-serif-light" }} />}
                                />
                            </>}

                    </View>

                    <Modal visible={isModalOn}>
                        <Postcode style={{ flex: 1 }} jsOptions={{ animated: true }} onSelected={this.handleSelectAddress} ></Postcode>
                        <Icon.Button name="close"
                            iconStyle={{ color: "grey" }}
                            style={{
                                backgroundColor: "white",
                                alignSelf: "center",
                                justifyContent: "center",
                                width: "100%"
                            }}
                            onPress={() => this.setState({ isModalOn: !this.state.isModalOn })}>
                            <Text style={styles.buttonText}>CLOSE</Text>
                        </Icon.Button>
                    </Modal>
                    <Text style={styles.title}>새로 사용할 프로필 사진</Text>
                    {newUserinfo.photo && <View style={{ alignItems: 'center', padding: 20 }}>
                        <Image source={{ uri: newUserinfo.photo.path }} style={{ width: 150, height: 150 }} />
                    </View>}
                    <View style={{ alignItems: "center", }}>
                        <BoxShadow setting={shadowOpt} >
                            <Icon.Button name="camera"
                                iconStyle={{ color: "slategrey" }}
                                borderRadius={15}
                                style={styles.loginButton}
                                onPress={this.handleChoosePhoto}>
                                <Text style={styles.buttonText}>CHOOSE PHOTO</Text>
                            </Icon.Button>
                        </BoxShadow>
                    </View>
                </View>
            </View>
        )
    }
}


const shadowOpt = {
    width: 185,
    height: 25,
    color: "#808080",
    border: 5,
    radius: 10,
    opacity: 0.3,
    x: 0,
    y: 13,
    style: {
        marginVertical: 11,
        alignContent: "center"
    }
}
const styles = StyleSheet.create({
    headerTitle: {
        color: "slateblue",
        textAlign: "center",
        letterSpacing: -0.5,
        fontSize: 22,
        paddingBottom: 25,
        fontFamily: "sans-serif-light",
    },
    title: {
        padding: 5,
        color: "slateblue",
        letterSpacing: -0.5,
        fontSize: 17,
        fontFamily: "sans-serif",
    },
    InputContainer: {
        marginTop: 35,
        width: 300,
    },
    Input: {
        paddingLeft: 10,
        height: 10,
        width: 150,
        paddingHorizontal: 5,
        borderRadius: 20,
        fontSize: 15,
        letterSpacing: -0.5,
        fontFamily: "sans-serif-light",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    loginButton: {
        justifyContent: "center",
        backgroundColor: "white",
        width: 185,
        height: 35,
    },
    address: {
        padding: 5,
        fontSize: 13,
        color: "slategrey",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
    },
    buttonText: {
        color: "slategrey",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
    }
})
import axios from 'axios'
import React from 'react'
import { View, Modal, TouchableWithoutFeedbackBase, Alert, StyleSheet } from 'react-native'
import { Text, Button, Input, ButtonGroup } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { BoxShadow } from 'react-native-shadow'
import UserInfoEditForm from '../../../../components/UserInfoEditForm'
import { SERVER } from '../../../config'
import Icon from 'react-native-vector-icons/FontAwesome'
import { BankPicker } from '../../../../components/BankPicker'



export default class UserInfoEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfoEditForm: {
                oldPassword: null,
                newPassword: null,
                nickname: null,
                address: null,
                addressDetail: null,
                photo: null
            },
            passwordCheck: null,
            isModalOpen: false,
            isSeller: false,
            sellerBank: null,
            sellerAccount: null,
            bankList: ["은행 선택", "KB국민", "NH농협", "신한", "우리", "하나", "카카오뱅크", "IBK기업", "SC제일", "씨티", "KDB산업", "SBI저축은행", "새마을", "대구", "광주", "우체국", "신협", "전북"]

        }
        this.handleFormValues = this.handleFormValues.bind(this)
    }

    handleFormValues = (name, val) => {
        let { userInfoEditForm } = this.state
        if (name === "passwordCheck") {
            this.setState({ passwordCheck: val })
        } else {
            this.setState({ userInfoEditForm: Object.assign(userInfoEditForm, { [name]: val }) })
        }
    }

    handleFormSeller = (name, val) => {
        this.setState({ [name]: val })
    }

    handleSubmit = () => {
        let { userInfoEditForm, passwordCheck } = this.state
        let { newPassword } = userInfoEditForm

        if (passwordCheck === newPassword) {
            // axios.post(`${SERVER}/signedit`, userInfoEditForm)
            alert('수정이 완료되었습니다.')
        } else {
            alert('새 비밀번호를 다시 확인해주세요.')
        }
    }

    componentDidMount = () => {
        axios.get(`${SERVER}/userInfo`)
            .then(data => {
                let { is_seller } = data.data

                if (is_seller) {
                    this.setState({ isSeller: true })
                }
            })
    }

    handlePressButton = (index) => {
        let { sellerAccount, sellerBank } = this.state

        switch (index) {
            case 0: {
                if (sellerBank && sellerAccount) {
                    console.log('send this data', { sellerBank, sellerAccount })
                    axios.post(`${SERVER}/addseller`, { sellerBank, sellerAccount })
                        .then(data => {
                            if (data.status === 200) {
                                alert('성공적으로 판매자 등록을 마쳤습니다.')
                                axios.get(`${SERVER}/userInfo`)
                                    .then(data => {
                                        this.setState({ isSeller: data.data.is_seller })
                                        this.props.handleSellerState(data.data.is_seller)
                                    })
                            } else {
                                alert('등록 중 에러가 발생했습니다.')
                            }
                        })
                    this.setState({ isModalOpen: false })
                    break;
                } else {
                    alert("please fill all inputs")
                    break;
                }
            }
            case 1: {
                this.setState({ sellerAccount: null, sellerBank: null, isModalOpen: false })
                break;
            }
        }
    }

    HandleRegistSeller = () => {
        if (this.state.isSeller) {
            Alert.alert(
                'Registration Cancellation',
                '판매자 권한을 해제하면 판매자로서의 정보가 모두 지워집니다. 그래도 진행하시겠습니까?',
                [{
                    text: "OK", onPress: () => {
                        axios.post(`${SERVER}/addseller`, { sellerBank: null, sellerAccount: null })
                            .then(data => {
                                if (data.status < 300) {
                                    axios.get(`${SERVER}/userInfo`)
                                        .then(data => {
                                            this.setState({ isSeller: data.data.is_seller })
                                            this.props.handleSellerState(data.data.is_seller)
                                        })
                                    alert("판매자 권한이 해제되었습니다.")
                                }
                                else {
                                    alert("에러가 발생했습니다. 다시 시도해주세요")
                                }
                            })
                    }
                }, { text: "Cancel", onPress: () => this.setState({ isModalOpen: false }) }]
            )
        } else {
            this.setState({ isModalOpen: true })
        }
    }

    render() {
        let { isSeller } = this.state

        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={styles.body} >
                <ScrollView style={{ flex: 1, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                    <UserInfoEditForm handleFormValues={this.handleFormValues} newUserinfo={this.state.userInfoEditForm} />
                    <View style={{ alignItems: "center", margin: 10 }}>
                        <BoxShadow setting={shadowOpt} >
                            <Icon.Button name="check"
                                iconStyle={{ color: "slateblue" }}
                                borderRadius={15}
                                style={styles.loginButton}
                                onPress={this.handleSubmit}>
                                <Text style={styles.buttonText}>변경하기</Text>
                            </Icon.Button>
                        </BoxShadow>
                        <BoxShadow setting={shadowOpt} >
                            <Icon.Button name={isSeller ? "user-times" : "user-plus"}
                                iconStyle={{ color: "slateblue" }}
                                borderRadius={15}
                                style={styles.loginButton}
                                onPress={this.HandleRegistSeller}>
                                <Text style={styles.buttonText}>{isSeller ? "판매자 그만두기" : "판매자로 등록하기"}</Text>
                            </Icon.Button>
                        </BoxShadow>
                    </View>

                    {this.state.isModalOpen && <Modal transparent={true} style={{ flex: 1 }} >
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 300, height: 250, backgroundColor: `white`, borderRadius: 15, padding: 20 }}>
                                <Text style={styles.title}>Regist Seller</Text>
                                <BankPicker handleFormSeller={this.handleFormSeller} bankList={this.state.bankList} sellerBank={this.state.sellerBank} />
                                <View style={styles.InputContainer}>
                                    <Input
                                        style={styles.Input}
                                        placeholder="계좌번호"
                                        onChangeText={val => this.handleFormSeller('sellerAccount', val)}
                                        leftIcon={<Icon name="bank" type="font-awesome" size={18}
                                            style={{ paddingLeft: 8, paddingRight: 5, color: "slategrey" }} />}
                                    />
                                </View>
                                <ButtonGroup
                                    containerStyle={{ borderRadius: 20, backgroundColor: 'whitesmoke', height: 35 }}
                                    onPress={this.handlePressButton} buttons={[`DONE`, `CANCEL`]}
                                    innerBorderStyle={{ width: 0.5 }}
                                    textStyle={{
                                        fontFamily: "sans-serif-light",
                                        letterSpacing: 0.5,
                                        color: 'slategrey'
                                    }} />
                            </View>
                        </View>
                    </Modal>}
                </ScrollView>
            </LinearGradient >
        )
    }
}
const shadowOpt = {
    width: 200,
    height: 25,
    color: "#808080",
    border: 5,
    radius: 10,
    opacity: 0.3,
    x: 0,
    y: 13,
    style: {
        marginVertical: 10,
        alignContent: "center"
    }
}
const styles = StyleSheet.create({

    body: {
        padding: 20,
        paddingBottom: -20,
        flex: 1,
        alignItems: 'center',
    },
    title: {
        padding: 5,
        color: "slateblue",
        letterSpacing: -0.5,
        fontSize: 17,
        fontFamily: "sans-serif",
    },
    InputContainer: {
        marginBottom: 5,
    },
    Input: {
        fontSize: 13,
        letterSpacing: -0.5,
        fontFamily: "sans-serif-light",
    },
    loginButton: {
        justifyContent: "center",
        backgroundColor: "white",
        width: 200,
        height: 35,
    },
    buttonText: {
        color: "slateblue",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
    }
})
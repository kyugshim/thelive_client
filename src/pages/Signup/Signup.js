import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'
import axios from 'axios'
import SignupForm from '../../components/SignupForm'
import { SERVER } from '../config'
import LinearGradient from 'react-native-linear-gradient'
import { BoxShadow } from 'react-native-shadow'
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios'


export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signupForm: {
                email: null,
                password: null,
                fullname: null,
                nickname: null,
                address: null,
                addressDetail: null,
                profileImage: null,
                phone: null,
            },
            passwordCheck: null,
            isModalOn: false
        }
        this.handleFormValues = this.handleFormValues.bind(this)
    }

    handleFormValues = (name, val) => {
        let { signupForm } = this.state
        if (name === "passwordCheck") {
            this.setState({ passwordCheck: val })
        } else {
            this.setState({ signupForm: Object.assign(signupForm, { [name]: val }) })
        }
    }

    handleSignup = () => {
        let { passwordCheck, signupForm } = this.state
        let emptyInput = false

        for (let key in this.state.signupForm) {
            if (!signupForm[key]) {
                emptyInput = true
            }
        }

        if (emptyInput) {
            alert('Please fill in all the fields')
        } else {
            if (signupForm.password === passwordCheck) {
                return axios.post(`${SERVER}/signup`, signupForm)
                    .then(res => {
                        if (res.status === 201) {
                            console.log(`i'm here`, res.data.id)
                            let profileImage = new FormData();
                            let avatar = this.state.signupForm.profileImage
                            profileImage.append('avatar', {
                                name: avatar.path.split("/")[avatar.path.split("/").length - 1],
                                uri: avatar.path,
                                type: avatar.mime
                            })
                            profileImage.append('id', res.data.id)
                            console.log(profileImage)

                            Axios.post(`${SERVER}/profile`, profileImage, { headers: { "Content-Type": "multipart/form-data" } })
                                .then(res => { console.log(res); this.props.navigation.navigate('Signin') })
                                .catch(err => console.log(err))
                        } else {
                            alert('An error occurs, please try again')
                        }
                    })
            } else {
                alert('Please check your password')
            }
        }
    }

    render() {
        let { signupForm } = this.state

        return (
            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={styles.body} >
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <Text style={styles.headerTitle} >THE LIVE</Text>
                    <SignupForm handleFormValues={this.handleFormValues} address={signupForm.address} photo={signupForm.profileImage} />
                    <BoxShadow setting={shadowOpt} >
                        <Icon.Button borderRadius={15} name="check" iconStyle={{ color: "slateblue" }} style={styles.loginButton} onPress={this.handleSignup} >
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </Icon.Button>
                    </BoxShadow>
                </ScrollView>
            </LinearGradient>

        )
    }
}




const shadowOpt = {
    width: 185,
    height: 35,
    color: "#708090",
    border: 8,
    radius: 10,
    opacity: 0.25,
    x: 0,
    y: 3,
    style: {
        marginVertical: 11,
        alignSelf: "center"
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 25,
        padding: 28,
        fontFamily: "sans-serif-light",
    },
    body: {
        padding: 20,
        paddingBottom: -20,
        flex: 1,
        alignItems: 'center',
    },
    InputContainer: {
        marginTop: 35,
        marginBottom: 30,
        width: 300,
    },
    Input: {
        fontSize: 15,
        letterSpacing: -0.5,
        fontFamily: "sans-serif-light",
    },
    loginButton: {
        justifyContent: "center",
        backgroundColor: "white",
        width: 185,
        height: 35,
    },
    buttonText: {
        color: "slateblue",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
    }
})
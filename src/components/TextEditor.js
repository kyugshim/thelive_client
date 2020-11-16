import React from 'react'
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import ImagePicker from 'react-native-image-crop-picker'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import { BoxShadow } from 'react-native-shadow'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: null,
        }
    }

    handleChoosePhoto = () => {
        ImagePicker.openPicker({ multiple: true })
            .then((images) => {
                images.map(image => this.editor.insertImage(image.path))
            })
    }

    componentDidMount = () => {
        this.setState({ body: this.props.route.params.itemInfo.body })
    }

    render() {
        let { body } = this.state
        let { handleValue } = this.props.route.params
        return (
            <View style={{ flex: 1 }}>
                <RichEditor
                    style={{ flex: 1, paddingTop: 20 }}
                    ref={(r) => this.editor = r}
                    placeholder="간단한 상품 설명을 적어주세요"
                    initialContentHTML={body}
                    onChange={e => this.setState({ body: e })}
                />
                <KeyboardAccessoryView alwaysVisible={true} androidAdjustResize={true}>
                    <View style={{ alignItems: "center", padding: 8, backgroundColor: "whitesmoke" }}>
                        <RichToolbar
                            style={{ backgroundColor: "whitesmoke" }}
                            getEditor={() => this.editor}
                            onPressAddImage={this.handleChoosePhoto} />
                        <Icon.Button
                            iconStyle={{ color: "slateblue" }}
                            style={styles.loginButton}
                            borderRadius={0}
                            name="check"
                            onPress={() => {
                                handleValue("body", '<div>' + body + '</div>');
                                this.props.navigation.goBack();
                            }}>
                            <Text style={styles.buttonText}>CONFIRM</Text>
                        </Icon.Button>
                    </View>
                </KeyboardAccessoryView>
            </View>
        )
    }
}
const shadowOpt = {
    width: 200,
    height: 38,
    color: "#708090",
    border: 5,
    radius: 15,
    opacity: 0.17,
    x: 0,
    y: 0.5,
    style: {
        margin: 20,
    }
}

const styles = StyleSheet.create({
    loginButton: {
        justifyContent: "center",
        backgroundColor: "whitesmoke"
    },
    buttonText: {
        color: "slateblue",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
    }
})
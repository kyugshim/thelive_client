import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack'
import Axios from 'axios'
import React from 'react'
import { Image, View, Alert, NativeModules, StyleSheet } from 'react-native'
import { Text, Button, Input, Card } from 'react-native-elements'
import { ScrollView, TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler'
// import ImageCropPicker from 'react-native-image-crop-picker'
// import ImagePicker from 'react-native-image-crop-picker'
import HTML from 'react-native-render-html'
import { SERVER } from '../../../../config'
import Icon from 'react-native-vector-icons/FontAwesome'
import { BoxShadow } from 'react-native-shadow'


const ImagePicker = NativeModules.ImageCropPicker

export default class AddItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addTag: null,
            itemInfo: {
                title: null,
                body: null,
                price: null,
                quantity: null,
                tags: [],
                images: []
            }
        }

        this.handleEditorOpen = this.handleEditorOpen.bind(this)
        this.handleDeletePhoto = this.handleDeletePhoto.bind(this)
    }

    componentDidMount = () => {
        console.log(this.navigation)
    }

    handleChoosePhoto = () => {
        let temp = this.state.itemInfo.images
        if (temp.length >= 5) {
            alert("최대 5장까지만 업로드가 가능합니다")
        } else {
            ImagePicker.openPicker({ multiple: true })
                .then((images) => {
                    console.log(images)
                    if (images.length > (5 - temp)) {
                        alert(`선택한 사진이 5장을 초과합니다. 선택한 사진 중 ${5 - temp}장만 추가됩니다`)
                        let cutImages = images.slice(0, 5 - temp)
                        cutImages.map(image => temp.push(image))
                    } else {
                        images.map(image => temp.push(image))
                    }
                    this.setState({ itemInfo: Object.assign(this.state.itemInfo, { images: temp }) })
                })
        }
    }

    handleDeletePhoto = (index) => {
        let temp = this.state.itemInfo.images
        return new Promise((res, rej) =>
            res(Alert.alert("이미지 삭제", "선택한 이미지를 삭제하시겠습니까?", [{
                text: "OK", onPress: () => {
                    let deleted = temp.slice(0, index).concat(temp.slice(index + 1, temp.length))
                    this.setState({ itemInfo: Object.assign(this.state.itemInfo, { images: deleted }) })
                }
            }, { text: "Cancle", onPress: () => false }]))
        )
    }

    handleEditorOpen = () => {
        this.props.navigation.navigate('TextEditor', { handleValue: this.handleValue, itemInfo: this.state.itemInfo })
    }

    handleValue = (name, value) => {
        this.setState({
            itemInfo: Object.assign(this.state.itemInfo, { [name]: value })
        })
    }

    handleAddTag = () => {
        let temp = this.state.itemInfo.tags
        if (temp.length >= 3) {
            alert('태그는 3개까지 추가할 수 있습니다.')
            this.addTagInput.clear();
        }
        else if (!this.state.addTag) {
            alert('내용을 입력해주세요.')
        }
        else {
            temp.push(this.state.addTag)
            this.setState({ itemInfo: Object.assign(this.state.itemInfo, { tags: temp }) })
            this.setState({ addTag: null })
            this.addTagInput.clear();
        }
    }

    handleDeleteTag = (index) => {
        let temp = this.state.itemInfo.tags
        return new Promise((res, rej) =>
            res(Alert.alert("태그 삭제", "선택한 태그를 삭제하시겠습니까?", [{
                text: "OK", onPress: () => {
                    let deleted = temp.slice(0, index).concat(temp.slice(index + 1, temp.length))
                    this.setState({ itemInfo: Object.assign(this.state.itemInfo, { tags: deleted }) })
                }
            }, { text: "Cancel", onPress: () => false }]))
        )
    }

    handleConfirm = () => {
        let { images } = this.state.itemInfo
        let imageFiles = new FormData();

        images.map(image => {
            imageFiles.append('products', {
                name: image.path.split("/")[image.path.split("/").length - 1],
                uri: image.path,
                type: image.mime
            })
        })

        console.log('Formdata', imageFiles);
        Axios.post(`${SERVER}/additem`, this.state.itemInfo)
            .then(data => {
                console.log(data.data)
                imageFiles.append('productId', data.data.id)
                Axios({
                    method: "POST",
                    url: `${SERVER}/products`,
                    data: imageFiles,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(uploadedImage => {
                        this.props.route.params.refreshList();
                        this.props.navigation.goBack();
                        console.log('addedItem', data, 'uploadImage', uploadedImage)
                    })
            })

    }

    render() {
        let { itemInfo } = this.state
        return (
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                <HeaderBackButton onPress={() => {
                    this.props.navigation.goBack();
                }}
                    tintColor="slategrey"
                    style={{ padding: 5, marginTop: 10 }} />
                <View style={{ padding: 5 }}>
                    <ScrollView horizontal style={{ Direction: "row" }}>
                        {itemInfo.images &&
                            itemInfo.images.map((photo, index) =>
                                <TouchableOpacity onPress={() => this.handleDeletePhoto(index)}>
                                    <Image key={index} source={{ uri: photo.path }} style={{ width: 100, height: 100, margin: 10, borderRadius: 10 }} />
                                </TouchableOpacity>)}
                    </ScrollView>
                </View>
                <View style={{ alignItems: "center", marginBottom: 5 }}>
                    <BoxShadow setting={shadowOpt}>
                        <Icon.Button onPress={this.handleChoosePhoto}
                            iconStyle={{ color: "slateblue" }}
                            borderRadius={15}
                            style={styles.loginButton}
                            name="camera">
                            <Text style={styles.buttonText}>SELECT PHOTO</Text>
                        </Icon.Button>
                    </BoxShadow>
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.Input}
                        placeholderTextColor="slategrey"
                        placeholder='TITLE' onChangeText={(e) => this.handleValue('title', e)} />
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.Input}
                        placeholderTextColor="slategrey"
                        placeholder='PRICE' onChangeText={(e) => this.handleValue('price', e)} />
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.Input}
                        placeholderTextColor="slategrey"
                        placeholder='QUANTITY' onChangeText={(e) => this.handleValue('quantity', e)} />
                    <Input
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        style={styles.Input}
                        placeholderTextColor="slategrey"
                        placeholder='TAG' onChangeText={(e) => this.setState({ addTag: e })} ref={ref => this.addTagInput = ref} />
                    <BoxShadow setting={shadowOpt}>
                        <Icon.Button
                            iconStyle={{ color: "slateblue" }}
                            borderRadius={15}
                            style={styles.loginButton}
                            name="tag"
                            onPress={this.handleAddTag}>
                            <Text style={styles.buttonText}>ADD TAG</Text>
                        </Icon.Button>
                    </BoxShadow>

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
                    {this.state.itemInfo.tags.length > 0 && this.state.itemInfo.tags.map((tag, index) =>
                        <TouchableOpacity onPress={() => this.handleDeleteTag(index)} key={index}>
                            <Card containerStyle={{ padding: 10, margin: 10 }}>
                                <Text>{tag}</Text>
                            </Card>
                        </TouchableOpacity>)}
                </View>
                <View>

                    <TouchableOpacity onPress={this.handleEditorOpen}>
                        <ScrollView style={{ width: "100%", height: 200, backgroundColor: "white", borderRadius: 20, padding: 10 }}>
                            {this.state.itemInfo.body ? <HTML
                                tagsStyles={{
                                    div: {
                                        padding: 6,
                                        fontFamily: 'sans-serif-thin',
                                        textAlign: 'left',
                                        letterSpacing: -0.25
                                    }
                                }}
                                html={itemInfo.body} onPress={this.handleEditorOpen}></HTML> :
                                <Text style={{
                                    textAlign: "left",
                                    padding: 6,
                                    color: "slategrey",
                                    letterSpacing: -0.5,
                                    fontFamily: "sans-serif",
                                }} >CLICK FOR ADD DESCRIPTION</Text>}
                        </ScrollView>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center", margin: 10 }}>
                    <BoxShadow setting={shadowOpt}>
                        <Icon.Button
                            iconStyle={{ color: "slateblue" }}
                            borderRadius={15}
                            style={styles.loginButton}
                            name="check"
                            onPress={this.handleConfirm}>
                            <Text style={styles.buttonText}>CONFIRM</Text>
                        </Icon.Button>
                    </BoxShadow>
                </View>
            </ScrollView>
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

    body: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        alignContent: 'center',
    },
    headerTitle: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 25,
        padding: 28,
        paddingBottom: -10,
        fontFamily: "sans-serif-light",
    },
    title: {
        padding: 5,
        color: "slateblue",
        letterSpacing: -0.5,
        fontSize: 17,
        fontFamily: "sans-serif",
    },

    Input: {
        paddingLeft: 10,
        height: 10,
        width: 150,
        paddingHorizontal: 5,
        borderRadius: 20,
        fontSize: 13,
        letterSpacing: -0.5,
        fontFamily: "sans-serif-light",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
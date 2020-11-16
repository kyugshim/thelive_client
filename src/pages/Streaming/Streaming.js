import Axios from 'axios'
import React from 'react'
import { View, NativeModules, Modal, StyleSheet } from 'react-native'
import { Text, Button, Input, Image } from 'react-native-elements'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import MyItemListEntry from '../../components/MyItemListEntry'
import SocketManager from '../../socketManager'
import { SERVER } from '../config'
import LinearGradient from 'react-native-linear-gradient'
import SelectProductForStreaming from '../../components/SelectProductForStreaming'
import { CustomHeader } from '../../components/CustomHeader'
import { BoxShadow } from 'react-native-shadow'
import Icon from 'react-native-vector-icons/FontAwesome'


const ImagePicker = NativeModules.ImageCropPicker

export default class StreamingReady extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            body: null,
            status: 'PREPARE',
            product: null,
            broadcastId: null,
            thumbnail: null,
            myItems: null,
            isModalOpen: false
        }
        this.handleSelectProduct = this.handleSelectProduct.bind(this)
        this.handleModal = this.handleModal.bind(this)
    }

    componentDidMount = () => {
        this.handleRefreshList();
    }

    handleRefreshList = () => {
        Axios.get(`${SERVER}/myitem`).then(data => this.setState({ myItems: data.data }))
    }

    handleAddThumbnail = () => {
        ImagePicker.openPicker({ multiple: false })
            .then((image) => this.setState({ thumbnail: image }))
    }

    handleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
        this.handleRefreshList();
    }

    handleSelectProduct = (data) => {
        this.setState({ product: data })
    }

    handlePressOnAir = () => {
        console.log('send this', this.state)

        let { title, body, thumbnail } = this.state

        let image = new FormData();
        SocketManager.instance.emitPrepareLiveStream({ title: title, body: body });

        image.append('thumbnail', {
            name: thumbnail.path.split("/")[thumbnail.path.split("/").length - 1],
            type: thumbnail.mime,
            uri: thumbnail.path
        })

        Axios.post(`${SERVER}/addThumbnail`, image, { headers: { "Content-Type": "multipart/form-data" } })
        Axios.post(`${SERVER}/addLiveProduct`, { title: title, productId: this.state.product.id })

        this.props.navigation.navigate('OnAir', { handleVisible: this.props.route.params.handleVisible, userInfo: this.props.route.params.userInfo, title: title });
    }

    handleStatus = (name, val) => {
        this.setState({ [name]: val })
    }

    render() {
        return (
            <>
                <CustomHeader navigation={this.props.navigation} />
                <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, }}>
                    <ScrollView style={{ height: `${100}%`, width: `${80}%`, alignSelf: "center" }} showsVerticalScrollIndicator={false}>
                        <View style={styles.body}>
                            <Text style={styles.headerTitle}>STREAMING READY</Text>
                            <View style={{ alignItems: "center", marginBottom: 5 }}>
                                {this.state.thumbnail ? <Image source={{ uri: this.state.thumbnail.path }} style={{ width: 180, height: 270, borderRadius: 5 }} />
                                    : <View style={{ width: 180, height: 270, backgroundColor: "lightgrey", justifyContent: "center", borderRadius: 5 }}>
                                        <Text style={styles.buttonText}>PREVIEW</Text>
                                    </View>}
                            </View>
                            <View style={{ alignItems: "center", }}>
                                <BoxShadow setting={shadowOpt}>
                                    <Icon.Button name="picture-o" borderRadius={17} size={17} iconStyle={{ color: "slateblue" }}
                                        style={styles.loginButton} onPress={this.handleAddThumbnail}>
                                        <Text style={styles.buttonText}>SELECT THUMBNAIL</Text>
                                    </Icon.Button>
                                </BoxShadow>
                            </View>
                            <Input
                                inputContainerStyle={{ width: 240, height: 30, alignSelf: "center" }}
                                style={styles.Input}
                                placeholder="TITLE"
                                placeholderTextColor="slateblue"
                                onChangeText={e => this.handleStatus('title', e)} />

                            <TextInput
                                style={{
                                    textAlignVertical: "top",
                                    width: `${100}%`,
                                    paddingHorizontal: 20,
                                    borderRadius: 20,
                                    fontSize: 14,
                                    letterSpacing: -0.5,
                                    fontFamily: "sans-serif-light"
                                }}
                                multiline={true} placeholder="DESCRIPTION"
                                placeholderTextColor="slategrey" onChangeText={e => this.handleStatus('body', e)} />

                            {this.state.product &&
                                <View style={{
                                    width: `${95}%`, alignSelf: "center", flexDirection: "row", marginBottom: `${3}%`, padding: 5, margin: 5, marginBottom: 10,
                                    paddingLeft: 20, borderRadius: 20, backgroundColor: 'whitesmoke', elevation: 8,
                                }}>
                                    <Image source={{ uri: `${SERVER + this.state.product.image}` }} style={{ width: 65, height: 65, marginRight: `${5}%`, borderRadius: 10 }} />
                                    <View style={{ width: `${90}%`, marginBottom: 3 }}>
                                        <View style={{ marginBottom: 5 }}>
                                            <Text style={styles.text}>{`${this.state.product.title.toUpperCase()}`}</Text>
                                        </View>
                                        <Text style={styles.innerText}>￦ {this.state.product.price}</Text>
                                        <Text style={styles.innerText}>{`Available`.toUpperCase()} : {this.state.product.quantity}</Text>
                                    </View>
                                </View>}
                            <View style={{ alignItems: "center", }}>
                                <BoxShadow setting={shadowOpt}>
                                    <Icon.Button name="mouse-pointer" borderRadius={17} size={16.5} iconStyle={{ color: "slateblue" }}
                                        style={styles.loginButton} onPress={this.handleModal}>
                                        <Text style={styles.buttonText}>SELECT PRODUCT</Text>
                                    </Icon.Button>
                                </BoxShadow>
                            </View>
                            <Modal visible={this.state.isModalOpen}>
                                <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, }}>
                                    <View >
                                        <View style={{ marginTop: 15, flexDirection: "row" }}>
                                            <Text style={styles.headerTitle}>MY ITEMLIST</Text>
                                            <Icon name="refresh" size={25} style={{ marginLeft: "50%", color: "slateblue" }} onPress={this.handleRefreshList} />
                                        </View>
                                        {console.log(this.state.myItems)}
                                        {!this.state.myItems || !this.state.myItems.length ?
                                            <View style={{ marginTop: 30 }}>
                                                <Text style={{ textAlign: "center", fontFamily: "sans-serif-light", color: "slateblue", fontSize: 15, letterSpacing: -0.5 }}>표시할 상품이 없습니다.</Text>
                                            </View> :
                                            <ScrollView contentContainerStyle={{ height: `${80}%`, width: `${100}%` }}>
                                                {this.state.myItems.map((item, index) =>
                                                    <SelectProductForStreaming key={index} productInfo={item} handleSelectProduct={this.handleSelectProduct} handleModal={this.handleModal} />)}
                                            </ScrollView>}
                                    </View>
                                </LinearGradient>
                                <View style={{ justifyContent: "center" }}>
                                    <Icon.Button name="close"
                                        iconStyle={{ color: "grey" }}
                                        style={{
                                            backgroundColor: "white",
                                            alignSelf: "center",
                                            justifyContent: "center",
                                            width: "100%"
                                        }}
                                        onPress={this.handleModal}>
                                        <Text style={styles.buttonText}>CLOSE</Text>
                                    </Icon.Button>
                                </View>
                            </Modal>
                            <View style={{ alignItems: "center", }}>
                                <BoxShadow setting={shadowOpt}>
                                    <Icon.Button name="video-camera" borderRadius={17} size={16.5} iconStyle={{ color: "white" }}
                                        style={{
                                            justifyContent: "center",
                                            backgroundColor: "slateblue",
                                            width: 165,
                                            height: 35,
                                        }} onPress={this.handlePressOnAir}>
                                        <Text style={{
                                            fontSize: 13,
                                            color: "white",
                                            fontFamily: "sans-serif-light",
                                            letterSpacing: -0.5,
                                            fontFamily: "sans-serif",
                                            textAlign: "center"
                                        }}>ON AIR</Text>
                                    </Icon.Button>
                                </BoxShadow>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </>
        )
    }
}

const shadowOpt = {
    width: 165,
    height: 35,
    color: "#708090",
    border: 6,
    radius: 10,
    opacity: 0.3,
    x: 0,
    y: 1,
    style: {
        marginVertical: 20,
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
    headerTitle: {
        textAlign: "center",
        letterSpacing: -0.5,
        fontSize: 22.75,
        padding: 10,
        marginTop: -15,
        marginBottom: 5,
        fontFamily: "sans-serif-thin",
    },
    InputContainer: {
        marginTop: 35,
        marginBottom: 50,
        width: 300,
    },
    Input: {
        paddingLeft: 10,
        height: 10,
        width: 150,
        paddingHorizontal: 5,
        borderRadius: 20,
        fontSize: 17,
        letterSpacing: -0.5,
        fontFamily: "sans-serif-light",
    },
    loginButton: {
        justifyContent: "center",
        backgroundColor: "white",
        width: 165,
        height: 35,
    },
    text: {
        fontSize: 18,
        color: "slateblue",
        fontFamily: "sans-serif",
    },
    innerText: {
        fontSize: 13,
        color: "slategrey",
        fontFamily: "sans-serif-light",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
        textAlign: "left"
    },
    buttonText: {
        fontSize: 13,
        color: "slategrey",
        fontFamily: "sans-serif-light",
        letterSpacing: -0.5,
        fontFamily: "sans-serif",
        textAlign: "center"
    },
})

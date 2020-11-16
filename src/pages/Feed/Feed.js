import React from 'react'
import { FlatList, RefreshControl, View, ScrollView, StyleSheet, ListView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { CustomHeader } from '../../components/CustomHeader';
import { Text, Button, Image } from 'react-native-elements'
import { SERVER, YOUTUBE_API_KEY } from '../config'
import { BoxShadow } from 'react-native-shadow'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';


export default class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscribeVids: [],
            currentBroadcast: [],
            popularVids: [],
            refreshing: false,
            dragging: false,
            currentIndex: 0,
            userInfo: this.props.route.params.userInfo
        }
        this.FlatList = React.createRef()
        this.renderItem = this.renderItem.bind(this)
    }

    componentDidMount() {
        this.getLatestList();
    }

    getLatestList = () => {
        Axios.get(`${SERVER}/getBroadcast`)
            .then(data => {
                this.setState({ currentBroadcast: data.data })
                console.log(this.state.currentBroadcast)
            })
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Watching', { title: `${item.title}`, handleVisible: this.props.route.params.handleVisible, info: item, streamerId: item.userId })
            }} >
                <View style={styles.listItems} >
                    <BoxShadow setting={shadowOpt}>
                        {item.thumbnail ?
                            <Image
                                style={{
                                    height: 400, width: 250, borderRadius: 40,
                                }}
                                source={{ uri: `${SERVER}${item.thumbnail}` }}
                            >
                                <View>
                                    <Text style={styles.itemTitle}>
                                        {item.title}
                                    </Text>
                                </View>
                            </Image>
                            : <Image
                                style={{
                                    height: 400, width: 250, borderRadius: 40,
                                }}
                                source={{ uri: `${SERVER}/thumbnail/thumbnail-1604128562013.jpg` }}
                            >
                                <View>
                                    <Text style={styles.itemTitle}>
                                        {item.title}
                                    </Text>
                                </View>
                            </Image>
                        }
                    </BoxShadow>
                </View >
            </TouchableOpacity>
        )
    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }
    render() {
        return (

            <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1 }}>
                <FlatList
                    ref={this.FlatList}
                    ListHeaderComponent={<CustomHeader navigation={this.props.navigation} />}
                    stickyHeaderIndices={[0]}
                    flatListItemSeparator={this.FlatListItemSeparator.bind(this)}
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.getLatestList}
                            color="black"
                        />}
                    onScroll={e => { e.nativeEvent.contentOffset.y }}
                    onLayout={e => { this.flatListTopOffset = e.nativeEvent.layout.y }}
                    numColumns={1}
                    data={this.state.currentBroadcast}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => String(index)}
                    onEndReached={this.fetchData}
                    onEndReachedThreshold={1}
                />
            </LinearGradient>

        )
    }
}
const shadowOpt = {
    width: 250,
    height: 400,
    color: "#708090",
    border: 9,
    radius: 40,
    opacity: 0.4,
    x: 0,
    y: 4,
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    title: {
        textAlign: "center",
        letterSpacing: 1,
        fontSize: 25,
        padding: 5,
        fontFamily: "sans-serif-light",
    },
    listItems: {
        height: 400,
        width: 250,
        borderRadius: 20,
        alignSelf: "center",
        paddingBottom: 30,
        paddingTop: 20,
        marginBottom: 35,
        marginLeft: 20,
        marginRight: 20,
    },
    itemTitle: {
        color: "white",
        padding: 10,
        marginTop: 230,
        textAlign: "center",
        textShadowRadius: 6,
        textShadowOffset: { width: 0, height: 2 },
        textShadowColor: "#222222bc",
        fontSize: 18,
        fontWeight: "bold"
    }
});


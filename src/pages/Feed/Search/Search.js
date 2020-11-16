import { HeaderBackButton } from '@react-navigation/stack';
import React from 'react'
import { View, ScrollView, StyleSheet, ListView, FlatList } from 'react-native'
import { Text, Button, Image, SearchBar, Icon, Header } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { min } from 'react-native-reanimated';
import { CustomHeader } from '../../../components/CustomHeader';
import SearchDefaultEntry from '../../../components/SearchDefaultEntry';
import { YOUTUBE_API_KEY } from '../../config'
import { searchYouTube } from '../searchYouTube';


export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popularVids: [],
            popularItms: [],
            search: "",
            result: null
        }
        this.resultHandler = this.resultHandler.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
        this._renderItem = this._renderItem.bind(this)
    }
    componentDidMount() {
        let initOption = {
            query: 'storror',
            max: 6,
            key: YOUTUBE_API_KEY
        }
        let rdmOption = {
            query: 'boiler+room',
            max: 6,
            key: YOUTUBE_API_KEY
        }
        Promise.all([searchYouTube(rdmOption, (data) => this.setState({ popularVids: data })), searchYouTube(initOption, (data) => this.setState({ popularItms: data }))])
    }
    async handleChangeText(text) {
        await this.setState({ search: text, result: null })
        await searchYouTube({ query: this.state.search, max: 12, key: YOUTUBE_API_KEY }, (data) => this.setState({ popularVids: data }))
        await searchYouTube({ query: this.state.search, max: 12, key: YOUTUBE_API_KEY }, (data) => this.setState({ popularItms: data }))
    }
    resultHandler(target) {
        this.setState({ result: target })
    }
    _renderItem({ item, idx }) {
        return (
            <View key={idx} style={{ margin: 14, marginTop: -5 }}>
                <SearchDefaultEntry
                    itm={item}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
    resultFlatlist(target, state) {
        let searchOpt = {
            query: this.state.search,
            max: 6,
            key: YOUTUBE_API_KEY
        }

        return (
            <>
                <HeaderBackButton
                    onPress={() => this.setState({ result: null })}
                    label={target === "popularItms" ? '검색 결과 : 제품' : '검색 결과 : 방송'}
                    labelVisible={true}
                    labelStyle={styles.title}
                    tintColor="slategrey"
                />
                <View style={styles.resultContainer}>
                    <FlatList
                        numColumns={2}
                        data={state}
                        renderItem={this._renderItem}
                        onEndReached={() => {
                            return searchYouTube(searchOpt, (data) => {
                                if (target === "popularItms") {
                                    this.setState({ popularItms: state.concat(data) }); console.log('it works!', state)
                                }
                                else if (target === "popularVids") {
                                    this.setState({ popularVids: state.concat(data) }); console.log('it works!')
                                }
                            })
                        }}
                    />
                </View>
            </>
        )
    }
    render() {

        return (
            <>
                <CustomHeader navigation={this.props.navigation} />
                <LinearGradient useAngle={true} angle={91.5} colors={['#E2E2E2', '#C9D6FF']} style={{ flex: 1, }}>
                    <View style={styles.body} >
                        <SearchBar
                            onChangeText={this.handleChangeText.bind(this)}
                            lightTheme={true}
                            round={true}
                            placeholder="검색어를 입력하세요"
                            placeholderTextColor='slategrey'
                            value={this.state.search}
                            containerStyle={{
                                alignSelf: "center",
                                height: 40,
                                width: "95%",
                                padding: 5,
                                marginBottom: 5,
                                backgroundColor: "rbg(0,0,0,0)"
                            }}
                            clearIcon={true}
                            searchIcon={null}
                            inputContainerStyle={{
                                height: "20%",
                                backgroundColor: "whitesmoke",
                                paddingLeft: 5
                            }}
                            inputStyle={{
                                padding: 2,
                                fontSize: 15,
                                fontFamily: 'sans-serif-light',
                                color: 'slateblue',
                                letterSpacing: -0.5
                            }}
                        />
                        <ScrollView style={{ overflow: "scroll", height: "100%" }}>
                            <View  >
                                {this.state.search === "" ?
                                    <>
                                        <Text style={styles.title}>현재 인기있는 방송</Text>
                                        <View >
                                            <ScrollView style={styles.scrollList} horizontal={true} >
                                                {this.state.popularVids.map((itm) => <SearchDefaultEntry itm={itm} navigation={this.props.navigation} />)}
                                            </ScrollView>
                                        </View>
                                    </>
                                    : (this.state.result === 'live' ?
                                        this.resultFlatlist("popularVids", this.state.popularVids)
                                        : (this.state.result === 'item' ? <></> :
                                            <>
                                                <Text style={styles.title} onPress={() => { this.resultHandler("live"); }}>검색 결과 : 방송</Text>
                                                <View >
                                                    <ScrollView style={styles.scrollList} horizontal={true} >
                                                        {this.state.popularVids.map((itm) => <SearchDefaultEntry itm={itm} navigation={this.props.navigation} />)}
                                                    </ScrollView>
                                                </View>
                                            </>))}
                            </View>
                            <View >
                                {this.state.search === "" ?
                                    <>
                                        <Text style={styles.title}>현재 인기있는 제품</Text>
                                        <View >
                                            <ScrollView style={styles.scrollList} horizontal={true}>
                                                {this.state.popularItms.map((itm) => <SearchDefaultEntry itm={itm} key={itm.etag} navigation={this.props.navigation} />)}
                                            </ScrollView>
                                        </View>
                                    </>
                                    : (this.state.result === 'item' ?
                                        this.resultFlatlist("popularItms", this.state.popularItms)
                                        : (this.state.result === 'live' ? <></> :
                                            <>
                                                <Text style={styles.title} onPress={() => { this.resultHandler("item"); }}>검색 결과 : 제품</Text>
                                                <View >
                                                    <ScrollView style={styles.scrollList} horizontal={true}>
                                                        {this.state.popularItms.map((itm) =>
                                                            <SearchDefaultEntry
                                                                itm={itm} key={itm.etag} navigation={this.props.navigation} />)}
                                                    </ScrollView>
                                                </View>
                                            </>
                                        ))}
                            </View>
                        </ScrollView>
                    </View >
                </LinearGradient>
            </>
        )
    }
}


const styles = StyleSheet.create({
    body: {
        padding: 10,
    },
    title: {
        fontSize: 18.5,
        padding: 5,
        marginLeft: 10,
        color: 'slateblue',
        fontFamily: "sans-serif",
        letterSpacing: -0.5
    },

    scrollList: {
        flexDirection: "column",
        flexWrap: "wrap",
        flexGrow: 1,
        alignContent: "space-around",
        margin: 5,
        paddingBottom: 10
    },
    resultContainer: {
        alignItems: "center",
        marginTop: 8
    }
});



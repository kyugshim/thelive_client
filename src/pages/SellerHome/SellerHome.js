import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { BorderlessButton, FlatList, RawButton } from 'react-native-gesture-handler'
import SellerInfoHome from '../../components/SellerInfoHome'
import SellerItemEntry from '../../components/SellerItemEntry'
import { HeaderBackButton } from '@react-navigation/stack';
import SearchDefaultEntry from '../../components/SearchDefaultEntry'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class SellerHome extends React.Component {
    constructor(props) {
        super(props)
        this._renderItem = this._renderItem.bind(this)
    }
    _renderItem({ item }) {
        return (
            <View style={{ margin: 10, }}>
                <SellerItemEntry itm={item} navigation={this.props.navigation} />
            </View>
        )
    }
    render() {
        return (

            <ScrollView>
                <View style={styles.sellerContainer}>
                    <HeaderBackButton
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={{ paddingTop: 15 }}
                    />
                    <Text style={styles.sellerTitle}>{this.props.route.params.list[0].name.toUpperCase()}</Text>
                    <SellerInfoHome navigation={this.props.navigation} />
                    <View style={{ alignItems: "center", marginBottom: 15 }}>
                        <Icon.Button name="plus-circle"
                            borderRadius={15}
                            size={15}
                            style={{ justifyContent: 'center', backgroundColor: 'slateblue', width: 200, height: 35, alignSelf: "center" }}>
                            Follow</Icon.Button>
                    </View>
                    <Text style={styles.sellerTitle}>{"Streaming".toUpperCase()}</Text>
                    <View style={styles.sellerItm}>
                        {this.props.route.params.list.map((itm) => <SearchDefaultEntry itm={itm} navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('Watching')} />)}
                    </View>
                    <Text style={styles.sellerTitle}>{"Products".toUpperCase()}</Text>
                    <View style={{ alignItems: "center" }}>
                        <FlatList
                            data={this.props.route.params.list}
                            renderItem={this._renderItem}
                            numColumns={2}
                        />
                    </View>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    sellerContainer: {
        marginLeft: 2,
        marginRight: 2,
        padding: 15,
    },
    sellerTitle: {
        fontSize: 20,
        padding: 5,
        marginLeft: 20,
        fontFamily: "sans-serif",
        color: "slateblue"
    },
    sellerItm: {
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        width: "100%",
        alignItems: "flex-start",
        paddingBottom: 30
    }
})
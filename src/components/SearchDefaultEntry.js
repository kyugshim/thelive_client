import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Image } from 'react-native-elements'
import { BoxShadow } from 'react-native-shadow'


export default class SearchDefaultEntry extends React.Component {
    constructor(props) {
        super(props)
        this.ConvertSystemSourcetoHtml = this.ConvertSystemSourcetoHtml.bind(this)
    }
    ConvertSystemSourcetoHtml(str) {
        str = str.replace("&lt;", "<");
        str = str.replace("&gt;", ">");
        str = str.replace("&quot;", '"');
        str = str.replace("&quot;", '"');
        str = str.replace("&#39;", "'");
        str = str.replace("&#39;", "'");

        return str;
    }
    render() {
        const { index, routes } = this.props.navigation.dangerouslyGetState();
        const currentRoute = routes[index].name;

        return (
            <View style={currentRoute === "SellerHome" ? { margin: 5, paddingBottom: 50 } : styles.listItems} >
                <BoxShadow setting={shadowOpt}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 20 }}
                        source={{
                            uri: currentRoute === "SellerHome" ?
                                this.props.itm.image[0] : this.props.itm.snippet.thumbnails.default.url
                        }}
                        onPress={() => this.props.navigation.navigate('Watching')}
                    />
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.listText}
                        onPress={() => this.props.navigation.navigate('Watching')} >
                        {this.ConvertSystemSourcetoHtml(currentRoute === "SellerHome" ? this.props.itm.title : this.props.itm.snippet.title)}
                    </Text>
                </BoxShadow>
            </View >
        )

    }
}

const shadowOpt = {
    width: 100,
    height: 100,
    color: "#708090",
    border: 6,
    radius: 15,
    opacity: 0.35,
    x: 0,
    y: 2,
    style: { marginVertical: 5 }
}
const styles = StyleSheet.create({
    listItems: {
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 35
    },
    listText: {
        width: 110,
        marginTop: 5,
        padding: 5,
        textAlign: "center",
        alignSelf: "center",
        fontFamily: "sans-serif-light",
        letterSpacing: -0.5,
        fontSize: 14.5
    },
});

import React from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler';
import Webview from 'react-native-webview'
import SocketManager from '../../socketManager';

export default class Oauth extends React.Component {
    constructor(props) {
        super(props)
        this.state = { currentURL: this.props.route.params.url }
    }

    handleRedirect = (webViewState) => {
        let { navigation } = this.props
        if (webViewState.url.includes('codestates')) {
            this.webview.stopLoading();
            SocketManager.instance.connectAfterLogin();
            navigation.navigate('FeedIndex')
        }
    }

    render() {
        return (
            <Webview
                ref={webview => { this.webview = webview }}
                source={{ uri: this.state.currentURL }}
                onNavigationStateChange={this.handleRedirect} />
        )
    }
}
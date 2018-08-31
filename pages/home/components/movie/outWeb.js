import React, { Component } from "react";
import { WebView } from "react-native";

export default class OutWeb extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            // header: '外部网站'
        };
    };
    constructor() {
        super();
        this.state = {
            url: ''
        }
    }
    componentWillMount() {
        this.setState({
            url: this.props.navigation.getParam('url')
        })
    }
    render() {
        return (
            <WebView source={{ uri: this.state.url }} />
        );
    }
}

import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, FlatList, WebView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Detail extends Component {
    constructor() {
        super();
        this.state = {
            pid: '',
            pData: {}
        }
    }
    componentWillReceiveProps(next) {
        if (next.pData) {
            this.setState({
                pData: next.pData,
                pid: next.userInfo.pid
            })
        }
    }
    render() {
        return (
            <View>
                {this.state.pid ?
                    <Image source={{ uri: this.state.pData.headImg }} style={{ width: 35, height: 35, borderRadius: 17.5, marginRight: 10 }} />
                    : (
                        <TouchableOpacity onPress={this.props.showBox}>
                            <Icon name="account-heart" color="#fff" size={30} />
                        </TouchableOpacity>
                    )}
            </View>
        )
    }
}
import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class addPartner extends Component {
    constructor() {
        super();
        this.state = {
            pid: ''
        }
    }
    componentWillReceiveProps(next) {
        this.setState({
            pid: next.userInfo.pid
        })
    }
    render() {
        return (
            <View>
                {this.state.pid ? (
                    <TouchableOpacity onPress={this.props.enterMsg}>
                        <Icon name="chat" size={32} color="#fff" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                )
                    : null}
            </View>
        )
    }
}
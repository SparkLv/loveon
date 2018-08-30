import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { info as styles } from '../../../../../common/styles'

export default class Info extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }
    }
    inputText(val) {
        this.setState({
            text: val
        })
    }
    sendMsg() {
        this.props.send(this.state.text);
        this.inputText('');
    }
    render() {
        return (
            <View style={styles.inputBox}>
                <Image source={{ uri: this.props.userInfo.headImg }} style={styles.inputBoxHead} />
                <TextInput multiline onChangeText={this.inputText.bind(this)} value={this.state.text} style={styles.inputBoxInput} placeholder="Add Message" />
                <TouchableOpacity onPress={this.sendMsg.bind(this)} disabled={(!this.state.text.length) || !this.props.userInfo.pid}>
                    <View style={{ width: 50, height: 40 }}>
                        <Text style={{ color: this.state.text.length && this.props.userInfo.pid ? "#1b82d1" : '#c6ddeb', lineHeight: 40 }}>send</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

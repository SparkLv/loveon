import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Clipboard } from "react-native";
import Modalbox from 'react-native-modalbox';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Toast from 'react-native-root-toast';

import store from '../../../store'

import Ajax from "../../../common/ajax";

export default class AddModal extends Component {
    constructor() {
        super();
        this.state = {
            addBoxVis: false,
            code: '',
            keyboardVis: false
        };
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    componentWillReceiveProps(next) {
        this.setState({ addBoxVis: next.addBoxVis });
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow() {
        this.setState({
            keyboardVis: true
        })
    }
    _keyboardDidHide() {
        this.setState({
            keyboardVis: false
        })
    }
    async copyKey() {
        await Clipboard.setString(this.props.userInfo.code.toString());
        this.toast('密钥已复制到剪切板')

    }
    toast(message) {
        Toast.show(message, {
            duration: 2000,
            position: -80,
            shadow: true,
            animation: true,
            hideOnPress: true,
        });
    }
    inputCode(val) {
        const value = val.length > 7 ? this.state.code : val
        this.setState({
            code: value
        })
    }
    conLover() {
        this.props.toLogin();
        // Ajax.connectP({
        //     id: this.props.userInfo.id,
        //     code: this.state.code
        // }, () => {
        //     this.toast('配对成功，请重新登陆');
        //     this.props.toLogin();
        // }, (data) => {
        //     this.toast(data.message);
        // })
    }
    clickCodeInput() {
        if (!this.state.keyboardVis) {
            this.codeInput.blur();
            setTimeout(() => { this.codeInput.focus() }, 100)
        }
    }
    render() {
        return (
            <Modalbox
                isOpen={this.state.addBoxVis}
                onClosed={this.props.hideAddBox}
                position="center"
                backButtonClose={true}
                swipeToClose={false}
                style={{ height: 220, width: 300 }}
            >
                <ScrollableTabView>
                    <View tabLabel="输入密钥" style={{ flex: 1, position: "relative" }}>
                        <TextInput ref={input => { this.codeInput = input }} onChangeText={this.inputCode.bind(this)} underlineColorAndroid="transparent" value={this.state.code} style={{ width: 0, opacity: 0 }} />
                        <View style={{ flexDirection: "row", zIndex: 10, position: "absolute", top: 30, paddingLeft: 10, width: '100%', justifyContent: "space-between" }}>
                            {[0, 1, 2, 3, 4, 5, 6].map(item => {
                                return (
                                    <TouchableWithoutFeedback key={item} onPress={this.clickCodeInput.bind(this)}>
                                        <View style={{ height: 30, width: 30, borderBottomColor: '#333', borderBottomWidth: 1, marginRight: 5 }}>
                                            <Text style={{ fontSize: 20, textAlign: "center" }}>{this.state.code.split('')[item]}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })}
                        </View>
                        <View style={{ flexDirection: 'row', position: "absolute", bottom: 0, borderTopColor: '#aaa', borderTopWidth: 1 }}>
                            <TouchableOpacity onPress={this.conLover.bind(this)} style={{ flex: 1, height: 40 }}>
                                <Text style={{ textAlign: 'center', color: '#000', lineHeight: 40, borderRightWidth: 1, borderRightColor: '#aaa' }}>确定</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.hideAddBox} style={{ flex: 1, height: 40 }}>
                                <Text style={{ textAlign: 'center', color: '#000', lineHeight: 40 }}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View tabLabel="获取密钥" style={{ flex: 1, position: "relative" }}>
                        <Text style={{ textAlign: 'center', fontSize: 24, letterSpacing: 10, marginTop: 50, color: 'navy' }}>{this.props.userInfo.code}</Text>
                        <View style={{ flexDirection: 'row', position: "absolute", bottom: 0, borderTopColor: '#aaa', borderTopWidth: 1 }}>
                            <TouchableOpacity onPress={this.copyKey.bind(this)} style={{ flex: 1, height: 40 }}>
                                <Text style={{ textAlign: 'center', color: '#000', lineHeight: 40, borderRightWidth: 1, borderRightColor: '#aaa' }}>复制</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.hideAddBox} style={{ flex: 1, height: 40 }}>
                                <Text style={{ textAlign: 'center', color: '#000', lineHeight: 40 }}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollableTabView>
            </Modalbox>
        );
    }
}

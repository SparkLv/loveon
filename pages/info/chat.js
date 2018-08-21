import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, AsyncStorage, FlatList, Dimensions, TextInput, TouchableOpacity } from "react-native";
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Info extends Component {
    constructor() {
        super();
        this.state = {
            mes: [],
            userInfo: {},
            pData: null,
            height: 0,
            text: '',
            refreshLoading: false,
            canToBottom: true
        }
    }
    componentDidMount() {
        this.getUserInfo();
        var { height } = Dimensions.get('window');
        this.setState({
            height
        })
    }
    componentWillUnmount() {
        this.socket.disconnect();
    }
    async getUserInfo() {
        const userInfo = await AsyncStorage.getItem('userInfo');
        this.setState({
            userInfo: JSON.parse(userInfo)
        }, () => {
            this.getPuserInfo();
        })
    }
    async getPuserInfo() {
        const pUserInfo = await AsyncStorage.getItem('pUserInfo');
        this.setState({
            pData: JSON.parse(pUserInfo)
        }, () => {
            this.socketInit();
        })
    }
    socketInit() {
        this.socket = io(`ws://10.0.52.22:2500?id=${this.state.userInfo.id}&pid=${this.state.userInfo.pid}`);
        this.socket.on('message', (val) => {
            this.setState({
                mes: val.reverse()
            })
        })
        this.socket.on('sendResult', (data) => {
            if (data.code == 1) {
                const obj = { id: Math.floor(10000 * Math.random()), sid: this.state.userInfo.id, text: this.state.text }
                this.setState({
                    mes: this.state.mes.concat(obj),
                    text: ''
                })
            }
        })
        this.socket.on('sendHistory', (data) => {
            this.setState({
                mes: data.reverse().concat(this.state.mes),
                refreshLoading: false
            }, () => {
                setTimeout(() => {
                    this.setState({
                        canToBottom: true
                    })
                }, 3000)
            })
        })
    }
    inputText(val) {
        this.setState({
            text: val
        })
    }
    sendMsg() {
        this.socket.emit('send', { text: this.state.text });
    }
    getHistory() {
        this.socket.emit('getHistory', { finId: this.state.mes[0].id });
        this.setState({
            refreshLoading: true,
            canToBottom: false
        })
    }
    toBottom() {
        if (this._list && this.state.canToBottom) {
            this._list.scrollToEnd({ animated: false })
        }
    }
    _keyExtractor = (item, index) => item.id.toString();
    _renderItem = ({ item }) => {
        const isP = item.sid != this.state.userInfo.id;
        const imgUrl = isP ? this.state.pData.headImg : this.state.userInfo.headImg;
        return (
            <View style={{ flexDirection: isP ? 'row' : "row-reverse", padding: 10 }}>
                <Image source={{ uri: imgUrl }} style={{ width: 35, height: 35 }} />
                <Text style={{ color: '#000', backgroundColor: isP ? '#ebeced' : '#76afec', marginLeft: 10, marginRight: 10, padding: 8, maxWidth: 200 }}>{item.text}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", position: 'relative' }}>
                <View style={{ position: 'relative', width: '100%', height: 50, backgroundColor: "#1b82d1", flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ position: "absolute", left: 10, top: 13 }}>
                        <Icon name="keyboard-arrow-left" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 20 }}>{this.state.pData ? this.state.pData.name : ''}</Text>
                </View>
                <FlatList
                    style={{ width: '100%', marginBottom: 50 }}
                    ref={(list) => { this._list = list }}
                    data={this.state.mes}
                    keyExtractor={this._keyExtractor}
                    onContentSizeChange={this.toBottom.bind(this)}
                    onLayout={this.toBottom.bind(this)}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    refreshing={this.state.refreshLoading}
                    onRefresh={this.getHistory.bind(this)}
                />
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: "space-around", position: "absolute", bottom: 0, alignItems: 'center', height: 50, paddingLeft: 10, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#e7e8e9' }}>
                    <Image source={{ uri: this.state.userInfo.headImg }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    <TextInput multiline onChangeText={this.inputText.bind(this)} value={this.state.text} style={{ borderBottomWidth: 0, marginLeft: 10, marginTop: 5, width: 200, textAlignVertical: 'top' }} placeholder="Add Message" />
                    <TouchableOpacity onPress={this.sendMsg.bind(this)} disabled={!this.state.text.length}>
                        <View style={{ width: 50, height: 40 }}>
                            <Text style={{ color: this.state.text.length ? "#1b82d1" : '#c6ddeb', lineHeight: 40 }}>send</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
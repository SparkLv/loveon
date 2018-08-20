import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, AsyncStorage, FlatList, Dimensions, TextInput, TouchableOpacity } from "react-native";
import io from 'socket.io-client';

export default class Info extends Component {
    constructor() {
        super();
        this.state = {
            mes: [],
            userInfo: {},
            pData: null,
            height: 0
        }
    }
    componentDidMount() {
        this.getUserInfo();
        var { height } = Dimensions.get('window');
        this.setState({
            height
        })
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
        const socket = io(`ws://10.0.52.22:2500?id=${this.state.userInfo.id}&pid=${this.state.userInfo.pid}`);
        socket.on('message', (val) => {
            this.setState({
                mes: this.state.mes.concat([val])
            })
        })
    }
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({ item }) => (
        <Text>{item.text}</Text>
    );
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", position: 'relative' }}>
                <View style={{ position: 'relative', width: '100%', height: 50, backgroundColor: "#1b82d1", flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>{this.state.pData ? this.state.pData.name : ''}</Text>
                </View>
                <View style={{ width: '100%', height: (this.state.height - 123) }}>
                    <FlatList
                        data={this.props.data}
                        keyExtractor={this._keyExtractor}
                        extraData={this.state}
                        renderItem={this._renderItem}
                    />
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: "space-around", alignItems: 'center', height: 50, paddingLeft: 10, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#e7e8e9' }}>
                    <Image source={{ uri: this.state.userInfo.headImg }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    <TextInput style={{ borderBottomWidth: 0, marginLeft: 10, width: 200 }} placeholder="Add Message" />
                    <TouchableOpacity>
                        <View style={{ width: 50, height: 40 }}>
                            <Text style={{ color: "#1b82d1", lineHeight: 40 }}>send</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
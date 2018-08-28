import React, { Component } from "react";
import { View, Text, Image, FlatList, Dimensions } from "react-native";
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { info as styles } from '../../../common/styles'
import store from '../../../store'

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            mes: [],
            height: 0,
            text: ''
        }
        this.canDrop = true
        this.socket = store.getState().socket;
    }
    componentDidMount() {
        this.socketInit();
        var { height } = Dimensions.get('window');
        this.setState({
            height
        })
    }
    componentWillReceiveProps(next) {
        this.setState({
            text: next.text
        })
    }
    componentWillUnmount() {
        this.socket.disconnect();
    }
    socketInit() {
        this.socket.emit('initMessage');
        this.socket.on('message', (val) => {
            this.setState({
                mes: val.data
            })
        })
        this.socket.on('sendResult', (data) => {
            if (data.code == 1) {
                const obj = data.data;
                this.setState({
                    mes: [obj].concat(this.state.mes),
                })
            }
        })
        this.socket.on('sendHistory', (data) => {
            if (this.props.userInfo.id == data.id) {
                this.setState({
                    mes: this.state.mes.concat(data.data)
                }, () => {
                    this.canDrop = true;
                })
            }
        })
    }
    getHistory() {
        if (this.canDrop) {
            this.canDrop = false;
            this.socket.emit('getHistory', { id: this.props.userInfo.id, finId: this.state.mes[this.state.mes.length - 1].id });
        }
    }
    _keyExtractor = (item, index) => index.toString();
    _renderItem = ({ item, index }) => {
        const isP = item.sid != this.props.userInfo.id;
        const imgUrl = isP ? this.props.pData.headImg : this.props.userInfo.headImg;
        const time = Moment(item.time).valueOf();
        const po = index == (this.state.mes.length - 1) ? index : index + 1;
        const pTime = Moment(this.state.mes[po].time).valueOf();
        const showTime = (time - pTime) > 3600000;
        return (
            <View>
                <View>
                    {showTime ? <Text style={{ textAlign: "center", fontSize: 12 }}>{item.time}</Text> : null}
                </View>
                <View style={{ flexDirection: isP ? 'row' : "row-reverse", padding: 10 }}>
                    <Image source={{ uri: imgUrl }} style={{ width: 35, height: 35 }} />
                    <Text style={[{ backgroundColor: isP ? '#ebeced' : '#76afec' }, styles.chatText]}>{item.text}</Text>
                </View>
            </View>
        )
    }
    render() {
        return this.props.userInfo.pid ? (
            <FlatList
                style={{ width: '100%', marginBottom: 50 }}
                ref={(list) => { this._list = list }}
                data={this.state.mes}
                keyExtractor={this._keyExtractor}
                extraData={this.state}
                renderItem={this._renderItem}
                onEndReached={this.getHistory.bind(this)}
                onEndReachedThreshold={0.01}
                inverted
            />
        ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="speaker-notes-off" size={40} color="#333" />
                    <Text>暂无另一半，快去寻找另一半吧</Text>
                </View>
            )
    }
}

import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableWithoutFeedback } from "react-native";
import Ajax from '../../../../common/ajax'

export default class Movie extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '实时新片'
        };
    };
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    componentWillMount() {
        this.getList();
    }
    getList() {
        Ajax.getMovies((data) => {
            this.setState({ list: data });
        }, (err) => {
            console.log(err.message)
        })
    }
    toDetail(item) {
        this.props.navigation.navigate('movieDetail', { data: item });
    }
    _keyExtractor = (item, index) => index.toString();
    _renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", padding: 10, width: '100%', borderBottomWidth: 1, borderBottomColor: '#eee', marginBottom: 10 }}>
                <Image source={{ uri: item.imgUrl }} resizeMode="cover" style={{ width: 60, height: 90 }} />
                <View style={{ flex: 1, marginLeft: 10, justifyContent: "space-between" }}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: '#5a5d5a', fontSize: 14, flexWrap: "wrap" }}>{item.title}</Text>
                    <View>
                        <Text style={{ fontSize: 12 }} >主演：{item.actors}</Text>
                        <Text style={{ fontSize: 12 }} >
                            豆瓣评分：
                            <Text style={{ color: '#ffb400' }}>
                                {item.rate}
                            </Text>
                        </Text>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.toDetail.bind(this, item)}>
                    <View style={{ width: 50, height: 25, backgroundColor: '#4285f4', borderRadius: 4, padding: 5, justifyContent: "center" }}>
                        <Text style={{ textAlign: 'center', color: '#fff' }}>详情</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
                <FlatList
                    style={{ width: '100%' }}
                    ref={(list) => { this._list = list }}
                    data={this.state.list}
                    keyExtractor={this._keyExtractor}
                    extraData={this.state}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, Button, StatusBar } from "react-native";
import Video from 'react-native-video-player';

export default class MovieDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '详情',
        };
    };
    constructor() {
        super();
        this.state = {
            list: [],
            data: {}
        }
    }
    componentDidMount() {
        this.setState({
            data: this.props.navigation.getParam('data')
        })
    }
    render() {
        const { title, rate, duration, actors, ticket, region, douLink, video, detail, imgUrl } = this.state.data;
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ flex: 1, alignItems: "center", marginBottom: 50 }}>
                    <View style={{ flexDirection: "row", padding: 10, marginBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                        <Image source={{ uri: imgUrl }} resizeMode="cover" style={{ width: 80, height: 120 }} />
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: "space-between" }}>
                            <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: '#000', fontSize: 16, flexWrap: "wrap" }}>{title}</Text>
                            <View>
                                <Text style={{ fontSize: 12 }} >{region}/{duration}/{actors}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('outWeb', { url: ticket }) }}>
                                    <View style={{ marginRight: 10, width: 50, height: 25, backgroundColor: '#4285f4', borderRadius: 4, padding: 5, justifyContent: "center" }}>
                                        <Text style={{ textAlign: 'center', color: '#fff' }}>购票</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('outWeb', { url: douLink }) }}>
                                    <View style={{ marginRight: 10, width: 50, height: 25, backgroundColor: '#34a853', borderRadius: 4, padding: 5, justifyContent: "center" }}>
                                        <Text style={{ textAlign: 'center', color: '#fff' }}>豆瓣</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ fontSize: 12, lineHeight: 25 }} >
                                    豆瓣评分：
                                    <Text style={{ color: '#ffb400' }}>
                                        {rate}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10, width: '100%', backgroundColor: '#fff' }}>
                        <Text>{detail}</Text>
                    </View>
                    <Video video={{ uri: video }}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={{ width: 300, height: 200 }} />
                </View>
                <Button style={{ marginTop: 10 }} onPress={() => { this.props.navigation.navigate('fullScreenMovie', { url: video }) }} title="全屏观看"></Button>
            </ScrollView >
        );
    }
}

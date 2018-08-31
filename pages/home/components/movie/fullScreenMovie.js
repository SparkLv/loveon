import React, { Component } from "react";
import { View, StatusBar, Dimensions } from "react-native";
import Video from 'react-native-video';

export default class MovieDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            tabBarVisible: false
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
        var { height, width } = Dimensions.get('window');
        return (
            <View style={{ backgroundColor: 'red', transform: [{ rotateZ: '90deg' }] }}>
                <StatusBar hidden={true} />
                <View >
                    <Video source={{ uri: this.state.url }}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={{ width: height, height: width }} />
                </View>
            </View >
        );
    }
}

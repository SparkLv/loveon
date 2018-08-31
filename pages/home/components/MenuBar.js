import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MenuBar extends Component {
    render() {
        return (
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}>
                <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('movie') }}>
                    <Icon name="local-movies" size={42} color="#ea4335" />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

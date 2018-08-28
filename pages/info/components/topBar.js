import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { info as styles } from '../../../common/styles'

export default class TopBar extends Component {
    render() {
        return (
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.tabBarLeftBtn}>
                    <Icon name="keyboard-arrow-left" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 20 }}>{this.props.pData.name}</Text>
            </View>
        );
    }
}

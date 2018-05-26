import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

export default class Circle extends Component {
    render() {
        return (
            <View style={styles.circleBox}>
                <TouchableOpacity style={styles.circle} onPress={() => { this.props.add() }}>
                        <Text>+ 新增纪念日</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    circleBox: {
        paddingTop: 20,
        alignItems: 'center'
    },
    circle: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#eee'
    }
})
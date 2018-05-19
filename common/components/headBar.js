import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default class headBar extends Component {
    componentDidMount() {
        // console.log(this.props);
    }
    render() {
        return (
            <View>
                {this.props.back ? (
                    <View style={[styles.box, { backgroundColor: this.props.bgColor }]}>
                        <View style={styles.back}>{this.props.back}</View>
                    </View>
                ) : (
                        <View style={[styles.box, { backgroundColor: this.props.bgColor }]}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <View style={styles.oper}>{this.props.oper}</View>
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        height: 55,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        lineHeight: 55,
        color: '#fff'
    },
    oper: {
        flex: 3,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    back: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
    }
});
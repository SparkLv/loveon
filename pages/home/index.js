import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import HeadBar from '../../common/components/headBar';
export default class App extends Component {
    static navigationOptions = {
        tabBarIcon: (active) => <Image
            style={styles.tabBarImage}
            source={active.focused ? require('../../assets/ahome.png') : require('../../assets/home.png')}
        />
    }
    render() {
        return (
            <View>
                <HeadBar bgColor="#3d82cb" title="Home" />
                <View style={styles.punch}>
                    <Text></Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarImage: {
        width: 24,
        height: 24,
    }
});
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import HeadBar from './headBar';
export default class Chat extends Component {
    static navigationOptions = {
        tabBarIcon: (active) => <Image
            style={styles.tabBarImage}
            source={active.focused ? require('../../assets/achat.png') : require('../../assets/chat.png')}
        />
    }
    componentDidMount() {
        // setTimeout(()=>{this.props.navigation.goBack()},2000);
    }
    back() {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View>
                <HeadBar bgColor="#3d82cb" back={true} title="Chat" back={<TouchableOpacity onPress={() => this.back.call(this)}><View style={styles.backBtn}></View></TouchableOpacity>} />
                <Text>sss</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarImage: {
        width: 24,
        height: 24,
    },
    addBtn: {
        width: 30,
        height: 30
    },
    backBtn: {
        width: 15,
        height: 15,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderColor: '#fff',
        transform:[{rotate:'-45deg'}],
        marginLeft:10
    }
});
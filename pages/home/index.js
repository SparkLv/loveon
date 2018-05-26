import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import HeadBar from '../../common/components/headBar';
import Circle from './components/circle'
import Add from './components/add'
export default class App extends Component {
    static navigationOptions = {
        tabBarIcon: (active) => <Image
            style={styles.tabBarImage}
            source={active.focused ? require('../../assets/ahome.png') : require('../../assets/home.png')}
        />
    }
    constructor(props) {
        super(props)
        this.state = {
            page: 0
        }
    }
    componentDidMount() {
    }
    showAdd() {
        this.setState({
            page: 1
        })
    }
    backToHome() {
        this.setState({
            page: 0
        })
    }
    render() {
        return (
            <View>
                <HeadBar bgColor="#3d82cb" title="Home" back={this.state.page ? <TouchableOpacity onPress={() => this.backToHome.call(this)}><View style={styles.backBtn}></View></TouchableOpacity> : null} />
                {!this.state.page ? (<Circle add={this.showAdd.bind(this)}></Circle>) : null}
                {this.state.page === 1 ? (<Add></Add>) : null}
            </View>)
    }
}

const styles = StyleSheet.create({
    tabBarImage: {
        width: 24,
        height: 24,
    },
    backBtn: {
        width: 15,
        height: 15,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderColor: '#fff',
        transform: [{ rotate: '-45deg' }],
        marginLeft: 10
    }
});
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';

import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 5,
            dateNum: 100,
            dateIndex: 0,
            nowDate: ''
        }
    }
    componentDidMount() {
        const today = this.getToday();
        const arr = today.split('-');
        const nowDate = `${arr[0]}年${arr[1]}月${arr[2]}日`;
        const days = this.dateDiffer('2017-1-1', today);
        this.setState({
            dateIndex: days,
            nowDate
        })
        this.handleL = setInterval(() => {
            if (this.state.loading) {
                this.setState({ loading: this.state.loading - 1 })
            } else {
                this.props.close();
                clearInterval(this.handleL);
            }
        }, 1000);
    }
    dateDiffer(date1, date2) {
        const s1 = new Date(date1.replace(/-/g, "/")).getTime();
        const s2 = new Date(date2.replace(/-/g, "/")).getTime();
        const span = s2 - s1;
        const days = Math.ceil(Math.abs(span) / (24 * 3600 * 1000));
        return days + 1
    };
    getToday() {
        const now = new Date();
        return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={() => this.props.close()}
                >
                    <Text style={[styles.center, styles.skipBtnText]}>{`跳过(${this.state.loading.toString()})`}</Text>
                </TouchableOpacity>
                <Image source={require('../../assets/start.jpg')} />
                <View style={styles.startDate}>
                    <Text style={[styles.center, styles.startDateText]}>{`今天是${this.state.nowDate}`}</Text>
                    <Text style={[styles.center, styles.startDateText]}>{`是我们在一起的第${this.state.dateIndex}天`}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    skipBtn: {
        zIndex: 1,
        width: 72,
        position: 'absolute',
        top: 20,
        right: 20,
        borderColor: '#bbb',
        borderWidth: 1,
        padding: 5,
        borderRadius: 16,
    },
    skipBtnText: {
        color: '#fff'
    },
    center: {
        textAlign: 'center'
    },
    startDateText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    startDate: {
        zIndex: 1,
        position: 'absolute'
    }
});

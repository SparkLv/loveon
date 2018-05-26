import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    DatePickerAndroid
} from 'react-native'

export default class Add extends Component {
    back() {
        this.props.navigation.goBack();
    }
    async selectDate() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // 要设置默认值为今天的话，使用`new Date()`即可。
                // 下面显示的会是2020年5月25日。月份是从0开始算的。
                date: new Date(2020, 4, 25)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
            }
        } catch ({ code, message }) {

        }
    }
    render() {
        return (
            <View style={styles.addBox}>
                <TextInput style={styles.input} placeholder="纪念日名称"></TextInput>
                <TextInput style={styles.input} onFocus={this.selectDate} placeholder="纪念日期"></TextInput>
                <TouchableOpacity style={styles.subBtn}>
                    <Text style={styles.btnText}>提交</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addBox: {
        marginTop:50,
        alignItems: 'center'
    },
    input: {
        width: 300
    },
    subBtn: {
        width: 300,
        height: 50,
        marginTop:50,
        borderRadius:7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3d82cb'
    },
    btnText:{
        color:'#fff'
    }
});
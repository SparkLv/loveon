import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, AsyncStorage } from "react-native";
import tcomb from 'tcomb-form-native';
import Toast from 'react-native-root-toast';

const Form = tcomb.form.Form;

Form.stylesheet.textbox.normal.paddingLeft = 10;
Form.stylesheet.textbox.normal.paddingRight = 10;
Form.stylesheet.textbox.normal.backgroundColor = '#fafafa';

var Person = tcomb.struct({
    username: tcomb.String,
    password: tcomb.String
});

var options = {
    auto: 'none',
    fields: {
        username: {
            placeholder: '用户名',
            error: '请输入用户名'
        },
        password: {
            placeholder: '密码',
            error: '请输入密码',
            password: true,
            secureTextEntry: true
        }
    }
};

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            loginValue: {},
            loading: false
        }
    }
    typeLogin(val) {
        this.setState({
            loginValue: val
        })
    }
    login() {
        var value = this.refs.form.getValue();
        this.setState({
            loading: true
        })
        fetch('http://10.0.52.22:2421/loveon/user/login', {
            method: "post", headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.loginValue)
        })
            .then(res => res.json())
            .then(data => {
                if (data.code == '1') {
                    this.setUserInfo(data.data);
                } else {
                    this.toast(data.message);
                }
                this.setState({
                    loading: false
                })
            });
    }
    async setUserInfo(info) {
        await AsyncStorage.setItem('userInfo', JSON.stringify(info));
        this.props.navigation.replace('Main');
    }
    esInput() {
        return !(this.state.loginValue.username && this.state.loginValue.password)
    }
    toast(message) {
        Toast.show(message, {
            duration: 2000,
            position: -50,
            shadow: true,
            animation: true,
            hideOnPress: true,
        });
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#fff' }}>
                <View style={styles.loginForm}>
                    <Form
                        ref="form"
                        type={Person}
                        options={options}
                        value={this.state.loginValue}
                        onChange={this.typeLogin.bind(this)}
                    />
                    <TouchableOpacity disabled={this.esInput.call(this)} onPress={this.login.bind(this)} style={this.esInput.call(this) ? styles.loginDisBtn : styles.loginBtn}>
                        {this.state.loading ?
                            <ActivityIndicator size="large" color="#c6ddeb" />
                            :
                            <Text style={this.esInput.call(this) ? styles.loginDisBtnText : styles.loginBtnText}>Log In</Text>

                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.registerBlock}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Register')}>
                        <View style={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#949494' }}>还没有账号?</Text>
                            <Text style={{ color: '#000', marginLeft: 10 }}>注册一个</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    loginForm: {
        width: '90%'
    },
    loginBtn: {
        backgroundColor: '#3897f3',
        borderWidth: 1,
        borderColor: '#3897f3',
        borderRadius: 4,
        height: 40

    },
    loginDisBtn: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c6ddeb',
        borderRadius: 4,
        height: 40

    },
    loginBtnText: {
        color: '#fff',
        textAlign: 'center',
        lineHeight: 40
    },
    loginDisBtnText: {
        color: '#c6ddeb',
        textAlign: 'center',
        lineHeight: 40
    },
    registerBlock: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 40,
        borderTopWidth: 1,
        borderTopColor: '#dbdbdb'
    }
})
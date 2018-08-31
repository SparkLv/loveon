import React, { Component } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator, AsyncStorage } from "react-native";
import tcomb from 'tcomb-form-native';
import Toast from 'react-native-root-toast';
import Ajax from '../../common/ajax'
import JPush from 'jpush-react-native';
import { Login as styles } from '../../common/styles'
import SaveInfo from '../../common/saveInfo';

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
    static navigationOptions = ({ navigation }) => {
        return {
          header: null
        };
      };
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
        let value = JSON.parse(JSON.stringify(this.state.loginValue));
        this.setState({
            loading: true
        })
        JPush.getRegistrationID(registrationId => {
            value.pushId = registrationId;
            Ajax.login(value, (data) => {
                this.setUserInfo(data);
                this.setState({
                    loading: false
                })
            }, (data) => {
                this.toast(data.message);
                this.setState({
                    loading: false
                })
            })
        });
    }
    async setUserInfo(info) {
        await AsyncStorage.setItem('userInfo', JSON.stringify(info));
        SaveInfo.save(info, () => {
            this.props.navigation.replace('main');
        })
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
            <View style={styles.outerBox}>
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
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('register')}>
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
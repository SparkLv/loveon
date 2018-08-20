import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, ActivityIndicator } from "react-native";
import Modalbox from 'react-native-modalbox';
import tcomb from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-root-toast';

const Form = tcomb.form.Form;

Form.stylesheet.textbox.normal.paddingLeft = 10;
Form.stylesheet.textbox.normal.paddingRight = 10;
Form.stylesheet.textbox.normal.backgroundColor = '#fafafa';

var emailValid = tcomb.refinement(tcomb.String, function (val) {
  const pattern = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/g;
  return pattern.test(val);
});
emailValid.getValidationErrorMessage = function (value, path, context) {
  return '请输入正确的邮箱';
};
var Gender = tcomb.enums({
  '1': '男',
  '2': '女'
});
var Person = tcomb.struct({
  username: emailValid,
  name: tcomb.String,
  password: tcomb.String,
  sex: Gender,
});

var options = {
  auto: 'none',
  fields: {
    username: {
      placeholder: '邮箱'
    },
    name: {
      placeholder: '昵称',
      error: '请输入昵称',
    },
    password: {
      placeholder: '密码',
      error: '请输入密码',
      password: true,
      secureTextEntry: true
    }
  }
};

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerValue: {
        sex: '1'
      },
      selHeadVis: false,
      loadingImg: false,
      loadingReg: false
    }
  }
  typeRegister(val) {
    this.setState({
      registerValue: val
    })
  }
  register() {
    var value = this.refs.form.getValue();
    if (value) {
      this.setState({
        loadingReg: true
      })
      fetch('http://10.0.52.22:2420/loveon/user/register', {
        method: "post", headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.registerValue)
      })
        .then(res => res.json())
        .then(data => {
          if (data.code == '1') {
            this.toast('注册成功，请登陆');
            this.setState({
              loadingReg: false
            })
            setTimeout(() => {
              this.props.navigation.replace('Login');
            }, 4000)
          } else {
            this.toast(data.message);
            this.setState({
              loadingReg: false
            })
          }
        });
    }
  }
  esInput() {
    return !(this.state.registerValue.headImg && this.state.registerValue.username && this.state.registerValue.password && this.state.registerValue.name && this.state.registerValue.sex)
  }
  pickerHead() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      this.uploadImg(image);
    });
  }
  cameraHead() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      this.uploadImg(image);
    });
  }
  uploadImg(image) {
    const pathArr = image.path.split('/')
    const name = pathArr[pathArr.length - 1].split('.')[0] + Math.floor(Math.random());
    var photo = {
      uri: image.path,
      type: image.mime,
      size: image.size,
      name
    };
    var body = new FormData();
    body.append('file', photo);
    this.setState({
      loadingImg: true
    })
    fetch('http://10.0.52.22:2420/loveon/upload', { method: "post", body })
      .then(res => res.json())
      .then(data => {
        this.hideSelPickerModal();
        const val = JSON.parse(JSON.stringify(this.state.registerValue));
        val.headImg = `http://loveoncdn.sparklv.cn/${name}`;
        if (data.code == '1') {
          this.setState({
            registerValue: val,
            loadingImg: false
          })
        } else {
          this.toast('头像上传失败请重新上传');
          this.setState({
            loadingImg: false
          })
        }
      });
  }
  showSelPickerModal() {
    this.setState({
      selHeadVis: true
    })
  }
  hideSelPickerModal() {
    this.setState({
      selHeadVis: false
    })
  }
  toast(message) {
    Toast.show(message, {
      duration: 2000,
      position: -80,
      shadow: true,
      animation: true,
      hideOnPress: true,
    });
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#fff' }}>
        <View style={styles.headBox}>
          <TouchableWithoutFeedback
            onPress={this.showSelPickerModal.bind(this)}
          >

            {
              this.state.registerValue.headImg ?
                <Image source={{ uri: this.state.registerValue.headImg }} style={{ width: 80, height: 80, borderRadius: 40 }} /> :
                (<View>
                  <Icon name="account-circle" size={80} color='#333' />
                  <Text>点击上传头像</Text>
                </View>)
            }
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.registerForm}>
          <Form
            ref="form"
            type={Person}
            options={options}
            value={this.state.registerValue}
            onChange={this.typeRegister.bind(this)}
          />
          <TouchableOpacity disabled={this.esInput.call(this)} onPress={this.register.bind(this)} style={this.esInput.call(this) ? styles.registerDisBtn : styles.registerBtn}>
            {this.state.loadingReg ?
              <ActivityIndicator size="large" color="#c6ddeb" /> :
              <Text style={this.esInput.call(this) ? styles.registerDisBtnText : styles.registerBtnText}>Register</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.registerBlock}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')}>
            <View style={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#949494' }}>已有账号?</Text>
              <Text style={{ color: '#000', marginLeft: 10 }}>请登陆</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Modalbox
          isOpen={this.state.selHeadVis}
          onClosed={this.hideSelPickerModal.bind(this)}
          backButtonClose={true}
          position="bottom"
          style={{ height: 150 }}
        >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <TouchableWithoutFeedback
              onPress={this.pickerHead.bind(this)}
            >
              <View>
                <AwesomeIcon name="photo" size={60} color='#5ab3d8' />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={this.cameraHead.bind(this)}
            >
              <View>
                <AwesomeIcon name="camera" size={60} color='#34b87f' />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modalbox>
        <ActivityIndicator animating={this.state.loadingImg} size="large" color="#c6ddeb" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: 150,
    height: 150,
  },
  registerForm: {
    width: '90%'
  },
  registerBtn: {
    backgroundColor: '#3897f3',
    borderWidth: 1,
    borderColor: '#3897f3',
    borderRadius: 4,
    height: 40

  },
  registerDisBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c6ddeb',
    borderRadius: 4,
    height: 40

  },
  registerBtnText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 40
  },
  registerDisBtnText: {
    color: '#c6ddeb',
    textAlign: 'center',
    lineHeight: 40
  },
  registerBlock: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb'
  }
})
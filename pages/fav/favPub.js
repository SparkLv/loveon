import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Image, AsyncStorage, FlatList, Dimensions, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modalbox from 'react-native-modalbox';
import ImagePicker from 'react-native-image-crop-picker';

export default class favPub extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={() => { }} style={{ marginRight: 5 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>发布</Text>
                </TouchableOpacity>
            )
        };
    }
    constructor() {
        super();
        this.state = {
            locText: '',
            selHeadVis: false
        }
    }
    componentDidMount() {
        this.getLocFromAmap();
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
        // fetch('http://10.0.52.22:2421/loveon/upload', { method: "post", body })
        //   .then(res => res.json())
        //   .then(data => {
        //     this.hideSelPickerModal();
        //     const val = JSON.parse(JSON.stringify(this.state.registerValue));
        //     val.headImg = `http://loveoncdn.sparklv.cn/${name}`;
        //     if (data.code == '1') {
        //       this.setState({
        //         registerValue: val,
        //         loadingImg: false
        //       })
        //     } else {
        //       this.toast('头像上传失败请重新上传');
        //       this.setState({
        //         loadingImg: false
        //       })
        //     }
        //   });
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
    getLocFromAmap() {
        navigator.geolocation.getCurrentPosition(info => {
            const url = `https://restapi.amap.com/v3/geocode/regeo?key=355537cf325c4b650e2ba57a4ef631f5&location=${info.coords.longitude},${info.coords.latitude}&extensions=all`
            fetch(url).then((res) => res.json()).then((data) => {
                this.setState({
                    locText: data.regeocode.pois[0].name
                })
            })
        });
    }
    removeLoc() {
        this.setState({
            locText: ''
        })
    }
    changeLocText(val) {
        this.setState({
            locText: val
        })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", position: 'relative' }}>
                <TextInput placeholder="此刻所想..." underlineColorAndroid="transparent" multiline style={{ width: '90%', height: 150, marginTop: 10, textAlignVertical: 'top', padding: 0 }} />
                <View style={{ flexDirection: 'row', justifyContent: "space-between", position: "absolute", bottom: 10, width: '100%' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('FavLocation', { change: this.changeLocText.bind(this) }) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                <Icon name="location-arrow" color={this.state.locText ? '#1b82d1' : "#333"} size={30} />
                                <Text style={{ marginLeft: 3, marginRight: 3 }}>{this.state.locText || '选择位置'}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.removeLoc.bind(this)}>
                            <View>
                                {this.state.locText ? <Icon name="times-circle-o" color="#333" size={20} /> : null}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={this.showSelPickerModal.bind(this)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                            <Icon name="image" color="#333" size={30} />
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
                                <Icon name="photo" size={60} color='#5ab3d8' />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={this.cameraHead.bind(this)}
                        >
                            <View>
                                <Icon name="camera" size={60} color='#34b87f' />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modalbox>
            </View>
        );
    }
}
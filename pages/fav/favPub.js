import React, { Component } from "react";
import { View, Text, Image, AsyncStorage, ActivityIndicator, TextInput, TouchableWithoutFeedback, Modal, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modalbox from 'react-native-modalbox';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-root-toast';
import ImageViewer from 'react-native-image-zoom-viewer';

import Ajax from '../../common/ajax'

export default class favPub extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={navigation.getParam('submit')} style={{ marginRight: 5 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>发布</Text>
                </TouchableOpacity>
            )
        };
    }
    constructor() {
        super();
        this.state = {
            text: '',
            locText: '',
            selHeadVis: false,
            ImgDetailVis: false,
            img: [],
            urls: '',
            openImg: 0,
            pubLoading: false,
            loading: false,
            nowCount: 0,
            count: 0,
            userInfo: {}
        }
    }
    componentWillMount() {
        this.getLocFromAmap();
        this.getUserInfo();
        this.props.navigation.setParams({ submit: this.submit.bind(this) });
    }
    async getUserInfo() {
        const userInfo = await AsyncStorage.getItem('userInfo');
        this.setState({
            userInfo: JSON.parse(userInfo)
        })
    }
    textInput(val) {
        this.setState({
            text: val
        })
    }
    pickerHead() {
        ImagePicker.openPicker({
            compressImageMaxHeight: 800,
            compressImageQuality: 0.5,
            multiple: true
        }).then(image => {
            const arr = image.map(item => { return this.makePhotoImage(item) })
            this.locImg(arr);
        });
    }
    cameraHead() {
        ImagePicker.openCamera({
            compressImageMaxHeight: 800,
            compressImageQuality: 0.5,
        }).then(image => {
            this.locImg([this.makePhotoImage(image)]);
        });
    }
    makePhotoImage(image) {
        const pathArr = image.path.split('/')
        const name = pathArr[pathArr.length - 1].split('.')[0] + Math.floor(Math.random());
        var photo = {
            uri: image.path,
            type: image.mime,
            size: image.size,
            name
        };
        return photo
    }
    locImg(image) {
        this.setState({
            img: this.state.img.concat(image)
        })
        this.hideSelPickerModal();
    }
    submit() {
        let urls = '';
        this.setState({
            count: this.state.img.length,
            pubLoading: true
        }, () => {
            if (this.state.count) {
                this.state.img.forEach(item => {
                    this.uploadImg(item);
                    urls += `,http://loveoncdn.sparklv.cn/${item.name}`
                })
                this.setState({
                    urls: urls.slice(1)
                })
            }
            else {
                this.submitText();
            }
        })
    }
    uploadImg(photo) {
        var body = new FormData();
        body.append('file', photo);
        Ajax.uploadImg(body, () => {
            this.setState({
                nowCount: this.state.nowCount + 1
            }, () => {
                if (this.state.count == this.state.nowCount) {
                    this.submitText()
                }
            })
        }, () => {
            this.toast('图片上传失败请重试');
            this.setState({
                pubLoading: false
            })
        })
    }
    submitText() {
        const obj = {
            text: this.state.text,
            img: this.state.urls,
            sid: this.state.userInfo.id,
            pid: this.state.userInfo.pid,
            loc: this.state.locText
        }
        Ajax.addFav(obj, () => {
            this.toast('发布成功');
            this.setState({
                pubLoading: false
            }, () => {
                this.props.navigation.replace('fav');
            })
        }, () => {
            this.toast('发布失败');
            this.setState({
                pubLoading: false
            }, () => {
                this.props.navigation.replace('fav');
            })
        })
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
    showImgDetail(index) {
        this.setState({
            openImg: index,
        }, () => {
            this.setState({
                ImgDetailVis: true
            })
        })
    }
    hideImgDetail() {
        this.setState({
            ImgDetailVis: false
        })
    }
    delImg(index) {
        const arr = JSON.parse(JSON.stringify(this.state.img));
        arr.splice(index, 1);
        this.setState({
            ImgDetailVis: false,
            img: arr
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
            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", position: 'relative' }}>
                <TextInput value={this.state.text} onChangeText={this.textInput.bind(this)} placeholder="此刻所想..." underlineColorAndroid="transparent" multiline style={{ width: '90%', height: 150, marginTop: 10, textAlignVertical: 'top', padding: 0 }} />
                <View style={{ flexDirection: 'row', flexWrap: "wrap", borderTopColor: '#aaa', borderTopWidth: 1, width: '90%', paddingTop: 10 }}>
                    {this.state.img.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={this.showImgDetail.bind(this, index)}>
                                <View>
                                    <Image style={{ marginRight: 5, marginTop: 5, width: 75, height: 75 }} source={{ uri: item.uri }} />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                    <TouchableWithoutFeedback onPress={this.showSelPickerModal.bind(this)}>
                        <View style={{ width: 75, height: 75, marginTop: 5, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: '#ccc', borderStyle: "dotted" }}>
                            <Text style={{ color: '#ccc', fontSize: 24 }}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'row', bottom: 0, backgroundColor: '#fff', justifyContent: "flex-start", position: "absolute", width: '100%' }}>
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
                <Modalbox
                    isOpen={this.state.pubLoading}
                    backButtonClose={false}
                    position="bottom"
                    swipeToClose={false}
                    coverScreen={true}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>动态发布中请稍等...</Text>
                    </View>
                </Modalbox>
                <Modal
                    visible={this.state.ImgDetailVis}
                    transparent={true}
                    onRequestClose={this.hideImgDetail.bind(this)}
                    onDismiss={this.hideImgDetail.bind(this)}
                >
                    <ImageViewer renderHeader={(index) => {
                        return (
                            <View style={{ flexDirection: "row", width: '100%', height: 50, justifyContent: "space-between", alignItems: "center", padding: 5 }}>
                                <TouchableWithoutFeedback onPress={this.hideImgDetail.bind(this)}>
                                    <View style={{ width: 25, height: 25 }}>
                                        <Icon name="arrow-left" size={25} color="#fff" />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.delImg.bind(this, index)}>
                                    <View style={{ width: 25, height: 25 }}>
                                        <Icon name="ban" size={25} color="#fff" />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    }} imageUrls={this.state.img.map(item => { return { url: item.uri } })} index={this.state.openImg} renderIndicator={() => null
                    } />
                </Modal>
                <ActivityIndicator animating={this.state.loading} size="large" color="#06ddeb" />
            </View>
        );
    }
}
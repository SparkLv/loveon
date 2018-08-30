import React, { Component } from "react";
import {View, Text ,FlatList,TextInput, TouchableWithoutFeedback} from "react-native";
import Modalbox from 'react-native-modalbox';

export default class favLocation extends Component {
    constructor() {
        super();
        this.state = {
            posBoxVis: false,
            loc: [],
            locList: [],
            slocList: []
        }
    }
    componentWillMount() {
        this.getLocList();
        // this.keyboardHide = Keyboard.addListener('keyboardWillHide', this.blurSearch.bind(this));
    }
    componentWillUnmount() {
        // this.keyboardHide.remove()
    }
    // blurSearch() {
    //     this.sInput.blur();
    // }
    hidePosBox() {
        this.setState({
            posBoxVis: false
        })
    }
    showPosBox() {
        this.setState({
            posBoxVis: true
        }, () => {
            this.lInput.blur();
        })
    }
    getLocList() {
        navigator.geolocation.getCurrentPosition(info => {
            const loc = [info.coords.longitude, info.coords.latitude];
            this.setState({
                loc
            })
            const url = `https://restapi.amap.com/v3/geocode/regeo?key=355537cf325c4b650e2ba57a4ef631f5&location=${loc[0]},${loc[1]}&extensions=all`
            fetch(url).then((res) => res.json()).then((data) => {
                this.setState({
                    locList: data.regeocode.pois,
                })
            })
        });
    }
    selLoc(name) {
        const change = this.props.navigation.getParam('change');
        change(name);
        this.setState({
            posBoxVis: false
        })
        this.props.navigation.navigate('favPub')
    }
    searchLoc(val) {
        const url = `https://restapi.amap.com/v3/assistant/inputtips?key=355537cf325c4b650e2ba57a4ef631f5&keywords=${val}&location=${this.state.loc[0]},${this.state.loc[1]}`;
        fetch(url).then((res) => res.json()).then((data) => {
            this.setState({
                slocList: data.tips
            })
        })
    }
    _keyExtractor = (item, index) => index.toString();
    _renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={this.selLoc.bind(this, item.name)}>
                <View style={{ paddingTop: 10, paddingBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontSize: 14 }}>{item.address}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center" }}>
                <TextInput ref={(input) => { this.lInput = input }} placeholder="搜索位置" style={{ borderWidth: 1, borderColor: "#aaa", padding: 3, marginTop: 10, width: '90%' }} onFocus={this.showPosBox.bind(this)} underlineColorAndroid="transparent" />
                <FlatList
                    style={{ width: '90%', marginBottom: 10 }}
                    data={this.state.locList}
                    keyExtractor={this._keyExtractor}
                    extraData={this.state}
                    renderItem={this._renderItem}
                />
                <Modalbox
                    isOpen={this.state.posBoxVis}
                    onClosed={this.hidePosBox.bind(this)}
                    position="top"
                    backButtonClose={true}
                    coverScreen={true}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center" }}>
                        <TextInput ref={(input) => { this.sInput = input }} autoFocus onChangeText={this.searchLoc.bind(this)} placeholder="搜索位置" style={{ borderWidth: 1, borderColor: "#aaa", padding: 3, marginTop: 10, width: '90%' }} underlineColorAndroid="transparent" />
                        <FlatList
                            style={{ width: '90%', marginBottom: 10 }}
                            data={this.state.slocList}
                            keyExtractor={this._keyExtractor}
                            extraData={this.state}
                            renderItem={this._renderItem}
                        />
                    </View>
                </Modalbox>
            </View >
        );
    }
}
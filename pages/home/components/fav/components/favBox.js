import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { FavBox as styles } from '../../../../../common/styles'

export default class FavBox extends Component {
    render() {
        const isP = (this.props.item.sid == this.props.pData.id);
        const headImg = isP ? this.props.pData.headImg : this.props.userData.headImg;
        const name = isP ? this.props.pData.name : this.props.userData.name;
        return (
            <View style={styles.FavBox}>
                <Image source={{ uri: headImg }} style={styles.FavBoxHeadImg} />
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={{ fontSize: 16, color: '#000' }}>{this.props.item.text}</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", width: this.props.width - 70 }}>
                        {this.props.item.imgArr.map((url, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => { this.props.showImgDetail(this.props.item.imgArr, index) }}>
                                    <View style={{ marginRight: 5, marginBottom: 5 }}>
                                        <Image source={{ uri: url }} style={styles.FavBoxImg} />
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </View>
                    <Text style={{ fontSize: 12 }}>{this.props.item.loc}</Text>
                    <Text style={{ fontSize: 12 }}>{this.props.item.stime.split('.')[0].replace('T', ' ')}</Text>
                </View>
            </View>
        )
    }
}
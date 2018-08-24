import React, { Component } from "react";
import { Modal } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ImgDetail extends Component {
    constructor() {
        super();
        this.state = {
            imgDetailVis: false,
            openImg: 0,
            openImgArr: []
        }
    }
    componentWillReceiveProps(next) {
        const { imgDetailVis, openImg, openImgArr } = next;
        this.setState({ imgDetailVis, openImg, openImgArr })
    }
    render() {
        return (
            <Modal
                visible={this.state.imgDetailVis}
                transparent={true}
                onRequestClose={this.props.hideImgDetail}
                onDismiss={this.props.hideImgDetail}
            >
                <ImageViewer
                    onClick={this.props.hideImgDetail}
                    imageUrls={this.state.openImgArr.map(item => { return { url: item } })}
                    index={this.state.openImg}
                    renderIndicator={() => null
                    } />
            </Modal>
        );
    }
}
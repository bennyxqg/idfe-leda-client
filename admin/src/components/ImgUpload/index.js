import React, { Component } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadImgUrl } from '@/http/hcommon'

function getBase64(img, callback) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if(callback && typeof callback === 'function') {
        callback(reader.result)
      }
      resolve(reader.result)
    });
    reader.readAsDataURL(img);
  })
  
}

class ImgUpload extends React.Component {
  state = {
    loading: false,
    extraParams: { // 额外参数
      token: localStorage.token || ''
    }
  };

  beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    // const base64Data = await getBase64(file)
    // this.setState({
    //   extraParams: Object.assign({}, this.state.extraParams, {img: base64Data})
    // })
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        })
      });
      this.props.successCB(info.file.response);
    }
  };

  render() {
    console.log('---imageUrl--', this.props.imgUrl)
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">选择图片</div>
      </div>
    );
    const { imageUrl, extraParams } = this.state;
    let imgUrl = imageUrl?imageUrl:(this.props.imgUrl?this.props.imgUrl:'')
    return (
      <Upload
        name="img"
        listType="picture-card"
        className="avatar-uploader"
        data={extraParams}
        showUploadList={false}
        action={uploadImgUrl}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imgUrl ? <img src={imgUrl} alt="img" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default ImgUpload
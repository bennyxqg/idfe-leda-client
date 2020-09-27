import React from 'react';
import { Upload, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadImgUrl } from '@/http/hcommon'
import './index.scss'

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
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    extraParams: { // 额外参数
      token: localStorage.token || '',
      site_id: localStorage.currentSiteId
    },
    fileList: []
  };

  componentWillReceiveProps(nextProps) {
    this.handleFileList(nextProps)
  }

  handleFileList = (props) => {
    const fileListTemp = []
    if(props.value || props.imgUrl) {
      let url = props.value || props.imgUrl
      let name = url.substring(url.lastIndexOf('/') + 1)
      fileListTemp.push({
        uid: '-1',
        name,
        status: 'done',
        url
      })
    }
    this.setState({
      fileList: fileListTemp
    })
  }

  beforeUpload = async (file) => {
    return new Promise((resolve, reject) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'  || file.type === 'image/gif';
      if (!isJpgOrPng) {
        message.error('仅支持jpg、png、gif的图片格式!');
      }
      const maxSize = 2;
      const isLt2M = file.size / 1024 / 1024 < maxSize;
      if (!isLt2M) {
        message.error('图片必须小于 ' + maxSize + 'MB!');
      }
      // const base64Data = await getBase64(file)
      // this.setState({
      //   extraParams: Object.assign({}, this.state.extraParams, {img: base64Data})
      // })
      if(isJpgOrPng && isLt2M) {
        resolve()
      } else {
        reject()
      }
    })
  }

  handleChange = info => {
    console.log('-----info-----', info)
    this.setState({
     loading: false,
     fileList: info.fileList
    })
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl => {
      //   this.setState({
      //     loading: false,
      //     fileList: info.fileList
      //   })
      // });
      if(this.props.successCB) {
        this.props.successCB(info.file.response);
      }
      if(this.props.onChange) {
        if(info.file.response && info.file.response.data && info.file.response.data.url) {
          this.props.onChange(info.file.response.data.url);
        } else {
          this.props.onChange('');
        }
      }
    }
  };

  handleRemove = () => {
    console.log('------handleRemove---')
    this.setState({
      fileList: []
    })
    if(this.props.onChange) {
      this.props.onChange('');
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">选择图片</div>
      </div>
    );
    const { extraParams, previewVisible, previewImage, fileList, previewTitle } = this.state;
    // let imgUrl = ''
    // if(imageUrl) {
    //   imgUrl = imageUrl
    // } else if(this.props.imgUrl) {
    //   imgUrl = this.props.imgUrl
    // } else if(this.props.value) {
    //   imgUrl = this.props.value
    // }
    return (
      <div className="img-uploader-wrapper">
        <Upload
          name="img"
          listType="picture-card"
          className="avatar-uploader"
          data={extraParams}
          fileList={fileList}
          // showUploadList={false}
          action={uploadImgUrl}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
        >
          {/* {imgUrl ? <img src={imgUrl} alt="img" style={{ width: '100%' }} /> : uploadButton} */}
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {/* {
          this.state.loading? (
            <div className="img-uploader-loading">
              <LoadingOutlined className="img-uploader-loading-icon" />
            </div>
          ): ''
        }
        {
          imgUrl && <div className="img-uploader-btn">

          </div>
        } */}
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
      
    );
  }
}

export default ImgUpload
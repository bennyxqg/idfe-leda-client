import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { uploadImgUrl } from '@/http/hcommon'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    extraParams: { // 额外参数
      token: localStorage.token || ''
    },
    previewImage: '',
    previewTitle: '',
    fileList: this.props.value || [],
    urlList: []
    // fileList: [
    //   {
    //     uid: '-1',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-2',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-3',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-4',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   }
    // ],
  };

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

  handleChange = (info) => {
    const { fileList } = info
    this.setState({ fileList })
    if (info.file.status === 'done') {
      if(this.props.onChange) {
        if(info.file.response && info.file.response.data && info.file.response.data.url) {
          this.setState({ urlList: [...this.state.urlList, info.file.response.data.url] }, () => {
            this.props.onChange(this.state.urlList, info.file.response.data.url);
          })      
        } else {
          this.props.onChange(this.state.urlList);
        }
      }
    }
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle, extraParams } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          name="img"
          action={uploadImgUrl}
          data={extraParams}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
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

export default PicturesWall
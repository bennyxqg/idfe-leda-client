import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Modal, message } from 'antd';
// import MYURL from '../api/config';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);

class Editer extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    this.selectImage = this.selectImage.bind(this);
    this.changeImageBeforeUpload = this.changeImageBeforeUpload.bind(this);
    this.uploadForImage = this.uploadForImage.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
    this.showUploadBox = this.showUploadBox.bind(this);
    this.hideUploadBox = this.hideUploadBox.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange(value) {
    // if (value) ReactQuill.getSelection().dangerouslyPasteHTML(value);
    this.setState({ text: value })
  };
  modules = {//富文本配置
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],        // toggled buttons
        ['blockquote', 'code-block'],
        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        'image': this.showUploadBox.bind(this)
      }
    },
    imageDrop: true,
  };
  showUploadBox() {
    this.setState({
      uploadBoxVisible: true
    });
  };
  hideUploadBox() {
    this.setState({
      uploadBoxVisible: false
    });
  };

  selectImage() {
    this.refs.uploadInput.click();//点击modal的html结构中的input标签
  };

  changeImageBeforeUpload(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    let src;
    // 匹配类型为image/开头的字符串
    if (file.type === "image/png" || file.type === "image/jpeg") {
      src = URL.createObjectURL(file);
    } else {
      message.error("图片上传只支持JPG/PNG格式,请重新上传！");
      return;
    }
    if (file.size / 1024 / 1024 > 5) {
      message.error("图片上传大小不要超过5MB,请重新上传！");
      return;
    }
    this.setState({
      src: src,
      file: file
    })
    console.log('eeeeeee', window)
  }
  /*3.开始上传图片*/
  handleUpload() {
    let this_ = this;
    /*调用上传图片的封装方法*/
    if (!this.state.file) {
      alert('请选择图片！！')
    } else {
      let fileServerAddr = '' //MYURL.fileServer //服务器地址
      let file = this.state.file.name
      let size = this.state.file.size
      this.uploadForImage(fileServerAddr, file, size, function (response) {//回调函数处理进度和后端返回值
        console.log('res----?>', response)
        if ((response && response.status === 200) || (response && response.status === "200")) {
          message.success("上传成功！");
          this_.hideUploadBox();//隐藏弹框
          console.log("response.data.url???=>", response.data.url)
          this_.imageHandler(response.data.url);//处理插入图片到编辑器
        } else if (response && response.status !== 200) {
          message.error(response.msg)
        }
      },
        localStorage.getItem("access_token"));
    }

  };
  uploadForImage(url, data, size, callback, token) {//data是数据列表
    if (!data) {
      alert('请选择图片！！')
      console.log('未选择文件');
      return;
    } else {
      let xhr = new XMLHttpRequest();
      let formdata = new FormData();
      formdata.append('file', data);
      formdata.append('fileSize', size);
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.statusn === '200') {
          let response = JSON.parse(xhr.response)
          console.log('res====', response)
          callback(response);
        }
      };
      // xhr.open('POST', url, true);  // 第三个参数为async?，异步/同步
      xhr.open('GET', url, true);  // 第三个参数为async?，异步/同步
      xhr.setRequestHeader("accessToken", token);
      xhr.send(formdata);
    }

  }
  /*4.处理图片插入*/
  imageHandler(url) {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    const quill = this.reactQuillRef.getEditor()
    var range = quill.getSelection();
    let index = range ? range.index : 0;
    quill.insertEmbed(index, "image", url, Quill.sources.USER);//插入图片
    quill.setSelection(index + 1);//光标位置加1 
    console.log("quill.getSelection.======", quill.getSelection().index)
  };
  render() {
    return (
      <div style={{ maxHeight: "500px" }}>
        <ReactQuill id="ddd" ref={(el) => { this.reactQuillRef = el }} value={this.state.text} onChange={this.handleChange}
          theme={"snow"} modules={this.modules} style={{ height: "300px" }} />
        <Modal
          title="上传图片"
          visible={this.state.uploadBoxVisible}
          onCancel={this.hideUploadBox}
          onOk={this.handleUpload}
          maskClosable={false}
          width={500}
        >
          <div className="ImagaBox" >
            <div>
              <Button onClick={this.selectImage.bind(this)} style={{ background: "#18ade4", border: "none", color: "#fff" }}>
                选择图片
              </Button>
              <input ref="uploadInput" type='file' accept='image/*'
                style={{ width: "100px", border: "none", visibility: "hidden" }}
                onChange={this.changeImageBeforeUpload.bind(this)}
              />
            </div>
            <div style={{ textAlign: "center", margin: "10px 0" }}>
              {this.state.src ?
                <img src={this.state.src} alt="" style={{ maxWidth: "100%", height: "300px" }} />
                :
                <div style={{ background: "#f2f2f2", width: "100%", height: "300px" }}></div>
              }
            </div>
          </div>
        </Modal>
      </div>
    )
  }
};
export default Editer;
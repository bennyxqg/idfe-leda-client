import React, { Component } from 'react';
import { message } from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import './index.less'
import { uploadImgUrl } from '@/http/hcommon'

class Editer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: BraftEditor.createEditorState(this.props.value || null),
      mediaBaseconfig: {
        // 文件限制
        accepts: {
          image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
          audio: false,
          video: false
        },
        //允许插入的外部媒体的类型
        externals: {
          // 是否允许插入外部图片，
          image: true,
          // 是否允许插入外部视频，
          video: false,
          // 是否允许插入外部视频，
          audio: false,
          // 是否允许插入嵌入式媒体，例如embed和iframe标签等，
          embed: false
        },
        uploadFn: this.myUploadFn
      },
      extendControls: [
        // 'separator',
        // {
        //     key: 'my-button', // 控件唯一标识，必传
        //     type: 'button',
        //     title: '这是一个自定义的按钮', // 指定鼠标悬停提示文案
        //     className: 'my-button', // 指定按钮的样式名
        //     html: null, // 指定在按钮中渲染的html字符串
        //     text: 'Hello', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
        //     onClick: () => {
        //         console.log('Hello World!');
        //     },
        // }
        // {
        //   key: 'insert-text',
        //   type: 'button',
        //   text: '插入自定义文本',
        //   onClick: this.insertText
        // }
    ]
      // uploadFn: () => {

      // }
    }
  }

  insertText = () => {
    this.setState({
      editorState: ContentUtils.insertText(this.state.editorState, 'Hello World!')
    })
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  submitContent = e => {
    const htmlContent = this.state.editorState.toHTML()
    return htmlContent
  }

  myUploadFn = (param) => {
    const serverURL = uploadImgUrl()
    const xhr = new XMLHttpRequest
    const fd = new FormData()
  
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      
      const responseData = JSON.parse(xhr.responseText)
      param.success({
        url: responseData.data.url,
        meta: {
          id: param.id,
          title: param.file.name,
          alt: param.file.name,
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      })
    }
  
    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }
  
    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }
  
    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)
  
    fd.append('img', param.file)
    fd.append('token', localStorage.token || '')
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  
  }

  isImageFile = (file, fileTypes) => {
    const types = fileTypes || [
      "image/png",
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/bmp",
      "image/x-icon",
      "image/webp",
      "image/apng",
      "image/svg"
    ];
  
    const isImage = types.includes(file.type);
    if (!isImage) {
      message.error("上传文件非图片格式!");
      return false;
    }
    return true
  }
  maxFileSize = (file, fileMaxSize = 2) => {
    const isMaxSize = file.size / 1024 / 1024 < fileMaxSize;
    if (!isMaxSize) {
      message.error("上传头像图片大小不能超过 " + fileMaxSize + "MB!");
      return false;
    }
    return true;
  }

  render() {
    const { editorState, mediaBaseconfig, extendControls} = this.state
    // 不显示控件
    const excludeControls = ['emoji', 'hr', 'code']

    // 媒体库相关配置
    const mediaOption = {
      ...mediaBaseconfig
    }
    return (
      <div className="editor-wrapper">
        <BraftEditor
          placeholder="请输入正文内容"
          excludeControls={excludeControls}
          value={editorState}
          media={mediaOption}
          extendControls={extendControls}
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
};
export default Editer;
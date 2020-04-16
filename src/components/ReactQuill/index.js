import React, { Component } from 'react';
import { message } from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import './index.less'

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
        }
      },
      // uploadFn: () => {

      // }
    }
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  submitContent = e => {
    const htmlContent = this.state.editorState.toHTML()
    return htmlContent
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
    const { editorState, mediaBaseconfig} = this.state
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
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
};
export default Editer;
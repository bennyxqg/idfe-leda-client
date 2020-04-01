import React, { Component } from 'react';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import './index.less'

class Editer extends Component {
  constructor(props){
    super(props)
    this.state = {
      editorState: BraftEditor.createEditorState(this.props.value || null)
    }
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  submitContent = e => {
    const htmlContent = this.state.editorState.toHTML()
    return htmlContent
  }
  
  render(){
    const { editorState } = this.state
    // 不显示控件
    const excludeControls = ['emoji', 'hr','code']
    return (
      <div className="editor-wrapper">
        <BraftEditor
          placeholder="请输入正文内容"
          excludeControls={excludeControls}
          value={editorState}
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
};
export default Editer;
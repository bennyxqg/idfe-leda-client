import React, { Component } from 'react';
import { Select, Form, Input, Button, Radio, Upload, Modal} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Editor from '@src/components/ReactQuill'
import './index.less'
const { Option } = Select;
const { TextArea } = Input;

class index extends Component {
  state = {
    loading: false,
    imageUrl: '',
    visible: false
  }
  componentDidMount() {
    console.log(this.props.history.location);
  }
  onChange(value) {
    console.log(value)
  }
  onFinish = (value) => {
    console.log('提交表单' + value)
  }
  showEditor = e => {
    this.setState({
      visible: true,
    })
  }
  handleOk = e =>{
    console.log(this.editor.submitContent())
  }
  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="detail">
        <Form
          name='normal_new'
          className='new-form'
          onFinish={this.onFinish}
        >
          <Form.Item>
            <Select
              showSearch
              allowClear
              placeholder="搜索新闻标题"
              optionFilterProp="children"
              onChange={this.onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: '请输入用户名!'
              }
            ]}
          >
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>悬念站首页新闻</Radio>
              <Radio value={2}>开发者博客图文</Radio>
              <Radio value={3}>开发者博客后续新增栏目</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="新闻标题"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="新闻摘要"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="缩略图(电脑端)"
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label="缩略图(手机端)"
          >
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
          <Form.Item
            label="新闻详情"
          >
            <Button type='primary' onClick={this.showEditor}>编辑</Button>
          </Form.Item>
          <Form.Item>
            <div className="btns">
              <Button>取消</Button>
              <Button type='primary' htmlType='submit'>保存</Button>
            </div>
          </Form.Item>
        </Form>

        <Modal
          title="新闻内容"
          width="50%"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Editor
              value={'这是内容'} 
              ref={e => {
                  this.editor = e;
              }}
          />
        </Modal>
      </div>
    );
  }
}

export default index;
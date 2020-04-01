import React, { Component } from 'react';
import { Select, Form, Input, Button, Radio, Upload} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

class index extends Component {
  state = {
    loading: false,
    imageUrl: ''
  }
  componentDidMount() {
    console.log(this.props.history.location);
  }
  onChange(value) {
    console.log(value)
  }
  onFinish(value) {
    console.log('提交表单' + value)
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
          name='normal_login'
          className='login-form'
          onFinish={(value) => { this.onFinish(value) }}
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
          <Form.Item>
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>悬念站首页新闻</Radio>
              <Radio value={2}>开发者博客图文</Radio>
              <Radio value={3}>开发者博客后续新增栏目</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="新闻标题"
          >
            <Input
              placeholder='用户名'
            />
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
          <Form.Item></Form.Item>
          <Form.Item></Form.Item>
          <Form.Item></Form.Item>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: '请输入用户名!'
              }
            ]}
          >
            <Input
              placeholder='用户名'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: '请输入密码!'
              }
            ]}
          >
            <Input
              type='password'
              placeholder='密码'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              登录
								</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default index;
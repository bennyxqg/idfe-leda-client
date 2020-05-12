import React, { Component } from 'react';
import { Select, Form, Input, Button, Radio, Upload, Modal, message} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Editor from '@/components/ReactQuill'
import ImgUpload from '@/components/ImgUpload'
import { addNews, editNews, newsCateList, newsDetail } from '@/http/hnews'
import { getQueryVariable } from '@/utils/helper'
import lodash from 'lodash'
import './index.less'
const { Option } = Select;
const { TextArea } = Input;

class index extends Component {
  state = {
    loading: false,
    imageUrl: '',
    visible: false,
    id: '',
    formParams: {
      editorContent: '',
      small_url: '',
      big_url: '',
      news_categories_id: '',
      title: '',
      decription: ''
    },
    newsCateData: []
  }
  componentDidMount() {
    console.log(this.props.history.location);
    this.getNewsCateList()
    this.getNewsInfo()
  }

  // 获取详情
  getNewsInfo() {
    const id = getQueryVariable('id', this.props.location.search)
    if(!id) return
    this.setState({id})
    newsDetail({id}).then((rep) => {
			if(rep.error_code === 0) {
        this.setState({
          formParams: Object.assign({}, this.state.formParams, {
            editorContent: rep.data.content,
            small_url: rep.data.small_url,
            big_url: rep.data.big_url,
            news_categories_id: rep.data.news_categories_id,
            title: rep.data.title,
            decription: rep.data.decription
          })
        })
        this.refs.editForm.setFieldsValue({
          news_categories_id: rep.data.news_categories_id,
          title: rep.data.title,
          decription: rep.data.decription
        })
      } else {
        message.error(rep.msg);
      }
    })
  }

  getNewsCateList() {
    newsCateList().then((rep) => {
			if(rep.error_code === 0) {
        const data = rep.data
        const tableList = []
        Object.keys(data).forEach((key) => {
          tableList.push({
            id: key,
            name: data[key],
            key
          })
        })
        this.setState({
          'newsCateData': tableList
        })
			}
		})
  }

  onChange(value) {
    console.log(value)
  }
  onFinish = (value) => {
    const sendData = lodash.cloneDeep(value)
    sendData.content = this.state.formParams.editorContent
    sendData.big_url = this.state.formParams.big_url
    sendData.small_url = this.state.formParams.small_url
    // sendData.decription = sendData.decription || ''
    if(!sendData.big_url) {
      message.error('请上传缩略图(电脑端)');
      return
    }
    if(!sendData.small_url) {
      message.error('请上传缩略图(手机端)');
      return
    }
    if(!sendData.content) {
      message.error('请编辑新闻详情');
      return
    }
    let reqFunc = addNews
    if(this.state.id) {
      reqFunc = editNews
      sendData.id = this.state.id
    }
    reqFunc(sendData).then((rep) => {
      if(rep.error_code === 0) {
        message.success('操作成功');
        this.props.history.push('/new')
      } else {
        message.error('操作失败');
      }
    })
  }
  showEditor = e => {
    this.setState({
      visible: true,
    })
  }
  // 确认富文本的内容
  handleEditorContent = e =>{
    console.log(this.editor.submitContent())
    this.setState({
      visible: false
    })
    this.setState({
      formParams: Object.assign({}, this.state.formParams, {
        editorContent: this.editor.submitContent()
      })
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }

  // 上传成功
  uploadSuccess = (val, type) => {
    console.log('-----uploadSuccess------', val.data.url, type)
    let data = {}
    if(type === 'pc_pic') {
      data = {
        'big_url': val.data.url
      }
    } else if(type === 'phone_pic'){
      data = {
        'small_url': val.data.url
      }
    }
    this.setState({
      formParams: Object.assign({}, this.state.formParams, data)
    })
  }

  goBack = () => {
    this.props.history.go(-1)
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { imageUrl, newsCateData } = this.state;
    // this.refs.editForm.setFieldsValue
    // formParams: {
        //   editorContent: '',
        //   small_url: '',
        //   big_url: '',
        //   news_categories_id: '',
        //   title: '',
        //   decription: ''
        // },
    let initialValues = {}
    return (
      <div className="shadow-radius">
      <div className="detail">
        <Form
          name='normal_new'
          className='new-form'
          initialValues={initialValues}
          hideRequiredMark={true}
          onFinish={this.onFinish}
          ref='editForm'
        >
          {/* <Form.Item>
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
          </Form.Item> */}
          <Form.Item
            label="新闻栏目"
            name="news_categories_id"
            rules={[
              {
                required: true,
                message: '请输入用户名!'
              }
            ]}
          >
            <Select>
              {
                newsCateData.map(item => (
                  <Select.Option key={item.key} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="新闻标题"
            name="title"
            rules={[{required: true,message: '请输入新闻标题!'}]}
          >
            {/* {
                getFieldDecorator('title',{
                    initialValue:userInfo.username
                })(
                    <Input type="text" placeholder="请输入姓名"/>
                )
            } */}
            <Input />
          </Form.Item>
          <Form.Item
            label="新闻摘要"
            name="decription"
            // rules={[{required: true,message: '请输入新闻摘要!'}]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="缩略图(电脑端)"
            name="big_url"
          >
            <ImgUpload 
              imgUrl={this.state.formParams.big_url}
              successCB={(val) => {this.uploadSuccess(val, 'pc_pic')}}></ImgUpload>
          </Form.Item>
          <Form.Item
            label="缩略图(手机端)"
            name="small_url"
          >
            <ImgUpload 
              imgUrl={this.state.formParams.small_url}
              successCB={(val) => {this.uploadSuccess(val, 'phone_pic')}}></ImgUpload>
          </Form.Item>
          <Form.Item
            label="新闻详情"
          >
            <Button type='primary' onClick={this.showEditor}>编辑</Button>
          </Form.Item>
          <Form.Item>
            <div className="btns">
              <Button onClick={this.goBack}>取消</Button>
              <Button type='primary' htmlType='submit'>保存</Button>
            </div>
          </Form.Item>
        </Form>

        <Modal
          title="新闻内容"
          width="50%"
          visible={this.state.visible}
          onOk={this.handleEditorContent}
          onCancel={this.handleCancel}
        >
          <Editor
              value={this.state.formParams.editorContent} 
              ref={e => {
                  this.editor = e;
              }}
          />
        </Modal>
      </div>
      </div>
    );
  }
}

// index = Form.create({})(index);

export default index;
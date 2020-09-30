import React, { Component } from 'react'
import { Table, Row, Col, Button, Input, Form, message, Modal } from 'antd';
import InfoItem from './Comp/InfoItem'
import AddModal from './Comp/AddModal'
import { basicConfigList } from '@/http/hwebInfo'
import GlobalContext from "@/views/layout/GlobalContext";
import { editBasicConfig, delBasicConfig } from '@/http/hwebInfo'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {cloneDeep} from 'lodash'
import './home.less'

const { TextArea } = Input;

export default class index extends Component {
  static contextType = GlobalContext;
  state = {
    list: [],
    addModalVisible: false,
    tableData: [],
		allNewsList: [],
		columns: [
			{
				title: '名称',
        dataIndex: 'title',
        width: 200,
			},
			{
				title: '字段',
        dataIndex: 'Abbr',
        width: 200,
			},
			{
				title: '配置值',
				dataIndex: 'content',
				render: (text, record, index) => (
					<div>
            {
              !record.isEdit?
              <div>{record.content}</div>:
              <div>
                <TextArea defaultValue={record.content} 
                  onChange ={(event) => {
                    event.persist()
                    this.handleContent(event, record, index)
                  }}
                  rows={2} />
              </div>
            }
					</div>
				)
			},
			{
				title: '操作',
				dataIndex: 'action',
				align: 'center',
				width: 180,
				render: (text, record, index) => (
					<div className="btns">
						<Button size='small' onClick={() => {this.saveOrEdit(record, index)}} style={{marginRight: '4px'}} type='primary' className='button'>{record.isEdit?'保存':'编辑'}</Button>
            <Button size='small' onClick={() => {this.delItem(record, index)}}  className='button'>删除</Button>
					</div>
				)
			},
		]
  }

  contentData = {}

  componentWillMount() {
    // this.fetch();
    // setTimeout(() => {
    //   this.context.setUserInfo('test name')
    // }, 5000)
    this.getListData()
  }

  getListData = () => {
    this.contentData = {}
    basicConfigList().then((rep) => {
      if(rep.error_code === 0) {
        rep.data.forEach((item) => {
          item.isEdit = false
        })
        this.setState({
          tableData: rep.data
        })
      }
    })
  }
  
  handleAdd = () => {
    this.setState({addModalVisible: true})
  }

  addModalChange = (val) => {
		this.setState({addModalVisible: val})
  }
  
  addSuccess = () => {
    this.getListData()
  }

  // 改变content的值
  handleContent = (event, record, index) => {
    this.contentData[record.id] = event.target.value
  }

  saveData = (record, index) => {
    const sendData = cloneDeep(record)
    sendData.content = ''
    if(typeof this.contentData[record.id] !== 'undefined') {
      if(this.contentData[record.id] == '') {
        message.error('配置值不能为空');
        return
      } else {
        sendData.content = this.contentData[record.id]
      }
    } else {
      if(record.content) {
        sendData.content = record.content
      } else {
        message.error('配置值不能为空');
        return
      }
    }
    editBasicConfig(sendData).then((rep) => {
      if(rep.error_code === 0) {
        this.state.tableData[index].isEdit = !record.isEdit
        this.state.tableData[index].content = sendData.content
        this.setState({
          tableData: this.state.tableData
        })
        message.success('操作成功');
      }
    })
  }

  saveOrEdit = (record, index) => {
    if(!record.isEdit) {
      this.state.tableData[index].isEdit = !record.isEdit
      this.setState({
        tableData: this.state.tableData
      })
    } else {
      this.saveData(record, index)
    }
  }

  delItem = (record, index) => {
    Modal.confirm({
      title: '确认删除吗？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
				delBasicConfig({
          id: record.id
        }).then((rep) => {
          if(rep.error_code === 0) {
            message.success('操作成功');
            this.getListData()
          }
        })
      }
    })
  }
  
  render() {
    const { loading, columns, tableData } = this.state
    return (
      <div className="shadow-radius">
        <div style={{marginBottom: '10px', textAlign: 'right'}}>
          <Button type="primary" onClick={this.handleAdd}>
              新增
          </Button>
        </div>
        <Table loading={loading} 
					columns={columns} dataSource={tableData} rowKey="id" bordered="true" pagination={false} />
        {
					this.state.addModalVisible && (
						<AddModal
              modalChange={this.addModalChange}
              successCB={this.addSuccess}
						/>
					)
				}
      </div>
    )
  }
}

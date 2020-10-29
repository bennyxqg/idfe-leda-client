import React from 'react';
import { Table, Button, Form, Select, Input, DatePicker, Modal, message } from 'antd';
import './index.less'
import { messagePage, dealMessage } from '@/http/hmessages'
import { formatTime } from '@/utils/helper'
import {cloneDeep} from 'lodash'
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from 'moment'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
class Index extends React.Component {
    formRef = React.createRef();
    confirmFormRef = React.createRef();
    state = {
        visible: false,
        pagination: {
            pageSize: 10,
            current: 1
        },
        loading: false,
        tableData: [],
        columns: [
            {
                title: '头像',
                dataIndex: 'pic',
                width: 80,
                render: (text, record) => (<img src={record.user_avatar} className="pic" alt="" />)
            },
            {
                title: '玩家信息',
                dataIndex: 'action',
                render: (text, record) => (
                    <div className="info">
                        {
                            record.status != 2?(
                                <div>
                                    <p className="player"><b>{record.user_name}</b> 的留言</p>
                                    <p className="text word-break" dangerouslySetInnerHTML={{ __html: record.message }}></p>
                                </div>
                            ):(
                                <div>
                                    <div>回复了<b>{record.user_name}</b>的留言</div>
                                    {
                                        record.reply_info.map((reply, index) => {
                                            return (
                                            <div key={index}>（{reply.answer_name}--{formatTime(reply.answer_time)}）回复内容：<span className="word-break" dangerouslySetInnerHTML={{ __html: reply.answer_content }}></span>
                                                <span onClick={() => {this.cancelReply(record, index)}} style={{color: '#2469F2', marginLeft: '4px', cursor: 'pointer'}}>撤销</span>
                                            </div>
                                            )
                                        })
                                    }
                                    <div>{record.user_name}：
                                    <span className="word-break" dangerouslySetInnerHTML={{ __html: record.message }}></span>
                                    </div>
                                </div>
                            
                                
                            )
                        }
                    </div>
                )
            },
            {
                title: '发布时间',
                dataIndex: 'created',
                width: 160,
				render: (text, record) => (
					<span>{formatTime(text) || '--'}</span>
				)
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 80,
                render: (status) => (
                    <>
                        {this.statusHtml(status)}
                    </>
                )
            },
            {
                title: '操作',
                dataIndex: 'action',
                align: 'center',
                width: 400,
                render: (text, record) => (
                    <div className="btns">
                        {this.actionHtml(record)}
                    </div>
                )
            },
        ]
    }
    statusHtml = e => {
        e = parseInt(e)
        let html = ''
        switch (e) {
            case -1:
                html = '已删除'
                break;
            case 0:
                html = '待审核'
                break;
            case 1:
                html = '已通过'
                break;
            case 2:
                html = '已回复'
                break;
            default:
                html = '未知'
        }
        return html
    }
    actionHtml = e => {
        if (e.status == 0) { // 未审核
            return (
                <>
                    <Button size='small' type="primary" onClick={() => this.handleAction(e, 1)} >通过</Button>
                    <Button size='small' type="primary" danger onClick={() => this.handleAction(e, -1)}>删除</Button>
                </>
            )
        } else if (e.status == -1) { // 删除
            return (
                <>
                    <Button size='small' type="primary" onClick={() => this.handleAction(e, 0)}>撤销操作</Button>
                </>
            )
        } else if (e.status == 1) { // 已通过
            return (
                <>
                    <Button size='small' type="primary" onClick={() => this.handleAction(e, 0)}>撤销操作</Button>
                    <Button size='small' type="primary" onClick={() => this.handleAction(e, 2)}>回复</Button>
                </>
            )
        } else if (e.status == 2) { // 已回复
            return (
                <>
                    {/* <Button size='small' type="primary" onClick={() => this.handleAction(e, 1)}>撤销回复</Button> */}
                    <Button size='small' type="primary" onClick={() => this.handleAction(e, 2)}>回复</Button>
                </>
            )
        }
    }
    componentWillMount() {
		this.getPageList(1)
    }
    // 获取分页数据
    getPageList(pageNum) {
        let searchData = {}
        if(this.formRef.current) {
            searchData = cloneDeep(this.formRef.current.getFieldsValue()) 
            
            if(searchData.timeRange && searchData.timeRange.length === 2) {
                searchData.start_time = Math.round(moment(searchData.timeRange[0].format('YYYY-MM-DD') + ' 00:00:00').valueOf() / 1000)
                searchData.end_time = Math.round((moment(searchData.timeRange[1].format('YYYY-MM-DD') + ' 23:59:59').valueOf())/1000)
            }
            delete searchData.timeRange
        }
		// const pageNum = this.state.pagination.current
		let sendData = {
			page: pageNum,
            is_deal: 0
        }
        sendData = Object.assign({}, sendData, searchData)
        // 更新column表头内容
        // this.setColumns(sendData.is_deal)

		messagePage(sendData).then((rep) => {
			if(rep.error_code === 0) {
				if(rep.data && rep.data.list && rep.data.list.length) {
					this.setState({'tableData': rep.data.list})
                    this.setState({'pagination': Object.assign({}, this.state.pagination, {total: 10 * rep.data.total_page})})
				} else {
					this.setState({'tableData': []})
					if(pageNum != 1) {
                        this.getPageList(1)
                        this.setState({'pagination': Object.assign({}, this.state.pagination, {current: 1})})
					} else {
                        this.setState({'pagination': Object.assign({}, this.state.pagination, {total: 0})})
                    }
				}
			}
		})
    }
    
    setColumns = (is_deal) => {
        if(is_deal == 2) {
            // const columns = this.state.columns
            // columns.splice(2, 1, {
            //     title: '回复时间',
            //     dataIndex: 'answer_time',
            //     render: (text, record) => (
            //         <span>{formatTime(text) || '--'}</span>
            //     )
            // })
            // this.setState({
            //     columns
            // })
        } else {
            // const columns = this.state.columns
            // columns.splice(2, 1, {
            //     title: '发布时间',
            //     dataIndex: 'created',
            //     render: (text, record) => (
            //         <span>{formatTime(text) || '--'}</span>
            //     )
            // })
            // this.setState({
            //     columns
            // })
        }
        
    }

    // 撤销回复
    cancelReply = (row, index) => {
        Modal.confirm({
            title: '确认操作',
            content: '确认撤销回复吗',
            okText: '确认',
            cancelText: '取消',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                return new Promise((resolve, reject) => {
                    const rowTemp = Object.assign({}, row)
                    let reply_info = cloneDeep(rowTemp.reply_info)
                    if(reply_info && Array.isArray(reply_info)) {
                        if(reply_info.length <= 1) {
                            reply_info = ''
                        } else {
                            reply_info.splice(index, 1)
                        }
                    } else {
                        reply_info = ''
                    }
                    if(reply_info) {
                        rowTemp.reply_info = JSON.stringify(reply_info)
                    } else {
                        rowTemp.reply_info = ''
                    }   
                    this.dealReq(rowTemp, -2)
                    resolve()
                })
            }
        });
        

    }

    onFinish = e => {
        this.getPageList(this.state.pagination.current)
    }
    handleDel(row) {
        console.log(row)
    }
    handleTableChange(page) {
        console.log('跳转页数' + page)
        this.setState({'pagination': Object.assign({}, this.state.pagination, {current: page})})
		this.getPageList(page)
    }
    onShowSizeChange(current, pageSize) {
        console.log(current, pageSize)
    }
    onChange() {

    }
    handleAction = (row, type) => {
        console.log(row, type)
        let tipsText = ''
        let content = ''
        if(type === 1 && row.status != 2) { // 通过
            tipsText = '通过'
        } else if(type === -1) { // 删除
            tipsText = '删除'
        } else if(type === 2) { // 已回复
            tipsText = '置顶'
        } else if(type === 0) { // 撤销操作
            tipsText = '撤销操作'
        } else if(type === 1 && row.status == 2) { // 撤销回复
            tipsText = '撤销回复'
        }
        content = '确认'+tipsText+'吗？'
        if(type === -1) {
            content = (
                <div>
                    <Form
                        ref={this.confirmFormRef}
                    >
                        <Form.Item
                            label=""
                            name="delete_reason"
                            rules={[{ required: true, message: '请输入删除原因' }]}
                        >
                            <TextArea rows={4} 
                                
                                placeholder="请输入删除原因" />
                        </Form.Item>

                        
                    </Form>
                </div>
            )
        } else if(type === 2) {
            content = (
                <div>
                    <Form
                        ref={this.confirmFormRef}
                    >
                        <FormItem 
                            name="answer_name"
                            rules={[{ required: true, message: '请选择主创' }]}
                        >
                            <Select placeholder="请选择主创" className="width200">
                                <Option value="主创A">主创A</Option>
                                <Option value="主创B">主创B</Option>
                                <Option value="主创C">主创C</Option>
                            </Select>
                        </FormItem>
                        <Form.Item
                            label=""
                            name="answer_content"
                            rules={[{ required: true, message: '请输入留言内容' }]}
                        >
                            <TextArea rows={4} 
                                placeholder="请输入留言内容" />
                        </Form.Item>

                        
                    </Form>
                </div>
            )
        }
        Modal.confirm({
            title: '确认操作',
            content,
            okText: '确认',
            cancelText: '取消',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                return new Promise((resolve, reject) => {
                    if(type === -1 || type === 2) {
                        this.confirmFormRef.current.validateFields().then((val) => {
                            console.log('-----validateFields------', val)
                            const rowTemp = Object.assign({}, row, val)
                            this.dealReq(rowTemp, type)
                            resolve()
                        }).catch(() => {
                            reject()
                        }) 
                    } else {
                        this.dealReq(row, type)
                        resolve()
                    }
                    
                })
            }
        });
    }
    dealReq = (row, type) => {
        const sendData = {
            id: row.id,
            status: type
        }
        if(type === -1) { // 删除
            sendData.delete_reason = row.delete_reason || ''
        }
        if(type === 2) { // 回复
            if(row.reply_info && Array.isArray(row.reply_info)) {
                sendData.reply_info = [
                    ...row.reply_info,
                    {
                        answer_name: row.answer_name || '',
                        answer_content: row.answer_content || '',
                        answer_time: Math.round(new Date().getTime() / 1000) 
                    }
                ]
            } else {
                sendData.reply_info = [
                    {
                        answer_name: row.answer_name || '',
                        answer_content: row.answer_content || '',
                        answer_time: Math.round(new Date().getTime() / 1000) 
                    }
                ]
            }
            sendData.reply_info = JSON.stringify(sendData.reply_info)
        }
        if(type === -2) { // 撤销回复
            sendData.reply_info = row.reply_info
            if(sendData.reply_info) {
                sendData.status = 2
            } else {
                sendData.status = 1
            }
        }
        dealMessage(sendData).then((rep) => {
            if(rep.error_code === 0) {
                message.success('操作成功');
                this.getPageList(this.state.pagination.current)
            } else {
                message.error(rep.msg);
            }
        })
    }
    handleOk = e => {
        console.log(e)
    }
    handleCancel = e => {
        this.setState({
            visible: false
        })
    }
    render() {
        const paginationProps = {
            onChange: page => this.handleTableChange(page),
            onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize), //  pageSize 变化的回调
            ...this.state.pagination,
            showSizeChanger: false,
            showQuickJumper: true
        };
        const { loading, columns, tableData } = this.state
        return (
            <div className="shadow-radius">
                <Form
                    ref={this.formRef}
                    className="search-form"
                    layout="inline"
                    onFinish={this.onFinish}
                    initialValues={{
                        is_deal: '0'
                    }}
                >
                    <FormItem name="user_name">
                        <Input allowClear={true} placeholder="玩家昵称" />
                    </FormItem>
                    <FormItem label="时间" name="timeRange">
                        <RangePicker allowClear={true} />
                    </FormItem>
                    <FormItem label="状态" name="is_deal">
                        <Select placeholder="请选择" 
                            allowClear={true}
                            className="width200">
                            <Option value="0">未处理</Option>
                            <Option value="1">已处理</Option>
                            <Option value="2">已回复</Option>
                        </Select>
                    </FormItem>
                    <FormItem name="message">
                        <Input allowClear={true} placeholder="留言内容" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className={'btn'} htmlType='submit'>
                            搜索
                        </Button>
                    </FormItem>
                </Form>

                <Table dataSource={tableData} columns={columns} 
                    bordered="true"
                    loading={loading} rowKey="id" pagination={paginationProps} />
                <Modal
                    title="发表回复"
                    width="50%"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        className="search-form"
                        onFinish={this.handleOk}
                    >
                        <FormItem name="content">
                            <TextArea rows={4} defaultValue={'默认内容'} placeholder="请输入内容" />
                        </FormItem>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Index
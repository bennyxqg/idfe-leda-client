import React from 'react';
import { Table, Input , Button, Form, Select, DatePicker, Modal, message, Tag } from 'antd';
import './index.less'
import { commentPage, dealComment } from '@/http/hcomment'
import { newsAll } from '@/http/hnews'
import { formatTime } from '@/utils/helper'
import lodash from 'lodash'
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from 'moment'

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Index extends React.Component {
    formRef = React.createRef();
    confirmFormRef = React.createRef();
    state = {
        visible: false,
        pagination: {
			pageSize: 10,
			current: 1,
			total: 0
		},
        loading: false,
        tableData: [],
        allNewsList: [],
        columns: [
            {
                title: '头像',
                dataIndex: 'pic',
                width: 80,
                render: (pic) => (
                    <img src={pic} className="pic" alt="" />
                )
            },
            {
                title: '玩家信息',
                dataIndex: 'action',
                render: (text, record) => (
                    <div className="info">
                        {
                            record.parent_id == 0?(
                                <div className="player"><b>{record.third_user_name}</b>对<b>我的文章</b>发表了评论</div>
                            ):(
                            <div className="player"><b>{record.third_user_name}</b> 回复了玩家<b>{record.be_commented_user_name}</b>的评论</div>
                            )
                        }
                        <div className="text" dangerouslySetInnerHTML={{ __html: record.comment }}></div>
                    </div>
                )
            },
            {
                title: '文章标题/评论内容',
                dataIndex: 'title',
                className: 'replys-title-col',
                render: (text, record) => (
                    <div>
                        {
                            record.parent_id == 0?(
                                <span><Tag color="cyan">标题</Tag>{record.newsTitle}</span>
                            ):(
                                <span><Tag color="blue">内容</Tag><span dangerouslySetInnerHTML={{ __html: record.be_commented_comment }}></span></span>
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
                width: 300,
                render: (text, record) => (
                    <div className="btns">
                        {this.actionHtml(record)}
                    </div>
                )
            },
        ]
    }
    actionHtml = e => {
        if (e.status == 0) {
            return (
                <>
                    <Button size='small' onClick={() => this.handleAction(e, 1)} type="primary">通过</Button>
                    <Button size='small' type="primary" danger onClick={() => this.handleAction(e, -1)}>删除</Button>
                    <Button size='small' type="primary" onClick={() => this.handleAction(e, 2)}>置顶</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button size='small' type="primary" onClick={() => this.handleAction(e, 0)}>撤销操作</Button>
                    {/* <Button size='small' onClick={() => this.handleAction(e, 'reply')}>回复</Button> */}
                </>
            )
        }
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
                html = '已置顶'
                break;
            default:
                html = '未知'
        }
        return html
    }
    async componentWillMount() {
        const newsList = await this.getAllNewsList()
        this.setState({
            allNewsList: newsList
        })
		this.getPageList(1)
    }
    // 获取全部新闻数据
	getAllNewsList() {
		return newsAll().then((rep) => {
			if(rep.error_code === 0) {
				console.log('--------newsPage-------', rep)
				if(rep.data && rep.data.length) {
					return rep.data
				}
            }
            return []
		})
	}
    // 获取分页数据
    getPageList() {
        let searchData = {}
        if(this.formRef.current) {
            searchData = lodash.cloneDeep(this.formRef.current.getFieldsValue()) 
            if(searchData.timeRange && searchData.timeRange.length === 2) {
                searchData.start_time = Math.round(moment(searchData.timeRange[0].format('YYYY-MM-DD') + ' 00:00:00').valueOf() / 1000)
                searchData.end_time = Math.round((moment(searchData.timeRange[1].format('YYYY-MM-DD') + ' 23:59:59').valueOf())/1000)
            }
            delete searchData.timeRange
        }
		const pageNum = this.state.pagination.current
		let sendData = {
            page: pageNum,
            is_deal: 0
        }
        sendData = Object.assign({}, sendData, searchData)
        console.log('-----sendData-------', sendData)
		commentPage(sendData).then(async (rep) => {
			if(rep.error_code === 0) {
				if(rep.data && rep.data.list && rep.data.list.length) {
                    // 获取所有新闻
                    const newsList = this.state.allNewsList
                    console.log('--------newsList-------', newsList)
                    rep.data.list.forEach((comment) => {
                        comment.newsTitle = ''
                        newsList.some((news) => {
                            if(comment.news_id == news.id) {
                                comment.newsTitle = news.title
                                return true
                            }
                        })
                    })
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
    onFinish = e => {
        this.getPageList(this.state.pagination.current)
    }
    handleDel(row) {
        console.log(row)
    }
    handleTableChange(page) {
        console.log('跳转页数' + page, Object.assign({}, this.state.pagination, {current: page}))
		this.setState({'pagination': Object.assign({}, this.state.pagination, {current: page})}, () => {
            this.getPageList()
        })
    }
    onShowSizeChange(current, pageSize) {
        console.log(current, pageSize)
    }
    handleAction = (row, type) => {
        console.log(row, type)
        let tipsText = ''
        let content = ''
        if(type === 1) { // 通过
            tipsText = '通过'
        } else if(type === -1) { // 删除
            tipsText = '删除'
        } else if(type === 2) { // 通过
            tipsText = '置顶'
        } else if(type === 0) { // 撤销操作
            tipsText = '撤销操作'
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
        }
        Modal.confirm({
            title: '确认操作',
            content,
            okText: '确认',
            cancelText: '取消',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                return new Promise((resolve, reject) => {
                    if(type === -1) {
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
            status: type,
            delete_reason: row.delete_reason || ''
        }
        dealComment(sendData).then((rep) => {
            if(rep.error_code === 0) {
                message.success('操作成功');
                this.getPageList(this.state.pagination.current)
            } else {
                message.error(rep.msg);
            }
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
                    {/* <FormItem label="类型" name="type">
                        <Select placeholder="请选择" className="width200">
                            <Option value="male">开发者博客</Option>
                            <Option value="female">悬念站</Option>
                        </Select>
                    </FormItem> */}
                    <FormItem label="" name="news_id">
						<Select
							showSearch
							allowClear={true}
							style={{ width: 300 }}
							placeholder="搜索新闻标题"
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							{
                                this.state.allNewsList.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.title}
                                </Option>
                                ))
                            }
						</Select>
					</FormItem>
                    <FormItem label="时间" name="timeRange">
                        <RangePicker allowClear={true} />
                    </FormItem>
                    <FormItem label="状态" name="is_deal">
                        <Select placeholder="请选择" className="width200">
                            <Option value="0">未处理</Option>
                            <Option value="1">已处理</Option>
                        </Select>
                    </FormItem>
                    <FormItem name="comment">
                        <Input placeholder="留言内容/昵称" allowClear={true} />
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
            </div>
        )
    }
}

export default Index
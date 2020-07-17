import React from 'react';
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import './index.less'
import CategoryModal from './CategoryModal'
import PreviewModal from './PreviewModal'
import { newsPage, newsAll, newsTop, delNews, newsDetail } from '@/http/hnews'
import { formatTime } from '@/utils/helper'

const FormItem = Form.Item;
const { Option } = Select;

class Index extends React.Component {
	formRef = React.createRef();
	state = {
		pagination: {
			pageSize: 10,
			current: 1,
			total: 0
		},
		loading: false,
		categoryModalVisible: false,
		previewModalVisible: false,
		previewContent: '',
		searchId: '',
		tableData: [],
		allNewsList: [],
		columns: [
			{
				title: '标题',
				dataIndex: 'title',
				ellipsis: true,
			},
			{
				title: '新闻栏目',
				width: 120,
				dataIndex: 'category_name',
			},
			{
				title: '阅读数',
				width: 100,
				dataIndex: 'clicks'
			},
			{
				title: '发布时间',
				dataIndex: 'created',
				width: 160,
				render: (text, record) => (
					<span>{formatTime(text)}</span>
				)
			},
			{
				title: '操作',
				dataIndex: 'action',
				align: 'center',
				width: 400,
				render: (text, record) => (
					<div className="btns">
						{record.isTop == 0 ? 
							<Button size="small" onClick={() => { this.setTop(record, 1) }} type="primary">置顶</Button> : 
							<Button size="small" onClick={() => { this.setTop(record, 0) }} className="first-btn">已置顶</Button>}
							<Button size="small" onClick={() => { this.handleRouter('edit', record) }} type="primary">编辑</Button>
							<Button size="small" onClick={() => { this.handlePreview(record) }} type="primary" type="primary">预览</Button>
							<Button size="small" onClick={() => { this.handleDel(record) }} danger type="primary">删除</Button>
					</div>
				)
			},
		]
	};
	async componentWillMount() {
		// this.fetch();
		// const result = await $axios.get('/config/list')
		// console.log(result)
		this.getTableList(this.state.pagination.current)
		this.getAllList()
	}

	componentWillUnmount() {
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}

	// 置顶操作
	setTop(item, type) {
		const sendData = {
			id: item.id,
			type
		}
		newsTop(sendData).then((rep) => {
			if(rep.error_code === 0) {
				message.success('操作成功');
				this.getTableList(this.state.pagination.current)
			} else {
        message.error(rep.msg);
      }
		})
	}

	// 预览
	handlePreview(item) {
		this.setState({
			previewContent: item.content,
			previewModalVisible: true
		})
	}

	// 处理栏目分类
	handleCategory() {
		this.setState({categoryModalVisible: true})
	}

	// 获取全部数据
	getAllList() {
		newsAll().then((rep) => {
			if(rep.error_code === 0) {
				console.log('--------newsPage-------', rep)
				if(rep.data && rep.data.length) {
					this.setState({
						allNewsList: rep.data
					})
				}
			}
		})
	}

	getPageList(pageNum = 1) {
		console.log('----this.state.pagination------', this.state.pagination)
		const sendData = {
			page: pageNum
		}
		newsPage(sendData).then((rep) => {
			if(rep.error_code === 0) {
				console.log('--------newsPage-------', rep)
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

	// 通过id获取新闻数据
	getListById(id) {
		newsDetail({id}).then((rep) => {
			if(rep.error_code === 0) {
				this.setState({'tableData': [rep.data]})
				this.setState({'pagination': Object.assign({}, this.state.pagination, {total: 10 * 1, current: 1})})
			} else {
				message.error(rep.msg);
			}
		}) 
	}

	// 关闭打开栏目弹窗
	modalChange = (val) => {
		this.setState({categoryModalVisible: val})
	}

	// 关闭打开预览弹窗
	previewModalChange = (val) => {
		this.setState({previewModalVisible: val})
	}

	onFinish(value) {
		console.log(value)
	}
	handleRouter(type, row) {
		let url = type === 'add' ? { pathname: `/detail` } : { pathname: `/detail`, search: `?id=${row.id}` }
		this.props.history.push(url)
	}

	// 删除新闻
	handleDel(row) {
		Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
				const sendData = {
					id: row.id
				}
        delNews(sendData).then((rep) => {
					if(rep.error_code === 0) {
						message.success('操作成功');
						this.getTableList(this.state.pagination.current)
					} else {
						message.error(rep.msg);
					}
				})
      }
    })
	}
	
	handleTableChange(page) {
		console.log('跳转页数' + page, Object.assign({}, this.state.pagination, {current: page}))
		this.setState({'pagination': Object.assign({}, this.state.pagination, {current: page})})
		this.getTableList(page)
	}
	onShowSizeChange(current, pageSize) {
		console.log(current, pageSize)
	}

	// 标题搜索改变
	onSearchChange = (value) => {
		console.log(`selected ${value}`);
		if(value) {
			this.setState({
				searchId: value
			}, () => {
				this.getTableList(1)
			})
		} else {
			this.setState({
				searchId: ''
			}, () => {
				this.getTableList(1)
			})
		}
		
	}

	getTableList = (pageNum) => {
		if(this.state.searchId) {
			this.getListById(this.state.searchId)
		} else {
			this.getPageList(pageNum)
		}
	}
	
	onSearch(val) {
		console.log('search:', val);
	}

	render() {
		const paginationProps = {
			onChange: page => this.handleTableChange(page),
			// onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize), //  pageSize 变化的回调
			...this.state.pagination,
			showSizeChanger: false,
			showQuickJumper: true
		};
		const { loading, columns, tableData, previewContent } = this.state
		return (
			<div className="shadow-radius">
				<Form
					layout="inline"
					ref={this.formRef}
					className="search-form"
					onFinish={this.onFinish}
				>
					<FormItem label="" name="title">
						<Select
							showSearch
							allowClear={true}
							style={{ width: 500 }}
							placeholder="搜索新闻标题"
							optionFilterProp="children"
							onChange={this.onSearchChange}
							onSearch={this.onSearch}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							{
                this.state.allNewsList.map(item => (
                  <Option key={item.id} value={item.id}>
										<span title={item.title}>
											{item.title}
										</span>
                  </Option>
                ))
              }
						</Select>
					</FormItem>
					{/* <FormItem label="新闻栏目" name="type">
						<Select placeholder="请选择" className="width200">
							<Option value="male">male</Option>
							<Option value="female">female</Option>
						</Select>
					</FormItem> */}
					{/* <FormItem>
						<Button type="primary" className={'btn'} htmlType='submit'>
							搜索
						</Button>
					</FormItem> */}
					<FormItem>
						<Button className={'btn'} onClick={() => this.handleRouter('add')}>
							发布图文
						</Button>
					</FormItem>
					<FormItem>
						<Button className={'btn'} onClick={() => this.handleCategory()}>
							添加栏目
						</Button>
					</FormItem>
				</Form>
				<Table loading={loading} 
					columns={columns} dataSource={tableData} rowKey="id" bordered="true" pagination={paginationProps} />
				{
					this.state.categoryModalVisible && (
						<CategoryModal
						modalChange={this.modalChange}
						></CategoryModal>
					)
				}
				{
					this.state.previewModalVisible && (
						<PreviewModal
							modalChange={this.previewModalChange}
							previewContent={previewContent}
						></PreviewModal>
					)
				}
			</div>
		)
	}
}

export default Index
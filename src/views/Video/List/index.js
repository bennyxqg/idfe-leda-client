import React from 'react';
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { videoPage, delVideo } from '@/http/hvideo'
import { formatTime } from '@/utils/helper'
import EditModal from './EditModal'

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
		editModalVisible: false,
		editForm: null,
		searchId: '',
		tableData: [],
		allGroupList: [],
		columns: [
			{
				title: 'ID',
				dataIndex: 'id'
			},
			{
				title: '视频截图',
				dataIndex: 'cover',
				render: (text, record) => (
					<div>
							<img style={{maxWidth: '100px'}} src={text} alt={record.name} />
					</div>
				)
			},
			{
				title: '视频标题',
				dataIndex: 'name'
			},
			{
				title: '视频链接',
				dataIndex: 'url'
			},
			{
				title: '描述',
				dataIndex: 'desc'
			},
			{
				title: '操作',
				dataIndex: 'action',
				align: 'center',
				width: 400,
				render: (text, record) => (
					<div className="btns">
							<Button size="small" onClick={() => { this.handleEdit('edit', record) }} type="primary">编辑</Button>
							<Button size="small" onClick={() => { this.handleDel(record) }} danger type="primary">删除</Button>
					</div>
				)
			},
		]
	};
	async componentWillMount() {
		this.getTableList(this.state.pagination.current)
	}

	componentWillUnmount() {
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}

	handleEdit(type, row) {
		this.handleEditModal(row)
	}

	// 处理栏目分类
	handleEditModal(editForm = null) {
		this.setState({editForm})
		this.setState({editModalVisible: true})
	}

	getPageList(pageNum = 1) {
		const sendData = {
			page: pageNum
		}
		videoPage(sendData).then((rep) => {
			if(rep.error_code === 0) {
				if(rep.data && rep.data.list && rep.data.list.length) {
					// allGroupList
					rep.data.list.forEach((item) => {
						this.state.allGroupList.some((group) => {
							if(group.id === item.group_id) {
								item.groupName = group.name
								return true
							}
							return false
						})
					})
					this.setState({'tableData': rep.data.list})
					this.setState({'pagination': Object.assign({}, this.state.pagination, {total: 10 * rep.data.total_page})})
				} else {
					this.setState({'tableData': []})
				}
			}
		})
	}

	// 关闭打开栏目弹窗
	modalChange = (val) => {
		this.setState({editModalVisible: val})
	}

	successCB = () => {
		this.getPageList(this.state.pagination.current)
		this.modalChange(false)
	}
	
	// 删除
	handleDel(row) {
		Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
				const sendData = {
					id: row.id
				}
        delVideo(sendData).then((rep) => {
					if(rep.error_code === 0) {
						message.success('操作成功');
						this.getPageList(this.state.pagination.current)
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
		const { loading, columns, tableData, editForm, allGroupList } = this.state
		return (
			<div className="shadow-radius">
				<Form
					ref={this.formRef}
					className="search-form"
				>
					<FormItem>
						<div style={{textAlign: 'right'}}>
							<Button type="primary" className={'btn'} onClick={() => this.handleEditModal()}>
								新增视频
							</Button>
						</div>
					</FormItem>
				</Form>
				<Table loading={loading} 
					columns={columns} dataSource={tableData} rowKey="id" bordered="true" pagination={paginationProps} />
				{
					this.state.editModalVisible && (
						<EditModal
							modalChange={this.modalChange}
							successCB={this.successCB}
							editForm={editForm}
							allGroupList={allGroupList}
						></EditModal>
					)
				}
			</div>
		)
	}
}

export default Index
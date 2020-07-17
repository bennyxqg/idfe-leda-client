import React from 'react';
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { groupPage, delGroup } from '@/http/hcarousel'
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
		allNewsList: [],
		columns: [
			{
				title: '分组名称',
				dataIndex: 'name',
				ellipsis: true,
			},
			{
				title: '分组标识',
				dataIndex: 'identifer',
			},
			{
				title: '轮播图数量',
				dataIndex: 'count'
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
		// this.fetch();
		// const result = await $axios.get('/config/list')
		// console.log(result)
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

	// 处理弹窗
	handleEditModal(editForm = null) {
		this.setState({editForm})
		this.setState({editModalVisible: true})
	}

	getPageList(pageNum = 1) {
		const sendData = {
			page: pageNum
		}
		groupPage(sendData).then((rep) => {
			if(rep.error_code === 0) {
				if(rep.data  && rep.data.length) {
					this.setState({'tableData': rep.data})
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
		this.getPageList()
		this.modalChange(false)
	}

	onFinish(value) {
		console.log(value)
	}
	
	// 删除
	handleDel(row) {
		Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
				const sendData = {
					id: row.id
				}
        delGroup(sendData).then((rep) => {
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


	getTableList = (pageNum) => {
		this.getPageList(pageNum)
	}

	render() {
		const { loading, columns, tableData, editForm } = this.state
		return (
			<div className="shadow-radius">
				<Form
					ref={this.formRef}
					className="search-form"
					onFinish={this.onFinish}
				>
					<FormItem>
						<div style={{textAlign: 'right'}}>
							<Button type="primary" className={'btn'} onClick={() => this.handleEditModal()}>
							新增分组
							</Button>
						</div>
					</FormItem>
				</Form>
				<Table loading={loading} 
					columns={columns} dataSource={tableData} rowKey="id" bordered="true" pagination={false} />
				{
					this.state.editModalVisible && (
						<EditModal
							modalChange={this.modalChange}
							successCB={this.successCB}
							editForm={editForm}
						></EditModal>
					)
				}
			</div>
		)
	}
}

export default Index
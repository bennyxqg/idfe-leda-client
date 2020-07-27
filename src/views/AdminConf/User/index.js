import React from 'react';
import { Table, Button, Form, Select, Badge, message, Modal } from 'antd';
import { userPage, delUser } from '@/http/huser'
import { formatTime } from '@/utils/helper'
import EditModal from './EditModal'
import { siteAll } from '@/http/hsite'

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
		siteList: [],
		allGroupList: [],
		columns: [
			{
				title: '用户ID',
				dataIndex: 'id'
			},
			{
				title: '用户名称',
				dataIndex: 'name'
			},
			{
				title: '管理站点',
				dataIndex: 'siteName'
			},
			{
				title: '状态',
				dataIndex: 'status',
				render: (text, record) => {
					let color = 'green'
					let statusStr = '启用'
					if(text != 1) {
						color = 'red'
						statusStr = '停用'	
					}
					return (
						 <span >
							 {
								 <Badge color={color} text={statusStr} />
							 }
						 </span>
				 )
				}
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
		await this.getAllSite()
		this.getTableList(this.state.pagination.current)
	}

	componentWillUnmount() {
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}

	getAllSite() {
    return siteAll({}).then((rep) => {
      if(rep.error_code === 0) {
			 if(rep.data && rep.data.list) {
				this.setState({siteList: rep.data.list})
			 }
      }
    })
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
		userPage(sendData).then((rep) => {
			if(rep.error_code === 0) {
				if(rep.data && rep.data.list && rep.data.list.length) {
					// allGroupList
					rep.data.list.forEach((item) => {
						if(item.site_id === 'all') {
							item.siteName = '所有站点'
						} else {
							let userSites = [] 
							let userSitesStr = []
							if(item.site_id) {
								userSites = item.site_id.split(',')
								userSites.forEach((userSite) => {
									this.state.siteList.some((site) => {
										if(site.id == userSite) {
											userSitesStr.push(site.name)
											return true
										}
										return false
									})
								})
								item.siteName = userSitesStr.join('，')
							}
						}
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
        delUser(sendData).then((rep) => {
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
		const { loading, columns, tableData, editForm, siteList } = this.state
		return (
			<div className="shadow-radius">
				<Form
					ref={this.formRef}
					className="search-form"
				>
					<FormItem>
						<div style={{textAlign: 'right'}}>
							<Button type="primary" className={'btn'} onClick={() => this.handleEditModal()}>
								新增用户
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
							allSiteList={siteList}
						></EditModal>
					)
				}
			</div>
		)
	}
}

export default Index
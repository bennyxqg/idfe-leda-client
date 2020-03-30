import React from 'react';
import { Table, Row, Col, Button, Form, Select, Input} from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { Column } = Table

class Index extends React.Component {
	formRef = React.createRef();
	state = {
		data: [],
		pagination: {
			pageSize: 10,
			current: 1
		},
		searchForm: {
			title: '',
			type: ''
		},
		loading: false,
		selectedRowKeys: [],
		columns: [
			{
				title: '表哈哈1',
				dataIndex: 'name',
				name: '栏目1',
				num: 333,
				time: '2019-04-11 13:00',
				id: 1
			},
			{
				title: 'ghgf',
				dataIndex: 'name',
				name: '栏目3453',
				num: 555,
				time: '2019-04-11 13:00',
				id: 2
			},
		]
	};
	componentWillMount() {
		// this.fetch();
	}

	componentWillUnmount() {
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}

	router() {
		this.props.history.push('/list')
	}
	getFieldDecorator() {

	}
	onFinish(value) {
		console.log(value)
	}
	handleRouter(type, row) {
		let url = type === 'add' ? {pathname: `/detail`} : {pathname: `/detail`, search: `?id=${row.id}`}
		this.props.history.push(url) 
	}
	handleDel(row){
		console.log(row)
	}
	handleTableChange(page){
		console.log('跳转页数' + page)
	}
	onShowSizeChange(current, pageSize){
		console.log(current, pageSize)
	}
	render() {
		const paginationProps = {
			onChange: page => this.handleTableChange(page),
			onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize), //  pageSize 变化的回调
			...this.state.pagination,
			showSizeChanger: true,
			showQuickJumper: true
		};
		return (
			<div className="shadow-radius">
				<Form
					ref={this.formRef}
					className="search-form"
					layout="inline"
					onFinish={this.onFinish}
				>
					<Row gutter={24}>
						<Col span={10}>
							<FormItem label="新闻标题" name="title">
								<Input />
							</FormItem>
						</Col>
						<Col span={10}>
							<FormItem label="新闻栏目" name="type">
								<Select placeholder="请选择">
									<Option value="male">male</Option>
									<Option value="female">female</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span={2} style={{ marginRight: '10px', display: 'flex' }} className="serarch-btns">
							<FormItem>
								<Button type="primary" className={'btn'} htmlType='submit'>
									搜索
								</Button>
							</FormItem>
							<FormItem>
								<Button className={'btn'} onClick={() => this.handleRouter('add')}>
									发布图文
								</Button>
							</FormItem>
						</Col>
					</Row>
				</Form>

				<Table dataSource={this.state.columns} rowKey="id" pagination={paginationProps}>
					<Column title="标题" dataIndex="title" key="title" />
					<Column title="栏目" dataIndex="name" key="name" />
					<Column title="阅读数" dataIndex="num" key="num" />
					<Column title="时间" dataIndex="time" key="time" />
					<Column
						title="操作"
						key="id"
						render={(text, record) => (
							<span>
								<Button style={{ marginRight: 16 }} onClick={()=>{this.handleRouter('edit', record)}} type="primary">编辑</Button>
								<Button style={{ marginRight: 16 }} type="primary">预览</Button>
								<Button onClick={() => {this.handleDel(record)}} danger type="primary">删除</Button>
							</span>
						)}
					/>
				</Table>

			</div>
		)
	}
}

export default Index
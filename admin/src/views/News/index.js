import React from 'react';
import { Table, Button, Form, Select, Input } from 'antd';
import './index.less'
import $axios from "@src/utils/http";
const FormItem = Form.Item;
const { Option } = Select;

class Index extends React.Component {
	formRef = React.createRef();
	state = {
		pagination: {
			pageSize: 10,
			current: 1
		},
		loading: false,
		data: [
			{
				title: '表哈哈1',
				dataIndex: 'name',
				name: '栏目1',
				num: 333,
				time: '2019-04-11 13:00',
				sort: false,
				id: 1
			},
			{
				title: 'ghgf',
				dataIndex: 'name',
				name: '栏目3453',
				num: 555,
				time: '2019-04-11 13:00',
				sort: true,
				id: 2
			},
		],
		columns: [
			{
				title: '标题',
				dataIndex: 'title',
			},
			{
				title: '新闻栏目',
				dataIndex: 'name',
			},
			{
				title: '阅读数',
				dataIndex: 'num',
			},
			{
				title: '发布时间',
				dataIndex: 'time',
			},
			{
				title: '操作',
				dataIndex: 'action',
				align: 'center',
				width: 600,
				render: (text, record) => (
					<div className="btns">
						{record.sort ? <Button type="primary" className="first">置顶</Button> : <Button type="primary" className="first">已置顶</Button>}
						<Button onClick={() => { this.handleRouter('edit', record) }} type="primary">编辑</Button>
						<Button type="primary">预览</Button>
						<Button onClick={() => { this.handleDel(record) }} danger type="primary">删除</Button>
					</div>
				)
			},
		]
	};
	async componentWillMount() {
		// this.fetch();
		const result = await $axios.get('/config/list')
		console.log(result)
	}

	componentWillUnmount() {
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}
	onFinish(value) {
		console.log(value)
	}
	handleRouter(type, row) {
		let url = type === 'add' ? { pathname: `/detail` } : { pathname: `/detail`, search: `?id=${row.id}` }
		this.props.history.push(url)
	}
	handleDel(row) {
		console.log(row)
	}
	handleTableChange(page) {
		console.log('跳转页数' + page)
	}
	onShowSizeChange(current, pageSize) {
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
		const { loading, columns, data } = this.state
		return (
			<div className="shadow-radius">
				<Form
					layout="inline"
					ref={this.formRef}
					className="search-form"
					onFinish={this.onFinish}
				>
					<FormItem label="新闻标题" name="title">
						<Input />
					</FormItem>
					<FormItem label="新闻栏目" name="type">
						<Select placeholder="请选择" className="width200">
							<Option value="male">male</Option>
							<Option value="female">female</Option>
						</Select>
					</FormItem>
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
				</Form>
				<Table loading={loading} columns={columns} dataSource={data} rowKey="id" bordered="true" pagination={paginationProps} />
			</div>
		)
	}
}

export default Index
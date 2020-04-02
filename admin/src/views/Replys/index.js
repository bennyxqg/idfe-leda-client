import React from 'react';
import { Table, Button, Form, Select, Input, DatePicker, Modal, message } from 'antd';
import './index.less'
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Index extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
        pagination: {
            pageSize: 10,
            current: 1
        },
        loading: false,
        data: [
            {
                pic: 'http://192.168.4.124:930/wpk/0/image/efd/028/e09/efde028ee09047eafff895b7f2620d11.jpg',
                player: '玩家昵称1',
                repley: '评论内容哈哈1',
                title: '文章标题',
                time: '2019-04-11 13:00',
                status: 0,
                id: 1
            },
            {
                pic: 'http://192.168.4.124:930/wpk/0/image/7aa/164/d37/7aa21647d37d7234d236fea44bf1f3f8.jpg',
                player: '玩家昵称222',
                repley: '评论内容dfgdfg',
                title: '文章标题11',
                time: '2019-04-11 13:00',
                status: 1,
                id: 2
            },
        ],
        columns: [
            {
                title: '头像',
                dataIndex: 'pic',
                render: pic => <img src={pic} className="pic" alt="" />,
            },
            {
                title: '玩家信息',
                dataIndex: 'action',
                render: (text, record) => (
                    <div className="info">
                        <p className="player"><span>{record.player}</span> 对我的文章发表了评论</p>
                        <p className="text">{record.repley}</p>
                    </div>
                )
            },
            {
                title: '文章标题',
                dataIndex: 'title',
            },
            {
                title: '发布时间',
                dataIndex: 'time',
            },
            {
                title: '状态',
                dataIndex: 'status',
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
                width: 600,
                render: (text, record) => (
                    <div className="btns">
                        {this.actionHtml(record)}
                    </div>
                )
            },
        ]
    }
    actionHtml = e => {
        if (e.status) {
            return (
                <>
                    <Button onClick={() => this.handleAction(e, 'pass')} type="primary">通过</Button>
                    <Button type="primary" danger onClick={() => this.handleAction(e, 'del')}>删除</Button>
                    <Button type="primary" onClick={() => this.handleAction(e, 'first')}>置顶</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button onClick={() => this.handleAction(e, 'cancle')}>撤销操作</Button>
                    <Button onClick={() => this.handleAction(e, 'reply')}>回复</Button>
                </>
            )
        }
    }
    statusHtml = e => {
        let html = ''
        switch (e) {
            case 1:
                html = '已删除'
                break;
            case 0:
                html = '未处理'
                break;
            default:
                html = '未知'
        }
        return html
    }
    onFinish = e => {
        console.log(e)
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
    handleAction(row, type) {
        console.log(row, type)
        Modal.info({
            title: 'Confirm',
            content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                message.success('你点击了确定，当前行key为：' + row.id);
            }
        });
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
                    ref={this.formRef}
                    className="search-form"
                    layout="inline"
                    onFinish={this.onFinish}
                >
                    <FormItem label="类型" name="type">
                        <Select placeholder="请选择" className="width200">
                            <Option value="male">开发者博客</Option>
                            <Option value="female">悬念站</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="文章标题" name="type">
                        <Select
                            showSearch
                            allowClear
                            className="width200"
                            placeholder="搜索文章标题"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="时间" name="time">
                        <RangePicker />
                    </FormItem>
                    <FormItem label="状态" name="type">
                        <Select placeholder="请选择" className="width200">
                            <Option value="male">所有</Option>
                            <Option value="male">未处理</Option>
                            <Option value="female">已处理</Option>
                        </Select>
                    </FormItem>
                    <FormItem name="title">
                        <Input placeholder="留言内容/昵称" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className={'btn'} htmlType='submit'>
                            搜索
                        </Button>
                    </FormItem>
                </Form>
                <Table dataSource={data} columns={columns} loading={loading} rowKey="id" pagination={paginationProps} />
            </div>
        )
    }
}

export default Index
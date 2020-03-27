import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import logo from '@src/assets/images/logo.svg'
import './login.less'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    onFinish(values) {
        console.log('提交: ', values);
        this.props.history.push('/home')
    }
    render() {
        return (
            <div className='login-page'>
                <div className='box'>
                    <img src={logo} className='logo' alt='logo' />
                    <div className='form-box'>
                        <Form
                            name='normal_login'
                            className='login-form'
                            onFinish={(value) => {this.onFinish(value)}}
                        >
                            <Form.Item
                                name='username'
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!'
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className='site-form-item-icon' />}
                                    placeholder='用户名'
                                />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!'
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className='site-form-item-icon' />}
                                    type='password'
                                    placeholder='密码'
                                />
                            </Form.Item>
                            <div className="code-box">
                                <img src={logo} className='pic'/>
                                <Form.Item
                                    className="code-ins"
                                    name='code'
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码!'
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder='验证码'
                                    />
                                </Form.Item>
                            </div>                          
                            <Form.Item>
                                <Button type='primary' htmlType='submit' className='login-form-button'>
                                    登录
								</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

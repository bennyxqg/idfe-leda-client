import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import logo from '@/assets/images/logo.png'
import { toLogin } from '@/http/hlogin'
import './login.less' 

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.formRef = React.createRef();
    }
    onFinish(values) {
        // localStorage.setItem('isLogin', '1');
        // // 模拟生成一些数据
        // // this.props.setUserInfo(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
        // localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } })));
        // this.props.history.push('/home')
        // console.log('提交: ', values);
        // this.refs.loginForm.validateFields().then(() => {
        //     console.log('-------values-------', values)
        //     this.props.history.push('/home')
        // })
        console.log('-------values-------', values)
        toLogin(values).then((rep) => {
            console.log('--------toLogin----', rep)
            if(rep.error_code === 0) {
                localStorage.setItem('token', rep.data.token);
                localStorage.setItem('name', rep.data.name);
                message.success('登录成功');
                this.props.history.push('/basic')
            } else {
                message.error(rep.msg);
            }
        })

    }
    render() {
        return (
            <div className='login-page'>
                <div className='box'>
                    <div className="logo-box">
                        <a href="http://www.idreamsky.com" target="_blank" rel="noopener noreferrer">
                            <img src={logo} className='logo' alt='logo' />
                        </a>
                    </div>
                    <div className='form-box'>
                        <Form
                            ref='loginForm'
                            name='normal_login'
                            className='login-form'
                            onFinish={(value) => {this.onFinish(value)}}
                        >
                            <Form.Item
                                name='name'
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
                            {/* <div className="code-box">
                                <img src={logo} className='pic' alt=""/>
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
                            </div>                           */}
                            <Form.Item>
                                <Button type='primary' htmlType='submit' className='login-form-button'>
                                    登录
								</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <p className="info">Copyright©2009-2020 深圳市创梦天地科技有限公司 版权所有 粤ICP备11018438号</p>
                </div>
            </div>
        )
    }
}

export default Login

import React from 'react'
import { Form, Input, Button, message, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import logo from '@/assets/images/logo.png'
import { toLogin } from '@/http/hlogin'
import Particles from 'react-particles-js';
import './login.less' 

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            remember: true
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if(localStorage.getItem('isRemember') == 1) {
            const name = localStorage.getItem('account')
            const password = localStorage.getItem('password')
            if(this.refs.loginForm.setFieldsValue) {
                this.refs.loginForm.setFieldsValue({
                    name,
                    password
                })
            }
        } else {
            this.refs.loginForm.setFieldsValue({
                name: '',
                password: ''
            })
            if(`${localStorage.getItem('isRemember')}` === '0') {
                this.setState({
                    remember: false,
                })
            }
        }
    }

    changeRemember(e) {
        this.setState({
            remember: e.target.checked,
        })
    }

    onFinish(values) {
        toLogin(values).then((rep) => {
            if(rep && rep.error_code === 0) {
                localStorage.setItem('token', rep.data.token);
                localStorage.setItem('name', values.name);
                if(this.state.remember) { // 记住密码
                    localStorage.setItem('account', values.name);
                    localStorage.setItem('password', values.password);
                    localStorage.setItem('isRemember', 1);
                } else {
                    localStorage.removeItem('account');
                    localStorage.removeItem('password');
                    localStorage.setItem('isRemember', 0);
                }
                message.success('登录成功');
                this.props.history.push('/basic')
            } else {
                message.error(rep && rep.msg);
            }
        })

    }
    render() {
        return (
            <div className='login-page'>
                <Particles className='login-page-bg' 
                    params={{
                        particles: {
                            line_linked: {
                                shadow: {
                                    enable: true,
                                    color: "#fff",
                          blur: 15,
                          opacity:0.5
                                }
                      },
                      number: {
                        value: 50,
                        density: {
                          enable: true,
                          value_area: 1000
                        }
                      },
                      color: {
                        value: "#ccc"
                        // value: "#ff4242"
                      },
                      "shape": {
                        "type": "circle",
                        "stroke": {
                          "width": 0,
                          "color": "#ccc"
                        },
                        "polygon": {
                          "nb_sides": 5
                        }
                      },
                      "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                          "enable": true,
                          "speed": 1,
                          "opacity_min": 1,
                          "sync": false
                        }
                      },
                      "size": {
                        "value": 4,
                        "random": true,
                        "anim": {
                          "enable": false,
                          "speed": 8,
                          "size_min": 1,
                          "sync": false
                        }
                      },
                      "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                          "enable": false,
                          "rotateX": 600,
                          "rotateY": 1200
                        }
                      },
                    },
                    interactivity: {
                      "detect_on": "canvas",
                      "events": {
                        "onhover": {
                          "enable": true,
                          "mode": "repulse"
                        }
                      },
                      "modes": {
                        "grab": {
                          "distance": 100,
                          "line_linked": {
                            "opacity": 1
                          }
                        },
                        "bubble": {
                          "distance": 100,
                          "size": 80,
                          "duration": 2,
                          "opacity": 0.8,
                          "speed": 3
                        },
                        "repulse": {
                          "distance": 150,
                          "duration": 0.4
                        },
                        "push": {
                          "particles_nb": 4
                        },
                        "remove": {
                          "particles_nb": 2
                        }
                      }
                    },
                    retina_detect:true
                    }}
                />
                <div className='box'>
                    <div className="logo-box text-c mar-b-10">
                        <img src={logo} className='logo' alt='logo' />
                    </div>
                    <div className='text-c mar-b-50' style={{
                        color: '#999'
                    }}>
                        <span>模块化快速、灵活地创造属于你的个性化官网</span>
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
                                    size="large"
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
                                    size="large"
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
                            </div>         
                             */}
                            <div className='mar-b-20'>
                                <div>
                                    <Checkbox 
                                        onChange={(e) => {this.changeRemember(e)}}
                                        checked={this.state.remember}>记住账户密码</Checkbox>
                                </div>
                            </div>                 
                            <Form.Item>
                                <Button size='large' type='primary' htmlType='submit' className='login-form-button'>
                                    登录
								</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <p className="info">Copyright© 2020 创梦天地前端开发团队出品</p>
                </div>
            </div>
        )
    }
}

export default Login

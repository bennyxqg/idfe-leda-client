import axios from "axios"
import { message } from 'antd';

// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
//  创建axios实例
const $axios = axios.create({
  baseURL: '/', // api的base_url
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  timeout: 8000 // 请求超时时间
})

//  request拦截器
$axios.interceptors.request.use(config => {
  console.log('----localStorage.token----', config)
  // 没有token时返回登录页面
  const token = localStorage.token

  if(config.data) {
    config.data += ('&token=' + (token || ''))
  } else {
    config.data = 'token=' + (token || '')
  }
  // if (config.url.indexOf('login6') === -1) {
  //   config.headers['token'] = localStorage.token
  // }
  config.headers['token'] = token || ''
  // if (config.url.indexOf('uploadImg') !== -1) {
  //   config.headers.common['Content-Type'] = 'multipart/form-data'
  // }
  return config
}, error => { 
  //请求错误处理   
  message.error(error);
  return Promise.reject(error)
})

//  response拦截器
$axios.interceptors.response.use(
  response => { 
    // if (config.url.indexOf('login') === -1 || config.url.indexOf('login_out') === -1) {
    //   if(!token) {
    //     window.location.href = '/#login'
    //     return;
    //   }
    // }
    //成功请求到数据    
    if (response.status === 200) {
      if (response.data.error_code === 0) {
        return response.data
      } else if(response.data.error_code === 401 || response.data.error_code === 400) { // 未登录已过期
        window.location.href = process.env.publicPath + '/#login'
        return Promise.reject()
      } else {
        message.error(response.data.msg)
        return Promise.reject()
      }
    } else {
      message.error(response.data.msg)
      return Promise.reject()
    }
  },
  error => { 
    //响应错误处理
    message.error('网络异常，请重试')
    return Promise.reject(error)
  }
)

export default $axios
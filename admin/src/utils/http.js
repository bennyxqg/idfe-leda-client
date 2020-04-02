import axios from "axios"
import { message } from 'antd';
//  创建axios实例
const $axios = axios.create({
  baseURL: '/', // api的base_url
  timeout: 8000 // 请求超时时间
})


//  request拦截器
$axios.interceptors.request.use(config => {
  if (config.url.indexOf('login6') === -1) {
    config.headers.common['token'] = localStorage.token
  }
  if (config.url.indexOf('uploadImg') !== -1) {
    config.headers.common['Content-Type'] = 'multipart/form-data'
  }
  return config
}, error => { 
  //请求错误处理   
  message.error(error);
  return Promise.reject(error)
})

//  response拦截器
$axios.interceptors.response.use(
  response => { 
    //成功请求到数据    
    if (response.status === 200) {
      if (!response.data.err) {
        return response.data
      } else {
        message.error(response.data.msg)
      }
    } else {
      message.error(response.data.msg)
    }
  },
  error => { 
    //响应错误处理
    message.error('网络异常，请重试')
    return Promise.reject(error)
  }
)

export default $axios
import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const configPublish = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_config_publish',
    data: qs.stringify(params)
  });
}

export const configSave = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_config_save',
    data: qs.stringify(params)
  });
}

export const configGet = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_config_get',
    data: qs.stringify(params)
  });
}

// 获取预览地址及正式地址
export const getWebsiteAddress = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_address',
    data: qs.stringify(params)
  });
}
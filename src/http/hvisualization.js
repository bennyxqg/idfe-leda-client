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


// 获取页面列表
export const getPageList = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_page_list',
    data: qs.stringify(params)
  });
}

// 获取弹窗列表
export const getPopupList = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_popup_list',
    data: qs.stringify(params)
  });
}

// 落地列表
export const getGuidePageList = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/download_page_list',
    data: qs.stringify(params)
  });
}

// 新增落地
export const addGuidePage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/download_page_add',
    data: qs.stringify(params)
  });
}


// 落地列表
export const editGuidePage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/download_page_edit',
    data: qs.stringify(params)
  });
}


// 落地列表
export const delGuidePage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/download_page_del',
    data: qs.stringify(params)
  });
}

// 所有页面列表（0=页面  1=弹窗 2=下载落地页 3=wap页）
export const allPageList = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_config_list',
    data: qs.stringify(params)
  });
}

// 新增页面
export const addPage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_config_add',
    data: qs.stringify(params)
  });
}

// 编辑页面
export const editPage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_config_edit',
    data: qs.stringify(params)
  });
}

import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const sitePage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_list',
    data: qs.stringify(params)
  });
}

export const siteAll = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_list_all',
    data: qs.stringify(params)
  });
}


// 删除
export const delSite = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_del',
    data: qs.stringify(params)
  });
}

// 新增
export const addSite = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_add',
    data: qs.stringify(params)
  });
}

// 编辑
export const editSite = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/website_edit',
    data: qs.stringify(params)
  });
}

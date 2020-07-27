import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const userPage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/user_list',
    data: qs.stringify(params)
  });
}

// 删除
export const delUser = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/user_del',
    data: qs.stringify(params)
  });
}

// 新增
export const addUser = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/user_add',
    data: qs.stringify(params)
  });
}

// 编辑
export const editUser = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/user_edit',
    data: qs.stringify(params)
  });
}

// 编辑
export const getLoginUser = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/user_info',
    data: qs.stringify(params)
  });
}


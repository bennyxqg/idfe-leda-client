import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const groupPage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/pic_group_list',
    data: qs.stringify(params)
  });
}

// 删除
export const delGroup = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/pic_group_del',
    data: qs.stringify(params)
  });
}

// 新增
export const addGroup = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/pic_group_add',
    data: qs.stringify(params)
  });
}

// 编辑
export const editGroup = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/pic_group_edit',
    data: qs.stringify(params)
  });
}

export const picPage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/pic_info_list',
    data: qs.stringify(params)
  });
}

// 删除
export const delPic = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/pic_info_del',
    data: qs.stringify(params)
  });
}

// 新增
export const addPic = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/pic_info_add',
    data: qs.stringify(params)
  });
}

// 编辑
export const editPic = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/pic_info_edit',
    data: qs.stringify(params)
  });
}
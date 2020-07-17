import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const videoPage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/video_info_list',
    data: qs.stringify(params)
  });
}

// 删除
export const delVideo = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/video_info_del',
    data: qs.stringify(params)
  });
}

// 新增
export const addVideo = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/video_info_add',
    data: qs.stringify(params)
  });
}

// 编辑
export const editVideo = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/video_info_edit',
    data: qs.stringify(params)
  });
}

import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

// 网站详情
export const siteInfo = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/site_info',
    data: qs.stringify(params)
  });
}

// 编辑网站信息
export const editSiteInfo = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/site_info_edit',
    data: qs.stringify(params)
  });
}

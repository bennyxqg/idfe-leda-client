import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const messagePage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/blog_message_list',
    data: qs.stringify(params)
  });
}

export const dealMessage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/blog_message_deal',
    data: qs.stringify(params)
  });
}
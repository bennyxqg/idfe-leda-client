import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const commentPage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_comment_list',
    data: qs.stringify(params)
  });
}

export const dealComment = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_comment_deal',
    data: qs.stringify(params)
  });
}
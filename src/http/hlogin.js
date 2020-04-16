import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const toLogin = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/login',
    data: qs.stringify(params)
  });
}

export const toLogout = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/login_out',
    data: qs.stringify(params)
  });
}
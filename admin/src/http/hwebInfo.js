import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const basicConfigList = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/basic_config_list',
    data: qs.stringify(params)
  });
}

export const editBasicConfig = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/basic_config_edit',
    data: qs.stringify(params)
  });
}

export const addBasicConfig = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/basic_config_add',
    data: qs.stringify(params)
  });
}

export const delBasicConfig = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/basic_config_del',
    data: qs.stringify(params)
  });
}

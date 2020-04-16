import $axios from "@/utils/http";
import { adminApi } from './url'
import qs from 'qs'

export const newsPage = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_list',
    data: qs.stringify(params)
  });
}

export const newsAll = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_list_all',
    data: qs.stringify(params)
  });
}

// 详情
export const newsDetail = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_detail',
    data: qs.stringify(params)
  });
}

// 新增
export const addNews = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_add',
    data: qs.stringify(params)
  });
}

// 编辑
export const editNews = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_edit',
    data: qs.stringify(params)
  });
}

// 删除
export const delNews = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_del',
    data: qs.stringify(params)
  });
}

// 置顶
export const newsTop = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_top',
    data: qs.stringify(params)
  });
}

// 新闻类别-列表
export const newsCateList = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_category_list',
    data: qs.stringify(params)
  });
}

// 新闻类别-新增
export const newsCateAdd = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_category_add',
    data: qs.stringify(params)
  });
}

// 新闻类别-编辑
export const newsCateEdit = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_category_edit',
    data: qs.stringify(params)
  });
}

// 新闻类别-删除
export const newsCateDel = (params = {}) => {
  return $axios({
    method: 'post',
    url: adminApi + '/Admin/news_category_del',
    data: qs.stringify(params)
  });
}
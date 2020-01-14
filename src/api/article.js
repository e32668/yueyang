import request from '@/utils/request'

export function add(article) {
  return request({
    url: '/article/add',
    method: 'post',
    data: article
  })
}

export function deleteArticle(article) {
  return request({
    url: '/article/delete',
    method: 'post',
    data: article
  })
}

export function update(article) {
  return request({
    url: '/article/update',
    method: 'post',
    data: article
  })
}

export function listByCondition(article) {
  return request({
    url: '/article/listByCondition',
    method: 'post',
    data: article
  })
}

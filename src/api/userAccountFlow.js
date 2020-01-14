import request from '@/utils/request'

export function list() {
  return request({
    url: '/userAccountFlow/list',
    method: 'get'
  })
}

export function getById(id) {
  return request({
    url: '/userAccountFlow/' + id,
    method: 'get'
  })
}

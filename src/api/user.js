import request from '@/utils/request'

export function list() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function getById(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function add(user) {
  return request({
    url: '/user/add',
    method: 'post',
    data: user
  })
}

export function update(user) {
  return request({
    url: '/user/update',
    method: 'post',
    data: user
  })
}

export function deleteOne(id) {
  return request({
    url: '/user/delete/' + id,
    method: 'post'
  })
}

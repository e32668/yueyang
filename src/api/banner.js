import request from '@/utils/request'

export function all() {
  return request({
    url: '/banner/all',
    method: 'post'
  })
}

export function add(banner) {
  return request({
    url: '/banner/add',
    method: 'post',
    data: banner
  })
}

export function update(banner) {
  return request({
    url: '/banner/update',
    method: 'post',
    data: banner
  })
}

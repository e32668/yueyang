import request from '@/utils/request'

export function all() {
  return request({
    url: '/category/all',
    method: 'POST'
  })
}

export function addCP(CPData) {
  return request({
    url: '/category/addCP',
    method: 'POST',
    data: CPData
  })
}

export function add(categoryData) {
  return request({
    url: '/category/add',
    method: 'POST',
    data: categoryData
  })
}

export function deleteCategory(deleteData) {
  return request({
    url: '/category/delete',
    method: 'POST',
    data: deleteData
  })
}

export function deleteCP(CPData) {
  return request({
    url: '/category/deleteCP',
    method: 'POST',
    data: CPData
  })
}

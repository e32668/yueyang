import request from '@/utils/request'

export function all(productType) {
  return request({
    url: '/productType/listByCondition',
    method: 'post',
    data: productType
  })
}

export function add(productType) {
  return request({
    url: '/productType/add',
    method: 'post',
    data: productType
  })
}

export function update(productType) {
  return request({
    url: '/productType/update',
    method: 'post',
    data: productType
  })
}

export function addDetail(productTypeDetail) {
  return request({
    url: '/productTypeDetail/batchAdd',
    method: 'post',
    data: productTypeDetail
  })
}

export function updateDetail(productTypeDetail) {
  return request({
    url: '/productTypeDetail/update',
    method: 'post',
    data: productTypeDetail
  })
}

export function listByProductTypeID(productTypeDetail) {
  return request({
    url: '/productTypeDetail/listByProductTypeId',
    method: 'post',
    data: productTypeDetail
  })
}

export function addProductRepertory(productTypeDetail) {
  return request({
    url: '/productRepertory/batchAdd',
    method: 'post',
    data: productTypeDetail
  })
}

export function repertoryByDetailId(detailId) {
  return request({
    url: '/productRepertory/listByDetailId',
    method: 'post',
    data: detailId
  })
}

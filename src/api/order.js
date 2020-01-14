import request from '@/utils/request'

export function list(condition) {
  return request({
    url: '/order/listByQueryCondition',
    method: 'post',
    data: condition
  })
}

export function update(order) {
  return request({
    url: '/order/update',
    method: 'post',
    data: order
  })
}

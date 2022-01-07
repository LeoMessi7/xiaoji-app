import request from '../request.js'

export function getDeviceList() {
  return request({
    url: '/device/list',
    method: 'get'
  })
}
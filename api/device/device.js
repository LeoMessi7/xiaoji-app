import request from '../request.js'

export function getDeviceList() {
  return request({
    url: '/device/relation/list',
    method: 'get'
  })
}
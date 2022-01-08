import request from '../request.js'

export function getNotice() {
  return request({
    url: '/system/notice/list',
    method: 'get'
  })
}

import request from '../request.js'

export function userLogin(account, password) {
  return request({
    url: '/authface/user/login',
    method: 'post',
	params: {name: account, password: password}
  })
}

export function userRegister(account, nickname, password) {
  return request({
    url: '/authface/user/sregister',
    method: 'post',
    params: {account: account, nickname:nickname, password: password}
  })
}
import request from '../request.js'

export function beauty(image, type) {
  return request({
    url: '/makeup/makeup/lipstick',
    method: 'post',
	params: {faceBase64: image, type: type}
  })
}

export function getEmotion(image) {
  return request({
    url: '/emotion/emotion/get',
    method: 'post',
	params: {faceBase64: 'image'}
  })
}

export function getWeather() {
  return request({
    url: '/weather/weather/get',
    method: 'get',
  })
}

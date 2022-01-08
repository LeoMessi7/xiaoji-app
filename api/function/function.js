import request from '../request.js'

export function beauty(image, type) {
  return request({
    url: '/makeup/lipstick',
    method: 'post',
	data: {faceBase64: image, type: type}
  })
}

export function getEmotion(image) {
  return request({
    url: '/emotion/get',
    method: 'post',
	data: {faceBase64: image}
  })
}

export function getWeather() {
  return request({
    url: '/weather/weather/get',
    method: 'get',
  })
}

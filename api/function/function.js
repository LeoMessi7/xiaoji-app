import request from '../request.js'
import axios from '../request.js'

export function beauty(image, type) {
  return request({
    url: '/makeup/makeup/lipstick',
    method: 'post',
	data: {faceBase64: image, type: type}
  })
}

export function getEmotion(image) {
	axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
	const axiosInstance = axios.create({
	  baseURL:"http://localhost:9310",
	  withCredentials: true
	})
  return axiosInstance({
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
import request from '../request.js'

export function beauty(image, type) {
  return request({
    url: '/makeuppstick',
    method: 'post',
	params: {faceBase64: image, type: type}
  })
}

export function getEmotion(image) {
  return request({
    url: '/emotion/get',
    method: 'post',
	params: {faceBase64: image}
  })
}

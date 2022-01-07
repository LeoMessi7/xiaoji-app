<template>
	<view id="mood">
		<camera device-position="back" flash="off" style="width: 100%;height: 400upx;">

		</camera>
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="生成结果" color="#3fd1ad" @click="emotion()">
		</u-button>
		<view v-show=showResult style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">结果分析</text>
			<u--image :src=result width="100%" style="margin-left: 5%;margin-right: 5%;margin-top: 50rpx;" mode="widthFix">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
		</view>

		
	</view>
</template>

<script>
	import {getEmotion} from "../../../api/function/function.js"
	export default {
		name: "mood",
		data() {
			return {
				src: "https://cdn.uviewui.com/uview/album/1.jpg",
				showResult: true,
				result: "https://cdn.uviewui.com/uview/album/1.jpg"
			}
		},
		onLoad() {

		},
		methods: {
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
					}
				});
			},
			error(e) {
				console.log(e.detail);
			},
			image2Base64(url, callback) {
				var Img = new Image(), dataURL = '';
				Img.src = url + '?v=' + Math.random();
				Img.setAttribute('crossOrigin', 'Anonymous');
				Img.onload = function() {
					var canvas = document.createElement('canvas'),
				    width = Img.width,
				    height = Img.height;
				    canvas.width = width;
				    canvas.height = height;
				    canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
				    dataURL = canvas.toDataURL('image/jpg');
				    return callback ? callback(dataURL) : null;
				}
			},
			emotion () {
				let faceBase64;
				this.image2Base64(this.src, dataURL => {
					
					faceBase64 = dataURL.split(",")[1];
					console.log(faceBase64);
					getEmotion(faceBase64).then(res => {
						if (res.data.code === 200) {
							this.result = "data:image/jpg;base64," + btoa(new Uint8Array(res.data).reduce((res, byte) => res + String.fromCharCode(byte), ''));
							showResult = true;
						} else {
							uni.showModal({
								content: res.data.msg,
								showCancel: false
							});
						}						   
					}).catch(failResponse => {});
				});
			}
		}
	}
</script>

<style>
</style>

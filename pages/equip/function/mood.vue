<template>
	<view id="mood">
<!-- 		<camera device-position="back" flash="off" style="width: 100%;height: 400upx;">

		</camera> -->
		<view style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">人脸图像</text>
			<u--image :src=src width="100%" style="margin-left: 5%;margin-right: 5%;margin-top: 50rpx;" mode="widthFix">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
		</view>
		
		<view v-show=showResult style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">结果分析</text>
			<u--image :src=result width="100%" style="margin-left: 5%;margin-right: 5%;margin-top: 50rpx;" mode="widthFix">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
		</view>
		
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="拍照" color="#3fd1ad" @click="chooseImage()">
		</u-button>
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="生成结果" color="#3fd1ad" @click="emotion()">
		</u-button>
		
	</view>
</template>

<script>
	import {getEmotion} from "../../../api/function/function.js"
	export default {
		name: "mood",
		data() {
			return {
				src: '',
				blob: '',
				showResult: false,
				result: ''
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
			image2Base64(blob, callback) {
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onload = function (e) {
				    callback(e.target.result);
				}
				// var Img = new Image(), dataURL = '';
				// Img.src = url + '?v=' + Math.random();
				// Img.setAttribute('crossOrigin', 'Anonymous');
				// Img.onload = function() {
				// 	var canvas = document.createElement('canvas'),
				//     width = Img.width,
				//     height = Img.height;
				//     canvas.width = width;
				//     canvas.height = height;
				//     canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
				//     dataURL = canvas.toDataURL('image/jpg');
				//     return callback ? callback(dataURL) : null;
				// }
			},
			chooseImage(){
				uni.chooseImage({
				  	count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['camera','album'], //这要注意，camera掉拍照，album是打开手机相册
				    success: (res)=> {
						console.log(res.tempFiles[0]);
						this.src = res.tempFilePaths[0];
						this.blob = res.tempFiles[0];
				    }
				});
			},
			emotion () {
				let faceBase64;
				this.image2Base64(this.blob, dataURL => {
					//console.log(123)
					faceBase64 = dataURL.split(",")[1];
					//console.log(faceBase64);
					getEmotion(faceBase64).then(res => {
						console.log(res)
						if (res.data.code === 200) {
							this.result = "data:image/jpg;base64," + btoa(new Uint8Array(res.data).reduce((res, byte) => res + String.fromCharCode(byte), ''));
							showResult = true;
						} else {
							console.log(123)
							uni.showModal({
								content: res.data.msg,
								showCancel: false
							});
						}						   
					}).catch(err => {console.log(err)});
				});
			}
		}
	}
</script>

<style>
</style>

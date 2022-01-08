<template>
	<view id="mood">
		<!-- 		<camera device-position="back" flash="off" style="width: 100%;height: 400upx;">

		</camera> -->
		<view style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">人脸图像</text>
			<div class="img" v-if="src===''" @click="chooseImage()">
			</div>
			<div class="img" v-if="src!==''" :style=" {backgroundImage:'url('+src+')'}">
			</div>
		</view>

		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="拍照" color="#3fd1ad"
			@click="chooseImage()">
		</u-button>
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="生成结果" color="#3fd1ad"
			@click="emotion()">
		</u-button>
		<view v-show="this.showResult" style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">结果分析</text>
			<text></text>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="pie" :chartData="chartData" background="none" />
		</view>
	</view>
</template>

<script>
	import {
		getEmotion
	} from "../../../api/function/function.js"
	import uCharts from 'uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
	var _self;
	var canvaPie = null;
	export default {
		name: "mood",
		data() {
			return {
				src: '',
				blob: '',
				showResult: false,
				result: '',
				chartData: {
					categories: [],
					series: [{
						data: []
					}]
				},


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
				reader.onload = function(e) {
					callback(e.target.result);
				}

			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //这要注意，camera掉拍照，album是打开手机相册
					success: (res) => {
						console.log(res.tempFiles[0]);
						this.src = res.tempFilePaths[0];
						this.blob = res.tempFiles[0];
					}
				});
			},
			emotion() {
				let faceBase64;
				this.image2Base64(this.blob, dataURL => {

					faceBase64 = dataURL.split(",")[1];


					getEmotion(faceBase64).then(res => {
						if (res.status === 200) {
							this.chartData.series[0].data = []
							if (res.data === ''){
								uni.showModal({
									content: '未检测到人脸',
									showCancel: false
								})
							}
							for (let i = 0; i < 7; i++) {
								let item = {}
								if (i === 0) {
									item.name = '惊讶'
									item.value = res.data.surprise
								}
								if (i === 1) {
									item.name = '生气'
									item.value = res.data.anger
								}
								if (i === 2) {
									item.name = '喜悦'
									item.value = res.data.happiness
								}
								if (i === 3) {
									item.name = '中性'
									item.value = res.data.neutral
								}
								if (i === 4) {
									item.name = '伤心'
									item.value = res.data.sadness
								}
								if (i === 5) {
									item.name = '厌恶'
									item.value = res.data.disgust
								}
								if (i === 6) {
									item.name = '恐惧'
									item.value = res.data.fear
								}
								this.chartData.series[0].data.push(item)
							}
							this.showResult = true;
						} else {

							uni.showModal({
								content: res.data.msg,
								showCancel: false
							});
						}
					}).catch(err => {
						console.log(err)
					});
				});
			},

		}
	}
</script>

<style>
	.img {
		position: relative;
		width: 400rpx;
		height: 400rpx;
		background-image: url(../../../static/icon/camera.png);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
		margin: auto;
		border-radius: 50%;
		margin-top: 40rpx;
	}

	.charts-box {
		width: 100%;
		height: 280px;
	}
</style>

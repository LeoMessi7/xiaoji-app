<template>
	<view>
		<!-- 		<camera device-position="back" flash="off" style="width: 100%;height: 400upx;">

		</camera> -->
		<view style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">人脸图像</text>
			<div class="img" v-if="src===''" @click="chooseImage()">
			</div>
			<div class="img" v-if="src!==''" :style=" {backgroundImage:'url('+src+')'}">
			</div>
		</view>
		<view style="width: 100%;text-align: center;margin-top: 50rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">选择口红色号</text>
			<div  style="margin: auto;width: 60%;margin-top: 40rpx;height: 60rpx;">
				<text style="float: left;font-weight: 600;font-size: 40rpx;color: #4f4f4f;">{{radiovalue1}}</text>
				<u-button @click="show = true"  style="float:right;width: 50%;border-radius: 50px;margin-top: -10rpx;background-color: #63bbd0;color:#fff;font-size: 30rpx;">选择色号</u-button>
				<div style="width: 50rpx;height: 30rpx;border-radius: 50% 10% 10% 50%;float: left;margin-left: 40rpx;margin-top: 10rpx;" :style="{backgroundColor:color}"></div>
							
			</div>
			
			<u-popup :show="show" @close="close" @open="open">
				<view>
					<u-radio-group v-model="radiovalue1" placement="column" borderBottom iconPlacement="right"
						@change="groupChange" size="30" style="width: 60%;margin-left: 20%;margin-top: 50rpx;">
						<u-radio :customStyle="{marginBottom: '8px'}" :activeColor="item.color"
							v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="item.name"
							labelSize="20px" @change="radioChange">
						</u-radio>
					</u-radio-group>
				</view>
			</u-popup>


		</view>

		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="拍照" color="#3fd1ad"
			@click="chooseImage()">
		</u-button>
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="生成结果" color="#3fd1ad"
			@click="faceBeauty()">
		</u-button>
		<view v-show=showResult style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">结果展示</text>
			<div class="img" :style=" {backgroundImage:'url('+result+')'}">
			</div>
		</view>
	</view>
</template>

<script>
	import {
		beauty
	} from "../../../api/function/function.js"
	export default {
		data() {
			return {
				src: '',
				show: false,
				radiolist1: [{
<<<<<<< HEAD
						name: '紫色',
=======
						name: '紫罗兰',
>>>>>>> 720fd44e88fb20bc9c24a5cbf7cfd4b52a7eb9b7
						disabled: false,
						color: '#CF2CB5'
					},
					{
						name: '蜜桃色',
						disabled: false,
<<<<<<< HEAD
						color:'#C93C66'
=======
						color: '#C93C66'
>>>>>>> 720fd44e88fb20bc9c24a5cbf7cfd4b52a7eb9b7
					},
					{
						name: '红色',
						disabled: false,
<<<<<<< HEAD
						color:'#C10532'
					}, {
						name: '咖啡色',
						disabled: false,
						color:'#72122F'
					}, {
						name: '蓝色',
						disabled: false,
						color:'#135F89'
					}, {
						name: '橘色',
						disabled: false,
						color:'#E06959'
=======
						color: '#C10532'
					}, {
						name: '咖啡色',
						disabled: false,
						color: '#72122F'
					}, {
						name: '宝石蓝',
						disabled: false,
						color: '#135F89'
					}, {
						name: '橘色',
						disabled: false,
						color: '#E06959'
>>>>>>> 720fd44e88fb20bc9c24a5cbf7cfd4b52a7eb9b7
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '红色',
				color:'#C10532',
				showResult: false,
				origin: "",
				blob: '',
				result: ""
			};
		},
		onLoad() {},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
				switch(n){
					case '紫罗兰':{
						this.color='#CF2CB5'
						break;
					}
					case '蜜桃色':{
						this.color='#C93C66'
						break;
					}
					case '红色':{
						this.color='#C10532'
						break;
					}
					case '咖啡色':{
						this.color='#72122F'
						break;
					}
					case '宝石蓝':{
						this.color='#135F89'
						break;
					}
					case '橘色':{
						this.color='#E06959'
						break;
					}
				}
		
				this.show=false
			},
			radioChange(n) {
				console.log('radioChange', n);

			},
			open() {
				this.show=true;
			},
			close() {
				this.show = false
				// console.log('close');
			},
			image2Base64(blob, callback) {
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onload = function(e) {
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
<<<<<<< HEAD
			chooseImage(){
=======
			chooseImage() {
>>>>>>> 720fd44e88fb20bc9c24a5cbf7cfd4b52a7eb9b7
				this.showResult = false;
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
			faceBeauty() {
				let radiocolor;
				let faceBase64;
				let list = this.radiolist1;
				for (var i = 0; i < 6; i++) {
					if (list[i].name === this.radiovalue1) {
						radiocolor = list[i].color;
					}
				}
				console.log(radiocolor)
				this.image2Base64(this.blob, dataURL => {
					//console.log(dataURL);
					faceBase64 = dataURL.split(",")[1];
					beauty(faceBase64, radiocolor).then(res => {
						console.log(res)
						if (res.status === 200) {
							console.log(res.data.error_message)
							if (res.data.error_message === "NO_FACE_FOUND") {
								uni.showModal({
									content: '未检测到人脸',
									showCancel: false
								});
							} else {
								let image = res.data.makeup_image;
								this.result = "data:image/png;base64," + image;
								this.showResult = true;
							}
						} else {
							uni.showModal({
								content: '网络异常',
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
</style>

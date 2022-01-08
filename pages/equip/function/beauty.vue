<template>
	<view>
<!-- 		<camera device-position="back" flash="off" style="width: 100%;height: 400upx;">

		</camera> -->
		<view style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">人脸图像</text>
			<u--image :src=origin width="100%" style="margin-left: 5%;margin-right: 5%;margin-top: 50rpx;" mode="widthFix">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
		</view>
		<view style="width: 100%;text-align: center;margin-top: 50rpx;">
			<text style="font-size: 40rpx;">选择口红色号</text>
			<u-radio-group v-model="radiovalue1" placement="column" borderBottom iconPlacement="right" @change="groupChange" size="30" style="width: 60%;margin-left: 20%;margin-top: 50rpx;">
				<u-radio :customStyle="{marginBottom: '8px'}" :activeColor="item.color" v-for="(item, index) in radiolist1" :key="index"
					:label="item.name" :name="item.name" labelSize="20px" @change="radioChange">
				</u-radio>
			</u-radio-group>
		</view>

		<view v-show=showResult style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">结果展示</text>
			<u--image :src=result width="100%" style="margin-left: 5%;margin-right: 5%;margin-top: 50rpx;" mode="widthFix">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
		</view>
		
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="拍照" color="#3fd1ad" @click="chooseImage()">
		</u-button>
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="生成结果" color="#3fd1ad" @click="faceBeauty()">
		</u-button>
	</view>
</template>

<script>
	import {beauty} from "../../../api/function/function.js"
	export default {
		data() {
			return {
				radiolist1: [{
						name: '正红',
						disabled: false,
						color:'#CF2CB5'
					},
					{
						name: '大红',
						disabled: false,
						color:'#ff300c'
					},
					{
						name: '橘红',
						disabled: false,
						color:'#ff6011'
					}, {
						name: '蜜桃',
						disabled: false,
						color:'#ff79a1'
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '正红',
				showResult: false,
				origin: "",
				blob: '',
				result: ""
			};
		},
		onLoad() {
		},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
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
						this.origin = res.tempFilePaths[0];
						this.blob = res.tempFiles[0];
				    }
				});
			},
			faceBeauty() {
				let radiocolor;
				let faceBase64;
				let list = this.radiolist1;
				for (var i = 0; i < 4; i++) {
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
							let image = res.data.makeup_image;
							this.result = "data:image/png;base64," + image;
							this.showResult = true;
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

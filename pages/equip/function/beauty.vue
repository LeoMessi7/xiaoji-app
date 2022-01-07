<template>
	<view>
<!-- 		<camera device-position="back" flash="off" style="width: 100%;height: 400upx;">

		</camera> -->
		<view style="width: 100%;text-align: center;margin-top: 30rpx;">
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
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="生成结果" color="#3fd1ad" @click="faceBeauty()">
		</u-button>
		<view v-show=showResult style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">结果展示</text>
			<u--image :src=result width="100%" style="margin-left: 5%;margin-right: 5%;margin-top: 50rpx;" mode="widthFix">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
		</view>
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
						color:'#ff0000'
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
				showResult: true,
				origin: "https://cdn.uviewui.com/uview/album/1.jpg",
				result: "https://cdn.uviewui.com/uview/album/1.jpg"
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
				this.image2Base64(this.origin, dataURL => {
					//console.log(dataURL);
					faceBase64 = dataURL.split(",")[1];
					beauty(faceBase64, radiocolor).then(res => {
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

<template>
	<view id="mood">
		<camera device-position="back" flash="off" style="width: 100%;height: 400upx;">

		</camera>
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="生成结果" color="#3fd1ad" @click="Back">
		</u-button>
		<view style="width: 100%;text-align: center;margin-top: 30rpx;">
			<text style="font-size: 40rpx;font-weight: 600;">结果分析</text>
			<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" width="100%" style="margin-left: 5%;margin-right: 5%;margin-top: 50rpx;" mode="widthFix">
				<view slot="error" style="font-size: 24rpx;">加载失败</view>
			</u--image>
		</view>

		
	</view>
</template>

<script>
	export default {
		name: "mood",
		data() {
			return {
				src: ""
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
			}
		}
	}
</script>

<style>
</style>

<template>
	<view id="my">
		<u-cell-group style="width:100%;margin-top: 40rpx;background-color: #FFFFFF;">
			<u-cell title="头像" size="large" isLink></u-cell>
			<u-cell title="账号" size="large" :isLink="true" url="/pages/my/myInfo"></u-cell>
			<u-cell title="消息" size="large" :isLink="true" url="/pages/my/message"></u-cell>
		</u-cell-group>
		<u-cell-group style="width:100%;margin-top: 40rpx;background-color: #FFFFFF;">
			
			<u-cell title="联系我们: 同济大学  小济智能分队" size="large"  ></u-cell>
			<u-cell title="应用版本-V1.0" size="large"  ></u-cell>
		</u-cell-group>
		<div style="position: absolute;bottom: 50rpx;width: 100%;text-align: center;">
			<u-button type="error" size="large" :plain="true" :hairline="true" style="width:80%;border-radius:50px ;" @click="logOut" text="退出登录">
			</u-button>
			<p style="color: #999992;margin-top: 30rpx;">2021 xiaoji-smart All rights reserved</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			}
		},
		onLoad() {

		},
		methods: {
			logOut() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	#my {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	/deep/.u-cell__body {
	    display: flex;
	    flex-direction: row;
	    box-sizing: border-box;
	    padding: 20px 15px;
	    font-size: 15px;
	    color: #303133;
	    align-items: center;
	}
</style>

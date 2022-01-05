<template>
	<view class="content">
		<div style="margin-top: 30%;">
			<img src="static/login.png" style="height:100rpx;position: relative;transform: translateY(30rpx);" />
			<p style="display: inline;font-size: 60rpx;color: #00aaff;font-weight: 600;letter-spacing: 10rpx;">小济<span
					style="color: #606266;">智能</span></p>
		</div>

			<p v-if="key===0" class="text">登录</p>
			<u--form v-if="key===0" style="margin-top: 50rpx;width: 70%;" labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item style="position: relative;height: 120rpx;" label="账号" border="none" prop="userInfo.account"
					ref="item1">
					<u--input v-model="model1.userInfo.account" placeholder="请输入账号" border="bottom"></u--input>
				</u-form-item>
				<u-form-item style="position: relative;height: 120rpx;" label="密码" prop="userInfo.password" border="none"
					ref="item1">
					<u--input type="password" v-model="model1.userInfo.password" placeholder="请输入密码" border="bottom">
					</u--input>
				</u-form-item>
			</u--form>
	
			<p v-if="key===1" class="text">注册</p>
			<u--form v-if="key===1" style="margin-top: 50rpx;width: 70%;" labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item style="position: relative;height: 120rpx;" label="账号" border="none" prop="userInfo.account"
					ref="item1">
					<u--input v-model="model1.userInfo.account" placeholder="请输入账号" border="bottom"></u--input>
				</u-form-item>
				<u-form-item style="position: relative;height: 120rpx;" label="密码" prop="userInfo.password" border="none"
					ref="item1">
					<u--input type="password" v-model="model1.userInfo.password" placeholder="请输入密码" border="bottom">
					</u--input>
				</u-form-item>
				<u-form-item style="position: relative;height: 120rpx;" label="密码" prop="userInfo.password" border="none"
					ref="item1">
					<u--input type="password" v-model="model1.userInfo.confirmPassword" placeholder="请输入密码" border="bottom">
					</u--input>
				</u-form-item>
			</u--form>
	
		<u-button v-if="key===0" style="background-color: #3fd1ad;color: #fff; margin-top: 100rpx; width: 70%;" text="登录" size="large"
			shape="circle" @click="key=0"></u-button>
		<u-button style="background-color: #00aaff;color: #fff; margin-top: 30rpx; width: 70%;" text="注册" size="large"
			shape="circle" @click="key=1"></u-button>
		<p class="bottom">小济智能(xiaoji-smart)-一套完善的智能家居系统</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key:0,
				model1: {
					userInfo: {
						account: '',
						password: '',
						confirmPassword:''
					},
				},
				rules: {
					'userInfo.account': {
						type: 'string',
						required: true,
						message: '请输入账号',
						trigger: ['blur', 'change']
					},
					'userInfo.password': {
						type: 'string',
						max: 16,
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.text {
		padding-left: 30rpx;
		margin-top: 10%;
		display: flex;
		justify-content: center;
		font-size: 60rpx;
		font-weight: 550;
		color: #606266;
		letter-spacing: 30rpx;
	}
	.bottom {
		position: absolute;
		bottom: 5%;
		color: #999999;

	}
</style>

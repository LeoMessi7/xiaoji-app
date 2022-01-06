<template>
	<view class="content">
		<div style="margin-top: 30%;">
			<img src="static/login.png" style="height:100rpx;position: relative;transform: translateY(30rpx);" />
			<p style="display: inline;font-size: 60rpx;color: #00aaff;font-weight: 600;letter-spacing: 10rpx;">小济<span
					style="color: #606266;">智能</span></p>
		</div>

			<p v-if="key===0" class="text">登录</p>
			<u--form v-if="key===0" style="margin-top: 50rpx;width: 70%;" labelPosition="left" :model="userInfo" :rules="loginRules" ref="form1">
				<u-form-item style="position: relative;height: 120rpx;" label="账号" border="none" prop="account" ref="item1">
					<u--input v-model="userInfo.account" placeholder="请输入账号" border="bottom"></u--input>
				</u-form-item>
				<u-form-item style="position: relative;height: 120rpx;" label="密码" prop="password" border="none" ref="item1">
					<u--input type="password" v-model="userInfo.password" placeholder="请输入密码" border="bottom">
					</u--input>
				</u-form-item>
			</u--form>
	
			<p v-if="key===1" class="text">注册</p>
			<u--form v-if="key===1" style="margin-top: 50rpx;width: 70%;" labelPosition="left" :model="newUserInfo" :rules="registerRules" ref="form2">
				<u-form-item style="position: relative;height: 120rpx;" label="账号" border="none" prop="account" ref="item2">
					<u--input v-model="newUserInfo.account" placeholder="请输入账号" border="bottom"></u--input>
				</u-form-item>
				<u-form-item style="position: relative;height: 120rpx;" label="昵称" border="none" prop="nickname" ref="item2">
					<u--input v-model="newUserInfo.nickname" placeholder="请输入昵称" border="bottom"></u--input>
				</u-form-item>
				<u-form-item style="position: relative;height: 120rpx;" label="密码" prop="password" border="none" ref="item2">
					<u--input type="password" v-model="newUserInfo.password" placeholder="请输入密码" border="bottom">
					</u--input>
				</u-form-item>
				<u-form-item style="position: relative;height: 120rpx;" label="确认密码" prop="confirmedPassword" border="none" ref="item2">
					<u--input type="password" v-model="newUserInfo.confirmedPassword" placeholder="请再次输入密码" border="bottom">
					</u--input>
				</u-form-item>
			</u--form>
	
		<u-button v-if="key===0" style="background-color: #3fd1ad;color: #fff; margin-top: 100rpx; width: 70%;" text="登录" size="large"
			shape="circle" @click="login()"></u-button>
		<u-button v-if="key===0" style="background-color: #d60000;color: #fff; margin-top: 30rpx; width: 70%;" text="没有账号" size="large"
			shape="circle" @click="changeKey(1)"></u-button>
		<u-button v-if="key===1" style="background-color: #00aaff;color: #fff; margin-top: 30rpx; width: 70%;" text="注册" size="large"
			shape="circle" @click="register()"></u-button>
		<u-button v-if="key===1" style="background-color: #3fd1ad;color: #fff; margin-top: 30rpx; width: 70%;" text="返回登录" size="large"
			shape="circle" @click="changeKey(0)"></u-button>
		<p class="bottom">小济智能(xiaoji-smart)-一套完善的智能家居系统</p>
	</view>
</template>

<script>
	import {userLogin, userRegister} from "../../api/login/login.js"
	export default {
		data() {
			let validateUsername = (rule, value, callback) => {
			    if (value === '') {
					callback(new Error('请输入账号'))
			    } else {
					callback() // 添加成功回调
			    }
			}
			let validateNickname = (rule, value, callback) => {
			    if (value === '') {
					callback(new Error('请输入昵称'))
			    } else {
					callback()
			    }
			}
			let validatePassword = (rule, value, callback) => {
			    if (value.length < 8 || value.length > 16) {
					callback(new Error('请输入8到16位的密码'))
			    } else {
					callback()
			    }
			}
			let validateConfirmedPassword = (rule, value, callback) => {
				if (value !== this.newUserInfo.password) {
					callback(new Error('两次输入的密码不一致'))
			    } else {
					callback()
			    }
			}
			return {
				key : 0,
				userInfo: {
					account: '',
					password: '',
				},
				newUserInfo: {
					account: '',
					nickname: '',
					password: '',
					confirmedPassword: '',
				},
				loginRules: {
					'account': [{
						validator: validateUsername,
						trigger: ['blur', 'change']
					}],
					'password': [{
						validator: validatePassword,
						trigger: ['blur', 'change']
					}],
				},
				registerRules: {
					'account': [{
						validator: validateUsername,
						trigger: ['blur', 'change']
					}],
					'nickname': [{
						validator: validateNickname,
						trigger: ['blur', 'change']
					}],
					'password': [{
						validator: validatePassword,
						trigger: ['blur', 'change']
					}],
					'confirmedPassword': [{
						validator: validateConfirmedPassword,
						trigger: ['blur', 'change']
					}],
				}
			}
		},
		methods: {
			changeKey(key) {
				if (this.$refs['form1']) {
				  this.$nextTick(function () {
				    	this.$refs['form1'].clearValidate()
				  })
				} else if (this.$refs['form2']) {
				  this.$nextTick(function () {
				    	this.$refs['form2'].clearValidate()
				  })
				} 
				this.key = key
			},
			login() {
				this.$refs.form1.validate().then(valid => {
					console.log(valid)
				    userLogin(this.userInfo.account, this.userInfo.password).then(res => {
						if (res.data.code === 200) {
							console.log(resp.data.object);
							this.$store.commit('login', resp.data.object.id);
						} else {
							this.$alert(resp.data.msg, '提示', {
								confirmButtonText: '确定'
							});
						}						   
					}).catch(failResponse => {});
				}).catch(err=>{ console.log(err) });
			},
			register() {
				this.$refs.form2.validate().then(valid => {
					console.log(valid)
				    userRegister(this.newUserInfo.account, this.newUserInfo.nickname, this.newUserInfo.password).then(res => {
						if (res.data.code === 200) {
							console.log(resp.data.object);
							this.$store.commit('login', resp.data.object.id);
						} else {
							this.$alert(resp.data.msg, '提示', {
								confirmButtonText: '确定'
							});
						}						   
					}).catch(failResponse => {});
				}).catch(err=>{ console.log(err) });
			}
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

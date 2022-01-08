<template>
	<div class="info">
		<div class="icon">
			<img style="height: 80rpx;" src="static/account.png" />
		</div>
		<ul>
			<li><span>用户名称：</span>{{Info.name}}</li>
			<li><span>用户昵称：</span>{{Info.nickname}}</li>
			<li><span>电子邮箱：</span>{{Info.email}}</li>
			<li><span>电话号码：</span>{{Info.phone}}</li>
			<li><span>创建时间：</span>{{Info.createTime}}</li>
			<li><span>备注信息：</span>{{Info.remark}}</li>
		</ul>
	</div>
</template>

<script>
	import {getUserInfo} from "../../api/user/user.js"
	export default {
		data() {
			return {
				Info: {
					name: '',
					nickname: '',
					email: '',
					phone: '',
					createTime: '',
					remark: '',
				}
			}
		},
		mounted() {
			this.Info = this.$store.state.user;
			
			// getUserInfo().then(res => {
			// 	if (res.data.code === 200) {
			// 		console.log(res.data.object);
			// 		let info = res.data.object;
			// 		this.Info.name = info.name,
			// 		this.Info.nickname = info.nickname,
			// 		this.Info.email = info.email,
			// 		this.Info.phone = info.phone,
			// 		this.Info.createTime = info.createTime,
			// 		this.Info.remark = info.remark,
			// 	} else {
			// 		uni.showModal({
			// 			title: '获取用户信息失败',
			// 			content: res.data.msg,
			// 			showCancel: false
			// 		});
			// 	}
			// }).catch(failResponse => {});
		},
		methods: {

		}
	}
</script>

<style>
	.info {
		background-color: #FFFFFF;
		position: relative;
		margin-left: 3%;
		margin-top: 3%;
		padding-top: 1%;
		padding-bottom: 20%;
		height: 70%;
		width: 94%;
		border-radius: 8px;
	}

	u--input {
		float: left;
		display: inline;
	}

	.form {
		width: 90%;
		position: relative;
		margin: auto;
		text-align: left;
		margin-top: 20rpx;
	}

	.icon {
		width: 90%;
		margin: auto;
		position: relative;
		text-align: left;
		margin-top: 20rpx;
		border-bottom: solid 1rpx #cfd4dc;
	}

	.detail {
		position: relative;
		width: 100%;
		text-align: left;
	}

	ul {
		list-style: none;
		line-height: 80rpx;
		margin-top: 40rpx;
		margin-left: 7%;
		padding: 0;

	}

	.btn {

		width: 80%;
		margin-top: 80rpx;
		margin-left: 10%;
	}
</style>

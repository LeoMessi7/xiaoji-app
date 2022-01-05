<template>
	<view>
		<div class="deploy1">
			<div class="form">
				<div class="p1">服务端配置</div>
				<div class="p4">使用路径默认prod-api</div>
				<div class="p2">接口地址：</div>
				<div class="p3">服务端地址</div>
				<u--input placeholder="请输入内容" border="bottom" clearable></u--input>
				<div class="p2">路径：</div>
				<div class="p3">服务端地址</div>
				<u--input placeholder="请输入内容" border="bottom" clearable></u--input>
			</div>
			<div class="btn">
				<u-button style="width: 32%;float: left;border-radius: 50px;" text="连接测试" color="#3fd1ad" @click="Back">
				</u-button>
				<u-button style="margin-left: 4%; width: 64%;float: left;border-radius: 50px;" text="保存"
					color="#006dfe">
				</u-button>
			</div>
		</div>
		<div class="deploy2">
			<div class="form">
				<div class="p1">AP配置</div>
				<div class="p4">需要设备支持并启动AP，手机连接设备wifi热点</div>
				<div class="p2">设备AP地址：</div>
				<div class="p3">设备地址</div>
				<u--input style="float: left;width: 60%;" placeholder="请输入内容" border="bottom" clearable></u--input>
					<u-button style="width: 32%;float: right;border-radius: 50px;" text="打开" color="#3fd1ad" @click="Back">
					</u-button>
				</div>
			</div>
			
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Info: {
					name: '树莓派1',
					rename: '第一个',
					id: '7CDFA1049ADA',
					category: '树莓派',
					edition: 'v1.0',
					state: '离线',
					key: false,
					color: 'background-color:#dcdcdc',
					createTime: '2021-12-20 07:12:23',

				},
				rules: {
					'Info.name': {
						type: 'string',
						required: true,
						message: '请输入名称',
						trigger: ['blur', 'change']
					},
					'Info.rename': {
						type: 'string',
						required: false,
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onLoad() {

		},
		methods: {
			changecolor() {}
		}
	}
</script>

<style>
	.deploy1 {
		background-color: #FFFFFF;
		position: relative;
		margin-left: 3%;
		margin-top: 3%;
		padding-top: 1rpx;
		padding-bottom: 150rpx;
		width: 94%;
		border-radius: 8px;
		text-align: center;
	}

	.deploy2 {
		background-color: #FFFFFF;
		position: relative;
		padding-top: 1rpx;
		padding-bottom: 150rpx;
		margin-left: 3%;
		margin-top: 30rpx;

		width: 94%;
		border-radius: 8px;
		text-align: center;
	}

	.p1 {
		margin-top: 60rpx;
		height: 50rpx;
		text-align: left;
		font-weight: 600;
		color: #585858;
		border-bottom: solid 5rpx #e5e5e5;
	}

	.p4 {
		
		text-align: left;
		font-size: 20rpx;
		font-weight: 500;
		color: #006dfe;
		
	}

	.p2 {
		margin-top: 40rpx;

		height: 50rpx;
		text-align: left;
		font-weight: 500;
		color: #707070;
	}

	.p3 {
		margin-top: -10rpx;
		height: 25rpx;
		text-align: left;
		font-size: 12rpx;
		font-weight: 500;
		color: #9d9d9d;
	}

	.u-border-bottom {
		border-bottom-width: 1.5px !important;
	}

	.u-border-bottom focus {
		border-bottom-width: 20px !important;
	}

	.form {
		width: 86%;
		margin: auto;
		margin-top: 20rpx;
	}

	ul {
		list-style: none;
		line-height: 70rpx;
	}

	.btn {

		width: 80%;
		margin-top: 80rpx;
		margin-left: 10%;
	}
</style>

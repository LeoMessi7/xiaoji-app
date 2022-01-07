<template>
	<view>
		<div class="deploy1">
			<div class="form"> 
				<div class="p1">配置网络</div>
				<img src="../../static/wifi.png" style="width: 70%;margin-top: 40rpx;"/>
				<div class="p2">WIFI：</div>
				<u--input placeholder="请输入内容" border="bottom" clearable></u--input>
				<div class="p2">密码：</div>
			
				<u--input placeholder="请输入内容" border="bottom" clearable></u--input>
				
			</div>
			<div style="text-align: left;width: 90%;margin-left: 5%;margin-top: 40rpx;">
				<div @click="isClose=!isClose"><text style="float: left;">选项</text>
				<u-icon v-if="isClose===true" style="float: left;margin-top: 8rpx;margin-left: 6rpx;" name="arrow-down"/>
				<u-icon v-if="isClose===false" style="float: left;margin-top: 8rpx;margin-left: 6rpx;" name="arrow-up"/>
				</div><br>
				<div  v-if="isClose===false" style="margin-top: 40rpx;">
					<span style="float: left; line-height: 35px;margin-left: 30rpx;">设备数量：</span>
					<u-slider showValue activeColor="#006dfe" v-model="value" step="1" min="1" max="32">
					</u-slider>
					<u-radio-group 
					    v-model="way"
					    placement="row"
						style="margin-left: 20%;margin-top: 30rpx;">
						<u-radio activeColor="#006dfe" name="广播" label="广播"></u-radio>
						<u-radio activeColor="#006dfe"  name="组播" label="组播"style="margin-left: 30%;"></u-radio>

					</u-radio-group>
				</div>
				
				</div>
			<div class="btn">
				<u-button style="width: 22%;float: left;border-radius: 50px;" text="返回" color="#3fd1ad" @click="back()">
				</u-button>
				<u-button style="margin-left: 4%; width: 22%;float: left;border-radius: 50px;" text="取消"
					color="#ffaa7f">
				</u-button>
				<u-button style="margin-left: 4%; width: 44%;float: left;border-radius: 50px;" text="开始配网"
					color="#006dfe">
				</u-button>
			</div>
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:1,
				way:'广播',
				isClose:true,
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
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
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

<template>
	<view>
		<div class="voice">
			<div class="info">
				<span style="">小济智能</span>
				
				<u-divider style="margin: 10rpx 3% 0 3%;width:94%" :lineColor="color" #3fd1ad :dot="true"></u-divider>
			</div>
			<div class="v">
				<img v-if="voice.state===false" style="margin-top: 50rpx;" src="static/voice.png" />
				<img v-if="voice.state===true" style="margin-top: 50rpx;" src="static/voice2.png" /><br>
				<img style="height: 200rpx;" src="static/voice3.png" />
			</div>
			<div class="body">
				<span style="">唤醒小济</span>
			<u-switch style="position: relative;margin: auto;margin-top: 20rpx;" size="30" v-model="voice.state"
				activeColor="#00c1de" @change="changekey(voice)">
			</u-switch>
			</div>
			
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: '#dcdcdc',
				url:'static/voice2.png',
				voice: {
					state: false
				},
			}
		},
		onLoad() {

		},
		methods: {
			changekey(item) {
				if (item.state) {
					this.color = '#00c1de',
					this.url='static/voice2.png'
						item.color = 'background-color:#00c1de'
				} else {
					this.color = '#dcdcdc',
					this.url='static/voice.png'
						item.color = 'background-color:#dcdcdc'
				}
				event.stopPropagation();
			},
		}
	}
</script>

<style>
	.voice {
		background-color: #FFFFFF;
		position: fixed;
		margin-left: 3%;
		margin-top: 3%;
		height: 90%;
		width: 94%;
		border-radius: 8px;
		text-align: center;
	}

	.info {
		margin-top: 50rpx;
		font-size: 40rpx;
		font-family: '幼圆';
		font-weight: 600;
	}

	/deep/.u-divider__dot {
		color: #00c1de;
		font-family: '';
	}
	.body{
		font-size: 40rpx;
		font-family: '幼圆';
		font-weight: 600;
		color: #00c1de;
		margin-top: 200rpx;
		text-align: center;
	}
</style>

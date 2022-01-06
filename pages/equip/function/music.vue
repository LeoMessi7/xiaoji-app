<template>
	<view style="background-color: #FFFFFF;height: 100%;">
		<div class="box">
			<image :class="this.key?'tag':'tag1'" src="../../../static/music/player_bar.png" mode:widthFix><br>
			</image>
			<image src="../../../static/music/disc.png"
				style="position: relative;width: 480rpx;height: 480rpx;margin-top: 200rpx;">
			</image><br>
			<div style="margin-top: 40px;">
				<text style="font-weight: 600;font-size: 50rpx;margin-top: 100rpx;">{{name }}<br><span style="font-weight: 500;font-size: 35rpx;">{{singer}}</span></text>
			</div>
		</div>
		<view style="width: 100%;display: flex;margin-top: 10%;">
			<u-icon name="list" color="#535353" size="30" style="float: right;margin-left: 82%;"></u-icon>
		</view>
		<view class="second-row-control">
			<text class="start-time">{{startTime}}</text>
			<view class="line" @click="emitClick">
				<view class="line-active" :style="{width:width}"></view>
			</view>
			<text class="end-time">{{endTime}}</text>
		</view>
		<div style="display: flex;text-align: center;margin-left: 28%;padding-bottom: 100rpx;padding-top: 20rpx;">
			<u-icon name="skip-back-left" color="#535353" size="45" style="float: left;margin-top: 20rpx;"></u-icon>
			<u-icon v-if="this.key===true" name="play-circle" color="#535353" size="60"
				style="float:left;margin-left: 20rpx;margin-right: 20rpx;" @click="changeState()"></u-icon>
			<u-icon v-if="this.key===false" name="pause-circle" color="#535353" size="60"
				style="float: left;margin-left: 20rpx;margin-right: 20rpx;" @click="changeState()"></u-icon>
			<u-icon name="skip-forward-right" color="#535353" size="45" style="float: right;margin-top: 20rpx;">
			</u-icon>
		</div>
	</view>
	<!-- <view class="control-container" :class="themeType==='light'?'ft-deep-light':'ft-deep'">
		<view class="first-row-control">
			<text class="control-item collection iconfont icon-jushoucang"></text>
			<text class="control-item download iconfont icon-xiazai"></text>
			<text class="control-item comment iconfont icon-review"></text>
			<text class="control-item other iconfont icon-paixu"></text>
		</view>
		<view class="second-row-control">
			<text class="start-time">{{startTime}}</text>
			<myuni-line class="myline" ref="line" @emitClick="changeProgress" :width="currentWidth"></myuni-line>
			<text class="end-time">{{endTime}}</text>
		</view>
		<view class="thrid-row-control">
			<text class="control-item playway iconfont" :class="single?'icon-24gl-repeatOnce2':'icon-24gl-repeat2'" @click="emitChangePlayWay"></text>
			<view class="play-control-box">
				<text class="control-item pre iconfont icon-shangyishoushangyige"  @click="emitPre"></text>
				<text class="control-item play iconfont" :class="playing?'icon-weibiaoti--':'icon-bofang1'" @click="emitPlay"></text>
				<text class="control-item next iconfont icon-xiayigexiayishou" @click="emitNext"></text>
			</view>
		</view>
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
				key: true,
				startTime: '0.00',
				endTime: '0.00',
				name:'菊花残',
				singer:'周杰伦',
				musicList: [{
					startTime: '0:00',
					endTime: '0:00'
				}]
			}
		},
		onLoad() {

		},
		methods: {
			changeState() {
				this.key = !this.key;

			},
			emitClick(e) {
				this.$emit('emitClick', e)
			}
		},
		props: ['width'],



	}
</script>
<style>
	page {
		background-color: #ffffff;
	}

	.box {
		position: relative;
		width: 100%;

		background-color: #fff;
		text-align: center;
	}

	.tag {
		z-index: 100;
		width: 200rpx;
		height: 300rpx;
		position: absolute;
		margin-top: 30px;
		margin-left: -30px;
		transition: all .3s ease-in;
		-webkit-transform-origin: left top;
		transform-origin: left top;
		transform: rotate(-40deg);
	}

	.tag1 {
		z-index: 100;
		width: 200rpx;
		height: 300rpx;
		position: absolute;
		margin-top: 30px;
		margin-left: -30px;
		transition: all .3s ease-in;
		-webkit-transform-origin: left top;
		transform-origin: left top;
		transform: rotate(0deg);
	}

	.player {
		position: absolute;
		bottom: 0;
	}

	.second-row-control {
		margin: 40rpx 80rpx;
		display: flex;
		align-items: center;

		.myline {
			flex: 1;
		}

		.start-time,
		.end-time {
			width: 176rpx;
			text-align: center;
		}
	}

	.line {
		flex: 1;
		margin-left: 20rpx;
		margin-right: 20rpx;
		height: 2rpx;
		line-height: 2rpx;
		background-color: #3f4b57;
	}

	.line-active {
		position: relative;
		width: 70%;
		height: 2rpx;
		background-color: red;

		&::after {
			position: absolute;
			right: 0;
			top: 0;
			content: '';
			display: block;
			width: 8rpx;
			height: 8rpx;
			transform: translate(0, -50%);
			background-color: red;
			border-radius: 50%;
		}
	}
</style>
<!-- 
<style>
/* 	.play-container{
		position: relative;
		/*  #ifdef  APP-PLUS*/
		    box-sizing: border-box;
		   margin-top: -56rpx;
		/*  #endif  */
		width: 100vw;
		height: 100vh;
		::v-deep.myuni-topbar{
			background-color: unset;
		}
		.top-info{
			height: 100rpx
			::v-deep.left-icon{
				line-height: 100rpx;
			}
			::v-deep.myuni-topbar{
				line-height: 50rpx;
			}
			::v-deep.right-icon{
			  width: 160rpx;
			}
			.song-name-box{
				display: flex;
				flex-direction: column;
				align-items: center;
				line-height: unset !important;
			}
			.right-info{
				height: 100%;
				image{
					box-sizing: border-box;
					padding: 20rpx;
					width: 100rpx;
					height: 100rpx !important;
					vertical-align: middle;
				}
				.uni-icons{
					margin-left: 5px;
				}
			}
		}
		.disc-box{
			position: relative;
			margin: 200rpx auto;
			/*  #ifdef MP-WEIXIN */
			margin: 50px auto;
			/*  #endif  */
			width: 510rpx;
			height: 420rpx;
			background-color:red;
			image{
				width: 100%;
			}
		}
		.rotate-stop{
			transform: rotate(-45deg) !important;
		}
		.control-container{
			box-sizing: border-box;
			padding: 20rpx;
			height: 400rpx;
			// background-color: red;
			.first-row-control{
				display: flex;
				justify-content: space-around;
				.control-item{
					flex: 1;
					text-align: center;
					font-size: 40rpx;
				}
			}
			.second-row-control{
				margin:80rpx 0;
				display: flex;
				align-items: center;
				.myline{
					flex: 1;
				}
				.start-time,
				.end-time{
					width: 176rpx;
					text-align: center;
				}
			}
			.thrid-row-control{
				display: flex;
				align-items: center;
				.control-item{
					text-align: center;
					font-size: 40rpx;
				}
				.playway{
					width: 176rpx;
				}
				.play-control-box{
					flex: 1;
					padding-left: 60rpx;
					align-items: center;
					// text-align: center;
					.play{
						margin: 0 40rpx;
						font-size: 80rpx;
					}
				}
			}
		}
	} */
</style>
 -->

<template>
	<view style="background-color: #FFFFFF;height: 100%;">
		<div class="box">
			<image :class="this.key?'tag':'tag1'" src="../../../static/music/player_bar.png" mode:widthFix><br>
			</image>
			<image src="../../../static/music/disc.png"
				style="position: relative;width: 480rpx;height: 480rpx;margin-top: 200rpx;">
			</image><br>
			<div style="margin-top: 40px;">
				<text style="font-weight: 600;font-size: 50rpx;margin-top: 100rpx;">{{name }}<br><span
						style="font-weight: 500;font-size: 35rpx;">{{singer}}</span></text>
			</div>

		</div>
		<view style="width: 80%;height: 100rpx;margin: auto;">
			<text style="float: left;font-weight: 600;color:#585858;margin-top: 80rpx;">当前心情：{{moodType}}</text>
			<u-icon name="list" color="#535353" size="30" style="float: right;margin-top: 80rpx;" @click="open()">
			</u-icon>
		</view>
		<div class="boxa1">
			<view>
				<u-popup :show="isOpen" mode="bottom" @close="close" @open="open()" :closeOnClickOverlay="true">
					<view>
						<ul>
							<li v-for="item in musicList" @click="changeAudio(item)"
								style="height: 80rpx;font-size: 40rpx;margin-top: 20rpx;">
								<label>{{item.name}} {{item.singer}}</label>
							</li>
						</ul>
					</view>
				</u-popup>
			</view>
		</div>
		<view class="second-row-control">
			<text class="start-time">{{startTime}}</text>
			<view class="line" @click="emitClick">
				<view class="line-active" :style="{width:width}"></view>
			</view>
			<text class="end-time">{{endTime}}</text>
		</view>
		<div style="display: flex;text-align: center;margin-left: 28%;padding-bottom: 100rpx;padding-top: 20rpx;">
			<u-icon name="skip-back-left" color="#535353" size="45" style="float: left;margin-top: 20rpx;"
				@click="getLastSong()"></u-icon>
			<u-icon v-if="this.key===true" name="play-circle" color="#535353" size="60"
				style="float:left;margin-left: 20rpx;margin-right: 20rpx;" @click="changeState()"></u-icon>
			<u-icon v-if="this.key===false" name="pause-circle" color="#535353" size="60"
				style="float: left;margin-left: 20rpx;margin-right: 20rpx;" @click="changeState()"></u-icon>
			<u-icon name="skip-forward-right" color="#535353" size="45" style="float: right;margin-top: 20rpx;"
				@click="getNextSong()">
			</u-icon>
		</div>
	</view>

</template>

<script>
	import {
		recommendList
	} from "../../../utils/mood.js"
	var innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				isOpen: false,
				key: true,
				startTime: '0.00',
				endTime: '0.00',
				id: '1',
				name: '',
				singer: '',
				musicList: [],
				moodType: '未检测到'
			}
		},
		onLoad() {
			let moodNum = Math.round(Math.random() * 6);
			let mood = moodNum
			console.log(moodNum)
			uni.getStorage({
				key: "moodNum",
				success(res) {
					console.log(res.data)
					moodNum = res.data
				}
			})
			console.log(moodNum)
			if (mood !== moodNum) {
				this.moodType = recommendList[moodNum].moodType
			}
			this.musicList = recommendList[moodNum].musicList
			console.log(this.moodType)
			this.name = this.musicList[0].name;
			this.singer = this.musicList[0].singer;
			this.id = this.musicList[0].id;
			innerAudioContext.src = this.musicList[0].src
			this.endTime = innerAudioContext.duration
		},
		methods: {
			changeState() {
				this.key = !this.key;
				if (this.key === false) {
					innerAudioContext.play()
				} else {
					innerAudioContext.pause()
				}
			},
			changeAudio(e) {
				this.isOpen = false
				this.key = false;
				this.name = e.name;
				this.singer = e.singer;
				this.id = e.id;
				innerAudioContext.src = e.src
				console.log(innerAudioContext._src)
				this.endTime = innerAudioContext.duration
				innerAudioContext.onPlay(() => {
					console.log('1')
				})

			},
			getLastSong() {
				console.log('1')
				if (this.id <= 1)
					return
				var e = this.musicList[this.id - 2]
				this.key = false;
				this.name = e.name;
				this.singer = e.singer;
				this.id = e.id;
				innerAudioContext.src = e.src
				this.endTime = innerAudioContext.duration
				innerAudioContext.onPlay(() => {

				})
			},
			getNextSong() {
				if (this.id >= this.musicList.length)
					return
				var e = this.musicList[this.id]
				this.key = false;
				this.name = e.name;
				this.singer = e.singer;
				this.id = e.id;
				innerAudioContext.src = e.src
				this.endTime = innerAudioContext.duration
				innerAudioContext.onPlay(() => {
					console.log('1')
				})
			},
			emitClick(e) {
				this.$emit('emitClick', e)
			},
			open() {
				this.isOpen = true;
			},
			close() {
				this.isOpen = false;
			},

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

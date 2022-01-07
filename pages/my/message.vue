<template>
	<view>
		<div class="message">
			<div v-if="message.length===0" class="none">
				<img src="static/message.png" />
				<div style="font-style: unset;color:#606266">消息队列为空</div>
			</div>
			<div v-if="message.length!==0" class="none">
				<div class="box" v-for="(item,index) in message">
					<u-swipe-action>
						<u-swipe-action-item :options="options2" @click="bindClick(index)">
							<view class="swipe-action u-border-top u-border-bottom">
								<view class="swipe-action__content">
									<div
										style="width: 100%;text-align: left;margin-left: 50rpx;color: #212123;font-weight: 600;">
										{{item.noticeTitle}}
									</div><br>
									<div style="width: 90%;;text-align: left;margin-left: 50rpx;color: #222224;">
										{{item.noticeContent}}
									</div>
								</view>
							</view>
						</u-swipe-action-item>
					</u-swipe-action>
				</div>

			</div>
		</div>
	</view>
</template>

<script>
	import {getNotice} from "../../api/notice/notice.js"
	export default {
		data() {
			return {
				message: [{
					noticeTitle: '小济智能',
					noticeContent: '小济智能感谢您的第一次体验小济智能感谢您的第一次体验小济智能感谢您的第一次体验小济智能感谢您的第一次体验~'
				}, {
					noticeTitle: '小济智能！',
					noticeContent: '小济智能感谢您的第一次体验~'
				},
				{
					noticeTitle: '小济智能！',
					noticeContent: '小济智能感谢您的第一次体验~'
				},
				{
					noticeTitle: '小济智能！',
					noticeContent: '小济智能感谢您的第一次体验~'
				}],
				options2: [{
					
					text:"删除",
					style: {
						backgroundColor: '#f56c6c',
						width:'100rpx',
						height:'100rpx',
						margin:'auto 20rpx 10rpx 20rpx',
						padding:'0'
					}
				}],
			}
		},
		mounted() {
			// getNotice().then(res => {
			// 	if (res.data.code === 200) {
			// 		console.log(res.data);
			// 		message = res.data.object;

			// 	} else {
			// 		uni.showModal({
			// 			title: '获取消息失败',
			// 			content: res.data.msg,
			// 			showCancel: false
			// 		});
			// 	}
			// }).catch(failResponse => {});
		},
		methods: {
			bindClick(index) {
				console.log(index)
						this.message.splice(index,1)
					}

		}
	}
</script>

<style>
	.message {

		position: relative;
		margin-left: 3%;
		margin-top: 3%;
		height: 70%;
		width: 94%;
		border-radius: 8px;
		text-align: center;
	}
	.none {
		font-size: 40rpx;
	}
	.box {
		position: relative;
		background-color: #beedc7;
		margin-left: 3%;
		margin-top: 5%;
		padding-top: 30rpx;
		padding-bottom: 50rpx;
		width: 94%;
		line-height: auto;
		border-radius: 50rpx;
		text-align: center;
	}
	.swipe-action__content{
			background-color: #beedc7;
	}
	/deep/.u-swipe-action-item__right__button__wrapper{
		margin: auto;
		height: 100rpx;
	
		border-radius: 50rpx!important;
	}
</style>

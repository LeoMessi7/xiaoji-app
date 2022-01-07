<template>
	<view>
		<u-navbar title="设备" :bgColor="bgcolor">
			<view class="u-nav-slot" slot="left">
				<u-icon name="list" size="25" @click="show=true"></u-icon>
			</view>
			<view class="u-nav-slot" slot="right">
				<u-icon name="plus" size="25" @click="goto('add')"></u-icon>
			</view>
		</u-navbar>
		<u-popup :show="show" mode="left" @close="close" @open="open" :closeOnClickOverlay="true">
			<view style="height: 250rpx;background-color: #3fd1ad;">
				<view style="width: 100%;">
					<u-avatar src="my.png" shape="circle" size="70"
						style="margin-top: 30rpx;margin-left: 40rpx;float: left;"></u-avatar>
					<text
						style="float: left;margin-left: 20rpx;margin-top: 70rpx;height: 100rpx;margin-right: 200rpx;font-size: 40rpx;font-weight: 600;color: #fff;">匿名用户</text>
				</view>
				<text style="margin-left: 40rpx;color: #fff;">小济智能点亮智慧生活...</text>
			</view>
			<view style="height: 250rpx;">
				<u-list>
					<u-list-item >
						<u-cell title="添加设备" size="large" :border="false" v-on:click="goto('add')"
							style="margin-top: 30rpx;height: 100rpx;">
							<u-avatar slot="icon" size="35" src="../../static/phone.png" style="margin-right: 30rpx;">
							</u-avatar>
						</u-cell>
					</u-list-item>
					<u-list-item>
						<u-cell title="服务配置" size="large" v-on:click="goto('deploy')">
							<u-avatar slot="icon" size="35" src="../../static/peizhi.png" style="margin-right: 30rpx;">
							</u-avatar>
						</u-cell>
					</u-list-item>
					<u-list-item>
						<u-cell title="消息" size="large" :border="false" v-on:click="goto('message')">
							<u-avatar slot="icon" size="35" src="../../static/news.png" style="margin-right: 30rpx;">
							</u-avatar>
						</u-cell>
					</u-list-item>
				</u-list>
			</view>
		</u-popup>
		<u-tabs :list="list1" style="background-color: #FFFFFF;" :is-scroll="false" @change="change" sticky
			:current="currentTabIndex" lineWidth="50">
		</u-tabs>
		<div v-for="(item,index) in itemList">
			<div v-if="currentTabIndex===0" class="card" @click="toDetail(item)">
				<div class="head" :style="item.color">
					<div class="b"></div>
					<div class="title">{{item.title}}</div>
				</div>
				<div class="body">
					<p>状态: {{item.state}}</p>
					<u-switch style="margin-top: 20rpx;float: left;" v-model="item.key" activeColor="#3fd1ad"
						@change="changekey(item)">
					</u-switch>
				</div>
			</div>
			<div v-if="currentTabIndex===1&&item.category==='pi'" class="card" @click="toDetail(item)">
				<div class="head" :style="item.color">
					<div class="b"></div>
					<div class="title">{{item.title}}</div>
				</div>
				<div class="body">
					<p>状态: {{item.state}}</p>
					<u-switch style="margin-top: 20rpx;float: left;" v-model="item.key" activeColor="#3fd1ad"
						@change="changekey(item)">
					</u-switch>
				</div>
			</div>
			<div v-if="currentTabIndex===2&&item.category==='lamp'" class="card" @click="toDetail(item)">
				<div class="head" :style="item.color">
					<div class="b"></div>
					<div class="title">{{item.title}}</div>
				</div>
				<div class="body">
					<p>状态: {{item.state}}</p>
					<u-switch style="margin-top: 20rpx;float: left;" v-model="item.key" activeColor="#3fd1ad"
						@change="changekey(item)">
					</u-switch>
				</div>
			</div>
		</div>

	</view>

</template>

<script>
	export default {
		data() {
			return {

				bgcolor: '#fff',
				show: false,
				list1: [{
						name: '全部',
					},
					{
						name: '树莓派',
					},
					{
						name: '智能灯'
					}
				],
				color1: 'background-color:#3fd1ad',
				currentTabIndex: 0,
				itemList: [{
						category: 'lamp',
						title: '智能灯1',
						state: '在线',
						key: true,
						color: 'background-color:#3fd1ad',
					},
					{
						category: 'lamp',
						title: '智能灯2',
						state: '离线',
						key: false,
						color: 'background-color:#dcdcdc',
					},
					{
						category: 'pi',
						title: '树莓派小车',
						state: '离线',
						key: false,
						color: 'background-color:#dcdcdc',
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			change(index) {
				console.log(index);
				this.currentTabIndex = index.index;


			},
			changekey(item) {
				if (item.key) {
					item.state = '在线',
						item.color = 'background-color:#3fd1ad'
				} else {
					item.state = '离线'
					item.color = 'background-color:#dcdcdc'
				}
				event.stopPropagation();

			},
			toDetail(item) {
				let Item = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: '/pages/equip/detail?Item=' + Item
				})
			},
			goto(content) {
				switch (content) {
					case 'add': {
						uni.navigateTo({
							url: '/pages/deploy/add'
						})
						break;
					}
					case 'deploy': {
						uni.switchTab({
							url: '/pages/deploy/index'
						})
						break;
					}
					case 'message': {
						uni.navigateTo({
							url: '/pages/my/message'
						})
						break;
					}
				}


			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style>
	.card {
		position: relative;
		float: left;
		text-align: center;
		margin-top: 5%;
		margin-left: 3%;
		margin-right: 3%;
		background-color: #ffffff;
		width: 44%;
		border-radius: 10rpx;
		height: 300rpx;
	}

	.head {
		margin-left: 3%;
		margin-top: 5%;
		text-align: left;
		width: 93%;
		border-radius: 8rpx;
		position: relative;
		height: 50rpx;
		background-color: #3fd1ad;
	}

	.b {
		position: fixed;
		height: 30rpx;
		margin-left: 20rpx;
		margin-top: 10rpx;
		width: 8rpx;
		border-radius: 50rpx;
		background-color: #ffffff;
	}

	.title {
		position: fixed;
		margin-left: 50rpx;
		color: #fff;
		margin-top: 5rpx;
	}

	.body {
		margin-top: 20rpx;
		position: relative;
		text-align: left;
		margin-left: 30rpx;
		line-height: 60rpx;
	}
</style>

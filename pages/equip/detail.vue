<template>
	<view>
		<u-tabs :list="list1" style="background-color: #FFFFFF;" :is-scroll="false" @change="change" sticky
			:current="currentTabIndex" lineWidth="50">
		</u-tabs>
		<div v-if="currentTabIndex===0" class="equip">
			<div class="head" :style="Info.color">
				<div class="b"></div>
				<div class="title">{{Info.name}}</div>
			</div>
			<div class="form">
				<u--form style="margin: auto;" labelPosition="left" :label-style="{'font-size':'35rpx'}" :model="Info"
					:rules="rules" ref="Info">
					<u-form-item label="名称" prop="Info.name" border:none ref="Info">
						<u--input placeholder="请输入内容" border="bottom" clearable></u--input>
					</u-form-item>
					<u-form-item label="备注" prop="Info.rename" border:none ref="Info">
						<u--input placeholder="请输入内容" border="bottom" clearable></u--input>
					</u-form-item>
				</u--form>
			</div>
			<div class="detail">
				<ul>
					<li><span>设备编号：</span>{{Info.id}}</li>
					<li><span>设备分类：</span>{{Info.category}}</li>
					<li><span>固件版本：</span>{{Info.edition}}</li>
					<li><span>创建时间：</span>{{Info.createTime}}</li>
				</ul>
			</div>
			<div class="btn" style="width:80%;margin: auto;margin-top: 50rpx;">
				<u-button style="width: 32%;float: left;border-radius: 50px;" text="返回" color="#3fd1ad" @click="Back">
				</u-button>
				<u-button style="margin-left: 4%; width: 64%;float: left;border-radius: 50px;" text="保存"
					color="#006dfe">
				</u-button>
			</div>
		</div>
		<div v-if="currentTabIndex===1" class="state">
			<div v-if="Info.category==='树莓派'">
				<div class="card">
					<div class="head" :style="Info.color">
						<div class="b"></div>
						<div class="title">{{Info.name}}</div>
					</div>
					<div class="body">
						<p>状态: {{Info.state}}</p>
						<u-switch style="margin-top: 20rpx;float: left;" v-model="Info.key" activeColor="#3fd1ad"
							@change="changekey(Info)">
						</u-switch>
					</div>
				</div>
				<u-divider style="margin: 0 3% 0 3%;width:94%" :lineColor="color" :dot="true"></u-divider>
				<div class="function">
					<p style="font-size: 40rpx;font-weight: 600;margin-top: 10rpx;">功能</p>
					<u-grid :border="true" col="2" style="margin-top: 30rpx;" @click="click">
						<u-grid-item :style="{borderRadius:listItem.border}" v-for="(listItem,listIndex) in list"
							:bgColor="listItem.color" :key="listIndex">
							<img :src="listItem.url" style="margin-top:20rpx; height: 80rpx;" />
							<text class="grid-text">{{listItem.title}}</text>
						</u-grid-item>
					</u-grid>
					<u-toast ref="uToast" />
				</div>

			</div>
			<div v-if="Info.category==='智能灯'">
				<div class="card">
					<div class="head" :style="Info.color">
						<div class="b"></div>
						<div class="title">{{Info.name}}</div>
					</div>
					<div class="body">
						<p>状态: {{Info.state}}</p>
						<u-switch style="margin-top: 20rpx;float: left;" v-model="Info.key" activeColor="#3fd1ad"
							@change="changekey(Info)">
						</u-switch>
					</div>
				</div>
				<u-divider style="margin: 0 3% 0 3%;width:94%" :lineColor="color" :dot="true"></u-divider>
				<div class="function">
					<ul>
						<li><span style="float: left; line-height: 50px;">亮度：</span>
							<u-slider showValue activeColor="#ffff7f" v-model="lamp.light" step="1" min="0" max="100">
							</u-slider>
						</li>
						<li><span style="float: left;line-height: 50px;">红色：</span>
							<u-slider showValue activeColor="#f4606c" v-model="lamp.red" step="20" min="0" max="255">
							</u-slider>
						</li>
						<li><span style="float: left;line-height: 50px;">绿色：</span>
							<u-slider showValue activeColor="#beedc7" v-model="lamp.green" step="20" min="0" max="255">
							</u-slider>
						</li>
						<li><span style="float: left;line-height: 50px;">蓝色：</span>
							<u-slider showValue activeColor="#bee7e9" v-model="lamp.blue" step="20" min="0" max="255">
							</u-slider>
						</li>
					</ul>
					<u-divider style="margin: 0 3% 0 3%;width:94%" :lineColor="color" :dot="true"></u-divider>
					<div class="1" style="margin-top: 20rpx;position: relative;width: 100%;" @click="upload">
						<img style="height: 40rpx;margin-top: 10rpx;float: left;" src="static/reload.png" />
						<span
							style="margin-top: 12rpx;float: left;color: #3fd1ad;font-size: 28rpx;margin-left: 15rpx;">点击获取最新温度</span>
					</div><br>
					<div style="margin-top: 50rpx;position: relative;width: 100%;text-align: left;">
						<span style="float: left;">温度:</span>
						<span class="tip">{{lamp.temperature}}℃</span>
						<span style="margin-left: 35%;">湿度:</span>
						<span class="tip" style="width: 200rpx;">{{lamp.west}}RH%</span>
					</div>
					<div class="btn" style="position: relative;width: 90%;margin: auto;margin-top: 100rpx;">
						<u-button style="width: 32%;float: left;border-radius: 50px;" text="返回" color="#3fd1ad"
							@click="Back">
						</u-button>
						<u-button style="margin-left: 4%; width: 64%;float: left;border-radius: 50px;" text="应用"
							color="#006dfe">
						</u-button>
					</div>
				</div>
			</div>
		</div>

		<div v-if="currentTabIndex===2" class="state">
			<div v-if="Info.category==='树莓派'">
				<div class="card">
					<div class="head" :style="Info.color">
						<div class="b"></div>
						<div class="title">{{Info.name}}</div>
					</div>
					<div class="body">
						<p>状态: {{Info.state}}</p>
						<u-switch style="margin-top: 20rpx;float: left;" v-model="Info.key" activeColor="#3fd1ad"
							@change="changekey(Info)">
						</u-switch>
					</div>
				</div>
				<u-divider style="margin: 0 3% 0 3%;width:94%" :lineColor="color" :dot="true"></u-divider>
				<div class="function" style="margin-top: 50rpx;">
					<span style="float: left; ">服务器地址：</span><br>
					<u--input v-model="host" placeholder="请输入内容" border="bottom" clearable
						style="margin-bottom: 40rpx;"></u--input>
					<span style="float: left;">客户端ID：</span><br>
					<u--input v-model="clientId" placeholder="请输入内容" border="bottom" clearable></u--input>
					<div class="1" style="margin-top: 20rpx;position: relative;width: 100%;" @click="testConnection()">
						<span
							style="margin-top: 12rpx;float: middle;color: #3fd1ad;font-size: 28rpx;margin-left: 15rpx;">测试连接</span>
					</div>
				</div>
			</div>
			<div v-if="Info.category==='智能灯'">
				<div class="card">
					<div class="head" :style="Info.color">
						<div class="b"></div>
						<div class="title">{{Info.name}}</div>
					</div>
					<div class="body">
						<p>状态: {{Info.state}}</p>
						<u-switch style="margin-top: 20rpx;float: left;" v-model="Info.key" activeColor="#3fd1ad"
							@change="changekey(Info)">
						</u-switch>
					</div>
				</div>
				<u-divider style="margin: 0 3% 0 3%;width:94%" :lineColor="color" :dot="true"></u-divider>
				<div class="function">
					<ul>
						<li><span style="float: left; ">射辐遥控：</span>
							<u-switch style="margin-top: 20rpx;float: left;" v-model="btn.key" activeColor="#006dfe"
								@change="">
							</u-switch>
						</li><br>
						<li><span style="float: left;">按键一：</span>
							<u-switch style="margin-top: 20rpx;float: left;" v-model="btn.key" activeColor="#006dfe"
								@change="">
							</u-switch>
						</li><br>
						<li><span style="float: left;">按键二：</span>
							<u-switch style="margin-top: 20rpx;float: left;" v-model="btn.key" activeColor="#006dfe"
								@change="">
							</u-switch>
						</li><br>
						<li><span style="float: left;">按键三：</span>
							<u-switch style="margin-top: 20rpx;float: left;" v-model="btn.key" activeColor="#006dfe"
								@change="">
							</u-switch>
						</li><br>
						<li><span style="float: left;">按键四：</span>
							<u-switch style="margin-top: 20rpx;float: left;" v-model="btn.key" activeColor="#006dfe"
								@change="">
							</u-switch>
						</li>
						</li>
					</ul>
					<u-divider style="margin: 0 3% 0 3%;width:94%" :lineColor="color" :dot="true"></u-divider>
					<div class="1" style="margin-top: 20rpx;position: relative;width: 100%;" @click="upload">
						<img style="height: 40rpx;margin-top: 10rpx;float: left;" src="static/reload.png" />
						<span
							style="margin-top: 12rpx;float: left;color: #3fd1ad;font-size: 28rpx;margin-left: 15rpx;">点击获取最新温度</span>
					</div><br>
					<div style="margin-top: 50rpx;position: relative;width: 100%;text-align: left;">
						<span style="float: left;">温度:</span>
						<span class="tip">{{lamp.temperature}}℃</span>
						<span style="margin-left: 35%;">湿度:</span>
						<span class="tip" style="width: 200rpx;">{{lamp.west}}RH%</span>
					</div>
					<div class="btn" style="position: relative;width: 90%;margin: auto;margin-top: 100rpx;">
						<u-button style="width: 32%;float: left;border-radius: 50px;" text="返回" color="#3fd1ad"
							@click="Back">
						</u-button>
						<u-button style="margin-left: 4%; width: 64%;float: left;border-radius: 50px;" text="应用"
							color="#006dfe">
						</u-button>
					</div>
				</div>

			</div>
		</div>
	</view>
</template>

<script>
	import mqtt from 'mqtt/dist/mqtt.js'
	import {
		connection
	} from '@/utils/mqtt.js'
	export default {
		name: 'detail',
		data() {
			return {
				host: connection.host,
				clientId: connection.clientId,
				receiveNews: '',
				client: {
					connected: false,
				},
				list: [{
						url: '/static/icon/car.png',
						title: '遥控小车',
						color: '#BEEDC7',
						border: '10px 0 0 0'

					},
					{
						url: '/static/icon/mood.png',
						title: '情绪检测',
						color: '#BEE7E9',
						border: '0 10px 0 0'
					},
					{
						url: '/static/icon/music.png',
						title: '音乐推荐',
						color: '#D6D5B7',
						border: '0'
					},
					{
						url: '/static/icon/voice.png',
						title: '语音交互',
						color: '#E6CEAC',
						border: '0'
					},
					{
						url: '/static/icon/beauty.png',
						title: '虚拟化妆',
						color: '#ECAD9E',
						border: '0 0 0 10px'
					},
					{
						url: '/static/icon/temperature.png',
						title: '天气查看',
						color: '#F4606C',
						border: '0 0 10px 0'
					},
				],
				list1: [{
					name: '设备',
				}, {
					name: '状态',
				}, {
					name: '配置'
				}],
				currentTabIndex: 0,
				color: '#3fd1ad',
				Info: {
					name: '',
					remark: '',
					num: '',
					category: '',
					version: '',
					state: '',
					key: true,
					color: '',
					updateTime: '',

				},
				lamp: {
					light: 100,
					red: 255,
					green: 255,
					blue: 255,
					temperature: '0.0',
					west: '0.0',
				},
				btn: {
					key: false,
				},
			}
		},
		onLoad(option) {
			// decodeURIComponent 解密传过来的对象字符串
			const item = JSON.parse(decodeURIComponent(option.Item));
			this.Info.color = item.color
			this.Info.name = item.title
			this.Info.state = item.state
			this.Info.key = item.key
			this.Info.num = item.num
			this.Info.version = item.version
			this.Info.updateTime = item.updateTime
			this.Info.remark = item.remark
			if (item.color === 'background-color:#dcdcdc')
				this.color = '#dcdcdc'
			else
				this.color = '#3fd1ad'
			if (item.category === 'pi')
				this.Info.category = '树莓派'
			else {
				this.Info.category = '智能灯'
			}
		},
		methods: {
			change(index) {
				console.log(index)
				this.currentTabIndex = index.index
			},
			Back() {
				uni.navigateBack({
					delta: 1
				});
			},
			changekey(item) {
				if (item.key) {
					item.state = '在线',
						this.color = '#3fd1ad',
						item.color = 'background-color:#3fd1ad'
				} else {
					item.state = '离线',
						this.color = '#dcdcdc',
						item.color = 'background-color:#dcdcdc'
				}
				event.stopPropagation();

			},
			//跳转不同功能界面
			click(name) {
				switch (name) {
					case 0: {
						uni.navigateTo({
							url: '/pages/equip/function/car'
						})
						break;
					}
					case 1: {
						uni.navigateTo({
							url: '/pages/equip/function/mood'
						})
						break;
					}
					case 2: {
						uni.navigateTo({
							url: '/pages/equip/function/music'
						})
						break;
					}
					case 3: {
						uni.navigateTo({
							url: '/pages/equip/function/voice'
						})
						break;
					}
					case 4: {
						uni.navigateTo({
							url: '/pages/equip/function/beauty'
						})
						break;
					}
					case 5: {
						uni.navigateTo({
							url: '/pages/equip/function/weather'
						})
						break;
					}
				}
			},
			upload() {
				console.log(1)
			},
			testConnection() {
				// 连接字符串, 通过协议指定使用的连接方式
				// ws 未加密 WebSocket 连接
				// wss 加密 WebSocket 连接
				// mqtt 未加密 TCP 连接
				// mqtts 加密 TCP 连接
				// wxs 微信小程序连接
				// alis 支付宝小程序连接
				const {
					host,
					port,
					endpoint,
					...options
				} = connection
				const connectUrl = 'ws://${host}:${port}${endpoint}'
				try {
					this.client = mqtt.connect(connectUrl, options)
				} catch (error) {
					console.log('mqtt.connect error', error)
				}
			 this.client.on('connect', () => {
					uni.showToast({
						title: '连接成功',
						duration: 1000
					});
					console.log('Connection succeeded!')
					this.disConnection()
				}).on('error', error => {
					uni.showModal({
						title: '连接失败',
						showCancel: false
					});
					console.log('Connection failed', error)
				}).on('message', (topic, message) => {
					this.receiveNews = this.receiveNews.concat(message)
					console.log(`Received message ${message} from topic ${topic}`)
				})
			},
			disConnection() {
				if (this.client.connected) {
					try {
						this.client.end()
						this.client = {
							connected: false,
						}
						console.log('Successfully disconnected!')
					} catch (error) {
						console.log('Disconnect failed', error.toString())
					}
				}
			},
		}
	}
</script>

<style>
	.equip {
		background-color: #FFFFFF;
		position: fixed;
		margin-left: 3%;
		margin-top: 3%;
		height: 70%;
		width: 94%;
		border-radius: 8px;
		text-align: center;
	}

	u--input {
		float: left;
		display: inline;
	}

	.form {
		width: 80%;
		margin: auto;
		margin-top: 20rpx;
	}

	.detail {
		width: 80%;
		margin-top: 50rpx;
		text-align: left;
	}

	ul {
		list-style: none;
		line-height: 70rpx;
	}





	.state {
		background-color: #FFFFFF;
		position: relative;
		margin-left: 3%;
		margin-top: 3%;
		height: 80%;
		width: 94%;
		border-radius: 8px;
		text-align: center;
		float: left;
	}

	.card {
		position: relative;
		height: 240rpx;
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
		position: absolute;
		height: 30rpx;
		margin-left: 20rpx;
		margin-top: 10rpx;
		width: 8rpx;
		border-radius: 50rpx;
		background-color: #ffffff;
	}

	.title {
		position: absolute;
		margin-top: 5rpx;
		margin-left: 30%;
		color: #fff
	}

	.body {
		margin-top: 20rpx;
		position: relative;
		text-align: left;
		margin-left: 30rpx;
		line-height: 60rpx;
	}

	.function {
		width: 93%;
		margin: auto;
		padding-bottom: 200rpx;
		position: relative;
		text-align: center;
	}

	.function ul {
		text-align: left;
		margin-top: 40rpx;
		padding: 0;
	}

	/deep/uni-slider .uni-slider-track {
		margin-top: -15rpx;
		margin-left: -20rpx;
		height: 20rpx;
	}

	/deep/.u-divider__dot {
		color: #3fd1ad
	}

	.grid-text {
		font-size: 16px;
		font-weight: 500;
		color: #ffffff;
		padding: 10rpx 0 20rpx 0rpx;
		box-sizing: border-box;

	}

	.tip {
		position: absolute;
		margin-left: 20rpx;
		width: 130rpx;
		background-color: #3fd1ad;
		text-align: center;
		height: 50rpx;
		border-radius: 80rpx;
		color: #ffffff;
	}
</style>

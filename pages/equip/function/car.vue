<template>
	<view>
		<div class="video">
			<div class="info">
				<span style="">镜头画面</span>
				<u-switch style="position: absolute;margin-top:-50rpx;right:20rpx ;" v-model="camera.state"
					activeColor="#3fd1ad" @change="changekey(camera)">
				</u-switch>
				<u-divider style="margin: 10rpx 3% 0 3%;width:94%" :lineColor="color" #3fd1ad :dot="true"></u-divider>
				<video id="demoVideo" :controls="false" :enable-progress-gesture="false"
					:show-center-play-btn="disable">
				</video>
			</div>
			<div class="btn">
				<div class="camerabtn">
					<img src="/static/btn/u.png" @click="controlCamera('up')" /><br>
					<div style="position:relative;height: 50rpx;">
						<img style="position: absolute;left:0;margin-top: -15rpx;" @click="controlCamera('left')"
							src="/static/btn/l.png" />
						<img style="position: absolute;right:0;margin-top: -15rpx;" @click="controlCamera('right')"
							src="/static/btn/r.png" /><br>
					</div>
					<img src="/static/btn/d.png" @click="controlCamera('down')" />
				</div>
				<span style="font-weight: 600;color:#9a918d;position: absolute;left:100rpx;top:300rpx">摄像头</span>
				<div class="stopbtn">
					<u-button text="启动"
						style="border-radius: 100rpx;width: 70%;background-color: #beedc7;color: #ffffff;"></u-button>
					<u-button text="暂停"
						style="border-radius: 100rpx;width: 70%;background-color: #f4606c;color: #ffffff;position: relative;margin-top: 40rpx;">
					</u-button>

				</div>
				<div
					style="font-weight: 600;color:#9a918d;font-size:40rpx;width:100%;position: absolute;bottom:20rpx;text-align: center;">
					小车</div>
				<div class="carbtn">
					<img src="/static/btn/up.png" @click="controlCar('up')" /><br>
					<div style="position:relative;height: 133rpx;">
						<img style="position: absolute;left:0" src="/static/btn/left.png" @click="controlCar('left')" />
						<img style="position: absolute;right:0" src="/static/btn/right.png"
							@click="controlCar('right')" /><br>
					</div>
					<img src="/static/btn/down.png" @click="controlCar('down')" />
				</div>

			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: '#dcdcdc',
				camera: {
					state: false
				},

			}
		},
		onLoad() {

		},
		methods: {
			// 创建连接
			createConnection() {
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
				} = this.connection
				const connectUrl = `ws://${host}:${port}${endpoint}`
				try {
					this.client = mqtt.connect(connectUrl, options)
				} catch (error) {
					console.log('mqtt.connect error', error)
				}
				this.client.on('connect', () => {
					console.log('Connection succeeded!')
				})
				this.client.on('error', error => {
					console.log('Connection failed', error)
				})
				this.client.on('message', (topic, message) => {
					this.receiveNews = this.receiveNews.concat(message)
					console.log(`Received message ${message} from topic ${topic}`)
				})
			},
			// 订阅主题
			doSubscribe() {
				const {
					topic,
					qos
				} = this.subscription
				this.client.subscribe(topic, {
					qos
				}, (error, res) => {
					if (error) {
						console.log('Subscribe to topics error', error)
						return
					}
					this.subscribeSuccess = true
					console.log('Subscribe to topics res', res)
				})
			},
			// 取消订阅
			doUnSubscribe() {
				const {
					topic
				} = this.subscription
				this.client.unsubscribe(topic, error => {
					if (error) {
						console.log('Unsubscribe error', error)
					}
				})
			},
			// 发送消息
			doPublish() {
				const {
					topic,
					qos,
					payload
				} = this.publish
				this.client.publish(topic, payload, qos, error => {
					if (error) {
						console.log('Publish error', error)
					}
				})
			},
			changekey(item) {
				if (item.state) {
					this.color = '#3fd1ad',
						item.color = 'background-color:#3fd1ad'
				} else {
					this.color = '#dcdcdc',
						item.color = 'background-color:#dcdcdc'
				}
			},
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			error(e) {
				console.error('live-player error:', e.detail.errMsg)
			},
			controlCar(dir) {
				switch (dir) {
					case 'up': {
						console.log(3)
						const topic = this.publish.topic
						const qos = this.publish.qos
						this.client.publish(topic, "3", qos, error => {
							if (error) {
								console.log('Publish error', error)
							}
						})
						break
					}
					case 'down': {
						console.log(4)
						const topic = this.publish.topic
						const qos = this.publish.qos
						this.client.publish(topic, "4", qos, error => {
							if (error) {
								console.log('Publish error', error)
							}
						})
						break
					}
					case 'left': {
						console.log(1)
						const topic = this.publish.topic
						const qos = this.publish.qos
						this.client.publish(topic, "1", qos, error => {
							if (error) {
								console.log('Publish error', error)
							}
						})
						break
					}
					case 'right': {
						console.log(2)
						const topic = this.publish.topic
						const qos = this.publish.qos
						this.client.publish(topic, "2", qos, error => {
							if (error) {
								console.log('Publish error', error)
							}
						})
						break
					}
				}
			},
			controlCamera(dir) {
				switch (dir) {
					case 'up': {
						console.log(3)
						const topic = this.publish.topic
						const qos = this.publish.qos
						this.client.publish(topic, "3", qos, error => {
							if (error) {
								console.log('Publish error', error)
							}
						})
						break
					}
					case 'down': {
						console.log(4)
						const topic = this.publish.topic
						const qos = this.publish.qos
						this.client.publish(topic, "4", qos, error => {
							if (error) {
								console.log('Publish error', error)
							}
						})
						break
					}
					case 'left': {
						console.log(1)
						const topic = this.publish.topic
						const qos = this.publish.qos
						this.client.publish(topic, "1", qos, error => {
							if (error) {
								console.log('Publish error', error)
							}
						})
						break
					}
					case 'right': {
						console.log(2)
						const topic = this.publish.topic
						const qos = this.publish.qos
						this.client.publish(topic, "2", qos, error => {
							if (error) {
								console.log('Publish error', error)
							}
						})
						break
					}
				}
			},
			stop() {
				// const { topic, qos, payload } = this.publish
				const topic = this.publish.topic
				const qos = this.publish.qos
				this.client.publish(topic, "5", qos, error => {
					if (error) {
						console.log('Publish error', error)
					}
				})
			},
			// 断开连接
			destroyConnection() {
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
	.video {
		background-color: #FFFFFF;
		position: relative;
		margin-left: 3%;
		margin-top: 3%;
		padding-top: 1rpx;
		padding-bottom: 1rpx;
		height: 70%;
		width: 94%;
		border-radius: 8px;
		text-align: center;
	}

	.info {
		position: relative;
		margin-top: 50rpx;
		font-size: 40rpx;
		font-family: '幼圆';
		font-weight: 600;
	}

	/deep/.u-divider__dot {
		color: #3fd1ad;
		font-family: '';
	}

	video {
		width: 650rpx;
		height: 350rpx;

	}

	.btn {
		position: absolute;
		background-color: #ffffff;
		margin-top: 20rpx;
		height: 840rpx;
		width: 100%;
		border-radius: 10px;
		text-align: center;
	}

	.camerabtn {
		position: absolute;
		background-color: #ffffff;
		right: 35%;
		left: 40rpx;
		top: 80rpx;
		height: 200rpx;
		width: 200rpx;
		border: solid #9a918d;
		border-radius: 40px;
		text-align: center;
	}

	.stopbtn {
		position: absolute;

		right: 40rpx;
		top: 80rpx;
		height: 200rpx;
		width: 200rpx;
		border-radius: 80px;
		text-align: center;
	}

	.carbtn {
		position: absolute;
		right: 20%;
		margin-top: 350rpx;
		height: 400rpx;
		width: 400rpx;
		border: solid #9a918d;
		border-radius: 70px;
		text-align: center;
	}

	.carbtn img {
		height: 133rpx;
	}

	.camerabtn img {
		height: 70rpx;
	}
</style>

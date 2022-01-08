<template>
	<div class="guide">
		<div class="title">小济天气</div>
		<div class="guides">
			<!--    <image></image>-->
			<div style="width: 100%;">
				<div style="width: 100%;">
					<img v-if="realtime.info==='晴'||realtime.info==='晴转小雨'||realtime.info==='晴转多云'" src="static/weather/晴.png" style="float: right;height:365rpx ;" />
					<img v-if="realtime.info==='阴'||realtime.info==='阴转多云'" src="static/weather/阴.png"
						style="float: right;height:365rpx ;" />
					<img v-if="realtime.info==='多云'||realtime.info==='多云转晴'||realtime.info==='多云转阴'" src="static/weather/多云.png" style="float: right;height:365rpx ;" />
					<img v-if="realtime.info==='小雨'" src="static/weather/小雨.png" style="float: right;height:365rpx ;" />
					<img v-if="realtime.info==='中雨'" src="static/weather/中雨.png" style="float: right;height:365rpx ;" />
					<img v-if="realtime.info==='大雨'" src="static/weather/大雨.png" style="float: right;height:365rpx ;" />
				</div>

				<div style=" margin-left:100rpx;color: cornflowerblue;height: 0rpx;margin-top: 50rpx;height: 100rpx;">
					<text style="float: left;font-size: 150rpx;">{{realtime.temperature}}</text>
					<div style="float: left;margin-top: 50rpx;">
						<span style="margin-left: 10rpx;margin-bottom:;">℃</span>
						<div style=" margin-left:10rpx;color: cornflowerblue">{{realtime.info}}</div>
					</div><br>
				</div>
				<br>
				<div style="float: left; margin-left:100rpx;color: cornflowerblue;font-size: 35rpx;height: 70rpx;">
					<div style="float: left;">{{realtime.direct}}</div>
					<div style="float: left;margin-left: 20rpx;">{{realtime.power}}</div>

				</div>

				<div style="float:left; margin-left:100rpx;color: cornflowerblue;font-size: 40rpx;margin-top: 50rpx;">
					<div style="float: left;">湿度:</div>
					<div style="float: left;">{{realtime.humidity}}%</div>
				</div>
				<div style="float:left; margin-left:18%;color: cornflowerblue;font-size: 40rpx;">
					<div style="float: left;">空气质量:</div>
					<div style="float: left;">{{realtime.aqi}}</div>
				</div><br>



			</div>

		</div>
		<div class="guides1" v-for="(item,index) in future" key="index">
			<div style="width: 100%;">
				<div style="width: 95%;">
					<img v-if="item.weather==='晴'||item.weather==='晴转多云'||item.weather==='晴转小雨'" src="static/weather/晴.png"
						style="float: right;height:165rpx ;margin-right: 40rpx;" />
					<img v-if="item.weather==='阴'||item.weather==='阴转小雨'" src="static/weather/阴.png"
						style="float: right;height:165rpx ;margin-right: 40rpx;" />
					<img v-if="item.weather==='多云'||item.weather==='多云转阴'" src="static/weather/多云.png"
						style="float: right;height:165rpx ;margin-right: 40rpx;" />
					<img v-if="item.weather==='小雨'||item.weather==='小雨转多云'" src="static/weather/小雨.png"
						style="float: right;height:165rpx ;margin-right: 40rpx;" />
					<img v-if="item.weather==='中雨'" src="static/weather/中雨.png"
						style="float: right;height:165rpx ;margin-right: 40rpx;" />
					<img v-if="item.weather==='大雨'" src="static/weather/大雨.png"
						style="float: right;height:165rpx ;margin-right: 40rpx;" />
				</div>

				<div style=" position: relative;margin-left:60rpx;color: cornflowerblue;height: 180rpx;">
					<div style="height: 0rpx;width: 100%;"><text style="font-size: 40rpx;">{{item.date}}</text></div>
					<br>
					<text style="font-size: 70rpx;">{{item.temperature}}</text>
					<div style="position: relative;margin-top: 20rpx;width: 80%;">
						<text style="float: left;margin-left:10rpx;color: cornflowerblue;font-size: 35rpx;">{{item.weather}}</text>
						<text style="float: right;font-size: 35rpx;">
							{{item.direct}}
						</text>

					</div>
				</div>
				<br>



			</div>

		</div>

	</div>
</template>

<script>
	import {
		getWeather
	} from "../../../api/function/function.js"
	export default {
		name: "WeatherToday",
		data() {
			return {
				isResponse: false,
				realtime: {
					info: '晴',
					temperature: 6,
					direct: "东风",
					power: '2级',
					humidity: 40,
					aqi: 32,

				},
				future: [{
					weather: '小雨转多云',
					date: '2021.12.23',
					direct: '持续无风向',
					temperature: '2/8℃',
					wid: {
						day: 6,
						night: 3
					},
				}, {
					weather: '阴转小雨',
					date: '2021.12.23',
					direct: '东风',
					temperature: '2/8℃',
					wid: {
						day: 6,
						night: 3
					},
				}],
				city: "上海"
			}
		},
		methods: {
			GetWeatherData() {
				getWeather().then(response => {
					console.log(response.data.result)

					this.isResponse = true;
					this.realtime = response.data.result.realtime;
					this.future = response.data.result.future;
					console.log(this.future)
					for (let i = 0; i < 5; i++) {
						let Length = response.data.result.future[i].date.length;
						response.data.result.future[i].date = response.data.result.future[i].date.substring(0,
							Length - 19);
					}
					this.$store.commit('setWeather', response.data.result)
					console.log(this.realtime);
				}).catch(err => {
					console.log(err)
				});
			}
		},
		mounted() {
			this.GetWeatherData();
			console.log(this.$store.state.wea);
			// Vue.set(this.realtime,'select',this.$store.state.wea.realtime)
			this.city = this.$store.state.wea.city
		}
	}
</script>

<style scoped>
	page {
		background: #dedede;
		padding-bottom: 20rpx;
	}

	.guide {
		z-index: 2;
		/*margin-top: 40px;*/
	}

	.guide .title {
		border-bottom: 3px solid cornflowerblue;
		background: azure;
		font-size: 20px;
		font-weight: bold;
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: cornflowerblue;
	}

	.guides {
		display: flex;
		flex-direction: row;
		width: 90%;
		margin: auto;
		margin-top: 30rpx;
		font-size: 24px;

		background: azure;
		padding-bottom: 30rpx;
		border-radius: 16rpx;
		box-shadow: 10rpx 10rpx 10rpx #888888;
	}

	.guides1 {
		display: flex;
		flex-direction: row;
		width: 90%;
		margin: auto;
		margin-top: 30rpx;
		font-size: 24px;
		padding-top: 10px;
		padding-bottom: 5px;
		background: azure;
		border-radius: 16rpx;
		box-shadow: 10rpx 10rpx 10rpx #888888;
	}
</style>
<!-- 
<script>
	export default {
		data() {
			return {
			
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
</style>
 -->

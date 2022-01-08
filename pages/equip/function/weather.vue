<template>
	<div class="guide">
		<div class="title">今日天气</div>
		<div class="guides">
			<!--    <image></image>-->
			<div style="width: 100%;">
				<div style="width: 95%;">
					<img v-if="realtime.info==='晴'" src="static/weather/晴.png" style="float: right;height:365rpx ;" />
					<img v-if="realtime.info===('阴'||'阴转小雨')" src="static/weather/阴.png" style="float: right;height:365rpx ;" />
					<img v-if="realtime.info==='多云'" src="static/weather/多云.png" style="float: right;height:365rpx ;"/>
					<img v-if="realtime.info==='小雨'" src="static/weather/小雨.png" style="float: right;height:365rpx ;"/>
					<img v-if="realtime.info==='中雨'" src="static/weather/中雨.png" style="float: right;height:365rpx ;"/>
					<img v-if="realtime.info==='大雨'" src="static/weather/大雨.png" style="float: right;height:365rpx ;"/>
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
				<div style="float:left; margin-left:20%;color: cornflowerblue;font-size: 40rpx;">
					<div style="float: left;">空气质量:</div>
					<div style="float: left;">{{realtime.aqi}}</div>
				</div><br>

				
				
			</div>

		</div>
		<div class="guides" v-for="{item,index} in future" key="index">
			<!--    <image></image>-->
			<div style="width: 100%;">
				<div style="width: 95%;">
					
					<img v-if="future.weather==='晴'" src="static/weather/晴.png" style="float: right;" />
					<img v-if="future.weather===('阴'||'阴转小雨')" src="static/weather/阴.png" style="float: right;height:365rpx ;" />
					<img v-if="future.weather==='多云'" src="static/weather/多云.png" />
					<img v-if="future.weather==='小雨'" src="static/weather/小雨.png" />
					<img v-if="future.weather==='中雨'" src="static/weather/中雨.png" />
					<img v-if="future.weather==='大雨'" src="static/weather/大雨.png" />
				</div>
		
				<div style=" margin-left:100rpx;color: cornflowerblue;height: 0rpx;margin-top: 50rpx;height: 100rpx;">
					<text style="float: left;font-size: 150rpx;">{{future.temperature}}</text>
					<div style="float: left;margin-top: 50rpx;">
						<span style="margin-left: 10rpx;margin-bottom:;">℃</span>
						<div style=" margin-left:10rpx;color: cornflowerblue">{{future.weather}}</div>
					</div><br>
				</div>
				<br>
				<div style="float: left; margin-left:100rpx;color: cornflowerblue;font-size: 35rpx;height: 70rpx;">
					<div style="float: left;">{{future.direct}}</div>
					<div style="float: left;margin-left: 20rpx;">{{future.power}}</div>
					
				</div>
		
				
				
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
				isResponse:false,
				realtime: {
					info:'晴',
					temperature:6,
					direct:"东风",
					power:'2级',
					humidity:40,
					aqi:32,
					
				},
				future:[],
				city: "上海"
			}
		},
		methods: {
			GetWeatherData() {
				getWeather().then(response => {
					console.log(response.data.result)
					this.isResponse=true;
					this.realtime = response.data.result.realtime;
					this.future = response.data.result.future;
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
		background: azure;
	}

	.guide {
		z-index: 2;
		/*margin-top: 40px;*/
	}

	.guide .title {
		border-bottom: 3px solid darkslategrey;
		background: azure;
		font-size: 20px;
		font-weight: bold;
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: cornflowerblue;
	}

	.guide .guides {
		display: flex;
		flex-direction: row;

		font-size: 24px;
		padding-top: 10px;
		background: azure;
		border-bottom: 5px solid floralwhite;
		/*margin-bottom: 20px;*/
	}

	.jinritianqi {
		z-index: 2;

		margin-left: 2px;

		margin-top: 2px;
		/*margin-bottom: 40px;*/
		font-size: 20px;
		white-space: nowrap;
		color: cornflowerblue;
	}

	.jrtianqi {
		margin: 20px;

		flex-direction: column;

		color: cornflowerblue;
	}

	.jrshidu {
		margin: 20px;

		flex-direction: column;

		color: cornflowerblue;
	}

	.jrzhiliang {
		margin: 20px;

		flex-direction: column;

		color: cornflowerblue;
	}

	.jrfengsu {
		margin: 20px;

		flex-direction: column;

		color: cornflowerblue;
	}

	.jrfengli {
		margin: 20px;

		flex-direction: column;

		color: cornflowerblue;
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

<template>
  <div class="guide">
    <div class="title">今日天气</div>
    <div class="guides">
<!--    <image></image>-->
      <div class='jinritianqi'>
        <div>
          <div class="jrwendu">当前温度:</div>
          <div class="jrwendu">{{realtime.temperature}}℃</div>
      </div><br>
        <div>
          <div class="jrtianqi">今日天气:</div>
          <div class="jrtianqi">{{realtime.info}}</div>
    </div><br>
        <div>
          <div class="jrshidu">当前湿度:</div>
          <div class="jrshidu">{{realtime.humidity}}</div>
        </div><br>
        <div>
          <div class="jrzhiliang">今日空气质量:</div>
          <div class="jrzhiliang">{{realtime.aqi}}</div>
        </div><br>
        <div>
          <div class="jrfengsu">当前风向:</div>
          <div class="jrfengsu">{{realtime.direct}}</div>
        </div><br>
        <div>
          <div class="jrfengli">当前风力:</div>
          <div class="jrfengli">{{realtime.power}}</div>
        </div>
      </div>

    </div>
<!--    <div class="title">生活气象指数</div>-->
<!--    <div class="guides">-->
<!--      </div>-->
  </div>
</template>

<script>
	import {getWeather} from "../../../api/function/function.js"
export default {
  name: "WeatherToday",
  data(){
    return{
      realtime: {},
      city:"上海"
    }
  },
  methods:{
    GetWeatherData(){
      getWeather().then(response => {
        // console.log(response.data.result)
        // console.log(response.data.result.realtime)
        // console.log(response.data.result.future)
        this.realtime = response.data.result.realtime;
        for(let i=0;i<5;i++)
        {
          let Length = response.data.result.future[i].date.length;
          response.data.result.future[i].date = response.data.result.future[i].date.substring(0,Length-19);
        }
        this.$store.commit('setWeather',response.data.result)
        console.log(this.realtime);
      }).catch(err=>{ console.log(err) });
    }
  },
  mounted(){
    this.GetWeatherData();
    console.log(this.$store.state.wea);
    // Vue.set(this.realtime,'select',this.$store.state.wea.realtime)
    this.city=this.$store.state.wea.city
  }
}
</script>

<style scoped>
	page{
		  background: azure;
	}
.guide{
  z-index: 2;
  /*margin-top: 40px;*/
}
.guide .title{
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
.jinritianqi{
  z-index: 2;

  margin-left: 2px;

  margin-top: 2px;
  /*margin-bottom: 40px;*/
  font-size: 20px;
  white-space: nowrap;
  color: cornflowerblue;
}
.jrwendu{
  margin:20px;

  flex-direction: column;

  color: cornflowerblue;
}
.jrtianqi{
  margin:20px;

  flex-direction: column;

  color: cornflowerblue;
}
.jrshidu{
  margin:20px;

  flex-direction: column;

  color: cornflowerblue;
}
.jrzhiliang{
  margin:20px;

  flex-direction: column;

  color: cornflowerblue;
}
.jrfengsu{
  margin:20px;

  flex-direction: column;

  color: cornflowerblue;
}
.jrfengli{
  margin:20px;

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
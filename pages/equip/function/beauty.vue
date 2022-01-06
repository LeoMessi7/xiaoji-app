<template>
	<view>
		<camera device-position="back" flash="off" style="width: 100%;height: 400upx;">

		</camera>
		
		<view style="width: 100%;text-align: center;margin-top: 50rpx;">
			<text style="font-size: 40rpx;">选择口红色号</text>
			<u-radio-group v-model="radiovalue1" placement="column" borderBottom iconPlacement="right" @change="groupChange" size="30" style="width: 60%;margin-left: 20%;margin-top: 50rpx;">
				<u-radio :customStyle="{marginBottom: '8px'}" :activeColor="item.color" v-for="(item, index) in radiolist1" :key="index"
					:label="item.name" :name="item.name" labelSize="20px" @change="radioChange">
				</u-radio>
			</u-radio-group>
		</view>
		<u-button style="width: 60%;border-radius: 50px;margin-top: 40rpx;" text="生成结果" color="#3fd1ad" @click="Back">
		</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radiolist1: [{
						name: '正红',
						disabled: false,
						color:'#ff0000'
					},
					{
						name: '大红',
						disabled: false,
						color:'#ff300c'
					},
					{
						name: '橘红',
						disabled: false,
						color:'#ff6011'
					}, {
						name: '蜜桃',
						disabled: false,
						color:'#ff79a1'
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '正红',
			};
		},

		onLoad() {

		},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			}
		}
	}
</script>

<style>
</style>

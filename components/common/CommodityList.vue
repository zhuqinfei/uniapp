<template>
	<view class="commodity-list">
		<Commodity :dataList='commodityList'></Commodity>
	</view>
</template>

<script>
	import Commodity from './Commodity.vue'
	export default{
		data() {
			return{
				commodityList:[
					{
						id:1,
						imgUrl:'../../static/img/commodity1.jpg',
						name:'最新的绒毛上衣，今天的爆款，买到就是值了，不要错过最后一波了,快点来看看今年最新爆款',
					    pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:1,
						imgUrl:'../../static/img/commodity2.jpg',
						name:'最新的绒毛上衣，今天的爆款，买到就是值了，不要错过最后一波了,快点来看看今年最新爆款',
					    pprice:"188",
						oprice:"388",
						discount:"5.2"
					}
				]
			}
		},
		components:{
			Commodity
		}
	}
</script>

<style>
</style>
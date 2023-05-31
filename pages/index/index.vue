<template>
	<view class="index">
	<!-- <IndexSwiper></IndexSwiper>
	 <Recommend></Recommend>
	 <Card cardTitle="猜你喜欢"></Card>
	 <CommodityList></CommodityList> -->
	 <Banner></Banner>
	 <Icons></Icons>
	 
	</view>
</template>

<script>
	import IndexSwiper from "../../components/index/IndexSwiper.vue"
	import Recommend from "../../components/index/Recommend.vue"
	import Card from "../../components/common/Card.vue"
	import CommodityList from "../../components/common/CommodityList.vue"
	import Banner from "../../components/index/Banner.vue"
	import Icons from "../../components/index/Icons.vue"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components:{
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons
		},
		
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>

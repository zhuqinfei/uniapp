<template>
	<view class="index">
	 <IndexSwiper></IndexSwiper>
	 <Recommend></Recommend>
	 <Card cardTitle="猜你喜欢"></Card>
	  <Card cardTitle="猜你aa"></Card>
	</view>
</template>

<script>
	import IndexSwiper from "../../components/index/IndexSwiper.vue"
	import Recommend from "../../components/index/Recommend.vue"
	import Card from "../../components/common/Card.vue"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components:{
			IndexSwiper,
			Recommend,
			Card
		},
		
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>

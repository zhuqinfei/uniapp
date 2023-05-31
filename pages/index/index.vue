<template>
	<view class="index">
	 <IndexSwiper></IndexSwiper>
	 <Recommend></Recommend>
	</view>
</template>

<script>
	import IndexSwiper from "../../components/index/IndexSwiper.vue"
	import Recommend from "../../components/index/Recommend.vue"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components:{
			IndexSwiper,
			Recommend
		},
		
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>

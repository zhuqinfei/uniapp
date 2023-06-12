<template>
	<view class="list">
		<Lines></Lines>
		
	</view>
</template>

<script>
	import Lines from "../../components/common/Line.vue"
	export default {
		data() {
			return {
				
			}
		},
		components:{
			Lines
		},
		methods: {
			
		},
		//input输入框点击事件
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:"../search/search"
			})
		}
	}
</script>

<style>

</style>

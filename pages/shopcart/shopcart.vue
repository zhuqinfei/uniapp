<template>
	<view class="shop-cart">
		<!-- 自定义导航栏 -->
		<uniNavBar 
		title="购物车" 
		:rightText="isNavBar ? '完成' : '编辑' " 
		fixed="true"
		statusBar="true"
		@clickRight="isNavBar=! isNavBar"
		></uniNavBar>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				isNavBar:false
			}
		},
		components:{
			uniNavBar
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

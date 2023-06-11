<template>
	<view>
		<ShopList :keyword="keyword"></ShopList>
	</view>
</template>

<script>
	import ShopList from "../../components/common/ShopList.vue"
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		components:{ShopList},
		onLoad(e) {
			this.keyword=e.keyword;
			uni.setNavigationBarTitle({
				title:e.keyword
			})
			// #ifdef APP-PLUS
		     var webView = this.$mp.page.$getAppWebview(); 
			 webView.setTitleNViewSearchInputText(e.keyword)  
			// #endif
			
		},
		onReady() {
			// #ifdef H5
			const pages = document.querySelectorAll(".uni-input-input[type=search]")[0];
			pages.placeholder = this.keyword;
			// #endif
		}
		
	}
</script>

<style>

</style>

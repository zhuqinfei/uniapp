<template>
	<view class="search">
		<Lines></Lines>
		
		<view class="searce-item">
			<view class="search-title">
				<view class="f-color">最近搜索</view>
				<view class="iconfont icon-lajitong"></view>
			</view>
			<view>
				<view class="search-name f-color">四件套</view>
				<view class="search-name f-color">面膜</view>
			</view>
		</view>
		
		<view class="searce-item">
			<view class="search-title">
				<view class="f-color">热门搜索</view>
			</view>
			<view>
				<view class="search-name f-color">四件套</view>
				<view class="search-name f-color">面膜</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from "../../components/common/Line.vue"
	export default {
		components:{Lines},
		onNavigationBarButtonTap(e){
			if(e.float==="right"){
				uni.navigateTo({
					url:"../search-list/search-list"
				})
			}
		}
	}
</script>

<style scoped>
.searce-item{
	padding:20rpx;
}
.search-title{
	display: flex;
	justify-content: space-between;
}
.search-name{
	padding:4rpx 24rpx;
	background-color: #E1E1E1;
	display: inline-block;
	border-radius: 26rpx;
	margin:10rpx;
}
</style>

<template>
	<view>
		<Lines></Lines>
		
		<view class="list">
			<!-- 左侧滑动 -->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+clentHeight+'px;'">
				<view v-for="i in 50" class="left-item" @tap="changeLeftTab(i)">
					<view class="left-name" 
					:class="activeIndex===i ? 'left-name-active' : ''"
					>
					{{i}}</view>
				</view>
			</scroll-view>
			<!-- 右侧滑动 -->
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+clentHeight+'px;'">
				<view  class="right-item">
					<view class="right-list">
						<view class="list-title">家纺</view>
						<view class="right-content">
							<view class="right-item">
								<image class="right-img" src="../../static/img/list1.jpg" mode=""></image>
								<view class="right-name">毛巾</view>
							</view>
							<view class="right-item">
								<image class="right-img" src="../../static/img/list1.jpg" mode=""></image>
								<view class="right-name">毛巾</view>
							</view>
							<view class="right-item">
								<image class="right-img" src="../../static/img/list1.jpg" mode=""></image>
								<view class="right-name">毛巾</view>
							</view>
							<view class="right-item">
								<image class="right-img" src="../../static/img/list1.jpg" mode=""></image>
								<view class="right-name">毛巾</view>
							</view>
						</view>
					</view>
					<view class="right-list">
						<view class="list-title">家纺</view>
						<view class="right-content">
							<view class="right-item">
								<image class="right-img" src="../../static/img/list1.jpg" mode=""></image>
								<view class="right-name">毛巾</view>
							</view>
							<view class="right-item">
								<image class="right-img" src="../../static/img/list1.jpg" mode=""></image>
								<view class="right-name">毛巾</view>
							</view>
							<view class="right-item">
								<image class="right-img" src="../../static/img/list1.jpg" mode=""></image>
								<view class="right-name">毛巾</view>
							</view>
						</view>
					</view>
					<view class="right-list">
						<view class="list-title">家纺</view>
						<view class="right-content">
							<view class="right-item">
								<image class="right-img" src="../../static/img/list1.jpg" mode=""></image>
								<view class="right-name">毛巾</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import Lines from "../../components/common/Line.vue"
	export default {
		data() {
			return {
				clentHeight:0,
				activeIndex:1,
			}
		},
		components:{
			Lines
		},
		//获取可视高度
		onReady() {
			uni.getSystemInfo({
				success:(res)=>{
					this.clentHeight=res.windowHeight
				}
			})
		},
		methods: {
			//左侧点击事件
			changeLeftTab(idnex){
				this.activeIndex=idnex
			}
		},
		//input输入框点击事件
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:"../search/search"
			})
		}
	}
</script>

<style scoped>
.list{
	display:flex;
}
.list-left{
	width:200rpx;
}
.left-item{
	border-bottom :2rpx solid #FFFFFF;
	font-size:28rpx;
	font-weight: bold;
	background-color: #F7F7F7;
}
.left-name{
	padding:30rpx 6rpx;
	text-align: center;
}
.left-name-active{
	border-left:8rpx solid #49BDFb;
	background-color: #FFFFFF;
}
.list-right{
	flex:1;
	padding-left: 20rpx;
}
.list-title{
	font-weight: bold;
	padding:30rpx 0;
}
.right-content{
	display: flex;
	flex-wrap: wrap;
}
.right-item{
	widhth:150rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding:10rpx;
}
.right-name{
	padding:16rpx 0;
}
.right-img{
	width:150rpx;
	height: 150rpx;
}
</style>

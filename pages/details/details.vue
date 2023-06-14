<template>
	<view class="details">
		<!-- 商品图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image class="swiper-img" :src="item.imgUrl" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 价格和名称 -->
		<view class="details-goods">
			<view class="goods-pprice">￥399.00</view>
			<view class="goods-oprice">￥599.00</view>
			<view class="goods-name">2023年最新款的绒毛大衣，数量有限，需要就感觉购买吧，已经成为爆款了</view>
		</view>
		<!-- 商品详情 -->
		<view >
			<view><image class="details-img" src="../../static/img/detail1.jpg" mode=""></image></view>
			<view><image class="details-img" src="../../static/img/detail2.jpg" mode=""></image></view>
			<view><image class="details-img" src="../../static/img/detail3.jpg" mode=""></image></view>
			<view><image class="details-img" src="../../static/img/detail4.jpg" mode=""></image></view>
			<view><image class="details-img" src="../../static/img/detail5.jpg" mode=""></image></view>
		</view>
		<!-- 商品列表 -->
		<Card cardTitle="看了又看"></Card>
		<CommodityList :dataList="dataList"></CommodityList>
		<!-- 底部 -->
		<view class="details-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche"></view>
			<view class="add-shopcart" @tap="showPop">加入购物车</view>
			<view class="purchase" @tap="showPop">立即购买</view>
		</view>
		<!-- 底部弹出层 -->
		<view class="pop" v-show="isShow" @touchmove.stop.prevent="">
			<!-- 蒙层 -->
			<view class="pop-mask" @tap="hidePop"></view>
			<!-- 内容块 -->
			<view class="pop-box" :animation="animationData">
				<view>
					<image class="pop-img" src="../../static/img/hot1.jpg" mode=""></image>
				</view>
				<view class="pop-num">
					<view>购买数量</view>
					<UniNumberBox>
						min='1'
					</UniNumberBox>
				</view>
				<view>
					<view class="pop-sub">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Card from "../../components/common/Card.vue"
	import CommodityList from "../../components/common/CommodityList.vue"
	import UniNumberBox from "../../components/uni/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				isShow:false,
				animationData:{},
				swiperList:[
					{imgUrl:"../../static/img/details1.jpeg"},
					{imgUrl:"../../static/img/details2.jpeg"},
					{imgUrl:"../../static/img/details3.jpeg"},
				],
				dataList:[
					{
						id:1,
						imgUrl:'../../static/img/commodity1.jpg',
						name:'最新的绒毛上衣，今天的爆款，买到就是值了，不要错过最后一波了,快点来看看今年最新爆款',
					    pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:2,
						imgUrl:'../../static/img/commodity2.jpg',
						name:'最新的绒毛上衣，今天的爆款，买到就是值了，不要错过了,快点来看看今年最新爆款',
					    pprice:"188",
						oprice:"388",
						discount:"5.2"
					},
					{
						id:3,
						imgUrl:'../../static/img/commodity3.jpg',
						name:'最新的绒毛上衣，今天的爆款，买到就是值了，不要错过了,快点来看看今年最新爆款',
					    pprice:"188",
						oprice:"388",
						discount:"5.2"
					},
					{
						id:4,
						imgUrl:'../../static/img/commodity4.jpg',
						name:'最新的绒毛上衣，今天的爆款，买到就是值了，不要错过了,快点来看看今年最新爆款',
					    pprice:"188",
						oprice:"388",
						discount:"5.2"
					}
				]
			}
		},
		components:{
			Card,
			CommodityList,
			UniNumberBox,
		},
		methods: {
			showPop(){
				var animation = uni.createAnimation({
				   duration: 200
				})
				animation.translateY(600).step();
				this.animationData = animation.export();
			  
				setTimeout(()=>{
					this.isShow = true;
					animation.translateY(0).step();
					this.animationData = animation.export();
				},200)
			},
			hidePop(){
				var animation = uni.createAnimation({
				   duration: 200
				})
				animation.translateY(600).step();
				this.animationData = animation.export();
				this.isShow = true;
				setTimeout(()=>{
					animation.translateY(0).step();
					this.isShow = false;
				},200)
			}
		}
	}
</script>

<style scoped>
.details{
	padding-bottom: 90rpx;
}
swiper{
	width:100%;
	height: 700rpx;
}
.swiper-img{
	width:100%;
	height: 700rpx;
}
.details-goods{
	text-align: center;
	font-size: 36rpx;
	font-weight: bold;
	padding:10rpx 0;
}
.details-img{
	width:100%
}
.details-foot{
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 90rpx;
	background-color: #FFFFFF;
}
.details-foot .iconfont{
	width: 60rpx;
	height: 60rpx;
	border-radius: 100%;
	background-color: #000000;
	color:#FFFFFF;
	text-align: center;
	margin: 0 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.add-shopcart{
	margin: 0 30rpx;
	padding: 6rpx 30rpx;
	background-color: #000000;
	color:#FFFFFF;
	border-radius: 40rpx;
}
.purchase{
	margin: 0 30rpx;
	padding: 6rpx 30rpx;
	background-color: #49BDFB;
	color:#FFFFFF;
	border-radius: 40rpx;
}
.pop{
	position: fixed;
	left: 0;
	top: 0;
	width:100%;
	height: 100%;
	z-index: 9999;
}
.pop-mask{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.3);
}
.pop-box{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	background-color: #FFFFFF;
}
.pop-img{
	width:260rpx;
	height: 260rpx;
}
.pop-sub{
	line-height: 80rpx;
	background-color: #49BDFB;
	color: #FFFFFF;
	text-align:center;
}
.pop-num{
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
}
</style>

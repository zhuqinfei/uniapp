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
		
		<Card cardTitle="看了又看"></Card>
		<CommodityList :dataList="dataList"></CommodityList>
	</view>
</template>

<script>
	import Card from "../../components/common/Card.vue"
	import CommodityList from "../../components/common/CommodityList.vue"
	export default {
		data() {
			return {
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
			CommodityList
		},
		methods: {
			
		}
	}
</script>

<style scoped>
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
</style>

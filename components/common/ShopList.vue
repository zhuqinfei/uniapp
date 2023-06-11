<template>
	<view class="shop-list">
		<view class="shop-title f-color">
			<view class="shop-item" 
			v-for="(item,index) in shopList.data"
			:key="index"
			@tap="changeTab(index)"
			>
				<view :class="shopList.currentIndex==index ? 'f-active-color' :'' ">{{item.name}}</view>
				<view class="shop-icon">
					<view class="iconfont icon-shangjiantou up"
					  :class="item.status===1 ? 'f-active-color' :''"
					></view>
					<view class="iconfont icon-arrow-down down"
					:class="item.status===2 ? 'f-active-color' :''"
					></view>
				</view>
			</view>
		</view>
		<Lines></Lines>
		<CommodityList :dataList="dataList"></CommodityList>
	</view>
</template>

<script>
	import Lines from "./Line.vue"
	import CommodityList from "./CommodityList.vue"
	export default{
		props:{
			keyword:String
		},
		data(){
			return{
				shopList:{
					currentIndex:0,
					data:[
						{name:"价格",status:1},
						{name:"折扣",status:0},
						{name:"品牌",status:0}
					]
				},
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
			Lines,
			CommodityList
		},
		methods:{
			changeTab(index){
				//索引值
				let idx=this.shopList.currentIndex
				//具体哪一个对象
				let item=this.shopList.data[idx]
				if(idx==index){
					return item.status=item.status===1 ? 2 :1
				}		
				let newItem=this.shopList.data[index]
				item.status=0
				this.shopList.currentIndex=index
				newItem.status=1
				
			}
		},
	}
</script>

<style scoped>
.shop-title{
	display: flex;
}
.shop-item{
	flex:1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80rpx;
}
.shop-icon{
	position: relative;
	margin-left: 10rpx;
}
.iconfont{
	width:16rpx;
	height:8rpx;
	position: absolute;
	left:0;
}
.up{
	top:-22rpx;
}
.down{
	top:-8rpx
}
</style>
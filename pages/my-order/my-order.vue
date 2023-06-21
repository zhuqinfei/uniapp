<template>
	<view class='my-order bg-active-color' :style="'height:'+clentHeight+'px;'">
		<Lines></Lines>
		<view class='order-header'>
			<view 
				class='header-item'
				v-for='(item,index) in tabList'
				:key='index'
				:class=' tabIndex==index?"active":""  '
				@tap='changeTab(index)'
			>{{item.name}}</view>
		</view>
		
		<view class='order-main'>
			<!--商品-->
			<view class='order-goods'>
				<view class='goods-status f-active-color'>待买家支付</view>
				<view class='goods-item'>
					<view class='goods-content bg-active-color'>
						<image class='goods-img' src="../../static/img/Children3.jpg" mode=""></image>
						<view class='goods-text'>
							<view class='goods-name'>大姨绒毛大款2020年必须买,不买你就不行了必须买</view>
							<view class='goods-size f-color'>颜色分类：黑色</view>
							<view class='f-active-color' style='font-size:24rpx'>7天无理由</view>
						</view>
						<view>
							<view>¥299.00</view>
							<view class='f-color'>*1</view>
						</view>
					</view>
				</view>
			</view>
			<Lines></Lines>
			<!--总价-->
			<view class='total-price'>
				订单金额: <text class='f-active-color'>¥39.00</text> (包含运费¥0.00)
			</view>
			<Lines></Lines>
			<!--支付-->
			<view class='payment'>
				<view class='payment-text f-active-color'>支付</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Lines from '../../components/common/Line.vue'
	export default {
		data() {
			return {
				//高度
				clentHeight:0,
				//当前位置
				tabIndex:0,
				//顶部选项卡的数据
				tabList:[
					{name:"全部"},
					{name:"待付款"},
					{name:"待发货"},
					{name:"待收货"},
					{name:"待评价"},
				]
			}
		},
		onReady() {
			
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight
				}
			})
			
		},
		components:{
			Lines
		},
		methods: {
			//顶部切换
			changeTab(index){
				this.tabIndex = index;
			},
		}
	}
</script>

<style scoped>
.order-header{
	background-color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom:2rpx solid #F7F7F7;
}
.header-item{
	text-align: center;
	flex: 1;
	line-height: 120rpx;
}
.active{
	border-bottom: 4rpx solid #49BDFB;
}
.goods-status{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	padding:20rpx;
}
.goods-content{
	padding:10rpx 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.goods-text{
	width:360rpx;
	padding:0 10rpx;
	font-size:26rpx;
}
.goods-img{
	width:160rpx;
	height:160rpx;
}
.goods-name{
	font-size:26rpx;
}
.goods-size{
	font-size:24rpx;
}
.total-price{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	padding:20rpx;
}
.payment{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	padding:20rpx;
}
.payment-text{
	border:2rpx solid #49BDFB;
	padding:6rpx 40rpx;
	border-radius: 30rpx;
}
</style>

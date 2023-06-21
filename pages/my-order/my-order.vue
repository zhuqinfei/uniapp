<template>
	<view class='my-order'>
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
	</view>
</template>

<script>
	import Lines from '../../components/common/Line.vue'
	export default {
		data() {
			return {
				tabIndex:0,
				tabList:[
					{name:"全部"},
					{name:"待付款"},
					{name:"待发货"},
					{name:"待收货"},
					{name:"待评价"},
				]
			}
		},
		components:{
			Lines
		},
		methods: {
			//顶部切换
			changeTab(index){
				this.tabIndex = index;
			}
		}
	}
</script>

<style scoped>
.order-header{
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
</style>

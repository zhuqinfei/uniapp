<template>
	<view class='my-add-path'>
		
		<view class='path-item'>
			<view>收 件 人</view>
			<input type="text" value="" placeholder="收件人姓名" v-model="pathObj.name"/>
		</view>
		
		<view class='path-item'>
			<view>手 机 号</view>
			<input type="text" value="" placeholder="11位手机号" v-model="pathObj.tel"/>
		</view>
		
		<view class='path-item'>
			<view>所在地址</view>
			<view @tap='showCityPicker'>{{pathObj.city}} > </view>
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>
		
		<view class='path-item'>
			<view>详细地址</view>
			<input type="text" value="" placeholder="5到60个字符" v-model="pathObj.details"/>
		</view>
		
		<view class='path-item'>
			<view>设为默认地址</view>
			<label class="radio">
				<radio value="" color="#FF3333" :checked="pathObj.isDefault"/><text></text>
			</label>
		</view>
		
	</view>
</template>

<script>
	import mpvueCityPicker from '../../components/uni/mpvue-citypicker/mpvueCityPicker.vue'
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				pickerValueDefault: [0, 0, 1],
			    pathObj:{
					name:'',
					tle:'',
					city:"请选择",
					details:'',
					isDefault:true
				}
			}
		},
		components:{
			mpvueCityPicker
		},
		//页面生命周期
		onNavigationBarButtonTap(){
			this.createPathFn(this.pathObj)
			uni.navigateBack({
				delta:1
			})
		},
		methods: {
			...mapActions(['createPathFn']),
			showCityPicker() {
			  this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
			  this.pathObj.city = e.label;
			},
		}
	}
</script>

<style scoped>
.my-add-path{
	padding-left:20rpx;
}
.path-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:16rpx 0;
	width: 100%;
	border-bottom: 2rpx solid #CCCCCC;
}
.path-item input{
	flex:1;
	text-align: left;
	padding-left:10rpx;
}
</style>

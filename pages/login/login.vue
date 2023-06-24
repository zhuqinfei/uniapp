<template>
	<view class='login'>
		
		<view class='login-tel'>
			<view class='tel-main'>
				<view class='close'>
					<image class='close-img' src="../../static/img/close.png" mode=""></image>
				</view>
				<view class='logo'>
					<image class='logo-img' src="../../static/img/logo.jpg" mode=""></image>
				</view>
				<view class='tel'>手机号注册</view>
				<LoginOther></LoginOther>
				<view class='login-go'>
					<view>已有账号，去登录</view>
					<image src="../../static/img/down.png" mode=""></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import LoginOther from '../../components/login/login-other.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			LoginOther
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.login-tel{
	width: 100vw;
	height: 100vh;
	/* background-color: red; */
}
.tel-main{
	padding:0 20rpx;
}
.close{
	/* #ifdef APP-PLUS */
	padding:120rpx 0;
	/* #endif */
	
	/* #ifdef H5 */
	padding:30rpx 0 30rpx 0;
	/* #endif */	
}
.close-img{
	width:60rpx;
	height: 60rpx;
}
.logo{
	padding-bottom: 100rpx;
	display: flex;
	justify-content: center;
}
.tel{
	width:100%;
	/* height: 80rpx; */
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}
.login-go{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.login-go image{
	width:60rpx;
	height: 60rpx;
}
</style>

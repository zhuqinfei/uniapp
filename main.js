import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

import store from "./store/index.js"
Vue.prototype.$store=store

Vue.config.productionTip = false
App.mpType = 'app'

//权限跳转
Vue.prototype.navigataTo=(options)=>{
	if( !store.state.user.loginStatus){
		uni.showToast({
			title:"请先登录",
			icon:"none"
		})
		return uni.navigateTo({
			url:"/pages/login/login"
		})
	}
	uni.switchTab(options)
}

const app = new Vue({
  ...App,
  store
  
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
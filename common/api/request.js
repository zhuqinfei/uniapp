export default{
	common:{
		baseUrl:"http://192.168.1.6:3000/api",
		header:{
			"content-type":"application/json",
			"content-type":"application/x-www-form-urlencoded"
		},
		data:{},
		method:"GET",
		dataType:"json"
	},
	request(options={}){		
		// uni.showLoading({
		// 	title: '加载中'
		// });
		options.url=this.common.baseUrl+options.url
		options.data=options.data || this.common.data
		options.header=options.header || this.common.header
		options.method=options.method || this.common.method
		options.dataType=options.dataType || this.common.dataType
		return new Promise((resolve,reject)=>{
			uni.request({
				...options,
				success:(res)=>{
					if(res.statusCode != 200){
						return reject()
					}				
					// setTimeout(function () {
					// 	uni.hideLoading();
					// }, 500);					
					let data=res.data.data
					resolve(data)
				}
			})
		})
	}
}
var User={
	//查询用户名
	queryUserName(param){
		if(param.userName){
			//phone=应该是手机号这个变量，为了调试方便所以名称改成userName
			return `select * from user where userName='${param.userName}' or phone='${param.userName}'`
		}else{
			//第三方登录
			return `select * from user where provider='${param.provider}' or openid='${param.openid}'`
		}
		
	},
	//验证用户名和密码
	queryUserPwd(param){
		return `select * from user where userName='${param.userName}' or phone='${param.userName}' and userPwd='${param.userPwd}'`
	},
	//增加一条用户数据
	insertData(param){
		let userName=param.userName || param.openid.slice(0,2)
		
		const jwt=require('jsonwebtoken')
		//id+时间戳+随机数/口令
		let payload={name:userName}//用户名
		let secret='zhangsan' //口令
		let token=jwt.sign(payload,secret)
		let nikeName=param.nikeName || "默认昵称"
		let avatarUrl=param.avatarUrl || "../../static/img/logo.jpg"
		
		return `insert into user (userName,userPwd,phone,imgUrl,nikeName,token,provider,openid) values ("","123456","${userName}","${avatarUrl}","${nikeName}","${token}","${param.provider}","${param.openid}")`;
	}
}


exports=module.exports=User
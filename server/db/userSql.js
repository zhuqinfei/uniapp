var User={
	//查询用户名
	queryUserName(param){
		//phone=应该是手机号这个变量，为了调试方便所以名称改成userName
		return `select * from user where userName='${param.userName}' or phone='${param.userName}'`
	},
	//验证用户名和密码
	queryUserPwd(param){
		return `select * from user where userName='${param.userName}' or phone='${param.userName}' and userPwd='${param.userPwd}'`
	},
	//增加一条用户数据
	insertData(param){
		
		const jwt=require('jsonwebtoken')
		//id+时间戳+随机数/口令
		let payload={name:param.userName}//用户名
		let secret='zhangsan' //口令
		let token=jwt.sign(payload,secret)
		
		return `insert into user (userName,userPwd,phone,imgUrl,nikeName,token) values ("","123456","${param.userName}","../../static/img/logo.jpg","默认昵称","${token}")`;
	}
}


exports=module.exports=User
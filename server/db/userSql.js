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
		return `insert into user (userName,userPwd,phone,imgUrl,nikeName,token) values ("","","${param.userName}","../../static/img/logo.jpg","默认昵称","")`;
	}
}


exports=module.exports=User
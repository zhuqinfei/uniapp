var express = require('express');
var router = express.Router();
var connection=require("../db/sql.js")
var user=require('../db/userSql.js')
var jwt_decode = require('jwt-decode');

//验证码
let code = '';
//接入短信的sdk
const tencentcloud = require("tencentcloud-sdk-nodejs");

//引入支付宝沙箱配置
const alipaySdk = require('../db/alipay.js');
const AlipayFormData = require('alipay-sdk/lib/form').default;

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   // res.json({"a":1})
// });

router.all('*',function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	//Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
	res.header('Access-Control-Allow-Headers', 'token,Content-Type');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
})

router.get('/api/goods/search', function(req, res, next) {
	//desc降序  asc升序
	//获取对象的key
	let [goodsName,orderName]=Object.keys(req.query)
	//goodsName的key的值
    let name=req.query[goodsName]
	//orderName的key的值
	let order=req.query[orderName]
    connection.query(
	`select * from goods_search where name like '%${name}%' order by ${orderName} ${order}`
	,function (error, results, fields) {
        if (error) throw error;
        res.send({
			code:"0",
			data:results
		})
    })
});

//首页推荐的数据
router.get("/api/index_list/data",function(req,res,next){
	
	res.send({
		"code":0,
		"data":{
			topBar:[
				{id:1,name:"推荐"},
				{id:2,name:"运动户外"},
				{id:3,name:"服饰内衣"},
				{id:4,name:"鞋靴箱包"},
				{id:5,name:"美妆个护"},
				{id:6,name:"家具数码"},
				{id:7,name:"食品母婴"},
			],
			data:[
				{
					type:"swiperList",
					data:[
						{imgUrl:'../../static/img/swiper1.jpg'},
						{imgUrl:'../../static/img/swiper2.jpg'},
						{imgUrl:'../../static/img/swiper3.jpg'},
					]
				},
				{
					type:"recommendList",
					data:[
						{
							bigUrl:'../../static/img/Children.jpg',
							data:[
								{imgUrl:'../../static/img/Children1.jpg'},
								{imgUrl:'../../static/img/Children2.jpg'},
								{imgUrl:'../../static/img/Children3.jpg'},
							]
						},
						{
							bigUrl:'../../static/img/Furnishing.jpg',
							data:[
								{imgUrl:'../../static/img/Furnishing1.jpg'},
								{imgUrl:'../../static/img/Furnishing2.jpg'},
								{imgUrl:'../../static/img/Furnishing3.jpg'},
							]
						}
					]
				},
				{
					type:"commodityList",
					data:[
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
				},
				
			],
		}
	})
	
})
//运动户外第一次加载的数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
 
  res.json({
	  code:"0",
	  data:[
		  {
			  type:"bannerList",
			  imgUrl:"../../static/img/banner1.jpg"
		  },
		  {
			  type:"iconsList",
			  data:[
				  {imgUrl:"../../static/img/icons1.png",name:"运动户外"},
				  {imgUrl:"../../static/img/icons2.png",name:"运动户外"},
				  {imgUrl:"../../static/img/icons3.png",name:"运动户外"},
				  {imgUrl:"../../static/img/icons4.png",name:"运动户外"},
				  {imgUrl:"../../static/img/icons5.png",name:"运动户外"},
				  {imgUrl:"../../static/img/icons6.png",name:"运动户外"},
				  {imgUrl:"../../static/img/icons7.png",name:"运动户外"},
				  {imgUrl:"../../static/img/icons8.png",name:"运动户外"}
			  ]
		  },
		  {
			  type:"hotList",
			  data:[
				  {
				  	id:1,
				  	imgUrl:"../../static/img/hot1.jpg",
				  	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
				  	pprice:"299",
				  	oprice:"659",
				  	discount:"5.2"
				  },
				  {
				  	id:2,
				  	imgUrl:"../../static/img/hot2.jpg",
				  	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
				  	pprice:"299",
				  	oprice:"659",
				  	discount:"5.2"
				  },
				  {
				  	id:3,
				  	imgUrl:"../../static/img/hot3.jpg",
				  	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
				  	pprice:"299",
				  	oprice:"659",
				  	discount:"5.2"
				  }
			  ]
		  },
		  {
			  type:"shopList",
			  data:[
				  {
					  bigUrl:"../../static/img/shop.jpg",
					  data:[
						 {
						 	id:1,
						 	imgUrl:"../../static/img/shop1.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:2,
						 	imgUrl:"../../static/img/shop2.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:3,
						 	imgUrl:"../../static/img/shop3.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:4,
						 	imgUrl:"../../static/img/shop4.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:1,
						 	imgUrl:"../../static/img/shop1.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:2,
						 	imgUrl:"../../static/img/shop2.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:3,
						 	imgUrl:"../../static/img/shop3.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:4,
						 	imgUrl:"../../static/img/shop4.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 }
					  ]
				  },
				  {
					  bigUrl:"../../static/img/shop.jpg",
					  data:[
						 {
						 	id:1,
						 	imgUrl:"../../static/img/shop1.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:2,
						 	imgUrl:"../../static/img/shop2.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:3,
						 	imgUrl:"../../static/img/shop3.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:4,
						 	imgUrl:"../../static/img/shop4.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:1,
						 	imgUrl:"../../static/img/shop1.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:2,
						 	imgUrl:"../../static/img/shop2.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:3,
						 	imgUrl:"../../static/img/shop3.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:4,
						 	imgUrl:"../../static/img/shop4.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 }
					  ]
				  }				  
			  ]
		  },
		  {
		  	type:"commodityList",
		  	data:[
		  		{
		  			id:1,
		  			imgUrl:"../../static/img/commodity1.jpg",
		  			name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
		  			pprice:"299",
		  			oprice:"659",
		  			discount:"5.2"
		  		},
		  		{
		  			id:2,
		  			imgUrl:"../../static/img/commodity2.jpg",
		  			name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
		  			pprice:"299",
		  			oprice:"659",
		  			discount:"5.2"
		  		},
		  		{
		  			id:3,
		  			imgUrl:"../../static/img/commodity3.jpg",
		  			name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
		  			pprice:"299",
		  			oprice:"659",
		  			discount:"5.2"
		  		},
		  		{
		  			id:4,
		  			imgUrl:"../../static/img/commodity4.jpg",
		  			name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
		  			pprice:"299",
		  			oprice:"659",
		  			discount:"5.2"
		  		}
		  	]
		  }
	  ]
  })
});
//服饰内衣第一次加载的数据
router.get('/api/index_list/3/data/1', function(req, res, next) {
 
  res.json({
	  code:"0",
	  data:[
		  {
			  type:"bannerList",
			  imgUrl:"../../static/img/banner1.jpg"
		  },
		  {
			  type:"iconsList",
			  data:[
				  {imgUrl:"../../static/img/icons1.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/icons2.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/icons3.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/icons4.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/icons5.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/icons6.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/icons7.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/icons8.png",name:"服饰内衣"}
			  ]
		  },
		  {
			  type:"hotList",
			  data:[
				  {
				  	id:1,
				  	imgUrl:"../../static/img/hot1.jpg",
				  	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
				  	pprice:"299",
				  	oprice:"659",
				  	discount:"5.2"
				  },
				  {
				  	id:2,
				  	imgUrl:"../../static/img/hot2.jpg",
				  	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
				  	pprice:"299",
				  	oprice:"659",
				  	discount:"5.2"
				  },
				  {
				  	id:3,
				  	imgUrl:"../../static/img/hot3.jpg",
				  	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
				  	pprice:"299",
				  	oprice:"659",
				  	discount:"5.2"
				  }
			  ]
		  },
		  {
			  type:"shopList",
			  data:[
				  {
					  bigUrl:"../../static/img/shop.jpg",
					  data:[
						 {
						 	id:1,
						 	imgUrl:"../../static/img/shop1.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:2,
						 	imgUrl:"../../static/img/shop2.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:3,
						 	imgUrl:"../../static/img/shop3.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:4,
						 	imgUrl:"../../static/img/shop4.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:1,
						 	imgUrl:"../../static/img/shop1.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:2,
						 	imgUrl:"../../static/img/shop2.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:3,
						 	imgUrl:"../../static/img/shop3.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:4,
						 	imgUrl:"../../static/img/shop4.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 }
					  ]
				  },
				  {
					  bigUrl:"../../static/img/shop.jpg",
					  data:[
						 {
						 	id:1,
						 	imgUrl:"../../static/img/shop1.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:2,
						 	imgUrl:"../../static/img/shop2.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:3,
						 	imgUrl:"../../static/img/shop3.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:4,
						 	imgUrl:"../../static/img/shop4.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:1,
						 	imgUrl:"../../static/img/shop1.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:2,
						 	imgUrl:"../../static/img/shop2.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:3,
						 	imgUrl:"../../static/img/shop3.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 },
						 {
						 	id:4,
						 	imgUrl:"../../static/img/shop4.jpg",
						 	name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						 	pprice:"299",
						 	oprice:"659",
						 	discount:"5.2"
						 }
					  ]
				  }				  
			  ]
		  },
		  {
		  	type:"commodityList",
		  	data:[
		  		{
		  			id:1,
		  			imgUrl:"../../static/img/commodity1.jpg",
		  			name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
		  			pprice:"299",
		  			oprice:"659",
		  			discount:"5.2"
		  		},
		  		{
		  			id:2,
		  			imgUrl:"../../static/img/commodity2.jpg",
		  			name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
		  			pprice:"299",
		  			oprice:"659",
		  			discount:"5.2"
		  		},
		  		{
		  			id:3,
		  			imgUrl:"../../static/img/commodity3.jpg",
		  			name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
		  			pprice:"299",
		  			oprice:"659",
		  			discount:"5.2"
		  		},
		  		{
		  			id:4,
		  			imgUrl:"../../static/img/commodity4.jpg",
		  			name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
		  			pprice:"299",
		  			oprice:"659",
		  			discount:"5.2"
		  		}
		  	]
		  }
	  ]
  })
});
//首次第一次触底的数据
router.get('/api/index_list/1/data/2', function(req, res, next) {
	res.json({
		code:"0",
		data:[
			{
				type:"commodityList",
				data:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity2.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity3.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:4,
						imgUrl:"../../static/img/commodity4.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					}
				]
			}
		]
	})
})
//运动户外第一次触底的数据
router.get('/api/index_list/2/data/2', function(req, res, next) {
	res.json({
		code:"0",
		data:[
			{
				type:"commodityList",
				data:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity2.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity3.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:4,
						imgUrl:"../../static/img/commodity4.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					}
				]
			}
		]
	})
})
//运动户外第二次触底的数据
router.get('/api/index_list/2/data/3', function(req, res, next) {
	res.json({
		code:"0",
		data:[
			{
				type:"commodityList",
				data:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity2.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity3.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:4,
						imgUrl:"../../static/img/commodity4.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					}
				]
			}
		]
	})
})

//商品分类的数据
router.get('/api/goods/list', function(req, res, next) {
   res.json({
	   code:0,
	   data:[
		   {
			   id:1,
			   name:"家居家纺",
			   data:[
				   {
					   name:"家纺",
					   list:[
						   {
							   id:1,
							   name:"毛巾/浴巾",
							   imgUrl:"../../static/img/list1.jpg"
						   },
						   {
							   id:2,
							   name:"枕头",
							   imgUrl:"../../static/img/list1.jpg"
						   }
					   ]
				   },
				   {
					   name:"生活用品",
					   list:[
						   {
							   id:1,
							   name:"浴室用品",
							   imgUrl:"../../static/img/list1.jpg"
						   },
						   {
							   id:2,
							   name:"洗晒",
							   imgUrl:"../../static/img/list1.jpg"
						   }
					   ]
				   }
			   ]
		   },
		   {
			   id:2,
			   name:"女装",
			   data:[
				   {
					   name:"裙装",
					   list:[
						   {
							   id:1,
							   name:"半身裙",
							   imgUrl:"../../static/img/list1.jpg"
						   },
						   {
							   id:2,
							   name:"连衣裙",
							   imgUrl:"../../static/img/list1.jpg"
						   }
					   ]
				   },
				   {
					   name:"上衣",
					   list:[
						   {
							   id:1,
							   name:"T恤",
							   imgUrl:"../../static/img/list1.jpg"
						   },
						   {
							   id:2,
							   name:"衬衫",
							   imgUrl:"../../static/img/list1.jpg"
						   }
					   ]
				   }
			   ]
		   }
	   ]
   })
});

router.get('/api/goods/id', function(req, res, next) {
	let id=req.query.id
  connection.query(
  `select * from goods_search where id=${id}`
  ,function (error, results, fields) {
      if (error) throw error;
      res.send({
  		code:"0",
  		data:results
  	})
  })
});

//用户登录
router.post('/api/login',function(req, res, next) {
	//前端给后端的数据
	let params={
		userName:req.body.userName,
		userPwd:req.body.userPwd
	}
	//查询用户名或者手机号存不存在
	connection.query(user.queryUserName(params),function (error, results, fields) {
	    if(results.length>0){
			//如果存在就查询密码正确不
			connection.query(user.queryUserPwd(params),function (err, result){
				if(result.length>0){
					res.send({
						data:{
							success:true,
							msg:"登录成功",
							data:result[0]
						}
					})
				}else{
					res.send({
						data:{
							success:false,
							msg:"密码不正确"
						}
					})
				}
			})
		}else{
			res.send({
				data:{
					success:false,
					msg:"用户名或手机号不存在"
				}
			})
		}
	})
});

//注册验证手机号是否存在
router.post('/api/registered',function(req, res, next) {
	//前端给后端的数据
	let params={
		userName:req.body.phone
	}
	//查询手机号是否存在
	connection.query(user.queryUserName(params),function(error,results,fields){
		if(results.length>0){
			res.send({
				data:{
					success:false,
					msg:"手机号已经存在"
				}		
			})
		}else{
			res.send({
				data:{
					success:true
				}
			})
		}
	})	   
});

//发送验证码
router.post('/api/code', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName : req.body.userName
	};
	
	//导入对应产品模块的client models
	const SmsClient = tencentcloud.sms.v20190711.Client;
	
	const clientConfig = {
	  //腾讯云认证信息
	  credential: {
	    secretId: "AKIDKXBdrtiK8mEUWN1RdaLSN3VlpfIiwxnQ",
	    secretKey: "UkoIahaEfu1yhCUYOPFrJYbR3RbXGlIb",
	  },
	  //产品地域
	  region: "",
	  //可选配置实例
	  profile: {
	    httpProfile: {
	      endpoint: "sms.tencentcloudapi.com",
	    },
	  },
	};
	//实例化要请求产品的client对象
	//实例化 SMS 的 client 对象
	const client = new SmsClient(clientConfig);
	
	//生成n位验证码
	function RndNum(n) {
	  var rnd = "";
	  for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
	  return rnd;
	}
	
	//五位验证码
	var VerificationCode = RndNum(6);
	const paramss = {
	  PhoneNumberSet: [`+86${params.userName}`],
	  TemplateParamSet: [VerificationCode, "5"],
	  TemplateID: "1848842",
	  SmsSdkAppid: "1400834832",
	  Sign: "蓝色的精灵小程序",
	};
	// 通过 client 对象调用想要访问的接口，需要传入请求对象以及响应回调函数
	client.SendSms(paramss).then(
	  (data) => {
	    if(data.SendStatusSet[0].Code=="Ok"){
			code=VerificationCode
			res.send({
				data:{
					code:code
				}
			})
		}
	  },
	  (err) => {
	    console.error("error", err);
	  }
	);	
})

//注册===>增加一条数据
router.post('/api/addUser', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName : req.body.userName,
		userCode : req.body.code
	};
	if(params.userCode == code){
		connection.query( user.insertData(params) , function (error, results, fields) {
			connection.query(user.queryUserName(params),function(err,result) {
			  res.send({
				  data:{
					success:true,
					msg:"注册成功",
					data:result[0]
				  }
			  })
			})
		})
	}
	
})

//第三方登录
router.post('/api/loginother', function(req, res, next) {
	//前端给的后端的数据
    let params={
		provider:req.body.provider,//登录方式
		openid:req.body.openid,  //用户身份ID
		nikeName:req.body.nikeName, //用户昵称
		avatarUrl:req.body.avatarUrl //用户头像
	}
	//查询数据库中有没有此用户
	connection.query(user.queryUserName(params),function(err,results) {
	  if(results.length>0){
		//数据库存在==》读取
		connection.query(user.queryUserName(params),function(e,r){
			res.send({
			   data:r[0]
			})
		})
	  }else{
		   //数据库不存在==》存储==》读取
		  connection.query( user.insertData(params) , function (err, result){
			  connection.query(user.queryUserName(params),function(e,r){
				  res.send({
					  data:r[0]
				  })
			  })
		  }) 
	  }
	})
});

//当前用户查询收货地址
router.post('/api/selectAddress', function(req, res, next){
	
	let token = req.headers.token;
	let phone = jwt_decode(token);
	
	connection.query(`select * from user where phone = ${phone.name}`, function(error, results, fields){
		let id = results[0].id;
		connection.query(`select * from address where userId = ${id}`, function(err, result, field){
			res.send({
				data:result
			})
		})
	})
})

//当前用户新增收货地址
router.post('/api/addAddress', function(req, res, next) {
	
	let token = req.headers.token;
	let phone = jwt_decode(token);
	let name = req.body.name;
	let tel = req.body.tel;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let address = req.body.address;
	let isDefault = req.body.isDefault;
	
	connection.query(`select * from user where phone = ${phone.name}`, function (error, results, fields) {
		let id = results[0].id;
		let sqlInert = 'insert into address (name,tel,province,city,district,address,isDefault,userId) values ("'+name+'","'+tel+'","'+province+'","'+city+'","'+district+'","'+address+'","'+isDefault+'","'+id+'")';
		connection.query(sqlInert, function (err, result, field) {
			res.send({
				data:{
					success:"成功"
				}
			})
		})
	})
})

//当前用户修改收货地址
router.post('/api/updateAddress', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt_decode(token);
	let name = req.body.name;
	let tel = req.body.tel;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let address = req.body.address;
	let isDefault = req.body.isDefault;
	let id = req.body.id;
	
	//获取userId
	connection.query(`select * from user where phone = ${phone.name}`, function (error, results, fields) {
		let userId = results[0].id;
		connection.query(`select * from address where userId = ${userId} and isDefault = ${isDefault}`, function (err, result) {
			let childId = result[0].id;
			connection.query(`update address set isDefault = replace(isDefault,"1","0") where id = ${childId}`, function (e, r) {
				let updateSql = `update address set name = ?,tel = ?,province = ?,city = ?,district = ?,address = ?,isDefault = ?,userId = ? where id = ${id}`
				connection.query(updateSql,[name,tel,province,city,district,address,isDefault,userId],function (err, result) {
					res.send({
						data:{
							success:'成功'
						}
					})
				})
			})
		})
	})
})

//获取当前用户购物车列表
router.post('/api/selectCart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt_decode(token);
	connection.query(`select * from user where phone = ${phone.name}`, function (error, results, fields) {
		//当前用户id
		let userId = results[0].id;
		connection.query(`select * from goods_cart where uId = ${userId}`, function (err, result) {
			res.json({
				data:result
			})
		})
	})
})

//1. 当前用户
//2. 当前用户--->哪一个商品的数量发展变化  [查询]   原来的数量
//3. 替换 ===> 把前端给的值拿过来, 把原来数量替换掉

//修改当前用户购物车商品数量
router.post('/api/updateNumCart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt_decode(token);
	//商品id
	let goodsId = req.body.goodsId;
	//用户输入的商品数量
	let num = req.body.num;
	connection.query(`select * from user where phone = ${phone.name}`, function (error, results, fields) {
		//当前用户id
		let userId = results[0].id;
		connection.query(`select * from goods_cart where uId = ${userId} and goods_id = ${goodsId}`, function (err, result) {
			//数据中当前的数量
			let goods_num = result[0].num;
			//当前的id号
			let id = result[0].id;
			//修改[替换]
			connection.query(`update goods_cart set num = replace(num,${goods_num},${num}) where id = ${id}`, function (e, r) {
				res.json({
					data:{
						success:true
					}
				})
			})
		})
		
	})
})

//加入购物车
router.post('/api/addCart', function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt_decode(token);
	//商品id
	let goods_id = req.body.goods_id;
	//用户输入的商品数量
	let num = req.body.num;
	connection.query(`select * from user where phone = ${phone.name}`, function (error, results, fields) {
		//当前用户id
		let userId = results[0].id;
		connection.query(`select * from goods_search where id = ${goods_id}`, function (err, result) {
			let name = result[0].name;
			let imgUrl = result[0].imgUrl;
			let pprice = result[0].pprice;
			//查询当前用户之前是否添加过这个商品
			connection.query(`select * from goods_cart where uId = ${userId} and goods_id = ${goods_id}`, function (err, data) {
				if( data.length > 0){
					//如果当前用户已经添加过本商品,就让数量增加
					connection.query(`update goods_cart set num = replace(num,${data[0].num},${ parseInt(num) + parseInt(data[0].num) }) where id = ${data[0].id}`, function (e, r) {
						res.json({
							data:{
								success:"加入成功"
							}
						})
					})
				}else{
					//如果当前用户之前没有加入过本商品,需要添加进入
					connection.query('insert into goods_cart (uId,goods_id,name,imgUrl,pprice,num) values ("'+userId+'","'+goods_id+'","'+name+'","'+imgUrl+'","'+pprice+'","'+num+'")', function (err, data) {
						res.json({
							data:{
								success:"加入成功"
							}
						})
					})
				}
			})
		})
	})
})

//删除购物车商品数据
router.post('/api/deleteCart', function(req, res, next) {
	let goodsId = req.body.goodsId;
	for(var i=0;i<goodsId.length;i++){
		connection.query(`delete from goods_cart where id=${goodsId[i]}`,function(e,r){
			res.json({
				data:{
					success:true
				}
			})
		})
	}
})

//生成订单
router.post('/api/addOrder', function(req, res, next) {
    let token = req.headers.token;
    let phone = jwt_decode(token);
    //前端给后端传递的数据
    let goodsArr = req.body.arr;
    //生成订单号
    function setTimeDateFmt( s ){
        return s < 10 ? '0' + s : s;
    }
    function orderNumber(){
        const now = new Date();
        let fullYear = now.getFullYear();
        let month = setTimeDateFmt( now.getMonth() + 1 );
        let day = setTimeDateFmt( now.getDate() );
        let hour = setTimeDateFmt( now.getHours() );
        let minutes = setTimeDateFmt( now.getMinutes() );
        let seconds = setTimeDateFmt( now.getSeconds() );
        let orderCode = fullYear + month + day + hour + minutes + seconds + ( Math.round( Math.random() * 1000000 ));
        return orderCode;
    }
    //商品名称
    let goodsName = [];
    //订单总价
    let goodsPrice = 0;
    //订单商品总数量
    let goodsNum = 0;
    //订单号
    let orderId = orderNumber();
    
    goodsArr.forEach(v=>{
        goodsName.push(  v.name );
        goodsNum += parseInt(v.num);
        goodsPrice +=  v.num * v.pprice;
    })
    
    connection.query(`select * from user where phone = ${phone.name}`, function (error, results, fields) {
    	//当前用户id
    	let userId = results[0].id;
		connection.query(`insert into store_order(uId,order_id,goods_name,goods_price,goods_num,order_status) values ("${userId}","${orderId}","${goodsName}","${goodsPrice}","${goodsNum}","1")`, function (err, data) {
			connection.query(`select * from store_order where uId = ${userId} and order_id = ${orderId}`,function(err,result){
			    res.send({
			        data:{
			            code:200,
			            success:true,
			            data:result
			        }
			    })
			})
		})
    })
})


//修改订单状态
router.post('/api/submitOrder', function(req, res, next) {
    let token = req.headers.token;
    let phone = jwt_decode(token);
    //订单号
    let orderId = req.body.orderId;
    //购物车中选中的商品
    let shopArr = req.body.shopArr;
    connection.query(`select * from user where phone = ${phone.name}`, function (error, results, fields) {
    	//当前用户id
    	let userId = results[0].id;
        connection.query(`select * from store_order where uId = ${userId} and order_id = ${orderId}`,function(err,result){
            //订单的id
            let id = result[0].id;
                connection.query(`update store_order set order_status = replace(order_status,'1','2') where id = ${id}`,function(){
                    shopArr.forEach(v=>{
                        connection.query(`delete from goods_cart where id = ${v}`,function(){
                            
                        })
                    })
                    res.send({
                        data:{
                            code:200,
                            success:true
                        }
                    })
             })
        })
    })
})

//支付接口
router.post('/api/payment', function(req, res, next) {
    //接收前端给后端的订单号
    let orderId = req.body.orderId;
	//总价
	let price=req.body.price
	//商品名称
	let list=req.body.list.join('')
	
    
    const formData = new AlipayFormData();
    //调用get方法
    formData.setMethod('get'),
    //支付时 的信息
    formData.addField('bizContent', {
      outTradeNo: orderId,//订单号
      productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
      totalAmount: price,//金额
      subject: list//商品名称
    });
    //支付成功或者失败打开的页面
    formData.addField('returnUrl', 'http://localhost:8080/payment');
    const result = alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData: formData },
    );
    result.then(resp=>{
        res.send({
            data:{
                code:200,
                success:true,
                paymentUrl:resp
            }
        })
    })
})


module.exports = router;

var express = require('express');
var router = express.Router();
var connection=require("../db/sql.js")
var user=require('../db/userSql.js')

//验证码
let code = '';
//接入短信的sdk
const tencentcloud = require("tencentcloud-sdk-nodejs");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   // res.json({"a":1})
// });

router.all('*',function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	//Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
	res.header('Access-Control-Allow-Headers', 'Content-Type');
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
	
	
	//生成n位验证码
	function RndNum(n) {
	  var rnd = "";
	  for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
	  return rnd;
	}
	
	//五位验证码
	var VerificationCode = RndNum(6);
	console.log(VerificationCode)
	code=VerificationCode
	res.send({
		data:{
			code:code
		}
	})
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
		    res.send({
				data:{
					success:true,
					msg:"注册成功"
				}
			})
		})
	}
	
})


//发送验证码
// router.post('/api/code', function(req, res, next) {
// 	//前端给后端的数据
// 	let params = {
// 		userName : req.body.userName
// 	};
	
// 	//导入对应产品模块的client models
// 	const SmsClient = tencentcloud.sms.v20190711.Client;
	
// 	const clientConfig = {
// 	  //腾讯云认证信息
// 	  credential: {
// 	    secretId: "AKIDDLH4hFi0CNRUchaE7rRp01vfFUgpnnp5",
// 	    secretKey: "DHF6qQsCJOUegVAnPtDPRL7ubL2jHm5G",
// 	  },
// 	  //产品地域
// 	  region: "",
// 	  //可选配置实例
// 	  profile: {
// 	    httpProfile: {
// 	      endpoint: "sms.tencentcloudapi.com",
// 	    },
// 	  },
// 	};
// 	//实例化要请求产品的client对象
// 	//实例化 SMS 的 client 对象
// 	const client = new SmsClient(clientConfig);
	
// 	//生成n位验证码
// 	function RndNum(n) {
// 	  var rnd = "";
// 	  for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
// 	  return rnd;
// 	}
	
// 	//五位验证码
// 	var VerificationCode = RndNum(6);
// 	const paramss = {
// 	  PhoneNumberSet: [`+86${params.userName}`],
// 	  TemplateParamSet: [VerificationCode, "5"],
// 	  TemplateID: "1848842",
// 	  SmsSdkAppid: "1400834832",
// 	  Sign: "蓝色的精灵小程序",
// 	};
// 	// 通过 client 对象调用想要访问的接口，需要传入请求对象以及响应回调函数
// 	client.SendSms(paramss).then(
// 	  (data) => {
// 	    if(data.SendStatusSet[0].Code=="Ok"){
// 			code=VerificationCode
// 			res.send({
// 				data:{
// 					code:code
// 				}
// 			})
// 		}
// 	  },
// 	  (err) => {
// 	    console.error("error", err);
// 	  }
// 	);	
// })

module.exports = router;

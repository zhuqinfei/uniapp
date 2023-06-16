export default{
	state:{
		list:[
			{
				checked:false,
				id:1,
				name:"11打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color:"颜色：返回对方的过分的",
				imgUrl:"../../static/img/Children2.jpg",
				pprice:"27",
				num:1
			},
			{
				checked:false,
				id:2,
				name:"22的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color:"颜色：返回对方的过分的",
				imgUrl:"../../static/img/Children2.jpg",
				pprice:"27",
				num:1
			},
		],
	    selectedList:[],
	},
	getters:{
		//判断是否  全选
		checkedAll(state){
			return state.list.length === state.selectedList.length
		}
	},
	mutations:{
		//全选
		checkAll(state){
			state.selectedList=state.list.map(v=>{
				v.checked=true
				return v.id
			})
		},
		//全不选
		unCheckAll(state){
			state.list.forEach(v=>{
				v.checked=false
			})
			state.selectedList=[]
		},
		//单选
		selectedItem(state,index){
			
			let id=state.list[index].id
			let i=state.selectedList.indexOf(id)
			//如果selectedList已经存在就代表他之前是选中状态，checked=false，并且在selectedList中删除
			if(i>-1){
				state.list[index].checked=false
				return state.selectedList.splice(i,1)
			}
			//如果之前没有选中，checked=true ,把当前的id添加到selectedlist
			state.list[index].checked=true
			state.selectedList.push(id)
		}
	},
	actions:{
		checkedAllFn({commit,getters}){
			return getters.checkedAll ? commit("unCheckAll") : commit("checkAll")
		}
	}
}
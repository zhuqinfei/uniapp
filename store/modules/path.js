export default {
	state:{
		list:[
			{
				name:"张三",
				tel:"18511773322",
				city:"北京市海淀区",
				details:'2号楼',
				isDefault:false
			},
			{
				name:"李四",
				tel:"18511773322",
				city:"北京市海淀区",
				details:'2号楼',
				isDefault:true
			}
		]
	},
	getters:{
		
	},
	mutations:{
		createPath( state, obj ){
			state.list.unshift( obj );
		},
		undatePath(state,{index,item}){
			for(let key in item){
				state.list[index][key]=item[key]
			}
		}
	},
	actions:{
		createPathFn({commit},obj){
			commit('createPath',obj)
		},
		undatePathFn({commit},obj){
			commit('undatePath',obj)
		}
	}
}
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
		defaultPath(state){
			return state.list.filter(v=>v.isDefault)
		}
	},
	mutations:{
		//新增
		createPath( state, obj ){
			state.list.unshift( obj );
		},
		//修改
		undatePath(state,{index,item}){
			for(let key in item){
				state.list[index][key]=item[key]
			}
		},
		//把之前选中的变成未选中，再选一个作为默认
		removePath(state){
			state.list.forEach(v=>{
				if(v.isDefault){
					v.isDefault=false
				}
			})
		}
		
	},
	actions:{
		createPathFn({commit},obj){
			if(obj.isDefault){
				commit('removePath')
			}
			commit('createPath',obj)
		},
		undatePathFn({commit},obj){
			if(obj.item.isDefault){
				commit('removePath')
			}
			commit('undatePath',obj)
		}
	}
}
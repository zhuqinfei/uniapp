export default {
	state:{
		list:[]
	},
	getters:{
		defaultPath(state){
			return state.list.filter(v=>v.isDefault)
		}
	},
	mutations:{
		//初始化请求当前用户收货地址数据
		_initAddressList(state,list){
			state.list=list
		},
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
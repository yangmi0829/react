import {ADD,DELETE,CHANGE_STATUS} from '../../assets/types/TodoList'

const initState = {
    list:[{label:'周一',status:0},{label:'周二',status:1}]
}

export default function reducer(state = initState,action){
  switch(action.type){
      case ADD:
          return {...state,list:[...state.list,{label:action.label,status:0}]}
      case DELETE:
          const deleteList = [...state.list];
          deleteList.splice(action.index,1);
          return {...state,list:deleteList}
      case CHANGE_STATUS:
          const changeStatusList = [...state.list];
          changeStatusList[action.index].status = 1;
          return {...state,list:changeStatusList}
      default: 
          return state;
  }
}
import {ADD,DELETE,CHANGE_STATUS} from '../../assets/types/TodoList'

const addItem = ({label}) => ({type:ADD,label})
const deleteItem = ({index}) => ({type:DELETE,index})
const changeItemStatus = ({index}) => ({type:CHANGE_STATUS,index})

export {
  addItem,
  deleteItem,
  changeItemStatus
}
import {applyMiddleware,createStore} from 'redux';
import reducer from './TodoList/reducer'
import logger from 'redux-logger'
 
const middleWares = applyMiddleware(logger)

const store = createStore(reducer,middleWares)
 
export default store;
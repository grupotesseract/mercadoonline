import { produtosReducer } from './produtos/reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  produtos: produtosReducer,
})

export default rootReducer
import {  ProdutosActionTypes, INITIAL_STATE_PRODUTOS } from './types'

export function produtosReducer(
  state = INITIAL_STATE_PRODUTOS,
  action
) {
  console.log('reducer', state, action)
  switch (action.type) {
    case ProdutosActionTypes.REQUEST_UPDATE_PRODUTOS: 
      return {
        ...state,
        loading: true,
        error: null,
      }
    case ProdutosActionTypes.SET_PRODUTOS: {
      return {
        ...state,
        produtos: action.payload,
        loading: false,
      }
    }
    default:
      return state
  }
}
import {  ProdutosActionTypes, INITIAL_STATE_PRODUTOS } from './types'

export function produtosReducer(
  state = INITIAL_STATE_PRODUTOS,
  action
) {
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
        produtos: action.produtos,
        loading: false,
      }
    }
    default:
      return state
  }
}
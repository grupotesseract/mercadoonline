import {  ProdutosActionTypes, INITIAL_STATE_PRODUTOS } from './types'

export function produtosReducer(
  state = INITIAL_STATE_PRODUTOS,
  action
) {
  switch (action.type) {
    case ProdutosActionTypes.UPDATE_PRODUTOS: {
      return {
        ...state,
        produtos: action.payload,
      }
    }
    default:
      return state
  }
}
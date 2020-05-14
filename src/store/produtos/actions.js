import { ProdutosActionTypes } from './types'

export function updateProdutos(produtos) {
  return {
    type: ProdutosActionTypes.UPDATE_PRODUTOS,
    payload: produtos
  }
}
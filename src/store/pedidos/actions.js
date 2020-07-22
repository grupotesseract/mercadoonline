import { PedidosActionTypes } from './types'

export const enviaPedido = (payload) => ({
  type: PedidosActionTypes.ENVIA_PEDIDO,
  payload
})

export const enviaZap = () => ({ type: PedidosActionTypes.ENVIA_ZAP });

export const addProdutoCarrinho = (produto) => ({
  type: PedidosActionTypes.ADD_PRODUTO_CARRINHO,
  produto,
})

export const decrementaProdutoCarrinho = (produto) => ({
  type: PedidosActionTypes.DECREMENTA_PRODUTO_CARRINHO,
  produto,
})

export const removeProdutoCarrinho = (produto) => ({
  type: PedidosActionTypes.REMOVE_PRODUTO_CARRINHO,
  produto,
})
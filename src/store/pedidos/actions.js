import { PedidosActionTypes } from './types'

export const enviaPedido = () => ({
  type: PedidosActionTypes.ENVIA_PEDIDO,
})

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
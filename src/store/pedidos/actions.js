import { PedidosActionTypes } from './types'

export const enviaPedido = (payload) => ({
  type: PedidosActionTypes.ENVIA_PEDIDO,
  payload
})

export const enviaMensagemWhatsapp = () => ({
  type: PedidosActionTypes.ENVIA_MSG_WHATSAPP,
});

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
import {  PedidosActionTypes, INITIAL_STATE_PEDIDOS } from './types'

export function pedidosReducer(
  state = INITIAL_STATE_PEDIDOS,
  action
) {
  console.log('reducer', state, action)
  const { carrinho } = state;
  switch (action.type) {
    case PedidosActionTypes.ENVIA_PEDIDO: 
      return {
        ...state,
        loading: true,
        error: null,
      }
    case PedidosActionTypes.PEDIDO_ENVIADO: {
      return {
        ...state,
        loading: false,
        pedidoEnviado: true,
      }
    }
    case PedidosActionTypes.PEDIDO_ERRO: {
      return {
        ...state,
        loading: false,
        pedidoEnviado: false,
        error: action.payload,
      }
    }
    case PedidosActionTypes.ADD_PRODUTO_CARRINHO: {
      const { produto } = action;
      const produtoIndex = carrinho.findIndex(p => p.id === produto.id);
      
      if (produtoIndex === -1) {
        console.log("Incluindo produto:", produto);
        produto.quantidade = 1;
        carrinho.push(produto);
      }

      if (produtoIndex >= 0) {
        console.log("Aumentando quantidade no produto:", produto);
        carrinho[produtoIndex].quantidade++;
      }

      return {
        ...state,
        carrinho,
      }
    }
    case PedidosActionTypes.DECREMENTA_PRODUTO_CARRINHO: {
      const { produto } = action;
      const produtoIndex = carrinho.findIndex(p => p.id === produto.id);
      
      if (produtoIndex === -1) {
        console.log("tentando remover produto inexistente");
        return;
      }

      if (produtoIndex >= 0) {
        carrinho.splice(produtoIndex, 1);
      }

      if (produtoIndex === -1) {
        console.log("tentando remover produto inexistente");
        return;
      }

      if (produtoIndex >= 0) {
        console.log("Diminuindo quantidade do produto:", produto);
        carrinho[produtoIndex].quantidade--;
        if(carrinho[produtoIndex].quantidade <= 0) {
          carrinho.splice(produtoIndex, 1);
        }
      }

      return {
        ...state,
        carrinho,
      }
    }
    case PedidosActionTypes.REMOVE_PRODUTO_CARRINHO: {
      const { produto } = action;
      const produtoIndex = carrinho.findIndex(p => p.id === produto.id);
      
      if (produtoIndex === -1) {
        console.log("tentando remover produto inexistente");
        return;
      }

      if (produtoIndex >= 0) {
        carrinho.splice(produtoIndex, 1);
      }

      return {
        ...state,
        carrinho,
      }
    }
    default:
      return state
  }
}
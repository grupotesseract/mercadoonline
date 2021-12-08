import {  PedidosActionTypes, INITIAL_STATE_PEDIDOS } from './types'

export function pedidosReducer(
  state = INITIAL_STATE_PEDIDOS,
  action
) {
  const carrinho = [ ...state.carrinho ];
  switch (action.type) {
    case PedidosActionTypes.ENVIA_PEDIDO: 
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          salvo: false,
          enviado: false,
        },
        error: null,
      };
    case PedidosActionTypes.PEDIDO_SALVO: {
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          salvo: true,
        },
      }
    }
    case PedidosActionTypes.PEDIDO_ENVIADO: {
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          enviado: true,
        },
      };
    }
    case PedidosActionTypes.PEDIDO_ERRO: {
      return {
        ...state,
        status: {
          ...state.status,
          salvo: false,
          loading: false,
          enviado: false,
        },
        error: action.payload,
      };
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
        status: {
          ...state.status,
          salvo: false,
          enviado: false,
        },
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

      if (produtoIndex === -1) {
        console.log("tentando remover produto inexistente");
        return;
      }

      if (produtoIndex >= 0) {
        console.log("Diminuindo quantidade do produto:", produto);
        carrinho[produtoIndex].quantidade--;
        if(carrinho[produtoIndex].quantidade <= 0) {
        console.log("removendo", produto);
          carrinho.splice(produtoIndex, 1);
        }
      }

      return {
        ...state,
        status: {
          ...state.status,
          salvo: false,
          enviado: false,
        },
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
        status: {
          ...state.status,
          salvo: false,
          enviado: false,
        },
        carrinho,
      }
    }
    default:
      return state
  }
}
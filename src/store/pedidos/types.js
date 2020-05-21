export const PedidosActionTypes = {
  ENVIA_PEDIDO: "pedidos/ENVIA_PEDIDO",
  PEDIDO_ENVIADO: "pedidos/PEDIDO_ENVIADO",
  PEDIDO_ERRO: "pedidos/PEDIDO_ERRO",
  ADD_PRODUTO_CARRINHO: "pedidos/ADD_PRODUTO_CARRINHO",
  DECREMENTA_PRODUTO_CARRINHO: "pedidos/DECREMENTA_PRODUTO_CARRINHO",
  REMOVE_PRODUTO_CARRINHO: "pedidos/REMOVE_PRODUTO_CARRINHO",
};

export const INITIAL_STATE_PEDIDOS = {
  carrinho: [],
  cliente: {
    nome: '',
    celular: '',
    endereco: '',
  },
  loading: false,
  error: null,
  pedidoEnviado: false,
};
export const ProdutosActionTypes = {
  REQUEST_UPDATE_PRODUTOS: "produtos/REQUEST_UPDATE_PRODUTOS",
  SET_PRODUTOS: "produtos/SET_PRODUTOS",
  SET_FILTRO: "produtos/SET_FILTRO",
};

export const INITIAL_STATE_PRODUTOS = {
  produtos: [],
  filtroProdutos: '',
  loading: false,
  error: null,
};
import { ProdutosActionTypes } from './types'

export const updateProdutos = () => ({
  type: ProdutosActionTypes.REQUEST_UPDATE_PRODUTOS,
});

export const setFiltroProdutos = ({ filtro }) => ({
  type: ProdutosActionTypes.SET_FILTRO,
  filtro,
});

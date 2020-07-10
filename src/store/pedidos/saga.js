import { put, call, take, fork, select } from 'redux-saga/effects';
import {  PedidosActionTypes } from './types'
import api from '../api';

const getCarrinho = state => state.pedidos?.carrinho;

function* salvaPedido({ nome, celular, endereco }) {
  try {
    const carrinho = yield select(getCarrinho);
    const produtos = carrinho.map(produto => ({
      produto_id: produto.id,
      quantidade: produto.quantidade,
     }));
    const pedidoEnviado = yield call(api.post, '/pedidos', {
      nome_cliente: nome,
      celular,
      endereco,
      produtos,
    })
    console.log('pedidoEnviado', pedidoEnviado);
    yield put({ type: PedidosActionTypes.PEDIDO_ENVIADO });
  } catch(error) {
    yield put({type: PedidosActionTypes.PEDIDO_ERRO, error})
  }
}

export function* pedidosWatcher() {
  const { nome, celular, endereco } = yield take(PedidosActionTypes.ENVIA_PEDIDO)
  console.log('pedido em nome de', nome)
  yield fork(salvaPedido, { nome, celular, endereco })
}
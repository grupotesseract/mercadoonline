import { put, call, take, fork } from 'redux-saga/effects';
import {  PedidosActionTypes } from './types'
import api from '../api';

function* enviaPedido(pedido) {
  try {
    const pedidoEnviado = yield call(api.post, '/pedido', pedido)
    console.log('pedidoEnviado', pedidoEnviado);
    yield put({ type: PedidosActionTypes.PEDIDO_ENVIADO });
  } catch(error) {
    yield put({type: PedidosActionTypes.PEDIDO_ERRO, error})
  }
}

export function* pedidosWatcher() {
  const { pedido } = yield take(PedidosActionTypes.ENVIA_PEDIDO)
  yield fork(enviaPedido, pedido)
}
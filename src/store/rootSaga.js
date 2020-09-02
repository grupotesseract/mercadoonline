import { all } from 'redux-saga/effects';
import { produtosWatcher } from './produtos/saga';
import { pedidosWatcher, whatsappWatcher } from './pedidos/saga';

export default function* rootSaga() {
  yield all([
    whatsappWatcher(),
    pedidosWatcher(),
    produtosWatcher()
  ]);
}
import { all } from 'redux-saga/effects';
import { produtosWatcher } from './produtos/saga';
import { pedidosWatcher } from './pedidos/saga';

export default function* rootSaga() {
  yield all([
    pedidosWatcher(),
    produtosWatcher()
  ]);
}
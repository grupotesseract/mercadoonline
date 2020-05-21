import { all } from 'redux-saga/effects';
import { produtosWatcher } from './produtos/saga';

export default function* rootSaga() {
  yield all([
    produtosWatcher()
  ]);
}
import { put, call, takeLatest } from 'redux-saga/effects';
import {  ProdutosActionTypes } from './types'
import api from '../api';

function* fetchProdutos() {
  const res = yield call(api.get, '/produtos')
  const produtos = res.data.data;
  yield put({ type: ProdutosActionTypes.SET_PRODUTOS, produtos });
}

export function* produtosWatcher() {
  yield takeLatest(ProdutosActionTypes.REQUEST_UPDATE_PRODUTOS, fetchProdutos)
}
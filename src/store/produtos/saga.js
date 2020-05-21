import { put, call, takeLatest } from 'redux-saga/effects';
import {  ProdutosActionTypes } from './types'
import api from '../api';

function* fetchProdutos() {
  const produtos = yield call(api.get, '/produtos')
  yield put({ type: ProdutosActionTypes.SET_PRODUTOS, produtos: produtos.articles });
}

export function* produtosWatcher() {
  yield takeLatest(ProdutosActionTypes.REQUEST_UPDATE_PRODUTOS, fetchProdutos)
}
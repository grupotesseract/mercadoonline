import { put, call, take, fork, select } from 'redux-saga/effects';
import {  PedidosActionTypes } from './types'
import api from '../api';

const getProdutos = state => {
  const { carrinho } = state.pedido;
  console.log('carrinho', carrinho);
  const produtos = carrinho.map(produto => ({
    produto_id: produto.id,
    quantidade: produto.quantidade,
    nome: produto.titulo,
  }));
  return produtos;
}

const enviaPedidoViaWhatsapp = ({ produtos }) => {
  const whatsappNumber = '5548984864947';
  let msgWhatsapp = "";
  msgWhatsapp +=
    "Pedido feito em " + new Date().toLocaleString("pt-BR") + "\n\n";
  msgWhatsapp += "Quantidade | Produto\n";
  msgWhatsapp += produtos
    .map((produto) => {
      return "qtd: " + produto.quantidade + " | " + produto.nome;
    })
    .join("\n");
  const url =
    "https://api.whatsapp.com/send?phone=" +
    whatsappNumber +
    "&text=" +
    encodeURIComponent(msgWhatsapp);
  window.open(url);
  return true;
};

function* salvaPedido({ nome, celular, endereco }) {
  try {
    const produtos = yield select(getProdutos);
    const pedidoSalvo = yield call(api.post, '/pedidos', {
      nome_cliente: nome,
      celular,
      endereco,
      produtos,
    })
    if (!pedidoSalvo) throw Error('erro ao salvar')
    yield put({ type: PedidosActionTypes.PEDIDO_SALVO });
    const pedidoEnviado = yield call(enviaPedidoViaWhatsapp, { produtos })
    if (!pedidoEnviado) throw Error('erro ao enviar')
    yield put({ type: PedidosActionTypes.PEDIDO_ENVIADO });
  } catch(error) {
    yield put({type: PedidosActionTypes.PEDIDO_ERRO, error})
  }
}

function* reenviaZap() {
  const produtos = yield select(getProdutos);
  const pedidoEnviado = yield call(enviaPedidoViaWhatsapp, { produtos })
  if (!pedidoEnviado) console.log("erro ao enviar");
  yield put({ type: PedidosActionTypes.PEDIDO_ENVIADO });
}

export function* whatsappWatcher() {
  yield take(PedidosActionTypes.ENVIA_ZAP)
  yield fork(reenviaZap)
}

export function* pedidosWatcher() {
  const { payload : { nome, celular, endereco }} = yield take(PedidosActionTypes.ENVIA_PEDIDO)
  yield fork(salvaPedido, { nome, celular, endereco })
}
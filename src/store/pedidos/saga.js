import { put, call, take, fork, select } from 'redux-saga/effects';
import {  PedidosActionTypes } from './types'
import api from '../api';

const getProdutos = state => {
  const { carrinho } = state.pedido;
  const produtos = carrinho.map(produto => ({
    produto_id: produto.id,
    quantidade: produto.quantidade,
    nome: produto.titulo,
  }));
  return produtos;
}

const enviaPedidoViaWhatsapp = ({ produtos }) => {
  const whatsappNumber = '5548988198215';
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
  const produtos= yield select(getProdutos);
  const produtosParaSalvar = produtos.map(produto => ({
    produto_id: produto.produto_id,
    quantidade: produto.quantidade,
  }));
  console.log('para salvar', produtosParaSalvar);
  try {
    const pedidoSalvo = yield call(api.post, '/pedidos', {
      nome_cliente: nome,
      celular,
      endereco,
      produtos: produtosParaSalvar,
    })
    if (pedidoSalvo) {
      yield put({ type: PedidosActionTypes.PEDIDO_SALVO });
    }
  } catch(error) {
    yield put({type: PedidosActionTypes.PEDIDO_ERRO, error})
  }
  try {
    const pedidoEnviado = yield call(enviaPedidoViaWhatsapp, { produtos })
    if (pedidoEnviado) {
      yield put({ type: PedidosActionTypes.PEDIDO_ENVIADO });
    }
  } catch(error) {
    yield put({type: PedidosActionTypes.PEDIDO_ERRO, error})
  }
}

function* reenviaMsgWhatsapp() {
  const produtos = yield select(getProdutos);
  const pedidoEnviado = yield call(enviaPedidoViaWhatsapp, { produtos })
  if (!pedidoEnviado) console.log("erro ao enviar");
  yield put({ type: PedidosActionTypes.PEDIDO_ENVIADO });
}

export function* whatsappWatcher() {
  yield take(PedidosActionTypes.ENVIA_MSG_WHATSAPP)
  yield fork(reenviaMsgWhatsapp)
}

export function* pedidosWatcher() {
  const { payload : { nome, celular, endereco }} = yield take(PedidosActionTypes.ENVIA_PEDIDO)
  yield fork(salvaPedido, { nome, celular, endereco })
}
import React, { Component } from 'react';
import Header from '../components/Header';
import Produto from '../components/Produto';
import CarrinhoContext from '../CarrinhoContext';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PedidosActions from "../store/pedidos/actions";
import { bindActionCreators } from 'redux';
import FinalizarCompra from '../components/FinalizarCompra';

class Carrinho extends Component {
  static contextType = CarrinhoContext

  handleFinalizarCompra() {
    const { produtos, whatsappNumber } = this.context;
    let msgWhatsapp = '';
    msgWhatsapp += 'Pedido feito em ' + new Date().toLocaleString('pt-BR') + '\n\n';
    msgWhatsapp += 'Quantidade | Produto\n'
    msgWhatsapp += produtos
    .map(produto => {
      return 'qtd: ' + produto.quantidade + ' | ' + produto.nome;
    })
    .join('\n');
    const url = 'https://api.whatsapp.com/send?phone='+whatsappNumber+'&text=' + encodeURIComponent(msgWhatsapp);
    window.open(url);
  }

  render() {
    const { 
      carrinho,
      addProdutoCarrinho,
      decrementaProdutoCarrinho,
      removeProdutoCarrinho
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Typography variant="h3" style={{ marginTop: 20 }}>
          Carrinho
        </Typography>
        <div style={{ padding: 10 }}>
          {carrinho.map((produto) => (
            <Produto
              carrinho={true}
              produto={produto}
              produtoCarrinho={carrinho.find((pc) => pc.id === produto.id)}
              key={produto.id}
              addProduto={addProdutoCarrinho}
              decrementaProduto={decrementaProdutoCarrinho}
              removeProduto={removeProdutoCarrinho}
            />
          ))}
          {carrinho.length <= 0 && (
            <div>
              <span>Você não tem produtos no carrinho.</span>
              <Link to="/" style={{ margin: 10 }}>
                <Button color="primary" variant="contained">
                  Ver mais produtos
                </Button>
              </Link>
            </div>
          )}
        </div>
        {carrinho.length > 0 && (
          <>
          <FinalizarCompra />
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { pedido } = state;
  return { 
    carrinho: [ ...pedido.carrinho ],
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PedidosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Carrinho);
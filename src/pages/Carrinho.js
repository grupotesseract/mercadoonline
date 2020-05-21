import React, { Component } from 'react';
import Header from '../components/Header';
import Produto from '../components/Produto';
import CarrinhoContext from '../CarrinhoContext';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PedidosActions from "../store/pedidos/actions";
import { bindActionCreators } from 'redux';

class Carrinho extends Component {
  static contextType = CarrinhoContext

  handleFinalizarCompra() {
    const { produtos, whatsappNumber } = this.context;
    console.log("produtos no carrinho", produtos);
    let msgWhatsapp = '';
    msgWhatsapp += 'Pedido feito em ' + new Date().toLocaleString('pt-BR') + '\n\n';
    msgWhatsapp += 'Quantidade | Produto\n'
    msgWhatsapp += produtos
    .map(produto => {
      return 'qtd: ' + produto.quantidade + ' | ' + produto.nome;
    })
    .join('\n');
    console.log('msg zap', msgWhatsapp);
    const url = 'https://api.whatsapp.com/send?phone='+whatsappNumber+'&text=' + encodeURIComponent(msgWhatsapp);
    console.log("url", url);
    window.open(url);
  }

  render() {

    const { produtos, addProduto, decrementaProduto, removeProduto } = this.context;
    const { pedido } = this.props;
    console.log("carrinho no redux", pedido);
    console.log("produtos no carrinho", produtos);

    return <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Typography variant="h3" style={{marginTop: 20}}>Carrinho</Typography>
      <div style={{ padding: 10 }}>
        {produtos.map(produto => <Produto
          carrinho={true}
          produto={produto}
          key={produto.id}
          addProduto={addProduto}
          decrementaProduto={decrementaProduto}
          removeProduto={removeProduto}
        />)}
        {
          produtos.length <= 0 &&
          <div>
            <span> Você não tem produtos no carrinho.</span>
            <Link to="/" style={{ margin: 10 }}>
              <Button
                color="primary"
                variant="contained"
              >
                Ver mais produtos
              </Button>
            </Link>
          </div>
        }
      </div>
      {
        produtos.length > 0 &&
        <Button
          color="secondary"
          variant="contained"
          onClick={() => this.handleFinalizarCompra()}
          style={{ marginTop: 5, marginBottom: 20, padding: 20, fontSize: 18, width: '100vw'  }}
        >
          Finalizar Compra
        </Button>
      }
    </div>
  }
}

function mapStateToProps(state) {
  const { pedido } = state;
  return { pedido };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PedidosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Carrinho);
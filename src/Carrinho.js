import React, { Component } from 'react';
import Header from './Header';
import Produto from './Produto';
import CarrinhoContext from './CarrinhoContext';
import { Button } from '@material-ui/core';

class Carrinho extends Component {
  static contextType = CarrinhoContext

  handleFinalizarCompra() {
    const { produtos } = this.context;
    console.log("produtos no carrinho", produtos);
    let msgWhatsapp = '';
    msgWhatsapp += 'Pedido feito em ' + new Date().toLocaleString('pt-BR') + '\n\n';
    msgWhatsapp += produtos
    .map(produto => {
      return 'Quantidade:' + produto.quantidade + ' Produto:' + produto.nome;
    })
    .join('\n');
    console.log('msg zap', msgWhatsapp);
    const url = 'https://web.whatsapp.com/send?phone=5548984864947&text=' + encodeURIComponent(msgWhatsapp);
    console.log("url", url);
    window.open(url);
  }

  render() {

    const { produtos, addProduto } = this.context;
    console.log("produtos no carrinho", produtos);

    return <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div style={{ padding: 10 }}>
        {produtos.map(produto => <Produto produto={produto} key={produto.id} addProduto={addProduto} />)}
      </div>
      <Button
        type="primary"
        onClick={() => this.handleFinalizarCompra()}
      >
        Finalizar Compra
      </Button>
    </div>
  }
}

export default Carrinho;
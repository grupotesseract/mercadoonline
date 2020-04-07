import React, { Component } from 'react';
import Header from './Header';
import Produto from './Produto';
import { listaProdutos } from './produtos';
import CarrinhoContext from './CarrinhoContext';
import { Button } from '@material-ui/core';

class Home extends Component {
  static contextType = CarrinhoContext

  render() {
    const { addProduto } = this.context;
    return <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div style={{ padding: 10 }}>
        {listaProdutos.map(produto => <Produto
          addProduto={addProduto}
          key={produto.id}
          produto={produto}
        />)}
      </div>
      <Button>
        Ver Carrinho
      </Button>
    </div>
  }
}

export default Home;
import React, { Component } from 'react';
import Header from './Header';
import Produto from './Produto';
import { listaProdutos } from './produtos';
import CarrinhoContext from './CarrinhoContext';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Home extends Component {
  static contextType = CarrinhoContext

  render() {
    const { addProduto, decrementaProduto, filtraProdutos } = this.context;
    return <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div style={{ padding: 10 }}>
        {filtraProdutos(listaProdutos).map(produto => <Produto
          addProduto={addProduto}
          key={produto.id}
          produto={produto}
          decrementaProduto={decrementaProduto}
        />)}
      </div>
      <Link to="/carrinho">
        <Button
          variant="contained"
          color="secondary"
          style={{margin: 10, marginBottom: 30}}
        >
          Ver Carrinho
        </Button>
      </Link>
    </div>
  }
}

export default Home;
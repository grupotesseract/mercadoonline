import React, { Component } from 'react'

const INITIAL_STATE = {
  produtos: [],
}

const CarrinhoContext = React.createContext()

class CarrinhoProvider extends Component {

  state = INITIAL_STATE;

  addProduto = produto => {
    const { produtos } = this.state;

    const produtoIndex = produtos.findIndex(p => p.id === produto.id);
    if (produtoIndex === -1) {
      console.log("Incluindo produto:", produto);
      produto.quantidade = 1;
      produtos.push(produto);
    }
    if (produtoIndex >= 0) {
      console.log("Aumentando quantidade no produto:", produto);
      produtos[produtoIndex].quantidade++;
    }
    this.setState(prevState => ({
      produtos,
    }))
  }

  render() {
    const { children } = this.props
    const { produtos } = this.state
    const { addProduto } = this

    return (
      <CarrinhoContext.Provider
        value={{
          produtos,
          addProduto,
        }}
      >
        {children}
      </CarrinhoContext.Provider>
    )
  }
}

export default CarrinhoContext;

export const CarrinhoConsumer = CarrinhoContext.Consumer;

export { CarrinhoProvider }
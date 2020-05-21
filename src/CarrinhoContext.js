import React, { Component } from 'react'

const INITIAL_STATE = {
  produtos: [],
  filtro: '',
  whatsappNumber: '554896232003',
}

const CarrinhoContext = React.createContext()

class CarrinhoProvider extends Component {

  state = INITIAL_STATE;

  setWhatsappNumber = whatsappNumber => {
    this.setState({
      whatsappNumber
    })
  }

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

  removeProduto = produto => {
    const { produtos } = this.state;

    const produtoIndex = produtos.findIndex(p => p.id === produto.id);
    if (produtoIndex === -1) {
      console.log("tentando remover produto inexistente");
      return;
    }
    if (produtoIndex >= 0) {
      produtos.splice(produtoIndex, 1);
    }
    this.setState(prevState => ({
      produtos,
    }))
  }

  decrementaProduto = produto => {
    const { produtos } = this.state;

    const produtoIndex = produtos.findIndex(p => p.id === produto.id);
    if (produtoIndex === -1) {
      console.log("tentando remover produto inexistente");
      return;
    }
    if (produtoIndex >= 0) {
      console.log("Diminuindo quantidade do produto:", produto);
      produtos[produtoIndex].quantidade--;
      if(produtos[produtoIndex].quantidade <= 0) {
        produtos.splice(produtoIndex, 1);
      }
    }
    this.setState(prevState => ({
      produtos,
    }))
  }

  setFiltro = filtro => {
    this.setState({
      filtro
    })
  }

  filtraProdutos = (produtos) => {
    const { filtro } = this.state;
    const produtosFiltrados = produtos.filter(produto =>
      produto.nome.toLowerCase().search(filtro.toLowerCase()) !== -1 ||
      produto.descricao.toLowerCase().search(filtro.toLowerCase()) !== -1
    )
    return produtosFiltrados;
  }

  render() {
    const { children } = this.props
    const { produtos, whatsappNumber } = this.state
    const {
      addProduto,
      removeProduto,
      decrementaProduto,
      setWhatsappNumber,
      setFiltro,
      filtraProdutos,
    } = this

    return (
      <CarrinhoContext.Provider
        value={{
          produtos,
          whatsappNumber,
          setWhatsappNumber,
          addProduto,
          decrementaProduto,
          removeProduto,
          setFiltro,
          filtraProdutos,
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
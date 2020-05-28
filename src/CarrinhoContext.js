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


  render() {
    const { children } = this.props
    const { whatsappNumber } = this.state
    const {
      setWhatsappNumber,
    } = this;

    return (
      <CarrinhoContext.Provider
        value={{
          whatsappNumber,
          setWhatsappNumber,
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
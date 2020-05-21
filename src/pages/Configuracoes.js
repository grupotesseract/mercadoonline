import React, { Component } from 'react';
import Header from '../components/Header';
import CarrinhoContext from '../CarrinhoContext';
import { TextField, Typography } from '@material-ui/core';

class Configuracoes extends Component {
  static contextType = CarrinhoContext

  handleWhatsappChange(value) {
    const { setWhatsappNumber } = this.context;

    setWhatsappNumber(value);
  }

  render() {

    const { whatsappNumber } = this.context;

    console.log(whatsappNumber);
    return <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div style={{ padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'stretch', alignItems: 'flex-start' }}>
        <Typography
          variant="h4"
          style={{marginBottom: 10}}
        >
          Configurações
        </Typography>
        <TextField
          label="Número do Whatsapp"
          id="whatsapp"
          value={whatsappNumber}
          style={{ width: '90%' }}
          onChange={e => this.handleWhatsappChange(e.target.value)}
        />
      </div>
    </div>
  }
}

export default Configuracoes;
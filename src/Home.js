import React, { Component } from 'react';
import Header from './Header';
import { Button, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Banner from './components/Banner';
import Produtos from './Produtos';

class Home extends Component {

  render() {
    return <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Container>
        <Banner />
        <Produtos />
      
        <Link to="/carrinho">
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: 10, marginBottom: 30 }}
          >
            Ver Carrinho
        </Button>
        </Link>
      </Container>
    </div>
  }
}

export default Home;
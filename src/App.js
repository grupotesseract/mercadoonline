import React from 'react';
import './App.css';
import Routes from "./routes";
import { CarrinhoProvider } from './CarrinhoContext';

function App() {
  return (
    <CarrinhoProvider>
      <Routes />
    </CarrinhoProvider>
  );
}

export default App;

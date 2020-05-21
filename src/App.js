import React from 'react';
import './App.css';
import Routes from "./routes";
import { CarrinhoProvider } from './CarrinhoContext';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <CarrinhoProvider>
        <Routes />
      </CarrinhoProvider>
    </Provider>
  );
}

export default App;

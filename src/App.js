import React from 'react';
import './App.css';
import Routes from "./routes";
import { CarrinhoProvider } from './CarrinhoContext';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store';

const store = createStore(rootReducer)

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

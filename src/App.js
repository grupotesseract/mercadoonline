import React from 'react';
import './App.css';
import Routes from "./routes";
import { CarrinhoProvider } from './CarrinhoContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CarrinhoProvider>
          <Routes />
        </CarrinhoProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

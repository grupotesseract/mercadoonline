import createSagaMiddleware from 'redux-saga';
import { produtosReducer } from './produtos/reducers'
import { combineReducers, applyMiddleware } from 'redux'
import { createStore } from 'redux';
import rootSaga from './rootSaga';
import { pedidosReducer } from './pedidos/reducers';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  produtos: produtosReducer,
  pedido: pedidosReducer,
})

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

export default store;
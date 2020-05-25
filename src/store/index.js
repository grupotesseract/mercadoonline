import createSagaMiddleware from 'redux-saga';
import { produtosReducer } from './produtos/reducers'
import { combineReducers, applyMiddleware, compose } from 'redux'
import { createStore } from 'redux';
import rootSaga from './rootSaga';
import { pedidosReducer } from './pedidos/reducers';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  produtos: produtosReducer,
  pedido: pedidosReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga);

export default store;
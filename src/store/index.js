import createSagaMiddleware from 'redux-saga';
import { produtosReducer } from './produtos/reducers'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, applyMiddleware, compose } from 'redux'
import { createStore } from 'redux';
import rootSaga from './rootSaga';
import { pedidosReducer } from './pedidos/reducers';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  produtos: produtosReducer,
  pedido: pedidosReducer,
})

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

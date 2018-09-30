import { createStore, applyMiddleware, compose } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import sagas from './sagas';

/*
const persistConfig = {
  key: 'root',
  storage,
}
*/
// const persistedReducer = persistReducer(persistConfig, createReducer());

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    //persistedReducer,
    createReducer(),
    initialState,
    compose(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  sagas.map(store.runSaga);
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
  // const persistor = persistStore(store);
  // return { store, persistor };
}

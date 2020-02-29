import { createStore, applyMiddleware, compose } from 'redux';

export default (reducers, middlewares) => {
  const composer = __DEV__
    ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
    : compose(applyMiddleware(...middlewares));

  return createStore(reducers, composer);
};

import { createStore, applyMiddleware, compose } from 'redux';

export default (reducers, middlewares) => {
  const composer =
    process.env.NODE_ENV === 'development'
      ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
      : compose(applyMiddleware(...middlewares));

  return createStore(reducers, composer);
};

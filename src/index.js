import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import App from './components/app';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(ReduxPromise));

ReactDom.render( <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));


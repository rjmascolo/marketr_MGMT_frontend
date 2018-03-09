import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose  } from 'redux';
import { rootReducer } from './reducers/combinedReducer'
import thunk from 'redux-thunk';

import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

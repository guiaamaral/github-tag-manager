import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import './index.css';
import 'fontsource-mulish';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

if (localStorage.getItem('@github-tag-manager/tags') === null) {
  localStorage.setItem('@github-tag-manager/tags', JSON.stringify(['Java','Javascript','Python','Typescript','Node','React','React Native', 'Vue','Django', 'Flask', 'Spring']));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
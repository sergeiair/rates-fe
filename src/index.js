import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {ToastContainer} from "react-toastify";
import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers";
import {logger} from "redux-logger";
import rootSaga from "./sagas/root";
import App from './App';
import * as serviceWorker from './serviceWorker';

import './scss/index.scss';

const createSagaMiddleware  = require("redux-saga").default;
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
});
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, logger)),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App store={store}/>
          <ToastContainer />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

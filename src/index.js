import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reducer from './store/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import mySaga from './middleware/mySaga';
import createSagaMiddleware from 'redux-saga';

//create Saga Middleware
const sagaMiddleware = createSagaMiddleware()
//mount it to your store
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
//run the Saga
sagaMiddleware.run(mySaga)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));



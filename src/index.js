import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux' 

import notesReducer from './reducers/notes-reducer';
import authReducer from './reducers/auth-reducer';

const reducer = combineReducers({  notes: notesReducer,  auth: authReducer})
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


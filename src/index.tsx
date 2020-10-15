import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import {reducer} from './reducers/reducer';
import {createGlobalStyle} from 'styled-components';

const middlewares = [thunk];

const store = createStore(reducer, applyMiddleware(...middlewares));
const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        width: 100vw;
        min-height: 100vh;
    }
    #root {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`;

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
          <GlobalStyle/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

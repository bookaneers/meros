// import dependencies and libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';

// import bootstrap as well as css documents to build frontend
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

// import component and library to support store
import { Provider } from 'react-redux'; // import Provider to work with the store
import { store } from './store' //import store to the index of the App and
// make it accessible (wrap) to all the components

// basic setup to create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router/>
  </Provider>
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyDHhwCoRqzrUfD99gXmZCUmXSI1sNOuk-0",
  authDomain: "may-shop.firebaseapp.com",
  databaseURL: "https://may-shop.firebaseio.com",
  projectId: "may-shop",
  storageBucket: "may-shop.appspot.com",
  messagingSenderId: "1076349410569",
  appId: "1:1076349410569:web:78cce878db584a90c4c7d8",
  measurementId: "G-DJ0CPHLSSE"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

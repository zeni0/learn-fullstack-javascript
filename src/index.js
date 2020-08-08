import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// 1: renders to the DOM
ReactDOM.render(
    <App init={window.initData} />,
    document.getElementById('root')
)
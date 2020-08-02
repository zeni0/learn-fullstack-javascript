import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


ReactDOM.render(
    <App init={window.initData} />,
    document.getElementById('root')
)
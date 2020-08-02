// pre-render api data
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';


const serverRender = () => {
    return axios.get(`${config.serverURL}/api/contests`)
    .then(res => {
        return {
            initData: res.data.contests,
            initMarkup: ReactDOMServer.renderToString(
                <App init={res.data.contests} />
            )
        }
    })
}


export default serverRender;
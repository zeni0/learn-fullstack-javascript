// pre-render api data
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

// first make a call to get the correct data from the server. Contests vs Contest.
const getApiUrl = contestId => {
    // single contest
    if (contestId) {
        return `${config.serverURL}/api/contests/${contestId}`
    }
    // multiple contests
    return `${config.serverURL}/api/contests`
}

const getInitData = (contestId, apiData) => {
    if (contestId) {
        // a single contest
        return {
            currentContestId: apiData.id,
            contests: {
                [apiData.id]: apiData
            }
        }
    }
    // all the contests
    return {
        contests: apiData.contests
    }
}

const serverRender = contestId => {
    return axios.get(getApiUrl(contestId))
    .then(res => {
        const initData = getInitData(contestId, res.data)
        return {
            initMarkup: ReactDOMServer.renderToString(
                <App init={initData} />
            ),
            initData
        }
    })
}


export default serverRender;
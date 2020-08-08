import axios from 'axios';

// call to api/index.js 
export const fetchContest = contestId => {
    return axios.get(`/api/contests/${contestId}`)
        .then(res => res.data)
        .catch(console.error)
}

export const fetchContestList = () => {
    return axios.get('/api/contests')
                .then(resp => resp.data.contests);
}

  export const fetchNames = nameIds => {
    return axios.get(`/api/names/${nameIds.join(',')}`)
        .then(res => res.data.names)
        .catch(console.error)
}
import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContestLists from './ContestLists';
import Contest from './Contest';
import PropTypes from 'prop-types';
import * as api from '../api';

const pushState = (obj, url) =>
    window.history.pushState(obj, '', url);

const onPopState = handler =>
    window.onpopstate = handler;

// 2: takes init obj
class App extends React.Component {
    static propTypes = {
        init: PropTypes.object.isRequired
    }
    // only put on the state what you can't compute 
    state = this.props.init
    componentDidMount() {
        // used for ajax, timer, listeners
        if(!this.props.init) {
            axios.get('/api/contests')
            .then(res => {
                this.setState({
                    contests: res.data.contests
                });
            })
            .catch(console.error)
        }
        // handle browser back forward buttons
        onPopState((event) => {
            console.log(event.state)
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            })
        })
         
    }
    componentWillUnmount() {
        // clean timers, listeners
        onPopState(null)
    } 
    fetchContest = (contestId) => {
        pushState(
            { currentContestId: contestId },
            `/contest/${contestId}`
        );
        // lookup contest on server
        api.fetchContest(contestId).then(contest => {
             this.setState({
                pageHeader: contest.contestName,
                currentContestId: contest.id,
                contests: {
                    ...this.state.contests,
                    [contest.id]: contest
                } 
            }); 
        })

    };
    fetchContestList = () => {
        pushState(
            { currentContestId: null },
            `/`
        );
        // lookup contest on server
        api.fetchContestList().then(contests => {
             this.setState({
                currentContestId: null,
                contests
            }); 
        })

    };
    fetchNames = (nameIds) => {
        if(nameIds.length === 0) return;
        api.fetchNames(nameIds).then( names => {
            this.setState({
                names
            })
        })
    }
    lookupNames = (nameId) => {
        if (!this.state.names || !this.state.names[nameId]) {
            return {
                name: '...'
            }
        }
        //console.log(this.state.names[nameId]);
        return this.state.names[nameId]
    }
    currentContest() {
        return this.state.contests[this.state.currentContestId]
    }
    currentContent() {
        if (this.state.currentContestId) {
            return <Contest 
            fetchNames={this.fetchNames}
            lookupNames={this.lookupNames}    
            contestListClick={this.fetchContestList}
                {...this.currentContest()} />
        }

        return <ContestLists 
        onContestClick={this.fetchContest}
        contests={this.state.contests} 
        />
    }
    pageHeader() {
        // removed from the state to be computed
        // less things in the state the better
        if (this.state.currentContestId) {
            return this.currentContest().contestName
        }

        return 'Naming Contests'
    }
    render() {
        return (
            <div>
                <Header message={this.pageHeader()} />
                {this.currentContent()}
            </div>
        ) 
    }
}

export default App
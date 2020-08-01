import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContestPreview from './ContestPreview';
//import data from '../testData';


class App extends React.Component {
    state = {
        pageHeader: 'Naming Contests',
        contests: []
    };
    componentDidMount() {
        // used for ajax, timer, listeners
        axios.get('/api/contests')
        .then(res => {
            this.setState({
                contests: res.data.contests
            });
        })
        .catch(console.error)
         
    }
    componentWillUnmount() {
        // clean timers, listeners
    }
    render() {
        return (
            <div>
                <Header message={this.state.pageHeader} />
                <div>Content</div>
                {this.state.contests.map(contest =>   
                    <ContestPreview key={contest.id} {...contest} />
                )}
            </div>
        ) 
    }
}

export default App
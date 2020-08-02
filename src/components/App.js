import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContestPreview from './ContestPreview';
import PropTypes from 'prop-types';


class App extends React.Component {
    state = {
        pageHeader: 'Naming Contests',
        contests: this.props.init,
    };
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
         
    }
    componentWillUnmount() {
        // clean timers, listeners
    }
    render() {
        return (
            <div>
                <Header message={this.state.pageHeader} />
                {this.state.contests.map(contest =>   
                    <ContestPreview key={contest.id} {...contest} />
                )}
            </div>
        ) 
    }
}

App.propTypes = {
    init: PropTypes.array,
  };

export default App
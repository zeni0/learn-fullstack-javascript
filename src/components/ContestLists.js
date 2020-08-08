import React from 'react';
import ContestPreview from './ContestPreview';
import PropTypes from 'prop-types';


const ContestLists = ({ contests, onContestClick }) => {
    return Object.keys(contests).map(contestId =>   
        <ContestPreview 
            key={contestId}
            onClick={onContestClick} 
            {...contests[contestId]} 
        />
    )
}

ContestLists.propTypes = {
    contests: PropTypes.object ,
    onContestClick: PropTypes.func.isRequired,
}
    
export default ContestLists;
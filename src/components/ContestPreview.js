import React from 'react';
import PropTypes from 'prop-types';


class ContestPreview extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.id)
        //console.log('click', this.props.categoryName)
    };
    render() {
        return (
            <div className="ContestPreview">
                <div className="category-name" onClick={this.handleClick}>
                    {this.props.categoryName}
                </div>
                <div className="contest-name">
                    {this.props.contestName}
                </div>
            </div>
        )
    }
}

ContestPreview.propTypes = {
    categoryName: PropTypes.string.isRequired,
    contestName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}


export default ContestPreview; 
import React from 'react';
import PropTypes from 'prop-types';


class Contest extends React.Component {
    componentDidMount() {
        // nameIds, just the number is sent through contest obj
        // we then want to retrieve details of the nameId with another query to the DB
        this.props.fetchNames(this.props.nameIds)
    }
    render() {
        return (
            <div className="Contest">
                <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Contest Description</h3>
                </div>
                <div className="panel-body">
                    <div className="contest-description">
                    {this.props.description}
                    </div>
                </div>
                </div>

                <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Proposed Names</h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {this.props.nameIds.map(nameId => {
                            return <li key={nameId} className="list-group-item">{this.props.lookupNames(nameId).name}</li>
                        })}
                    </ul>
                </div>
                </div>

                <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">Propose a New Name</h3>
                </div>
                <div className="panel-body">
                    <form>
                    <div className="input-group">
                        <input type="text" placeholder="New Name Here..." className="form-control" />
                        <span className="input-group-btn">
                        <button type="submit" className="btn btn-info">Sumbit</button>
                        </span>
                    </div>
                    </form>
                </div>
                </div>
                <button 
                    className="btn btn-success return"
                    onClick={this.props.contestListClick}>
                    Return
                </button>
            </div>
        )
    }
}

Contest.propTypes = {
    description: PropTypes.string.isRequired,
    contestListClick: PropTypes.func.isRequired,
    fetchNames: PropTypes.func.isRequired,
    nameIds: PropTypes.array.isRequired,
    lookupNames: PropTypes.func.isRequired 
}


export default Contest; 
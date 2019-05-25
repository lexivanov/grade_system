import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { gradeColors } from '../../../../../constants';
import { sort } from '../../../../../store/course';

import './left-side.scss';
import { SortButton } from '../sort-button';

class LeftSide extends Component {
    static propTypes = {
        users: PropTypes.array,
        grades: PropTypes.array,
        averages: PropTypes.object
    }

    render() {
        return (
            <div className='left-side'>
                <div className='fake-row'>
                    <div className="name-header">Student's name <SortButton sort={(direction) => this.props.sort('fullname', direction)} /></div>
                    <div className="average-header">Average <SortButton sort={(direction) => this.props.sort('average', direction)} /></div>
                </div>
                {this.props.users.map(user => {
                    const color = gradeColors[('' + Math.floor(user.average))];
                    return (
                        <div className='user-row' key={user.id}>
                            <div className='username-cell left-cell'>
                                <span className='username'>{user.fullname}</span>
                            </div>
                            <div className='average-cell left-cell' style={{ backgroundColor: color }}>
                                <span className='username'>{Math.round(user.average * 100) / 100 || ''}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}


export default connect(
    (state, ownProps) => ({
        users: state.courseReducer.currentCourseInfo.users && state.courseReducer.currentCourseInfo.users.filter(user => user.courseId === idResolver(window.location.pathname)),
        grades: state.courseReducer.currentCourseInfo.grades,
        ownProps
    }),
    dispatch => ({
        sort: (column, order) => dispatch(sort({ column, order }))
    })
)(LeftSide);

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
}

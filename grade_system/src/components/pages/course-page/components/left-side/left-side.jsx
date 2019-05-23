import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { gradeColors } from '../../../../../constants';
import { sort } from '../../../../../store/course';

import './left-side.scss';

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
                </div>
                {this.props.users.map(user => {
                    const grades = this.props.grades.filter(x => x.userId === user.id);
                    let average = undefined;
                    let color = undefined;
                    if (grades.length > 0) {
                        average = 0;
                        grades.forEach(item => {
                            average += item.value;
                        });
                        average /= grades.filter(x => !!x.value).length;
                        color = gradeColors[('' + Math.floor(average))];
                    }
                    return (
                        <div className='user-row' key={user.id}>
                            <div className='username-cell left-cell' onClick={() => this.props.sort('fullname', true)}>
                                <span className='username'>{user.fullname}</span>
                            </div>
                            <div className='average-cell left-cell' style={{ backgroundColor: color }}>
                                <span className='username'>{Math.round(average * 100) / 100 || ''}</span>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSide, MiddlePart, RightSide } from './components';
import { fetchCourseInfo } from '../../../store/course';

import './course-page.scss';
class CoursePage extends Component {

    flag = true;
    componentDidMount() {
        this.props.getInfo(idResolver(window.location.pathname));
    }

    render() {
        return this.props.users ? (
            <div className='course-wrapper'>
                <LeftSide
                    grades={this.props.grades}
                    users={this.props.users.filter(user => user.courseId === idResolver(window.location.pathname))}
                />
                <MiddlePart
                    tasks={this.props.tasks}
                    grades={this.props.grades}
                    users={this.props.users.filter(user => user.courseId === idResolver(window.location.pathname))} />
                <RightSide users={this.props.users.filter(user => user.courseId === idResolver(window.location.pathname))}
                />
            </div>
        ) : <div className='course-wrapper' />;
    }
}

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
}

export default connect(
    (state, ownProps) => ({
        users: state.courseReducer.currentCourseInfo.users,
        tasks: state.courseReducer.currentCourseInfo.tasks,
        grades: state.courseReducer.currentCourseInfo.grades,
        ownProps
    }),
    dispatch => ({
        getInfo: (id) => dispatch(fetchCourseInfo(id)),
    })
)(CoursePage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSide, MiddlePart, RightSide } from './components';
import { fetchCourseTasks } from '../../../store/course';

import './course-page.scss';
import { fetchUserGrades } from '../../../store/user/actions/user-actions';

class CoursePage extends Component {

    flag = true;
    componentDidMount() {
        this.props.getTasks(idResolver(window.location.pathname));
    }

    componentDidUpdate() {
        if(this.flag && this.props.users){
            this.flag = false;
            const users = this.props.users.filter(user => user.courseId === idResolver(window.location.pathname));
            users.forEach(user => {
                this.props.getGrades(user.id);
            })
        }
    }

    render() {
        return (
            <div className='course-wrapper'>
                <LeftSide users={this.props.users.filter(user => user.courseId === idResolver(window.location.pathname))}
                />
                <MiddlePart
                    tasks={this.props.tasks}
                    grades={this.props.grades}
                    users={this.props.users.filter(user => user.courseId === idResolver(window.location.pathname))} />
                <RightSide users={this.props.users.filter(user => user.courseId === idResolver(window.location.pathname))}
                />
            </div>
        );
    }
}

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
}

export default connect(
    (state, ownProps) => ({
        users: state.userReducer.userList,
        tasks: state.courseReducer.currentTasks,
        grades: state.userReducer.currentGrades,
        ownProps
    }),
    dispatch => ({
        getTasks: (id) => dispatch(fetchCourseTasks(id)),
        getGrades: (id) => dispatch(fetchUserGrades(id)),
    })
)(CoursePage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSide, MiddlePart, RightSide } from './components';
import { fetchCourseInfo, setGrade, addNewUser } from '../../../store/course';

import './course-page.scss';

class CoursePage extends Component {
    flag = true;

    constructor() {
        super();
        this.id = idResolver(window.location.pathname);
        this.state = { userName: '' };
    }
    async componentDidMount() {
        await this.props.getInfo(idResolver(window.location.pathname));
    }

    onChangeGrade = async (userId, taskId, value) => {
        if (!value) { return };
        await this.props.setGrade(userId, taskId, value);
    }

    onAddNewUser = async () => {
        const fullname = this.state.userName;
        if (!fullname) {
            return;
        }

        await this.props.addNewUser(fullname, this.id);
        this.setState({ userName: '' });
    }

    render() {
        return this.props.users ? (
            <div className='course-page-wrapper'>
                <div className='course-wrapper'>
                    <LeftSide />
                    <MiddlePart
                        onChangeGrade={this.onChangeGrade}
                        tasks={this.props.tasks}
                        grades={this.props.grades}
                        users={this.props.users.filter(user => user.courseId === this.id)} />
                    <RightSide users={this.props.users.filter(user => user.courseId === this.id)}
                    />
                </div>
                <div>
                    <input value={this.state.userName} onChange={(evt) => this.setState({ userName: evt.target.value })} className="add-user-input" type="text" />
                    <button className="add-user-button" onClick={this.onAddNewUser} disabled={!this.state.userName}>Add user</button>
                </div>
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
        setGrade: (userId, taskId, value) => dispatch(setGrade(userId, taskId, value)),
        addNewUser: (fullname, courseId) => dispatch(addNewUser({ fullname, courseId }))
    })
)(CoursePage);

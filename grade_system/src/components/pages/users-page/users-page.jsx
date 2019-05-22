import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchUsersList, deleteUser, addEditUser } from '../../../store/user';
import { showModal } from '../../../store/modal';

import { fetchCourseList } from '../../../store/course';
import { avoidUnauthorized, inPermissionBase } from '../../../services';
import { DropDownInput, TextInput, ApprovementForm } from '../../../components';

import './users-page.scss';

const roles = [{
    name: "Admin",
    value: "admin"
}, {
    name: "Student",
    value: "student"
}, {
    name: "Teacher",
    value: "teacher"
},];

class UsersPage extends Component {

    state = { filter: '' };

    componentDidMount() {
        this.props.getUsers();
        this.props.getCourses();
    }

    onChangeUserRole = async (user, value) => {
        const newUser = { ...user, role: value };
        await this.props.editUser(newUser);
    }

    getCourseName = (user) => {
        const course = this.props.courses.find(x => x.id === user.courseId);
        return course ? <div className='course-container'>Course: {course.name}</div> : null;
    }

    onDelete = (user) => {
        this.props.showModal(
            <ApprovementForm
                text={`Are you sure you want to delete ${user.fullname}?`}
                onApprove={() => this.props.deleteUser(user.id)}
            />
        );
    }

    render() {
        const inPermission = inPermissionBase(this.props.authUser);
        const filtredUsers = this.props.users && this.props.users.filter(x => x.fullname.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
        return avoidUnauthorized() || (
            <div className='users-page-wrapper'>
                <div className="filter-panel">
                    <TextInput
                        className='filter'
                        placeholder='Users filter...'
                        value={this.state.filter}
                        onChange={filter => this.setState({ filter })}
                    />
                </div>
                {this.props.courses && filtredUsers && filtredUsers.length
                    ? filtredUsers.map(user => (
                        <div key={user.id} className='link-wrapper'>
                            <div className='username-container'>
                                <Link to={`/user/${user.id}`} className='user-link'>{user.fullname}</Link>
                                {this.getCourseName(user)}
                            </div>
                            <div className='role-container'>
                                <DropDownInput
                                    className='role-dropdown'
                                    value={roles.find(x => x.value === user.role)}
                                    onChange={value => this.onChangeUserRole(user, value.value)}
                                    items={roles}
                                    disabled={!inPermission('admin')}
                                />
                            </div>
                            {inPermission('admin') && <div className='delete-button-container'>
                                <button className='delete-button' onClick={() => this.onDelete(user)}>X</button>
                            </div>}
                        </div>
                    ))
                    : <div>No users found...</div>}
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        users: state.userReducer.userList,
        courses: state.courseReducer.courses,
        authUser: state.authReducer.user,
        ownProps
    }),
    dispatch => ({
        getUsers: () => dispatch(fetchUsersList()),
        getCourses: () => dispatch(fetchCourseList()),
        editUser: (user) => dispatch(addEditUser(user)),
        deleteUser: (id) => dispatch(deleteUser(id)),
        showModal: (content) => dispatch(showModal(content)),
    })
)(UsersPage));

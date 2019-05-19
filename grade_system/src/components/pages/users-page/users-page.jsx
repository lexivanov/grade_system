import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchUsersList, deleteUser } from '../../../store/user';
import { avoidUnauthorized, inPermissionBase } from '../../../services';

import './users-page.scss';

class UsersPage extends Component {
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const inPermission = inPermissionBase(this.props.authUser);
        return avoidUnauthorized() || (
            <div className='users-page-wrapper'>
                {this.props.users.map(user => (
                    <div key={user.id} className='link-wrapper'>
                        <div className='username-container'>
                            <Link to={`/user/${user.id}`} className='user-link'>{user.fullname}</Link>
                        </div>
                        {inPermission('admin') && <div className='delete-button-container'>
                            <button className='delete-button' onClick={() => this.props.deleteUser(user.id)}>X</button>
                        </div>}
                    </div>
                ))}
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        users: state.userReducer.userList,
        authUser: state.authReducer.user,
        ownProps
    }),
    dispatch => ({
        getUsers: () => dispatch(fetchUsersList()),
        deleteUser: (id) => dispatch(deleteUser(id)),
    })
)(UsersPage));

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { fetchUsersList } from '../../store/user/actions';
import { Modal } from '../containers';

import './app.scss';

class App extends Component {
    static propTypes = {
        children: PropTypes.object,
        getUsers: PropTypes.func
    }

    state = {
        userMenuOpened: false
    }

    componentDidMount() {
        this.props.getUsers();
    }

    onUserButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState(prev => ({ userMenuOpened: !prev.userMenuOpened }));
    }

    renderLoginLinks = () => {
        return (
            <>
                <Link to={`/login`} className='user-menu-link' onClick={() => this.setState({ userMenuOpened: false })}>Sign in</Link>
                <Link to={`/register`} className='user-menu-link' onClick={() => this.setState({ userMenuOpened: false })}>Sign up</Link>
            </>
        );
    }
    
    renderLogoutLinks = () => {
        return (
            <>
                <Link to={`/user/${this.props.user.id}`} className='user-menu-link' onClick={() => this.setState({ userMenuOpened: false })}>My account</Link>
                <Link to={`/logout`} className='user-menu-link' onClick={() => this.setState({ userMenuOpened: false })}>Log out</Link>
            </>
        );
    }

    render() {
        console.log(this.props.user);
        return (
            <div className='app'>
                <div className='app-header'>
                    <div className='app-header-content'>
                        <nav className='app-nav'>
                            <Link to={`/main`} className='header-link'>Courses</Link>
                            <Link to={`/users`} className='header-link'>Users</Link>
                            <Link to={`/tasks`} className='header-link'>Tasks</Link>
                        </nav>
                        <div className='user-menu'>
                            <div className='user-button' onClick={this.onUserButtonClick}>
                                {this.props.user ? this.props.user.fullname : "User Menu"}
                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                            </div>
                            {this.state.userMenuOpened === true && <div className='fake-dropdown'>
                                {this.props.user ? this.renderLogoutLinks() : this.renderLoginLinks() }
                            </div>}
                        </div>
                    </div>
                </div>
                <div className='body-container'>
                    {this.props.children}
                </div>
                <Modal>
                    {this.props.modalContent}
                </Modal>
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownprops) => ({
        store: state,
        modalContent: state.modalReducer.content,
        user: state.authReducer.user,
        ...ownprops
    }),
    dispatch => ({
        getUsers: () => dispatch(fetchUsersList())
    })
)(App));

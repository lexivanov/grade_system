import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { fetchUsersList } from '../../store/user/actions'

import './app.scss';

class App extends Component {
    static propTypes = {
        children: PropTypes.object,
        getUsers: PropTypes.func
    }

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return (
            <div className='app'>
                <div className='app-header'>
                    <div className='app-header-content'>
                        <nav className='app-nav'>
                            <Link to={`/main`} className='header-link'>Courses</Link>
                            <Link to={`/users`} className='header-link'>Users</Link>
                        </nav>
                        <div className='user-menu'>
                            <div className='user-button'>
                                Current User
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(connect(
    state => ({
        store: state
    }),
    dispatch => ({
        getUsers: () => dispatch(fetchUsersList()),
    })
)(App));

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

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
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        getUsers: () => dispatch(fetchUsersList()),
    })
)(App);

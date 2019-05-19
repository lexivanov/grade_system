import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { Cookie } from '../../../services';

import './lobby-page.scss';

class LobbyPage extends Component {
    render() {
        const userId = Cookie.getCookie('userId');
        if (userId) return <Redirect to={'/main'}/>;

        return (
            <div className='lobby-wrapper'>
                <p>Welcome to EPAM students grade system!</p>
                <p className="margin">Please, sign in or sign up.</p>
                <Link className="lobby-link" to={`/login`}>Sign in</Link>
                <Link className="lobby-link" to={`/register`}>Sign up</Link>
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        ...ownProps
    }),
)(LobbyPage));

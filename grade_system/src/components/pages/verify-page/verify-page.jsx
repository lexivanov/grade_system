import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import './verify-page.scss';
import { AuthController } from '../../../services';

class VerifyPage extends Component {
    state = { verified: false, error: undefined };
    async componentDidMount() {
        try {
            await AuthController.verify(idResolver(window.location.pathname));
            this.setState({ verified: true });
        } catch (err) {
            this.setState({ error: err });
        }
    }
    render() {
        return this.state.verified ? (
            <div className='verify-wrapper'>
                <p>Your account was successfuly activated! now you can <Link className="link" to={`/login`}>sign in</Link>.</p>
            </div>
        ) : <div className='verify-wrapper'>
                <p>{this.state.error}</p>
            </div>;
    }
}

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
}


export default withRouter(connect(
    (state, ownProps) => ({
        ...ownProps
    }),
)(VerifyPage));

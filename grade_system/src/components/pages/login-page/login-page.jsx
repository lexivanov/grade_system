import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './login-page.scss';
import { TextInput } from '../../inputs';

class LoginPage extends Component {

    state = {
        name: null,
        password: null,
        passwordRepeat: null,
        email: null
    }

    render() {
        return (
            <div className='login-wrapper'>
                <form action="" method="post" className="login-form">
                    <div className="inputs">
                        {this.props.isRegister && <label className="login-label name">
                            <span>Name: </span>
                            <TextInput
                                className="login-input name"
                                value={this.state.login}
                            />
                        </label>}
                        <label className="login-label email">
                            <span>Email: </span>
                            <TextInput
                                className="login-input email"
                                value={this.state.email}
                            />
                        </label>
                        <label className="login-label password">
                            <span>Password: </span>
                            <TextInput
                                className="login-input password"
                                value={this.state.password}
                            />
                        </label>
                        {this.props.isRegister && <label className="login-label password repeat">
                            <span>Repeat password: </span>
                            <TextInput
                                className="login-input password repeat"
                                value={this.state.passwordRepeat}
                            />
                        </label>}
                    </div>
                    <div className="controls">
                        <button type="submit" className="submit-button">{this.props.isRegister ? "Register" : "LogIn"}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        courses: state.courseReducer.courses,
        ownProps
    }),
    dispatch => ({
    })
)(LoginPage));

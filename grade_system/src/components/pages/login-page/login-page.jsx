import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';

import './login-page.scss';
import { TextInput } from '../../inputs';
import { AuthController } from '../../../services/api-controllers/auth-controller';
import { login } from '../../../store/auth/actions';
import { Cookie } from '../../../services/cookie-service';

class LoginPage extends Component {

    state = {
        isRegister: this.props.isRegister,
        response: undefined,
        name: undefined,
        password: undefined,
        passwordRepeat: undefined,
        email: undefined,
        errors: {},
        redirect: undefined,
        registred: undefined,
    }

    componentDidUpdate = () => {
        if (this.props.isRegister !== this.state.isRegister) {
            this.setState({
                isRegister: this.props.isRegister,
                response: undefined,
                name: '',
                password: '',
                passwordRepeat: '',
                email: '',
                errors: {}
            });
        }

        return true;
    }

    onChange = (column, validate) => (value) => {
        const message = validate(value);

        if (message) {
            this.setState(prev => ({ errors: { ...prev.errors, [column]: message } }));
        } else {
            this.setState(prev => ({ [column]: value, errors: { ...prev.errors, [column]: undefined } }));
        }
    }

    onBlur = (column, validate) => (value) => {
        const message = validate(value);

        if (message) {
            this.setState(prev => ({ errors: { ...prev.errors, [column]: message } }));
        } else {
            this.setState(prev => ({ errors: { ...prev.errors, [column]: undefined } }));
        }
    }

    maxLength = (value) => {
        if (value.length > 255) {
            return "Max length of this input is 255 symbols";
        }

        return null;
    }

    blurName = (value) => {
        if (!value) {
            return "Name is required";
        }

        return null;
    }

    blurEmail = (value) => {
        if (!this.props.isRegister) return null;

        if (!value) {
            return "Email is required";
        }

        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(value) === false) {
            return "Invalid formatting";
        }

        return null;
    }

    blurPassword = (value) => {
        if (!this.props.isRegister) return null;

        if (!value) {
            return "Password is required";
        }

        if ((this.state.password || this.state.passwordRepeat) && this.state.password !== this.state.passwordRepeat) {
            return "Passwords don't match"
        }

        if (this.state.password === this.state.passwordRepeat) {
            this.setState(prev => ({ errors: { ...prev.errors, passwordRepeat: undefined } }));
            return null;
        }

        return null;
    }


    blurRepeatPassword = (value) => {
        if (!value) {
            return "Please repeat password";
        }

        if ((this.state.password || this.state.passwordRepeat) && this.state.password !== this.state.passwordRepeat) {
            return "Passwords don't match"
        }

        if (this.state.password === this.state.passwordRepeat) {
            this.setState(prev => ({ errors: { ...prev.errors, password: undefined } }));
            return null;
        }

        return null;
    }

    hasErrors() {
        return Object.keys(this.state.errors).some(x => !!this.state.errors[x]);
    }

    onSubmitRegister = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const body = { email: this.state.email, fullname: this.state.name, password: this.state.password };
        try {
            await AuthController.register(body);
            this.setState({ registred: "We have send an email to your address to verify. Please check it before" });
        } catch (e) {
            this.setState({ response: e });
        }
    }

    onSubmitLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const body = { email: this.state.email, password: this.state.password };
        await this.props.login(body);
    }

    render() {
        const user = Cookie.getCookie('userId');
        if (user && !this.props.error) return <Redirect to={'/main'} />;
        return (
            <Fragment>
                <div className='login-wrapper'>
                    {!this.state.registred
                        ? <>
                            <form className="login-form" onSubmit={this.props.isRegister ? this.onSubmitRegister : this.onSubmitLogin}>
                                <div className="inputs">
                                    {this.props.isRegister && <div className={`block-wrapper ${this.state.errors.name ? "danger" : ""}`}>
                                        <label className="login-label name">
                                            <span>Name: </span>
                                            <TextInput
                                                className="login-input name"
                                                value={this.state.name}
                                                onChange={this.onChange("name", this.maxLength)}
                                                onBlur={this.onBlur("name", this.blurName)}
                                            />
                                        </label>
                                        {this.state.errors.name && <div className="validation-message">{this.state.errors.name}</div>}
                                    </div>}
                                    <div className={`block-wrapper ${this.state.errors.email ? "danger" : ""}`}>
                                        <label className="login-label email">
                                            <span>Email: </span>
                                            <TextInput
                                                className="login-input email"
                                                value={this.state.email}
                                                onChange={this.onChange("email", this.maxLength)}
                                                onBlur={this.onBlur("email", this.blurEmail)}
                                            />
                                        </label>
                                        {this.state.errors.email && <div className="validation-message">{this.state.errors.email}</div>}
                                    </div>
                                    <div className={`block-wrapper ${this.state.errors.password ? "danger" : ""}`}>
                                        <label className="login-label password">
                                            <span>Password: </span>
                                            <TextInput
                                                type="password"
                                                className="login-input password"
                                                value={this.state.password}
                                                onChange={this.onChange("password", this.maxLength)}
                                                onBlur={this.onBlur("password", this.blurPassword)}
                                            />
                                        </label>
                                        {this.state.errors.password && <div className="validation-message">{this.state.errors.password}</div>}
                                    </div>
                                    {this.props.isRegister && <div className={`block-wrapper ${this.state.errors.passwordRepeat ? "danger" : ""}`}>
                                        <label className="login-label password repeat">
                                            <span>Repeat password: </span>
                                            <TextInput
                                                type="password"
                                                className="login-input password passwordRepeat"
                                                value={this.state.passwordRepeat}
                                                onChange={this.onChange("passwordRepeat", this.maxLength)}
                                                onBlur={this.onBlur("passwordRepeat", this.blurRepeatPassword)}
                                            />
                                        </label>
                                        {this.state.errors.passwordRepeat && <div className="validation-message">{this.state.errors.passwordRepeat}</div>}
                                    </div>
                                    }
                                </div>
                                <div className="controls">
                                    <button type="submit" className="submit-button" disabled={this.hasErrors()}>{this.props.isRegister ? "Register" : "LogIn"}</button>
                                </div>
                            </form>
                            {this.props.error && <p className="info-msg">
                                {this.props.error}
                            </p>}
                        </>
                        : <p className="info-msg">
                            {this.state.registred} <Link to='/login' className="link" onClick={() => this.setState({ registred: undefined })}>log in</Link>.
                        </p>}
                </div>
            </Fragment>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        courses: state.courseReducer.courses,
        user: state.authReducer.user,
        error: state.authReducer.error,
        ownProps
    }),
    dispatch => ({
        login: async (user) => await dispatch(login(user))
    })
)(LoginPage));

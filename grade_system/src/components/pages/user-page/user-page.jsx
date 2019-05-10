import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadUser, addEditUser } from '../../../store/user';
import { TextInput, Textarea } from '../..';

import './user-page.scss';
import { ButtonWithText } from '../../buttons';
import { AssignBoard } from './components';

class UserPage extends Component {
    static propTypes = {
        user: PropTypes.object,
        getUser: PropTypes.func
    }

    constructor() {
        super();
        this.id = idResolver(window.location.pathname);
        this.state = {
            user: {},
            editMode: false
        };
    }

    async componentDidMount() {
        await this.props.getUser(this.id);
    }

    onChangeInput = (propName) => (value) => {
        this.setState(prev => ({ user: { ...prev.user, [propName]: value } }));
    }

    componentWillReceiveProps() {
        this.setState({ user: this.props.user });
    }

    onApply = async () => {
        try {
            await this.props.editUser({ ...this.state.user });
            this.setState({ editMode: false });
        } catch {
            console.log('Vse poshlo po pizde, traini eshe');
        }
    }

    onCancel = () => {
        this.setState({ editMode: false, user: this.props.user });
    }

    onEdit = () => {
        this.setState({ editMode: true, user: this.props.user });
    }

    render() {
        return (
            <div className='user-page'>
                <div className='controls'>
                    {this.state.editMode
                        ? <Fragment>
                            <ButtonWithText
                                type='button'
                                className='cancel-button btn'
                                text='CANCEL'
                                onClick={this.onCancel}
                            /> <ButtonWithText
                                type='button'
                                className='apply-button btn'
                                text='APPLY'
                                onClick={this.onApply}
                            />
                        </Fragment>
                        : <ButtonWithText
                            type='button'
                            className='edit-button btn'
                            text='EDIT'
                            onClick={this.onEdit}
                        />}
                </div>
                <AssignBoard />
                <div className='user-info-wrapper'>
                    <div className='user-wrapper name'>
                        {this.state.editMode
                            ? <TextInput
                                className='user-input name'
                                value={this.state.user.fullname}
                                onChange={this.onChangeInput('fullname')}
                            />
                            : <div className='user-name-text'>{this.props.user.fullname || ''}</div>}
                    </div>
                    <div className='user-wrapper comment'>
                        <Textarea
                            className='user-input comment'
                            value={this.state.editMode ? this.state.user.comment : this.props.user.comment}
                            onChange={this.onChangeInput('comment')}
                            disabled={!this.state.editMode}
                        />
                    </div>
                    {/* <div className='user-wrapper link'>
                        {this.state.editMode
                            ? <TextInput
                                className='user-input link'
                                value={this.state.user.filePath}
                                onChange={this.onChangeInput('filePath')}
                            />
                            : this.state.user.filePath ? <a className='user-text' href={this.props.user.filePath}>Attachments</a> : null}
                    </div> */}
                </div>
            </div>);
    }
}

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
}

export default withRouter(connect(
    (state, ownProps) => ({
        user: state.userReducer.user,
        ownProps
    }),
    dispatch => ({
        getUser: async (id) => await dispatch(loadUser(id)),
        editUser: async (id) => await dispatch(addEditUser(id))
    })
)(UserPage));

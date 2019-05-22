import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hideModal } from '../../../store/modal';
import { connect } from 'react-redux';

import './ApprovementForm.scss';

class ApprovementForm extends Component {
    static propTypes = {
        onApprove: PropTypes.func,
        text: PropTypes.string
    }

    state = {
        task: {
            name: '',
            description: ''
        }
    }

    render() {
        return (
            <div className='approove-form'>
                <div className='approove-text'>{this.props.text}</div>
                <div className='approove-controlls'>
                    <button
                        className='approove-submit'
                        onClick={this.onApprove} >
                        Yes
                    </button>
                    <button
                        className='approove-decline'
                        onClick={this.onDecline} >
                        No
                    </button>
                </div>
            </div>
        );
    }

    onChangeName = (value) => {
        this.setState(prev => ({ task: { ...prev.task, name: value } }));
    }

    onChangeDesc = (value) => {
        this.setState(prev => ({ task: { ...prev.task, description: value } }));
    }

    onApprove = async () => {
        await this.props.onApprove && this.props.onApprove();
        this.props.closeModal();
    }

    onDecline = async () => {
        await this.props.closeModal();
    }

}

export default connect(
    (state, ownProps) => ({
        ownProps
    }),
    dispatch => ({
        closeModal: () => dispatch(hideModal())
    })
)(ApprovementForm);
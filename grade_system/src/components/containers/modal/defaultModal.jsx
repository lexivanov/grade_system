import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../store/modal';

import './defaultModal.scss';

class DefaultModal extends React.Component {
    render() {
        return this.props.children
            ? (
                <Fragment>
                    <div className='modal-layout' />
                    <div className='modal-container'>
                        <div className='modal-header'>
                            <button
                                className='close-icon'
                                onClick={() => this.props.hide()}>X</button>
                        </div>
                        <div className='modal-body'>
                            {this.props.children}
                        </div>
                    </div>
                </Fragment>
            )
            : null;
    }
}

export default connect(
    (state, ownProps) => ({
        ownProps
    }),
    dispatch => ({
        hide: () => dispatch(hideModal()),
    })
)(DefaultModal);

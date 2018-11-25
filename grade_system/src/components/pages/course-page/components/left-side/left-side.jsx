import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import './left-side.scss';

export class LeftSide extends Component {
    static propTypes = {
        users: PropTypes.array,
    }
    render() {
        return (
            <div className='left-side'>
                <div className='fake-row'>
                </div>
                {this.props.users.map(user => (
                    <div className='user-row' key={user.id}>
                        <div className='username-cell left-cell'>
                            <span className='username'>{user.fullname}</span>
                        </div>
                        <div className='average-cell left-cell'>
                            <span className='username'>{user.average || ''}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

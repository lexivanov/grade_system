import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import './right-side.scss';

export class RightSide extends Component {
    static propTypes = {
        users: PropTypes.array,
    }
    render() {
        return (
            <div className='right-side'>
                <div className='right-header-row'>
                    <div className='status-header right-cell'>Status</div>
                    <div className='project-header right-cell'>Project</div>
                    <div className='comment-header right-cell'>Comment</div>
                </div>
                {this.props.users.map(user =>
                    (<div className='right-user-row' key={user.id}>
                        <div className='user-status right-cell'>{user.statusId || ''}</div>
                        <div className='user-project right-cell'>{user.project || ''}</div>
                        <div className='user-comment right-cell'>{user.comment || ''}</div>
                    </div>))}
            </div>
        );
    }
}

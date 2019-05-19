import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { DropDownCell } from '../drop-down-cell';
import { TextCell } from '../text-cell';

import './right-side.scss';

export class RightSide extends Component {
    static propTypes = {
        users: PropTypes.array,
        statuses: PropTypes.array,
        onChangeStatus: PropTypes.func,
        onChangeProject: PropTypes.func,
        onChangeComment: PropTypes.func,
        canEdit: PropTypes.bool,
    }

    state = { selectedStatuses: {} }


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
                        <DropDownCell
                            canEdit={this.props.canEdit}
                            className='user-status right-cell'
                            user={user}
                            value={user.statusId ? this.props.statuses.find(x => x.id === user.statusId) : null}
                            onChange={this.props.onChangeStatus}
                            items={this.props.statuses} />
                        <TextCell
                            canEdit={this.props.canEdit}
                            className='user-project right-cell'
                            value={user.project || ''}
                            onChange={(value) => this.props.onChangeProject(user.id, value)} />
                        <TextCell
                            canEdit={this.props.canEdit}
                            className='user-comment right-cell'
                            value={user.comment || ''}
                            onChange={(value) => this.props.onChangeComment(user.id, value)} />
                    </div>))}
            </div>
        );
    }
}

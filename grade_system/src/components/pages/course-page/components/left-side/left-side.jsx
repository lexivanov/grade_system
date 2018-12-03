import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { gradeColors } from '../../../../../constants';

import './left-side.scss';

export class LeftSide extends Component {
    static propTypes = {
        users: PropTypes.array,
        grades: PropTypes.array,
    }
    render() {

        return (
            <div className='left-side'>
                <div className='fake-row'>
                </div>
                {this.props.users.map(user => {
                    const grades = this.props.grades.filter(x => x.userId === user.id);
                    let average = undefined;
                    let color = undefined;
                    if (grades.length > 0) {
                        average = 0;
                        grades.forEach(item => {
                            average += item.value;
                        });
                        average /= grades.length;
                        color = gradeColors[('' + Math.floor(average))];
                    }
                    return (
                        <div className='user-row' key={user.id}>
                            <div className='username-cell left-cell'>
                                <span className='username'>{user.fullname}</span>
                            </div>
                            <div className='average-cell left-cell' style={{ backgroundColor: color }}>
                                <span className='username'>{Math.round(average * 100) / 100 || ''}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

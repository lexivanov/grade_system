import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { gradeColors } from '../../../../../constants';

import './middle-part.scss';

export class MiddlePart extends Component {
    static propTypes = {
        tasks: PropTypes.array,
        users: PropTypes.array,
        grades: PropTypes.array,
    }

    render() {
        return (
            <div className='middle-side'>
                {this.props.tasks.map(task => {
                    console.log(task);
                    return (<div className='task-column' key={task.id}>
                        <div className='task-cell middle-cell'>
                            <a className='task-link' href="./main">{task.name}</a>
                        </div>
                        {this.props.users.map(user => {
                            let color = undefined;
                            const grade = this.props.grades.find(x => x.userId === user.id && x.taskId === task.id);
                            const gradeValue = grade ? grade.value : undefined;
                            if (gradeValue) {
                                color = gradeColors[('' + Math.floor(gradeValue))];
                            };
                            return (
                                <div className='user-grade-cell middle-cell' style={{ backgroundColor: color }} key={user.id}>
                                    <span className='grade'>{gradeValue || ''}</span>
                                </div>
                            )
                        })}
                    </div>)
                })}
                <div className='fake-column'>
                    <div className='fake-cell' />
                    {this.props.users.map(user => (
                        <div className='fake-cell' key={user.id} />
                    ))}
                </div>
            </div>
        );
    }
}

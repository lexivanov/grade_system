import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { gradeColors } from '../../../../../constants';

import './middle-part.scss';

export class MiddlePart extends Component {
    static propTypes = {
        tasks: PropTypes.array,
        users: PropTypes.array,
        grades: PropTypes.object,
        // grades: PropTypes.array,
    }
    render() {
        return (
            <div className='middle-side'>
                {this.props.tasks.map(task =>
                    (<div className='task-column' key={task.id}>
                        <div className='task-cell middle-cell'>
                            <a className='task-link' href="./main">{task.name}</a>
                        </div>
                        {this.props.users.map(user => {
                            let color = undefined;
                            const grade = this.props.grades &&
                                this.props.grades[user.id] &&
                                this.props.grades[user.id].find(grade => grade.taskId === task.id) &&
                                this.props.grades[user.id].find(grade => grade.taskId === task.id).value;
                            if (grade) { 
                                color = gradeColors[(''+grade)[0]]; 
                            };
                            return (
                                <div className='user-grade-cell middle-cell' style={{ backgroundColor: color }} key={user.id}>
                                    <span className='grade'>{(this.props.grades &&
                                        this.props.grades[user.id] &&
                                        this.props.grades[user.id].find(grade => grade.taskId === task.id) &&
                                        this.props.grades[user.id].find(grade => grade.taskId === task.id).value) || ''}</span>
                                </div>
                            )
                        })}
                    </div>))}
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

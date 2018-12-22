import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { gradeColors } from '../../../../../constants';

import './middle-part.scss';
import { NumberCell } from '../number-cell/number-cell';

export class MiddlePart extends Component {
    static propTypes = {
        tasks: PropTypes.array,
        users: PropTypes.array,
        grades: PropTypes.array,
        onChangeGrade: PropTypes.func
    }

    render() {
        return (
            <div className='middle-side'>
                {this.props.tasks.map(task => {
                    return (<div className='task-column' key={task.id}>
                        <div className='task-cell middle-cell'>
                            <Link className='task-link' to="/main">{task.name}</Link>
                        </div>
                        {this.props.users.map(user => {
                            let color = undefined;
                            const grade = this.props.grades.find(x => x.userId === user.id && x.taskId === task.id);
                            const gradeValue = grade ? grade.value : undefined;
                            if (gradeValue) {
                                color = gradeColors[('' + Math.floor(gradeValue))];
                            };
                            return (
                                <NumberCell
                                    key={user.id}
                                    className='user-grade-cell middle-cell'
                                    style={{ backgroundColor: color }}
                                    value={gradeValue}
                                    onChange={(value) => this.props.onChangeGrade(user.id, task.id, value)} />
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

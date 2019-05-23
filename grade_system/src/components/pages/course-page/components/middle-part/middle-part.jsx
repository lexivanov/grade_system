import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { gradeColors } from '../../../../../constants';

import './middle-part.scss';
import { NumberCell } from '../number-cell/number-cell';

class SortButton extends Component {
    state = { lastDirection: false }
    render = () => {
        return (<div className={"sort-button"} onClick={() => { this.setState(prev => ({ lastDirection: !prev.lastDirection }), this.props.sort(this.state.lastDirection)) }}>
            {this.state.lastDirection ? <i class="fa fa-caret-down" /> : <i class="fa fa-caret-up" />}
        </div>);
    }
}

export class MiddlePart extends Component {
    static propTypes = {
        tasks: PropTypes.array,
        users: PropTypes.array,
        grades: PropTypes.array,
        onChangeGrade: PropTypes.func,
        canEdit: PropTypes.bool,
    }

    render() {
        return (
            <div className='middle-side'>
                {this.props.tasks.map(task => {
                    return (<div className='task-column' key={task.id}>
                        <div className='task-cell middle-cell'>
                            <Link className='task-link' to={`/task/${task.id}`}>{task.name}</Link>
                            <SortButton sort={(direction) => this.props.sort(task.id, direction)} />
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
                                    canEdit={this.props.canEdit}
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

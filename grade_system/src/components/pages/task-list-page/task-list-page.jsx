import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loadTasks, deleteTask } from '../../../store/task';
import { AddTaskForm } from '../../forms';
import { showModal } from '../../../store/modal';

import './task-list-page.scss';

class TaskListPage extends Component {
    componentDidMount() {
        this.props.getTasks();
    }

    onAddNewTask = async () => {
        this.props.showModal(<AddTaskForm />);
    }

    render() {
        return (
            <Fragment>
                <div className='add-task-block'>
                    <button className='add-task-button' onClick={this.onAddNewTask}>Add task</button>
                </div>
                <div className='task-list-page-wrapper'>
                    {this.props.tasks.map(task => (
                        <div key={task.id} className='link-wrapper'>
                            <div className='task-link-container'>
                                <Link to={`/task/${task.id}`} className='task-link'>{task.name}</Link>
                            </div>
                            <div className='delete-button'>
                                <button className='delete-button' onClick={() => this.props.deleteTask(task.id)}>X</button>
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        tasks: state.taskReducer.taskList,
        ownProps
    }),
    dispatch => ({
        getTasks: () => dispatch(loadTasks()),
        showModal: (content) => dispatch(showModal(content)),
        deleteTask: (id) => dispatch(deleteTask(id)),
    })
)(TaskListPage));

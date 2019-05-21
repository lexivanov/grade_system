import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loadTasks, deleteTask } from '../../../store/task';
import { AddTaskForm, TextInput } from '../../../components';
import { showModal } from '../../../store/modal';
import { avoidUnauthorized, inPermissionBase } from '../../../services';

import './task-list-page.scss';

class TaskListPage extends Component {

    state = { filter: '' };

    componentDidMount() {
        this.props.getTasks();
    }

    onAddNewTask = async () => {
        this.props.showModal(<AddTaskForm />);
    }

    render() {
        const inPermission = inPermissionBase(this.props.authUser);
        const filtredTasks = this.props.tasks && this.props.tasks.filter(x => x.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
        return avoidUnauthorized() || (
            <Fragment>
                {inPermission('admin') && <div className='add-task-block'>
                    <button className='add-task-button' onClick={this.onAddNewTask}>Add task</button>
                </div>}
                <div className='task-list-page-wrapper'>
                    <div className="filter-panel">
                        <TextInput
                            className='filter'
                            placeholder='Tasks filter...'
                            value={this.state.filter}
                            onChange={filter => this.setState({ filter })}
                        />
                    </div>
                    {filtredTasks && filtredTasks.length
                        ? filtredTasks.map(task => (
                            <div key={task.id} className='link-wrapper'>
                                <div className='task-link-container'>
                                    <Link to={`/task/${task.id}`} className='task-link'>{task.name}</Link>
                                </div>
                                {inPermission('admin') && <div className='delete-button'>
                                    <button className='delete-button' onClick={() => this.props.deleteTask(task.id)}>X</button>
                                </div>}
                            </div>
                        ))
                        : <div>No tasks found...</div>}
                </div>
            </Fragment>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        tasks: state.taskReducer.taskList,
        authUser: state.authReducer.user,
        ownProps
    }),
    dispatch => ({
        getTasks: () => dispatch(loadTasks()),
        showModal: (content) => dispatch(showModal(content)),
        deleteTask: (id) => dispatch(deleteTask(id)),
    })
)(TaskListPage));

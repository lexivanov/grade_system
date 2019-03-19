import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadTask } from '../../../store/task';

class TaskPage extends Component {
    flag = true;

    constructor() {
        super();
        this.id = idResolver(window.location.pathname);
        this.state = { userName: '', selectedItem: null };
    }

    async componentDidMount() {
        await this.props.getTaskInfo(this.id);
    }

    render() {
        console.log(this.props);
        return (
            <div className='task-page'>
                <div className='task-name-wrapper'>
                    <div className='task-name-text'>{this.props.task.name || ''}</div>
                </div>
            </div>);
    }
}

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
}

export default withRouter(connect(
    (state, ownProps) => ({
        task: state.taskReducer.task,
        ownProps
    }),
    dispatch => ({
        getTaskInfo: (id) => dispatch(loadTask(id))
    })
)(TaskPage));

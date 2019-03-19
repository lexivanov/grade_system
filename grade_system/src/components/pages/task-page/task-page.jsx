import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadTask, addEditTask } from '../../../store/task';
import { TextInput } from '../../../components';

class TaskPage extends Component {
    static propTypes = {
        task: PropTypes.object,
        getTaskInfo: PropTypes.func
    }

    flag = true;

    constructor() {
        super();
        this.id = idResolver(window.location.pathname);
        this.state = { name: '', nameEdit: false };
    }

    async componentDidMount() {
        await this.props.getTaskInfo(this.id);
    }

    onChangeName = (value) => {
        this.setState(prev => ({ name: value }));
    }

    onBlurName = async (value) => {
        if (value) {
            await this.props.editTask({ ...this.props.task, name: value });
            this.setState({ nameEdit: false });
        } else {
            this.setState({ name: this.props.task.name, nameEdit: false });
        }
    }

    render() {
        return (
            <div className='task-page'>
                <div className='task-name-wrapper' onClick={() => this.setState({ nameEdit: true, name: this.props.task.name })}>
                    {this.state.nameEdit
                        ? <TextInput
                            value={this.state.name}
                            onChange={this.onChangeName}
                            onBlur={this.onBlurName} />
                        : <div className='task-name-text'>{this.props.task.name || ''}</div>}
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
        getTaskInfo: (id) => dispatch(loadTask(id)),
        editTask: (id) => dispatch(addEditTask(id))
    })
)(TaskPage));

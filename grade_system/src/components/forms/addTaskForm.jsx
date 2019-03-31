import React, { Component } from 'react';
import { TextInput, Textarea } from '../inputs';
import PropTypes from 'prop-types';
import { addEditTask } from '../../store/task';
import { connect } from 'react-redux';

class AddTaskForm extends Component {
    static propTypes = {
        editTask: PropTypes.func,
        onSaveChanges: PropTypes.func,
        courseId: PropTypes.string
    }

    state = {
        task: {
            name: '',
            description: ''
        }
    }

    render() {
        return (
            <div className='add-task-form'>
                <label className='add-task-label name'>
                    <TextInput
                        className='add-task-input name'
                        value={this.state.task.name}
                        onChange={this.onChangeName}
                    />
                </label>
                <label className='add-task-label description'>
                    <Textarea
                        className='add-task-input description'
                        value={this.state.task.description}
                        onChange={this.onChangeDesc}
                    />
                </label>
                <button
                    className='add-task-submit'
                    onClick={this.onSaveChanges} >
                    Save
                    </button>
            </div>
        );
    }

    onChangeName = (value) => {
        this.setState(prev => ({ task: { ...prev.task, name: value } }));
    }

    onChangeDesc = (value) => {
        this.setState(prev => ({ task: { ...prev.task, description: value } }));
    }

    onSaveChanges = async (value) => {
        if (value) {
            await this.props.editTask({ ...this.state.task });
            this.props.onSaveChanges && this.props.onSaveChanges();
        }
    }

}

export default connect(
    (state, ownProps) => ({
        ownProps
    }),
    dispatch => ({
        editTask: (task) => dispatch(addEditTask(task))
    })
)(AddTaskForm);
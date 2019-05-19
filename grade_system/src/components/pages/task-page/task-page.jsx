import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadTask, addEditTask } from '../../../store/task';
import { TextInput, Textarea } from '../../../components';

import './task-page.scss';
import { ButtonWithText } from '../../buttons';
import { AssignBoard } from './components';
import { avoidUnauthorized } from '../../../services';

class TaskPage extends Component {
    static propTypes = {
        task: PropTypes.object,
        getTaskInfo: PropTypes.func
    }

    constructor() {
        super();
        this.id = idResolver(window.location.pathname);
        this.state = {
            task: {},
            editMode: false
        };
    }

    async componentDidMount() {
        await this.props.getTaskInfo(this.id);
    }

    onChangeInput = (propName) => (value) => {
        this.setState(prev => ({ task: { ...prev.task, [propName]: value } }));
    }

    componentWillReceiveProps() {
        this.setState({ task: this.props.task });
    }

    onBlurName = async (value) => {
        if (value) {
            await this.props.editTask({ ...this.state.task });
            this.setState({ editMode: false });
        } else {
            this.setState(prev => ({
                task: { ...prev.task, name: this.props.task.name },
                editMode: false
            }));
        }
    }

    onApply = async () => {
        try {
            await this.props.editTask({ ...this.state.task });
            this.setState({ editMode: false, task: this.props.task });
        } catch {
            console.log('Vse poshlo po pizde, traini eshe');
        }
    }

    onCancel = () => {
        this.setState({ editMode: false, task: this.props.task });
    }

    onEdit = () => {
        this.setState({ editMode: true, task: this.props.task });
    }

    render() {
        return avoidUnauthorized() || (
            <div className='task-page'>
                <div className='controls'>
                    {this.state.editMode
                        ? <Fragment>
                            <ButtonWithText
                                type='button'
                                className='cancel-button btn'
                                text='CANCEL'
                                onClick={this.onCancel}
                            /> <ButtonWithText
                                type='button'
                                className='apply-button btn'
                                text='APPLY'
                                onClick={this.onApply}
                            />
                        </Fragment>
                        : <ButtonWithText
                            type='button'
                            className='edit-button btn'
                            text='EDIT'
                            onClick={this.onEdit}
                        />}
                </div>
                <AssignBoard />
                <div className='task-info-wrapper'>
                    <div className='task-wrapper name'>
                        {this.state.editMode
                            ? <TextInput
                                className='task-input name'
                                value={this.state.task.name}
                                onChange={this.onChangeInput('name')}
                            />
                            : <div className='task-name-text'>{this.props.task.name || ''}</div>}
                    </div>
                    <div className='task-wrapper description'>
                        <Textarea
                            className='task-input description'
                            value={this.state.editMode ? this.state.task.description : this.props.task.description}
                            onChange={this.onChangeInput('description')}
                            disabled={!this.state.editMode}
                        />
                    </div>
                    <div className='task-wrapper link'>
                        {this.state.editMode
                            ? <TextInput
                                className='task-input link'
                                value={this.state.task.filePath}
                                onChange={this.onChangeInput('filePath')}
                            />
                            : this.state.task.filePath ? <a className='task-text' href={this.props.task.filePath}>Attachments</a> : null}
                    </div>
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
        getTaskInfo: async (id) => await dispatch(loadTask(id)),
        editTask: async (id) => await dispatch(addEditTask(id))
    })
)(TaskPage));

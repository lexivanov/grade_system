import React, { Component } from 'react';
import { TextInput, Textarea } from '../../inputs';
import PropTypes from 'prop-types';
import { addEditCourse } from '../../../store/course';
import { connect } from 'react-redux';

import './addCourseForm.scss';

class AddCourseForm extends Component {
    static propTypes = {
        editCourse: PropTypes.func,
        onSaveChanges: PropTypes.func,
        courseId: PropTypes.string
    }

    state = {
        course: {
            name: '',
            description: ''
        }
    }

    render() {
        return (
            <div className='add-course-form'>
                <label className='add-course-label name'>
                    <span className='add-course-label-text'>Title: </span>
                    <TextInput
                        className='add-course-input name'
                        value={this.state.course.name}
                        onChange={this.onChangeName}
                    />
                </label>
                <label className='add-course-label description'>
                    <span className='add-course-label-text'>Description: </span>
                    <Textarea
                        className='add-course-input description'
                        value={this.state.course.description}
                        onChange={this.onChangeDesc}
                    />
                </label>
                <button
                    className='add-course-submit'
                    onClick={this.onSaveChanges} >
                    Save
                    </button>
            </div>
        );
    }

    onChangeName = (value) => {
        this.setState(prev => ({ course: { ...prev.course, name: value } }));
    }

    onChangeDesc = (value) => {
        this.setState(prev => ({ course: { ...prev.course, description: value } }));
    }

    onSaveChanges = async (value) => {
        if (value) {
            await this.props.editCourse({ ...this.state.course });
            this.props.onSaveChanges && this.props.onSaveChanges();
        }
    }

}

export default connect(
    (state, ownProps) => ({
        ownProps
    }),
    dispatch => ({
        editCourse: (course) => dispatch(addEditCourse(course))
    })
)(AddCourseForm);
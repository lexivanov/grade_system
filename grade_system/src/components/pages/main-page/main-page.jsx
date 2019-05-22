import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { fetchCourseList, deleteCourse } from '../../../store/course';
import { AddCourseForm, TextInput, ApprovementForm } from '../../../components';
import { showModal } from '../../../store/modal';
import { avoidUnauthorized, inPermissionBase } from '../../../services';

import './main-page.scss';

class MainPage extends Component {

    state = { filter: '' };

    componentDidMount() {
        this.props.getCourses();
    }

    onAddNewTask = async () => {
        this.props.showModal(<AddCourseForm />);
    }

    onDelete = (course) => {
        this.props.showModal(
            <ApprovementForm
                text={`Are you sure you want to delete ${course.name}?`}
                onApprove={() => this.props.deleteCourse(course.id)}
            />
        );
    }

    render() {
        const inPermission = inPermissionBase(this.props.user);
        const filtredCourses = this.props.courses && this.props.courses.filter(x => x.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1);
        if (this.props.user && inPermission('student')) return <Redirect to={`/user/${this.props.user.id}`} />;
        return avoidUnauthorized() || (
            <>
                {inPermission('admin') && <div className='add-course-block'>
                    <button className='add-course-button' onClick={this.onAddNewTask}>Add course</button>
                </div>}
                <div className='main-wrapper'>
                    <div className="filter-panel">
                        <TextInput
                            className='filter'
                            placeholder='Courses filter...'
                            value={this.state.filter}
                            onChange={filter => this.setState({ filter })}
                        />
                    </div>
                    {filtredCourses && filtredCourses.length
                        ? filtredCourses.map(course => (
                            <div key={course.id} className='link-wrapper'>
                                <Link to={`/course/${course.id}`} className='course-link'>{course.name}</Link>
                                <p className='course-desc'>{course.description}</p>
                                {inPermission('admin')
                                    && <button
                                        className='delete-button'
                                        onClick={() => this.onDelete(course)}>X</button>}
                            </div>
                        ))
                        : <div>No courses found...</div>}
                </div>
            </>
        );
    }
}

export default withRouter(connect(
    (state, ownProps) => ({
        courses: state.courseReducer.courses,
        user: state.authReducer.user,
        ownProps
    }),
    dispatch => ({
        getCourses: () => dispatch(fetchCourseList()),
        showModal: (content) => dispatch(showModal(content)),
        deleteCourse: (id) => dispatch(deleteCourse(id)),
    })
)(MainPage));

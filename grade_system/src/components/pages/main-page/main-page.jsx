import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { fetchCourseList, deleteCourse } from '../../../store/course';
import { AddCourseForm } from '../../forms';
import { showModal } from '../../../store/modal';
import { avoidUnauthorized, inPermissionBase } from '../../../services';

import './main-page.scss';

class MainPage extends Component {
    componentDidMount() {
        this.props.getCourses();
    }

    onAddNewTask = async () => {
        this.props.showModal(<AddCourseForm />);
    }

    render() {
        const inPermission = inPermissionBase(this.props.user);
        if (this.props.user && inPermission('student')) return <Redirect to={`/user/${this.props.user.id}`} />;
        return avoidUnauthorized() || (
            <>
                {inPermission('admin') && <div className='add-course-block'>
                    <button className='add-course-button' onClick={this.onAddNewTask}>Add course</button>
                </div>}
                <div className='main-wrapper'>

                    {this.props.courses.map(course => (
                        <div key={course.id} className='link-wrapper'>
                            <Link to={`/course/${course.id}`} className='course-link'>{course.name}</Link>
                            <p className='course-desc'>{course.description}</p>
                            {inPermission('admin')
                                && <button 
                                className='delete-button' 
                                onClick={() => this.props.deleteCourse(course.id)}>X</button>}
                        </div>
                    ))}
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

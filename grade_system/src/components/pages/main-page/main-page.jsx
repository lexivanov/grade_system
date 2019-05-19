import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { fetchCourseList } from '../../../store/course';
import { avoidUnauthorized, inPermissionBase } from '../../../services';

import './main-page.scss';

class MainPage extends Component {
    componentDidMount() {
        this.props.getCourses();
    }

    render() {
        if (this.props.user && inPermissionBase(this.props.user)('student')) return <Redirect to={`/user/${this.props.user.id}`}/>;
        return avoidUnauthorized() || (
            <div className='main-wrapper'>
                {this.props.courses.map(course => (
                    <div key={course.id} className='link-wrapper'>
                        <Link to={`/course/${course.id}`} className='course-link'>{course.name}</Link>
                        <p className='course-desc'>{course.description}</p>
                    </div>
                ))}
            </div>
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
    })
)(MainPage));

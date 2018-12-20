import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchCourseList } from '../../../store/course';

import './main-page.scss';

class MainPage extends Component {
    componentDidMount() {
        this.props.getCourses();
    }

    render() {
        return (
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
        ownProps
    }),
    dispatch => ({
        getCourses: () => dispatch(fetchCourseList()),
    })
)(MainPage));

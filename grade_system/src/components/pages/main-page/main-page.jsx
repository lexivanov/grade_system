import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkWithText } from '../../buttons';
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
                        <LinkWithText
                            href={`/course/${course.id}`}
                            className='course-link'
                            text={course.name}
                        />
                        <p className='course-desc'>{course.description}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        courses: state.courseReducer.courses,
        ownProps
    }),
    dispatch => ({
        getCourses: () => dispatch(fetchCourseList()),
    })
)(MainPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { DropDownInput } from '../../../inputs';
import { ButtonWithText } from '../../../buttons'
import PropTypes from 'prop-types';

import './assign-board.scss';
import { fetchCourseList } from '../../../../store/course';
import { addEditUser } from '../../../../store/user'

class AssignBoard extends Component {
    static propTypes = {
        courses: PropTypes.array,
        getCourses: PropTypes.func,
    }

    flag = true;

    constructor() {
        super();
        this.id = idResolver(window.location.pathname);
        this.state = { selectedCourse: null };
    }

    async componentDidMount() {
        await this.props.getCourses();
    }

    render() {
        const selectedCourse = this.props.courses && this.props.user && this.props.courses.find(x => x.id === this.props.user.courseId);
        return this.props.courses ? (
            <div className='assign-board'>
                {!selectedCourse
                    ? <div className='assign-dropdown'>
                        <DropDownInput
                            ref={ref => this.ddlRef = ref}
                            className='assign-board-dropdown'
                            items={this.props.courses}
                            onChange={(x) => this.setState({ selectedCourse: x.id })}
                        />
                        <ButtonWithText
                            text="Assign"
                            disabled={this.state.selectedCourse == null}
                            onClick={this.onAssign}
                        />
                    </div>
                    : <div className='assigned-list'>
                        {selectedCourse
                            ? <div className='assigned-item'>
                                <Link to={`/course/${selectedCourse.id}`} className='course-link'>{selectedCourse.name}</Link>
                                <button className='delete-button' onClick={() => this.onDisAssign(selectedCourse)}>X</button>
                            </div>
                            : null}
                    </div>}
            </div>
        ) : null;
    }

    onAssign = async () => {
        await this.props.addEditUser({ ...this.props.user, courseId: this.state.selectedCourse });
        this.ddlRef.resetSelection();
        this.forceUpdate();
    }

    onDisAssign = async (course) => {
        await this.props.addEditUser({ ...this.props.user, courseId: null });
        this.forceUpdate();
    }

}

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
}

export default withRouter(connect(
    (state, ownProps) => ({
        ownProps,
        user: state.userReducer.user,
        assigned: state.taskReducer.assignedCourses,
        courses: state.courseReducer.courses
    }),
    dispatch => ({
        getCourses: () => dispatch(fetchCourseList()),
        addEditUser: (user) => dispatch(addEditUser(user))
    })
)(AssignBoard));

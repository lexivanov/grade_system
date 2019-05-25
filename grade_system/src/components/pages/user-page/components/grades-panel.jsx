import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchCourseInfo, setGrade } from '../../../../store/course';
import { inPermissionBase } from '../../../../services';
import { gradeColors } from '../../../../constants';
import { NumberCell } from '../../course-page/components/number-cell';

import './grades-panel.scss';

class GradesPanel extends Component {
    static propTypes = {
        courses: PropTypes.array,
        getCourses: PropTypes.func,
    }

    flag = true;

    constructor() {
        super();
        this.id = idResolver(window.location.pathname);
        this.state = { selectedCourse: null, updated: false };
    }

    async componentDidUpdate(props) {
        this.props.user && !this.state.updated && this.setState({ updated: true }, await this.props.getInfo(this.props.user.courseId));
    }

    onChangeGrade = async (userId, taskId, value) => {
        !value && (value = null);
        await this.props.setGrade(userId, taskId, value);
    }

    render() {
        const inPermission = inPermissionBase(this.props.authUser);
        return this.props.tasks ? (
            <div className='grades-panel'>
                {this.props.tasks.map(task => {
                    let color = undefined;
                    const grade = this.props.grades.find(x => x.userId === this.id && x.taskId === task.id);
                    const gradeValue = grade ? grade.value : undefined;
                    gradeValue && (color = gradeColors[('' + Math.floor(gradeValue))]);
                    return (
                        <div className='task-column' key={task.id}>
                            <div className='task-cell middle-cell'>
                                <Link className='task-link' to={`/task/${task.id}`}>{task.name}</Link>
                            </div>
                            <NumberCell
                                canEdit={inPermission('admin', 'teacher')}
                                className='user-grade-cell middle-cell'
                                style={{ backgroundColor: color }}
                                value={gradeValue}
                                onChange={(value) => this.onChangeGrade(this.id, task.id, value)} />
                        </div>
                    );
                })}
            </div>
        ) : null;
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
        authUser: state.authReducer.user,
        tasks: state.courseReducer.currentCourseInfo.tasks,
        grades: state.courseReducer.currentCourseInfo.grades,
    }),
    dispatch => ({
        getInfo: (id) => dispatch(fetchCourseInfo(id)),
        setGrade: (userId, taskId, value) => dispatch(setGrade(userId, taskId, value)),
    })
)(GradesPanel));

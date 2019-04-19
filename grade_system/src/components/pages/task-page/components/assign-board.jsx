import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { DropDownInput } from '../../../inputs';
import { ButtonWithText } from '../../../buttons'
import PropTypes from 'prop-types';

import './assign-board.scss';
import { fetchCourseList } from '../../../../store/course';
import { loadTaskCourses, assignTask, disassignTask } from '../../../../store/task'

class AssignBoard extends Component {
    static propTypes = {
        assigned: PropTypes.array,
        courses: PropTypes.array,
        getCourses: PropTypes.func,
        getAssigned: PropTypes.func,
    }

    flag = true;

    constructor() {
        super();
        this.id = idResolver(window.location.pathname);
        this.state = { selectedCourse: null };
    }

    async componentDidMount() {
        await this.props.getCourses();
        await this.props.getAssigned(this.id);
    }

    render() {
        return this.props.assigned && this.props.courses ? (
            <div className='assign-board'>
                <div className='assign-dropdown'>
                    <DropDownInput
                        ref={ref => this.ddlRef = ref}
                        className='assign-board-dropdown'
                        items={this.getDdlList()}
                        onChange={(x) => this.setState({ selectedCourse: x.id })}
                    />
                    <ButtonWithText
                        text="Assign"
                        disabled={this.state.selectedCourse == null}
                        onClick={this.onAssign}
                    />
                </div>
                <div className='assigned-list'>
                    {this.props.assigned.map(x => (
                        <div key={x.id} className='assigned-item'>
                            <Link to={`/course/${x.id}`} className='course-link'>{x.name}</Link>
                            <button className='delete-button' onClick={() => this.onDisAssign(x)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
        ) : null;
    }

    getDdlList = () => {
        const items = this.props.courses.filter(x => !this.props.assigned.some(y => x.id === y.id));
        return [{ id: null, name: "Select item" }, ...items];
    }

    onAssign = async () => {
        await this.props.assign(this.id, this.props.courses.find(x => x.id === this.state.selectedCourse));
        this.ddlRef.resetSelection();
    }

    onDisAssign = async (course) => {
        await this.props.disassign(this.id, course);
    }

}

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length - 1];
}

export default withRouter(connect(
    (state, ownProps) => ({
        ownProps,
        assigned: state.taskReducer.assignedCourses,
        courses: state.courseReducer.courses
    }),
    dispatch => ({
        getCourses: () => dispatch(fetchCourseList()),
        getAssigned: (id) => dispatch(loadTaskCourses(id)),
        assign: (id, course) => dispatch(assignTask(id, course)),
        disassign: (id, course) => dispatch(disassignTask(id, course))
    })
)(AssignBoard));

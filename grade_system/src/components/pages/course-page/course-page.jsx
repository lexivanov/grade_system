import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSide } from './components';

import './course-page.scss';

class CoursePage extends Component {
    componentDidMount() {
        console.log(idResolver(window.location.pathname));
        console.log(this.props.users);
    }

    render() {
        return (
            <div className='course-wrapper'>
                <LeftSide users={this.props.users.filter(user => user.courseId === idResolver(window.location.pathname))}
                />
            </div>
        );
    }
}

const idResolver = (pathName) => {
    const parts = pathName.split('/');
    return parts[parts.length-1];
}

export default connect(
    (state, ownProps) => ({
        users: state.userReducer.userList,
        ownProps
    }),
)(CoursePage);

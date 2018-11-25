import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainPage extends Component {
    render() {
        console.log(this.props.userList);
        return (
            <div className='wrapper'>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        store: state.userReducer,
        userList: state.userReducer.userList,
        ownProps
    })
)(MainPage);

import React, { Component } from 'react';

export class SortButton extends Component {
    state = { lastDirection: false }
    render = () => {
        return (<div className={"sort-button"} onClick={() => { this.setState(prev => ({ lastDirection: !prev.lastDirection }), this.props.sort(this.state.lastDirection)) }}>
            {this.state.lastDirection ? <i className="fa fa-caret-down" /> : <i className="fa fa-caret-up" />}
        </div>);
    }
}
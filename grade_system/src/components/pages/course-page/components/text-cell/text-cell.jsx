import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { gradeColors } from '../../../../../constants';

export class TextCell extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        value: PropTypes.any,
        onChange: PropTypes.func,
        canEdit: PropTypes.bool
    }

    inputRef = null;

    state = { isInEditMode: false, currentValue: this.props.value };

    render() {
        let color = undefined;
        if (this.state.currentValue) {
            color = gradeColors[('' + Math.floor(this.state.currentValue))];
        };
        return this.state.isInEditMode ? (
            <div className={this.props.className + ' edit'}>
                <textarea
                    ref={ref => this.inputRef = ref}
                    type='text'
                    value={this.state.currentValue || ''}
                    onChange={this.onChangeNumber}
                    onBlur={this.onBlur} />
            </div>) : (
                <div className={this.props.className} style={{backgroundColor: color}} onClick={this.onClick}>
                    <span>{this.state.currentValue || ''}</span>
                </div>
            );
    }

    onChangeNumber = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const value = evt.target.value;
        if (value && value.length > 1000) {
            return;
        }

        this.setState({ currentValue: value });
    }

    onClick = async () => {
        if (!this.props.canEdit) return;
        await this.setState({ isInEditMode: true });
        this.inputRef.focus();
    }

    onBlur = () => {
        const value = this.state.currentValue;
        this.setState({ isInEditMode: false });
        this.setState({ currentValue: value });
        this.props.onChange(value === null ? '' : value);  
    }
}

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { DropDown } from '../drop-down';

import './drop-down-input.scss';

export class DropDownInput extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func,
        items: PropTypes.array,
    }

    inputRef = null;

    state = { isInEditMode: false, currentValue: this.props.value || this.props.items[0], mouseInside: true };

    render() {
        return (
            <div className={`drop-down-input ${this.props.className}`}
                onMouseEnter={() => this.setState({ mouseInside: true })}
                onMouseLeave={() => this.setState({ mouseInside: false })}>
                <div
                    className='drop-down-view'
                    onClick={this.onClick}>
                    <span>{
                        this.state.currentValue
                            ? this.state.currentValue.name
                            : ''
                    }</span>
                </div>
                {this.state.isInEditMode &&
                    <DropDown
                        getRef={(ref) => { this.inputRef = ref }}
                        className='drop-down-edit'
                        items={this.props.items}
                        selectedItem={this.state.currentValue}
                        onSelect={(value) => this.setState({ currentValue: value }, () => this.onBlur(true))}
                    />
                }
            </div>
        );
    }

    onClick = async () => {
        await this.setState({ isInEditMode: true });
        this.inputRef.focus();
        document.addEventListener("click", this.onBlur, false);
    }

    onBlur = (force) => {
        if (this.state.mouseInside && !force) {
            return;
        }
        const value = this.state.currentValue;
        this.setState({ isInEditMode: false });
        this.props.onChange && this.props.onChange(value);
        document.removeEventListener("click", this.onBlur, false);
    }

    resetSelection = () => {
        this.setState({ currentValue: this.props.value || this.props.items[0] });
    }
}

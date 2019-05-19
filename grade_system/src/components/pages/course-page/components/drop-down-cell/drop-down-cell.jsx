import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { DropDown } from '../../../../../components';

import './drop-down-cell.scss';

export class DropDownCell extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        value: PropTypes.any,
        user: PropTypes.object,
        onChange: PropTypes.func,
        items: PropTypes.array,
        canEdit: PropTypes.bool
    }

    inputRef = null;

    state = { isInEditMode: false, currentValue: this.props.value, mouseInside: true };

    render() {
        return (
            <>
                <div className={this.props.className}
                    onMouseEnter={() => this.setState({ mouseInside: true })}
                    onMouseLeave={() => this.setState({ mouseInside: false })}>
                    <div
                        style={{ height: '100%', width: '100%' }}
                        onClick={this.onClick}>
                        <span>{this.state.currentValue ? this.state.currentValue.name : ''}</span>
                    </div>
                    {this.state.isInEditMode &&
                        <DropDown
                            getRef={(ref) => { this.inputRef = ref }}
                            className='drop-down-cell-edit'
                            items={this.props.items}
                            selectedItem={this.state.currentValue}
                            onSelect={(value) => this.setState({ currentValue: value })} />
                    }
                </div>
            </>
        )
    }

    onClick = async () => {
        if (!this.props.canEdit) return;
        await this.setState({ isInEditMode: true });
        this.inputRef.focus();
        document.addEventListener("click", this.onBlur, false);
    }

    onBlur = async () => {
        if (this.state.mouseInside) {
            return;
        }
        const value = this.state.currentValue;
        this.setState({ isInEditMode: false });
        await this.props.onChange(this.props.user.id, value.id);
        document.removeEventListener("click", this.onBlur, false);
    }
}

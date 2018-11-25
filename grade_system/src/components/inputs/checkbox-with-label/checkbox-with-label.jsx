import React from 'react';
import PropTypes from 'prop-types';

export function CheckboxWithLabel(props) {
    return (
        <label className={props.labelClass}>
            <input
                className={props.inputClass}
                type='checkbox'
                name={props.name}
                value={props.value}
                data-id={props.id}
                checked={props.checked}
                onChange={props.onChange} />
            {props.text}
        </label>
    );
}

CheckboxWithLabel.propTypes = {
    inputClass: PropTypes.string,
    labelClass: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    text: PropTypes.string,
    value: PropTypes.string
};

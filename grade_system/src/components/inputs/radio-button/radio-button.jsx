import React from 'react';
import PropTypes from 'prop-types';

export function RadioButton(props) {
    return (
        <label className={props.labelClass}>
            <input
                className={props.inputClass}
                type='radio'
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange} />
            {props.text}
        </label>
    );
}

RadioButton.propTypes = {
    inputClass: PropTypes.string,
    labelClass: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    text: PropTypes.string
};

import React from 'react';
import PropTypes from 'prop-types';

export function TextInput(props) {
    return (
        <input
            className={props.className}
            type='text'
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            id={props.id}
            onChange={props.onChange} />
    );
}

TextInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    id:PropTypes.number,
    value: PropTypes.string,
    onChange:PropTypes.func
};

import React from 'react';
import PropTypes from 'prop-types';

export function TextInput(props) {
    
    const onChangeNativeInput = (event) => {
        props.onChange && props.onChange(event.target.value);
    }

    const onBlurNativeInput = (event) => {
        props.onBlur && props.onBlur(event.target.value);
    }

    return (
        <input
            className={props.className}
            type={props.type || 'text'}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            id={props.id}
            onChange={onChangeNativeInput}
            onBlur={onBlurNativeInput} />
    );
}


TextInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    id:PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string
};


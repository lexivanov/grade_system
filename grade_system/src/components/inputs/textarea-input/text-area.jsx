import React from 'react';
import PropTypes from 'prop-types';

export function Textarea(props) {
    
    const onChangeNativeInput = (event) => {
        props.onChange && props.onChange(event.target.value);
    }

    const onBlurNativeInput = (event) => {
        props.onBlur && props.onBlur(event.target.value);
    }

    return (
        <textarea
            className={props.className}
            placeholder={props.placeholder}
            value={props.value}
            name={props.name}
            id={props.id}
            onChange={onChangeNativeInput}
            onBlur={onBlurNativeInput}
            disabled={props.disabled} />
    );
}


Textarea.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    id:PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool
};


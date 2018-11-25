import React from 'react';
import PropTypes from 'prop-types';

export function ButtonWithText(props) {
    return (
        <button
            data-id={props.id}
            className={props.className}
            type={props.type || 'submit'}
            onClick={props.onClick}
            disabled={props.disabled}>
            {props.text}
        </button>
    );
}

ButtonWithText.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string
};

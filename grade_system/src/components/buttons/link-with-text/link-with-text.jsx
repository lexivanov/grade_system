import React from 'react';
import PropTypes from 'prop-types';

export function LinkWithText(props) {
    return (
        <a
            href={props.href}
            className={props.className}
            disabled={props.disabled}>
            {props.text}
        </a>
    );
}

LinkWithText.propTypes = {
    href: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
};

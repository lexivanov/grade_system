import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

export function ButtonWithIcon(props) {
    return (
        <button
            className={props.className}
            type={props.type || 'submit'}
            onClick={props.onClick}>
            <FontAwesome name={props.iconName} />
        </button>
    );
}

ButtonWithIcon.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    iconName: PropTypes.string,
    onClick: PropTypes.func
};

import React from 'react';
import PropTypes from 'prop-types';

export function FileInput(props) {
    return (
        <input
            className={props.className}
            type='file'
            name={props.name}
            onChange={props.onChange} />
    );
}

FileInput.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};

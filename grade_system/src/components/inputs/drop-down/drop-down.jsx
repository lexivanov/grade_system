import React from 'react';
import PropTypes from 'prop-types';

import './drop-down.scss';

export function DropDown(props) {
    return (
        <div className={`drop-down ${props.className}`}>
            <input
                ref={ref => props.getRef && props.getRef(ref)}
                className='drop-down-input'
                placeholder={props.placeholder}
                value={props.selectedItem ? props.selectedItem.name : ''}
                name={props.name}
                id={props.id}
                onChange={() => {}} />
            <div className='drop-down-content'>
                {props.items.map(x =>
                    <button
                        key={x.id}
                        className='drop-down-item'
                        value={x.id}
                        onClick={() => props.onSelect(x)}>
                        {x.name}
                    </button>)}
            </div>
        </div>
    );
}

DropDown.propTypes = {
    className: PropTypes.string,
    dropdownContentClassName: PropTypes.string,
    visibleItems: PropTypes.number,
    placeholder: PropTypes.string,
    selectedItem: PropTypes.object, 
    items: PropTypes.array,
    name: PropTypes.string,
    id: PropTypes.number,
    value: PropTypes.string,
    onSelect: PropTypes.func,
    onBlur: PropTypes.func,
    getRef: PropTypes.func
};

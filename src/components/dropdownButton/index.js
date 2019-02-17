import React, {useState} from 'react';
import './MoreButtons.css';

const moreButton = (props) => {

    // using useState lifecycle hook for rendering hover effect that I couldn't set with CSS styles
    // extracting carStyle value with hover: false value and carStyleChange method using destructuring
    const [ carStyle, carStyleChange ] = useState({hover: false})

    // event handlers for hovering
    const carStyleOnHandler = () => {
        carStyleChange({hover: true});
    }

    const carStyleOffHandler = () => {
        carStyleChange({hover: false});
    }
    
    return (
        // assigning values to OnClick, OnMouseOver and onMouseOut event handlers
        <div onClick={props.click} onMouseOver={carStyleOnHandler} onMouseOut={carStyleOffHandler} className='dropdown__category'>
            {/* props.activeStyle for checkbox transition */}
            <div className={`dropdown__text dropdown__checkbox${props.activeStyle ? ' dropdown__checkbox--active' : '' }`}></div>
            {/* props.activeStyle for text when active, carStyle.hover for renderin hover efferct with state */}
            <div className={`dropdown__text dropdown__car${props.activeStyle ? ' dropdown__car--active' : '' }${carStyle.hover ? ' dropdown__car--hover' : '' } `}>{props.children}</div>
            {/* props.clickOnly selects only one item inside the dropdown */}
            <div onClick={props.clickOnly} className={`dropdown__text dropdown__only${carStyle.hover ? ' dropdown__only--visible' : '' }`}>only</div>
            <div className='dropdown__text dropdown__price'>{props.minPrice}</div>
        </div>
    )
}

export default moreButton;
import React from 'react';
import './CategoryButton.css';

const CategoryButton = (props) => {

    return (
    // assigned onClick method with passed click prop and other style changes depending on whether button is active or is MORE active button or is MORE selected button
    <button onClick={props.click} className={`button button__text${(props.more) ? ' button__text--more': ''}${(props.activeStyle || (props.selected === true)) ? ' button--active': ''}`}>
        {/* button name goes here as a props.children */}
        {props.children}
        {/* price is deactivated if there is noPrice prop, otherwise price is passed as props.minPrice */}
        {(props.noPrice === true) ? null : <span className='button__text button__text--right'>{props.minPrice}</span>}
        {/* specific to MORE button: if props.selected is true renders X svg, if not uses props.more value to render \/ svg */}
        {(props.selected === true) ? 
            <div onClick={props.clickX} className='button__svg__cross--container button__svg--cross'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.85 9.93">
                    <path className="button__svg__cross" d="M.71.79l8.43 8.43M9.14.71L.71 9.14"></path>
                </svg>
            </div>
        /* if props.selected is false uses props.more value to render \/ svg */
        : (props.more === true) ?
            // activeStyle for transition
            <div className={`button__svg${props.activeStyle ? ' button__svg--active' : '' }`}>
                <svg viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.35">
                    <path d="M7 1.053L4.027 4 1 1" stroke="currentColor" fill="none"></path>
                </svg>
            </div> : /* if neither props.selected or props.more is true then does not render anything */ null }
    </button>
    )
};

export default CategoryButton;
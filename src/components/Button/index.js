import React from 'react';

const Button = ({ text, arrow, handleClick }) => {
    return (
        <div className="fluid ui animated blue button" onClick={handleClick}>
            <div className="visible content">{text}</div>
            <div className="hidden content">
                <i className={`${arrow} arrow icon`}></i>
            </div>
        </div>
    )
};

export default Button;
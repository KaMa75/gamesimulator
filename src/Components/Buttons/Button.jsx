import React from 'react';

const Button = (props) => {
    return (
        <button className={ props.styleClass } onClick={ props.handleOnClick(props.viewOptions) } >
            { props.name }
        </button>
    );
};

export default Button;

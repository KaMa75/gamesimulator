import React from 'react';

const Error = (props) => {
    return (
        <div className="error-wrapper">
            <p className="text-danger">{ props.msg }</p>
        </div>
    );
};

export default Error;

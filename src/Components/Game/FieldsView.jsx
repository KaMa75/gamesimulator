import React from 'react';

const generateFields = (fieldsMap) => {
    return fieldsMap.map((field) => {
        return <div className={ `${field.fieldClassName} ${field.pawnClassName}` } key={ field.number }>
            <h3>{ field.number }</h3>
        </div>
    });
}

const FieldsView = (props) => {
    return (
        <div className="mt-5 board">
            { generateFields(props.fieldsMap) }
        </div>
    );
};

export default FieldsView;

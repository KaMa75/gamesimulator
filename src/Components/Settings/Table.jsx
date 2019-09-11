import React from 'react';

const generateTableRows = (specialFields, handleDeleteSpecialField) => {
    return specialFields.map((field, index) => {
        return (
            <tr key={ field.number } className={field.isOver ? 'end-game' : 'move-to'}>
                <td>{ field.number }</td>
                <td>{ field.isOver ? 'Przegrana' : 'Przejdź do' }</td>
                <td>{ field.isOver ? '----' : field.moveTo }</td>
                <td>
                    <button 
                        type="button" 
                        className="btn btn-danger btn-sm mr-1"
                        onClick={ handleDeleteSpecialField(index) }
                    >
                        Usuń
                    </button>
                </td>
            </tr>
        );
    });
}

const Table = (props) => {
    return (
        <table className="table mt-4">
            <thead className="thead-light">
                <tr>
                    <th>
                        Nr pola
                    </th>
                    <th>
                        Typ pola
                    </th>
                    <th>
                        Przejdź do pola
                    </th>
                    <th>
                        
                    </th>
                </tr>
            </thead>

            <tbody>
                { generateTableRows(props.specialFields, props.handleDeleteSpecialField) }
            </tbody>
        </table>
    );
};

export default Table;

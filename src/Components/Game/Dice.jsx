import React from 'react';

const Dice = (props) => {
    return (
        <div>
            <h3 className="mb-3">
                { props.currentDiceNum ? `Ilość wyrzuconych oczek ${props.currentDiceNum}` : "Rzut kostką" }
            </h3>
            <h3>
                { `Idziesz do pola nr ${ props.fieldNum }` }
            </h3>
        </div>
    );
};

export default Dice;

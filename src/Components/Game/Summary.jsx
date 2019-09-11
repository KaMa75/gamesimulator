import React from 'react';

const Summary = (props) => {
    const diceResults = props.diceResults;
    const numOfRolls = diceResults.length;
    const avgOfDiceResults = (diceResults.reduce((curr, next)=>{ return curr + next}))/numOfRolls;
    const winMsg = 'Wygrałeś. Gratulacje.';
    const loosMsg = 'Przegrałeś. Może następnym razem dopisze Ci szczęście.';
    const msg = (props.currentField === props.numOfFields) ? <h1 className="py-3 text-success font-weight-bold">{ winMsg }</h1> : <h1 className="py-3 text-danger font-weight-bold">{ loosMsg }</h1>;
    const statistics = `${ numOfRolls } razy rzuciłeś kostką. Średnia ilość wyrzuconych oczek to ${avgOfDiceResults.toFixed(2)}.`
    return (
        <div>
            { msg }
            <h2>{ statistics }</h2>
        </div>
    );
};

export default Summary;

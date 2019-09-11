import React, { Component } from 'react';
import Button from '../Buttons/Button.jsx';
import Dice from './Dice.jsx';
import Summary from './Summary.jsx';
import FieldsView from './FieldsView.jsx';

class Game extends Component {

    constructor(props) {
        super(props);
        this.endGameFields = this.setEndGameFields();
        this.moveFieldsFrom = [];
        this.moveFieldsTo = [];
        this.diceResults = [];
        this.state = {
            currentField: 0,
            currentDiceNum: null,
            gameIsOver: false,
            fieldsMap: []
        };
    }

    setEndGameFields() {
        const looseFields = this.props.specialFields.filter(element => element.isOver).map(element => element.number);
        return [...looseFields, this.props.numOfFields];
    }

    setMoveFields() {
        this.moveFieldsFrom = this.props.specialFields.filter(element => !element.isOver).map(element => element.number);
        this.moveFieldsTo = this.props.specialFields.filter(element => !element.isOver).map(element => element.moveTo);
    }

    handleOnClick = (viewParams) => () => {
        if(typeof this.props.setView === 'function') {
            this.props.setView(viewParams);
        }
    }

    generateFieldsMap() {
        const generatedFieldsMap = [];
        for(let i=1; i<=this.props.numOfFields; i++) {
            const field = {
                number: i,
                fieldClassName: `field${this.endGameFields.includes(i) ? ' game-over' : ''}${this.moveFieldsFrom.includes(i) ? ' move-field' : ''}`,
                pawnClassName: ''
            }
            generatedFieldsMap.push(field);
        };
        this.setState({
            fieldsMap: [...generatedFieldsMap]
        }, () => {
            this.runRound();
        });
    }

    render() {
        this.setMoveFields();
        return (
            <div>
                <Button
                    name="Powrót"
                    styleClass="btn btn-primary mr-2 mb-4"
                    handleOnClick={ this.handleOnClick }
                    viewOptions={ this.props.viewOptions.showMainMenu }
                />
                { this.state.gameIsOver && <Summary
                    currentField={ this.state.currentField } 
                    numOfFields={ this.props.numOfFields }
                    diceResults={ this.diceResults }
                /> }
                { !this.state.gameIsOver && <Dice
                    currentDiceNum={ this.state.currentDiceNum }
                    fieldNum={ this.state.currentField }
                /> }
                <FieldsView
                    fieldsMap={ this.state.fieldsMap }
                />
            </div>
        );
    }

    randomNum() {
        return Math.floor(Math.random()*6 + 1);
    }

    countCurrentField(currentDiceNum) {
        const sum = this.state.currentField + currentDiceNum;
        return sum <= this.props.numOfFields ? sum : this.props.numOfFields * 2 - sum;
    }

    runRound() {
        let currentDiceNum = this.randomNum();
        this.diceResults = [...this.diceResults, currentDiceNum];
        
        let prevField = this.state.currentField;
        let currentField = this.countCurrentField(currentDiceNum);

        this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);
            this.setState({
                currentDiceNum
            }, () => {
                this.goToCurrentField(prevField, currentField)
            });
        }, 1000);
    }

    goToCurrentField(prevField, currentField) {
        this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);
            this.setState({
                currentField,
                fieldsMap: this.setFieldsMap(prevField, currentField)
            }, () => { 
                this.checkFieldType(prevField, currentField);
            });
        }, 1000);
    }

    checkFieldType(prevField, currentField) {
        if(this.endGameFields.includes(currentField)) {
            this.setGameOver();
        } else if(this.moveFieldsFrom.includes(currentField)) {
            this.movePawnFromSpecialField(currentField);
        } else {
            this.runNewRound();
        }
    }

    setFieldsMap(prevField, currentField) {
        const fieldsMap = [...this.state.fieldsMap];
        if(prevField > 0) {
            fieldsMap[prevField-1].pawnClassName = '';
        }
        fieldsMap[currentField-1].pawnClassName = 'pawn';
        return fieldsMap;
    }

    movePawnFromSpecialField(currentField) {
        const prevField = currentField;
        currentField = this.moveFieldsTo[this.moveFieldsFrom.indexOf(currentField)];
        this.timeout = setTimeout(() => {                             
            this.setState({
                currentField,
                fieldsMap: this.setFieldsMap(prevField, currentField)
            }, () => {
                this.runNewRound();
            });
        }, 1000);
    }

    runNewRound() {
        this.timeout = setTimeout(() => {
            this.setState({
                currentDiceNum: null
            }, () => {
                this.runRound();
            });
        }, 1000);
    }

    setGameOver() {
        this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);
            this.setState({
                gameIsOver: true
            });
        }, 1000);
    }

    componentDidMount() {
        this.generateFieldsMap()
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

}

export default Game;

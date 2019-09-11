import React, { Component } from 'react';
import Error from './Error.jsx';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: {
                value: '',
                isValid: true,
                errorMsg: ''
            },
            isOver: {
                value: false
            },
            moveTo: {
                value: '',
                isValid: true,
                errorMsg: ''
            }
        }
    }

    handleNumberChange = (event) => {
        const number = this.state.number;
        number.value = Number(event.target.value);
        number.errorMsg = '';
        this.setState({number});
    };

    handleIsOverChange = (event) => {
        const isOver = this.state.isOver;
        isOver.value = Number(event.target.value);
        this.setState({
            isOver,
            moveTo: {
                value: '',
                isValid: true,
                errorMsg: ''
            }
        });
    };

    handleMoveToChange = (event) => {
        const moveTo = this.state.moveTo;
        moveTo.value = Number(event.target.value);
        moveTo.errorMsg = '';
        this.setState({moveTo});
    };

    handleOnBlur = (name) => () => {
        const inputData = this.state[name];
        if(!inputData.isValid) {
            this.validate(inputData, name);
        }
    }

    validate(data, name) {
        let msg;
        let isValid;
        if(!data.value) {
            msg = 'To pole nie może być puste';
            isValid = false;
        } else if(data.value > this.props.fieldsAmount - 1) {
            msg = `Wartość nie może być większa niż ${this.props.fieldsAmount}`;
            isValid = false;
        } else if(this.props.specialFieldsNumbers.includes(data.value)) {
            msg = 'To pole jest już polem specjalnym';
            isValid = false;
        } else {
            msg = '';
            isValid = true;
        }
        data.isValid = isValid;
        data.errorMsg = msg;
        this.setState({
            [name]: data
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.validate(this.state.number, 'number');
        if(!this.state.isOver.value) {
            this.validate(this.state.moveTo, 'moveTo');
        }
        if(this.state.number.isValid && this.state.moveTo.isValid) {

            let formValue = {
                number: this.state.number.value,
                isOver: Boolean(this.state.isOver.value)
            }
            if(!formValue.isOver) {
                formValue.moveTo = this.state.moveTo.value;
            }

            this.resetForm();

            if(typeof this.props.handleUpdateSpecialFields === 'function') {
                this.props.handleUpdateSpecialFields(formValue);
            }
        }
    }

    resetForm() {
        const number = {
            value: '',
            isValid: true,
            errorMsg: ''
        };
        const isOver = {
            value: false
        };
        const moveTo = {
            value: '',
            isValid: true,
            errorMsg: ''
        };

        this.setState({
            number,
            isOver,
            moveTo
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="row" noValidate>

                <div className="form-group col-3">
                    <label htmlFor="field-number">
                        Numer pola
                    </label>
                    <input
                        value={ this.state.number.value }
                        onChange={ this.handleNumberChange }
                        onBlur={ this.handleOnBlur('number') }
                        type="number"
                        required
                        min="1"
                        max={ this.props.fieldsAmount - 1 }
                        className="form-control" id="field-number"
                    />
                    <Error msg={ this.state.number.errorMsg } />
                </div>

                <div className="form-group col-3">
                    <label htmlFor="field-type">
                        Wybierz typ pola
                    </label>
                    <select 
                        value={ this.state.isOver.value } 
                        onChange={ this.handleIsOverChange } 
                        className="form-control" id="field-type"
                    >
                        <option value='0'>Przejdź do ...</option>
                        <option value='1'>Przegrana</option>
                    </select>
                </div>

                <div className="form-group col-3">
                    <label htmlFor="move-to">
                        Przejdź do pola
                    </label>
                    <input
                        value={ this.state.moveTo.value }
                        onChange={ this.handleMoveToChange }
                        onBlur={ this.handleOnBlur('moveTo') }
                        disabled={ this.state.isOver.value }
                        type="number"
                        required
                        min="1"
                        max={ this.props.fieldsAmount - 1 }
                        className="form-control"
                        id="move-to"
                    />
                    { !this.state.isOver.value && <Error msg={ this.state.moveTo.errorMsg } /> }
                </div>

                <div className=" col-3">
                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Dodaj
                    </button>
                </div>

            </form>
        );
    }

}

export default Form;

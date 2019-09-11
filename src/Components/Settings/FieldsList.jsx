import React, { Component } from 'react';
import Table from './Table.jsx';
import Error from './Error.jsx';

class FieldsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldsAmount: this.props.fieldsAmount,
            isEditFieldsAmount: false,
            errorMsg: `Liczba pól może zawierać się między ${Math.max(...this.props.specialFieldsNumbers) + 1} a 50`,
            isValid: true
        }
    }

    handleOnChange = (event) => {
        this.setState({
            fieldsAmount: event.target.value
        });
    }

    enableEdit = () => {
        this.setState({
            isEditFieldsAmount: true,
            fieldsAmount: this.props.fieldsAmount
        });
    }

    cancelEdit = () => {
        this.setState({
            isEditFieldsAmount: false
        });
    }

    saveNumOfFields = () => {
        if(this.validNumOfFields()) {
            this.cancelEdit();
            if(typeof this.props.handleUpdateNumberOfFields === 'function') {
                this.props.handleUpdateNumberOfFields(Number(this.state.fieldsAmount));
            }
        }
    }

    validNumOfFields() {
        const isValid = this.state.fieldsAmount > Math.max(...this.props.specialFieldsNumbers) + 1 && this.state.fieldsAmount <= 50;
        this.setState({
            isValid
        });
        return isValid;
    }

    render() {
        const showFieldsAmount = (
            <h3 className="fields-amount">
                <span>Liczba pól planszy: { this.props.fieldsAmount }</span>
                <button
                    type="button" 
                    className="btn btn-warning ml-3"
                    onClick={ this.enableEdit }
                >
                    Edytuj
                </button>
            </h3>
        );

        const editFieldsAmount = (
            <div>
                <p>Maksymalnie możesz wybrać 50 pól.</p>
                <h3 className="fields-amount">
                    <span>
                        Liczba pól planszy: 
                        <input
                            value={ this.state.fieldsAmount }
                            type="number"
                            min={ Math.max(...this.props.specialFieldsNumbers) + 1 }
                            max="100"
                            onChange={ this.handleOnChange }
                        />
                    </span>
                    <button
                        type="button"
                        className="btn btn-success ml-3"
                        onClick={ this.saveNumOfFields }
                    >
                        Zapisz
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger ml-2"
                        onClick={ this.cancelEdit }
                    >
                        Anuluj
                    </button>
                </h3>
                { !this.state.isValid && <Error msg={ this.state.errorMsg } /> }
            </div>
        );

        return (
            <div>
                { this.state.isEditFieldsAmount ? editFieldsAmount : showFieldsAmount }

                <h4 className="mt-5">Pola specjalne</h4>
                <Table
                    handleDeleteSpecialField={ this.props.handleDeleteSpecialField }
                    specialFields={ this.props.specialFields }
                />
            </div>
        );
    }

}

export default FieldsList;

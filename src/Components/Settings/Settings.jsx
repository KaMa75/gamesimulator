import React, { Component } from 'react';
import FieldsList from './FieldsList.jsx';
import Form from './Form.jsx';
import Button from '../Buttons/Button.jsx';

class Settings extends Component {

    handleOnClick = (viewParams) => () => {
        if(typeof this.props.setView === 'function') {
            this.props.setView(viewParams);
        }
    }    

    render() {
        return (
            <div>

                <Button
                    name="Powrót"
                    styleClass="btn btn-primary mr-2 mb-4"
                    handleOnClick={ this.handleOnClick }
                    viewOptions={ this.props.viewOptions.showMainMenu }
                />

                <button className="btn btn-info mr-2 mb-4" onClick={ this.props.handleReset } >
                    Przywróć domyślne
                </button>

                <Form
                    fieldsAmount={ this.props.numOfFields }
                    specialFields={ this.props.specialFields }
                    specialFieldsNumbers={ this.props.specialFieldsNumbers }
                    handleUpdateSpecialFields={ this.props.handleUpdateSpecialFields }
                />

                <FieldsList
                    fieldsAmount={ this.props.numOfFields }
                    specialFields={ this.props.specialFields }
                    specialFieldsNumbers={ this.props.specialFieldsNumbers }
                    handleDeleteSpecialField={ this.props.handleDeleteSpecialField }
                    handleUpdateNumberOfFields={ this.props.handleUpdateNumberOfFields }
                />

            </div>
        );
    }

}

export default Settings;

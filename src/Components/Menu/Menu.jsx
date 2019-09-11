import React, { Component } from 'react';
import Button from '../Buttons/Button.jsx';

class Menu extends Component {

    // constructor(props) {
    //     super(props);
    // }

    handleOnClick = (viewParams) => () => {
        if(typeof this.props.setView === 'function') {
            this.props.setView(viewParams);
        }
    }

    render() {
        return (
            <div>

                <Button
                    name="Zacznij grę"
                    styleClass="btn btn-primary mr-2 mb-4"
                    handleOnClick={ this.handleOnClick }
                    viewOptions={ this.props.viewOptions.showGame }
                />

                <Button
                    name="Ustawienia"
                    styleClass="btn btn-secondary mr-2 mb-4"
                    handleOnClick={ this.handleOnClick }
                    viewOptions={ this.props.viewOptions.showSettings }
                />

            </div>
        );
    }

}

export default Menu;

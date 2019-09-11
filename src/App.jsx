import React, { Component} from 'react';
import Header from './Components/Header/Header.jsx';
import Menu from './Components/Menu/Menu.jsx';
import Game from './Components/Game/Game.jsx';
import Settings from './Components/Settings/Settings.jsx';

import { init, viewPresets } from './init';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      numOfFields: null,
      specialFields: [],
      specialFieldsNumbers: [],
      viewOptions: viewPresets.showMainMenu
    };

  }

  render(){
    return(
      <div className='container'>

        <Header />

        {this.state.viewOptions.showMainMenu && <Menu
          setView={ this.setView }
          viewOptions={ viewPresets }
        />}

        {this.state.viewOptions.showGame && <Game
          setView={ this.setView }
          viewOptions={ viewPresets }
          numOfFields={ this.state.numOfFields }
          specialFields={ this.state.specialFields }
        />}

        {this.state.viewOptions.showSettings && <Settings
          setView={ this.setView }
          viewOptions={ viewPresets }
          specialFields={ this.state.specialFields }
          specialFieldsNumbers={ this.state.specialFieldsNumbers }
          numOfFields={ this.state.numOfFields }
          handleUpdateSpecialFields={ this.handleUpdateSpecialFields }
          handleDeleteSpecialField={ this.handleDeleteSpecialField }
          handleUpdateNumberOfFields={ this.handleUpdateNumberOfFields }
          handleReset={ this.handleReset }
        />}

      </div>
    );
  }

  componentDidMount() {
    this.init();
  }

  setView = (value) => {
    this.setState({
      viewOptions: value}
    );
  }

  sortSpecialFields(specialFields) {
    return specialFields.sort((a, b) => {
      return a.number - b.number
    });
  }

  setSpecialFieldsNumbers(fields) {
    return fields.map(field => field.number)
  }

  handleUpdateSpecialFields = (value) => {
    const specialFields = this.sortSpecialFields([...this.state.specialFields, value]);
    const specialFieldsNumbers = this.setSpecialFieldsNumbers(specialFields);
    this.setState({
        specialFields: [...specialFields],
        specialFieldsNumbers: [...specialFieldsNumbers]
    }, () => this.saveInStorage());
  }

  handleUpdateNumberOfFields = (value) => {
    this.setState({
        numOfFields: value
    }, () => this.saveInStorage());
  }

  handleDeleteSpecialField = (index) => () => {
    const specialFields = this.state.specialFields;
    specialFields.splice(index, 1);
    const specialFieldsNumbers = this.setSpecialFieldsNumbers(specialFields);
    this.setState({
      specialFields: [...specialFields],
      specialFieldsNumbers: [...specialFieldsNumbers]
    }, () => this.saveInStorage());
  }

  handleReset = () => {
    this.setState({
      numOfFields: init.numOfFields,
      specialFields: [...this.sortSpecialFields(init.specialFields)],
      specialFieldsNumbers: [...this.setSpecialFieldsNumbers(init.specialFields)]
    });
    localStorage.clear();
  }

  saveInStorage() {
    localStorage.setItem('numOfFields', JSON.stringify(this.state.numOfFields));
    localStorage.setItem('specialFields', JSON.stringify(this.state.specialFields));
  }

  init() {
    const readNumOfFields = localStorage.getItem('numOfFields');
    const readSpecialFields = localStorage.getItem('specialFields');
    const numOfFields = readNumOfFields ? JSON.parse(readNumOfFields) : init.numOfFields;
    const specialFields = readSpecialFields ? JSON.parse(readSpecialFields) : this.sortSpecialFields(init.specialFields);
    const specialFieldsNumbers = this.setSpecialFieldsNumbers(specialFields);
    this.setState({
      numOfFields,
      specialFields: [...specialFields],
      specialFieldsNumbers: [...specialFieldsNumbers]
    });
  }

}

export default App;

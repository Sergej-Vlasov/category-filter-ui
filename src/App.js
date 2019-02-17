import React, { Component } from 'react';
import './App.css';
import CategoryButton from './components/button';
import MoreButton from './components/dropdownButton/';


class App extends Component {

// active button state is held in the array of objects, by default All button is true and other are false 
  state = {
    moreSelected: false, // More - active style while Commercial, Luxury, Pickup and Convertible ARE selecterd 
    buttons: [
    {button: true},   // ALL
    {button: false},  // Small  
    {button: false},  // Medium
    {button: false},  // Large
    {button: false},  // SUV
    {button: false},  // VAN
    {button: false},  // Commercial
    {button: false},  // Luxury
    {button: false},  // Pickup Truck
    {button: false},  // Convertible
    {button: false}   // More - active style while Commercial, Luxury, Pickup and Convertible ARE NOT selecterd 
  ]}

  // almost all in one method for handling button clicks (except for only buttons in dropdown) and active styles on buttons, receives hardcoded btnNum value to differentiate between buttons
  buttonStyleHandler = (btnNum) => {
    // assigning spreading state to buttons variable
    const buttons = [...this.state.buttons];

    // makes ALL button inactive if clicked on another car category (except for More because its not a direct car category)
    if ((btnNum !== 0) && (btnNum !== 10)){
      buttons[0].button = false;
    }

    //  changes the activet style of the clicked button
    buttons[btnNum].button = !buttons[btnNum].button;

    // checks whether all car categories are selected, if yes, ALL button is activated
    if ((buttons[1].button) &&
      (buttons[2].button) &&
      (buttons[3].button) &&
      (buttons[4].button) &&
      (buttons[5].button) &&
      (buttons[6].button) &&
      (buttons[7].button) &&
      (buttons[8].button) &&
      (buttons[9].button)) {
      buttons[0].button = true;
    }

    // checks whether all car categories are unselected, if yes, ALL button is activated
    if ((!buttons[1].button) &&
      (!buttons[2].button) &&
      (!buttons[3].button) &&
      (!buttons[4].button) &&
      (!buttons[5].button) &&
      (!buttons[6].button) &&
      (!buttons[7].button) &&
      (!buttons[8].button) &&
      (!buttons[9].button)) {
      buttons[0].button = true;
    }

    // checks whether any car category under MORE button is selected, if yes, changes the style of MORE button to include X svg instead of \/ svg
    if ((this.state.buttons[6].button) ||
    (this.state.buttons[7].button) ||
    (this.state.buttons[8].button) ||
    (this.state.buttons[9].button)) {
      this.setState({moreSelected: true})
    } else {
      this.setState({moreSelected: false})
    }

    // if ALL button is selected, sets the active style of other buttons to false (unselects other buttons)
    if (buttons[0].button){
      for(let i=1;i<10;i++){
        buttons[i].button = false;
      }
      this.setState({moreSelected: false})
    }

    // finally pushes all the changes to the state to trigger update
    this.setState({buttons: buttons});
  }

  // handler for the onClick event for the ONLY button inside the dropdown and X button on the MORE button
  buttonStyleOnlyHandler = (btnNum) => {
    const buttons = [...this.state.buttons];

    // case when X is clicked inside the MORE button
    if (btnNum === null){
      for (let i=6;i<10;i++){
        buttons[i].button = false;
      }
    }
    // case when ONLY button is pressed, it sets the selected category and unselects all other skipping the selected one 
    else {
      buttons[btnNum].button = !buttons[btnNum].button;
      for (let i=0;i<10;i++){
        if (btnNum === i){ 
          buttons[i].button = true;
        }
        buttons[i].button = false;
      }
    }
    // forcing true value for MORE button to avoid unnecessary dropdown open when dropdown is closed and X is pressed to unselect car categories
    buttons[10].button = true;
    this.setState({buttons: buttons});
  }

  // function that closes the dropdown when clicked outside of it
  moreCloseHandler = () => {
    const buttons = [...this.state.buttons];
    buttons[10].button = false;
    this.setState({buttons: buttons})
  }

  // listeners for the dropdown closing mechanism when clicked outside of it
  componentWillMount(){
    document.addEventListener('click', this.moreClickHandler, false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.moreClickHandler, false);
  }

  // function that determines if clicked inside dropdown or outside
  moreClickHandler = (e) => {
    if(this.node.contains(e.target)){
      return; // does not do anything when clicked inside
    }
    
    // when clicked outside executes function that will close dropdown
    this.moreCloseHandler();
  }

  render() {
    return (
      <div className="App">
        {/*
        each CategoryButton receives these props:
        - click - to handle onClick event
        - minPrice - hardcoded price value
        - activeStyle - reference to the state that determines if active button style is applied
        optional props:
        - noPrice - when price is not needed (for ALL and MORE buttons)
        - more - special for MORE button to handle style changes
        - selected - special for MORE button to handle style changes when category under more is selected
        */}
        <CategoryButton click={this.buttonStyleHandler.bind(this, 0)} noPrice={true} activeStyle={this.state.buttons[0].button} >All</CategoryButton>
        <CategoryButton click={this.buttonStyleHandler.bind(this, 1)} minPrice="$15+" activeStyle={this.state.buttons[1].button} >Small</CategoryButton>
        <CategoryButton click={this.buttonStyleHandler.bind(this, 2)} minPrice="$22+" activeStyle={this.state.buttons[2].button}>Medium</CategoryButton>
        <CategoryButton click={this.buttonStyleHandler.bind(this, 3)} minPrice="$102+" activeStyle={this.state.buttons[3].button}>Large</CategoryButton>
        <CategoryButton click={this.buttonStyleHandler.bind(this, 4)} minPrice="$33+" activeStyle={this.state.buttons[4].button}>SUV</CategoryButton>
        <CategoryButton click={this.buttonStyleHandler.bind(this, 5)} minPrice="$63+" activeStyle={this.state.buttons[5].button}>Van</CategoryButton>
        {/* adding ref to dropdown element to register if clicked outside */}
        <div ref={node => this.node = node} className='dropdown'>
          <CategoryButton click={this.buttonStyleHandler.bind(this, 10)} clickX={this.buttonStyleOnlyHandler.bind(this, null)} noPrice={true} activeStyle={this.state.buttons[10].button} more={true} selected={this.state.moreSelected}>More</CategoryButton>
          {/* when MORE button is active dropdown is activated */}
          <div className={`dropdown dropdown__content ${this.state.buttons[10].button ? ' dropdown__content--active': ''}`}>
            <div className='dropdown__container'>
              {/* MoreButton receives props similar to CategoryButton, but the layout is different */}
              <MoreButton click={this.buttonStyleHandler.bind(this, 6)} clickOnly={this.buttonStyleOnlyHandler.bind(this, 6)} activeStyle={this.state.buttons[6].button} minPrice="$360">Commercial</MoreButton>
              <MoreButton click={this.buttonStyleHandler.bind(this, 7)} clickOnly={this.buttonStyleOnlyHandler.bind(this, 7)} activeStyle={this.state.buttons[7].button} minPrice="$1521">Luxury</MoreButton>
              <MoreButton click={this.buttonStyleHandler.bind(this, 8)} clickOnly={this.buttonStyleOnlyHandler.bind(this, 8)} activeStyle={this.state.buttons[8].button} minPrice="$200">Pickup Truck</MoreButton>
              <MoreButton click={this.buttonStyleHandler.bind(this, 9)} clickOnly={this.buttonStyleOnlyHandler.bind(this, 9)} activeStyle={this.state.buttons[9].button} minPrice="$3000">Convertible</MoreButton>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default App;
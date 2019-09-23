import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentFloor: 1,
      targetFloor: [],
      doors: false,
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.changingFloors = this.changingFloors.bind(this);
    this.timer = null;
  }

  changingFloors(){
    var target = this.state.targetFloor;
    var current = this.state.currentFloor;

    if(target.includes(current)){
      this.setState({doors: true});
      target.splice(target.indexOf(current), 1);
      clearInterval(this.timer); //stops floor movment while doors open
      setTimeout(() => {
          this.setState({doors: false, targetFloor: target});
          this.timer = setInterval(this.changingFloors, 1000); //continues floor movement
      }, 5000);
      return null;
    }

    if( target[0] !== current){
      if(target[0] > current){
        this.setState({currentFloor: current + 1});
      } else if(target[0] < current) {
        this.setState({currentFloor: current - 1});
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    } else {
      target.splice(0, 1);
      this.setState({target: target});
    }
  }

  handleButtonClick(e, floor){
    e.preventDefault();
    if(!this.state.targetFloor.includes(floor)){
      var target = this.state.targetFloor;
      target.push(floor)
      this.setState({targetFloor: target, moving: true});
    }

      if(this.timer === null){
        this.timer = setInterval(this.changingFloors, 1000);
      }
    

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>elevator</h1>
        </header>
        <div className="floor-display">current: {this.state.currentFloor} target: {this.state.targetFloor[0]}</div>
        <div>doors: {this.state.doors ? "open" : "closed"}</div>
        <form onSubmit={this.handleFloorChange}>
          <button type="submit" className="btn btn-primary" onClick={(e) => this.handleButtonClick(e, 1)}>1</button>
          <button type="submit" className="floor-2" onClick={(e) => this.handleButtonClick(e, 2)}>2</button>
          <button type="submit" className="btn btn-primary" onClick={(e) => this.handleButtonClick(e, 3)}>3</button>
          <button type="submit" className="btn btn-primary" onClick={(e) => this.handleButtonClick(e, 4)}>4</button>
          <button type="submit" className="btn btn-primary" onClick={(e) => this.handleButtonClick(e, 5)}>5</button>
        </form>
      </div>
    );
  }
}

export default App;

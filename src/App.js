import React, {Component} from 'react';
import './styling/app.css';

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
          var btn = document.getElementById("btn-" + current + "");
          btn.disabled= false;
          btn.checked = false;
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

  handleButtonClick(floor){
    document.getElementById("btn-" + floor + "").disabled= true;

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
            <h1 className="floor-display">
              {this.state.currentFloor}
              <div>doors: {this.state.doors ? "open" : "closed"}</div>
            </h1>
          </header>

        <div className="Elevator">

          
          
          <div id="btn-panel">

          <input type="checkbox" id="btn-1" onClick={() => this.handleButtonClick(1)}/>
              <label class="btn" for="btn-1">
                <div>1</div>
              </label>

          <input type="checkbox" id="btn-2" onClick={() => this.handleButtonClick(2)}/>
            <label class="btn" for="btn-2">
              <div>2</div>
            </label>

          <input type="checkbox" id="btn-3" onClick={() => this.handleButtonClick(3)}/>
            <label class="btn" for="btn-3">
              <div>3</div>
            </label>

          <input type="checkbox" id="btn-4" onClick={() => this.handleButtonClick(4)}/>
            <label class="btn" for="btn-4">
              <div>4</div>
            </label>

          <input type="checkbox" id="btn-5" onClick={() => this.handleButtonClick(5)}/>
            <label class="btn" for="btn-5">
              <div>5</div>
            </label>

          <button id="btn-alarm" >@</button>
          </div>

          <div id="doors">
            <div id="left-door"></div>
            <div id="right-door"></div>
          </div>


        </div>
      </div>
    );
  }
}

export default App;

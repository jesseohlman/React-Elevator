import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';import {create} from "react-test-renderer";
import App from './App';

configure({ adapter: new Adapter() });


<App />

describe("<App />", () => {
  it("renders the elevator properly", () => {
    const elevator = shallow(<App />);
    expect(elevator.find("button").length).toEqual(5);
  });

  it("renders the elevator's current floor", () => {
    const elevator = shallow(<App />);

    const expected = "1";

    const real = elevator.find("div.floor-display").html();
    expect(real.indexOf(expected) > -1).toEqual(true);
  });

  it("renders the elevator's current floor", () => {

    const elevator = shallow(<App />);
    const expected = "2";
    elevator.setState({currentFloor: 2});
    const real = elevator.find("div.floor-display").html();
    expect(real.indexOf(expected) > -1).toEqual(true);
  });

})

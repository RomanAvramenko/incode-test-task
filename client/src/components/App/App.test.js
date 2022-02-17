import React from 'react';
import { shallow } from "enzyme";
import * as redux from "react-redux";
import App from "./App";

const mockStore = {
  ticker: [],
  prevTicker: [],
};

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
useSelectorSpy.mockReturnValue(mockStore);
useDispatchSpy.mockReturnValue(mockDispatchFn);

describe("App component", () => {
  it("App element exist in the DOM", () => {
    const component = shallow(<App />);
    const wrapper = component.find(".App");
    expect(wrapper.length).toBe(1);
  });

  it("Should render App component", () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});

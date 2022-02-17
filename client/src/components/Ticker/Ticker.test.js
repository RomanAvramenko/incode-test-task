import React from "react";
import { shallow } from "enzyme";
import { Ticker } from "./Ticker";

const mockProps = {
  data: {
    ticker: "Ticker_Mock",
    price: 1,
    change_percent: 1.1,
    change: 0.1,
  },
};

describe("Ticker component", () => {

  it("should render Ticker component", () => {
    const component = shallow(<Ticker {...mockProps} />);
    expect(component).toMatchSnapshot();
  });

  it('Ticker element exist in the DOM',()=>{
    const component = shallow(<Ticker {...mockProps} />);
    const wrapper = component.find(".ticker_item");
    expect(wrapper.length).toBe(1);
  });
});

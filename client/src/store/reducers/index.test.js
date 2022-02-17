import { appReducer } from ".";

const initialState = {
  prevTicker: [],
  ticker: [],
};

describe("appReducer", () => {

  it("should return the initial state", () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });
});

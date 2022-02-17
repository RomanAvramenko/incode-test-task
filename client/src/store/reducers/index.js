import { combineReducers } from "redux";
import {
  WEBSOCKET_RESPONSE,
  WEBSOCKET_SEND,
} from "../actionTypes";

const initialState = {
  prevTicker: [],
  ticker: [],
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case WEBSOCKET_SEND:
      return state;
    case WEBSOCKET_RESPONSE:
      return { ...state, ticker: action.payload, prevTicker: state.ticker };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;

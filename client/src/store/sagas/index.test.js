import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import rootSaga from ".";

describe("the sagas", () => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureMockStore([sagaMiddleware]);

  it("should execute saga", (done) => {
    const store = mockStore({});
    sagaMiddleware.run(rootSaga);
    const expectedActions = [{ type: "WEBSOCKET_SEND" }];

    store.subscribe(async () => {
      const actions = store.getActions();
      await expect(actions).toEqual(expectedActions);
      done();
    });

    store.dispatch({ type: "WEBSOCKET_SEND" });
  });
});

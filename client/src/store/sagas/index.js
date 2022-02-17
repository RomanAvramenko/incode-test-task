import { eventChannel } from "redux-saga";
import {
  spawn,
  call,
  all,
  apply,
  take,
  put,
  fork,
  actionChannel,
} from "redux-saga/effects";
import { io } from "socket.io-client";
import { WEBSOCKET_RESPONSE, WEBSOCKET_SEND } from "../actionTypes";

const socketServerURL = "http://localhost:4000";

const createSocketChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (data) => {
      emit(data);
    };
    socket.on("ticker", handler);
    return () => {
      socket.off("ticker", handler);
    };
  });

function* emitResponse(socket) {
  yield apply(socket, socket.emit, ["start"]);
}

function* loadFromSocketChanel() {
  const socket = io(socketServerURL);
  yield fork(emitResponse, socket);
  const socketChannel = yield call(createSocketChannel, socket);
  while (true) {
    const payload = yield take(socketChannel);
    yield put({ type: WEBSOCKET_RESPONSE, payload });
  }
}

function* watchSocketChannel() {
  const channel = yield actionChannel(WEBSOCKET_SEND);
  while (true) {
    yield take(channel);
    yield call(loadFromSocketChanel);
  }
}

export default function* rootSaga() {
  const sagas = [watchSocketChannel];

  const retrySagas = yield sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    });
  });

  yield all(retrySagas);
}

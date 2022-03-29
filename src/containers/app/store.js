import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import skeleton from "../skeleton/redux/skeletonReducer";
import user from "../user/redux/userReducer";
import wallet from "../wallet/redux/walletReducer";
import error from "../errors/redux/errorReducer";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
    combineReducers({
        user,
        wallet,
        skeleton,
        error
    }),

    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

window.store = Store;

export default Store;
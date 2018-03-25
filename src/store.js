import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import persistState from "redux-localstorage";

import reducers from "./reducers";

const enhancer = compose(applyMiddleware(), persistState());

export default createStore(reducers, enhancer);

import { combineReducers } from "redux";

import createReducers from "./createReducers";

import map from "./map";
import dataSources from "./dataSources";

export default combineReducers(
    createReducers({
        map,
        dataSources
    })
);

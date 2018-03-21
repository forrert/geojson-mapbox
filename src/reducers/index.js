import { combineReducers } from "redux";

import createReducers from "./createReducers";

import map from "./map";
import dataSources from "./dataSources";
import feature from "./feature";

export default combineReducers(
    createReducers({
        map,
        dataSources,
        feature
    })
);

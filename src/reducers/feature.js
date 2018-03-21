import { SELECT_FEATURE } from "../actions/feature";

export default {
    initialState: {},
    [SELECT_FEATURE]: (state, feature) => feature
};

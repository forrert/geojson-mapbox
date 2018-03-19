import mapValues from "lodash/mapValues";

function createReducer(reducerConfig) {
    const { initialState = {} } = reducerConfig;
    return (state = initialState, action) => {
        const handler = reducerConfig[action.type];
        if (!handler) return state;
        return handler(state, action.payload);
    };
}

export default reducers => mapValues(reducers, createReducer);

import { START_DRAWING, ADD_POINT, END_DRAWING } from "../actions/drawing";

const initialState = {
    drawing: false,
    points: []
};

export default {
    initialState,
    [START_DRAWING]: state => ({ ...state, drawing: true }),
    [ADD_POINT]: (state, point) => ({
        ...state,
        points: state.points.concat([point])
    }),
    [END_DRAWING]: state => initialState
};

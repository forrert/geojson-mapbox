export const START_DRAWING = "START_DRAWING";

export const startDrawing = () => ({
    type: START_DRAWING
});

export const ADD_POINT = "ADD_POINT";

export const addPoint = lngLat => ({
    type: ADD_POINT,
    payload: lngLat
});

export const END_DRAWING = "END_DRAWING";

export const endDrawing = () => ({
    type: END_DRAWING
});

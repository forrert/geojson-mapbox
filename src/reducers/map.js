import { UPDATE_VIEWPORT } from "../actions/map";

export default {
    initialState: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
    },
    [UPDATE_VIEWPORT]: (state, viewport) => ({ ...state, ...viewport })
};

import { createSelector } from "reselect";

import mapStyle from "./mapStyle";

const viewport = state => state.map;

export default createSelector([mapStyle, viewport], (mapStyle, viewport) => ({
    mapStyle,
    viewport
}));

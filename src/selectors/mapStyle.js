import { createSelector } from "reselect";
import { fromJS } from "immutable";
import mapValues from "lodash/mapValues";
import mapKeys from "lodash/mapKeys";
import map from "lodash/map";
import flatten from "lodash/flatten";

import style from "../style.json";

const defaultStyle = fromJS(style);

const dataSources = state => state.dataSources;

const getSource = dataSource => ({
    type: "geojson",
    data: dataSource.geoJson
});

const getDataSourceName = dataSource => `ds-${dataSource.id}`;

const getLayers = dataSource => {
    const name = getDataSourceName(dataSource);
    return [
        {
            id: `${name}-fill`,
            source: name,
            type: "fill",
            paint: {
                "fill-color": dataSource.color,
                "fill-opacity": 0.5
            }
        },
        {
            id: `${name}-line`,
            source: name,
            type: "line",
            paint: {
                "line-color": dataSource.color,
                "line-opacity": 0.9
            }
        },
        {
            id: `${name}-point`,
            source: name,
            type: "circle",
            paint: {
                "circle-radius": 5,
                "circle-color": dataSource.color,
                "circle-opacity": 0.9
            },
            filter: ["==", "$type", "Point"]
        }
    ];
};

const getSources = dataSources =>
    mapValues(mapKeys(dataSources, getDataSourceName), getSource);

const getAllLayers = dataSources => flatten(map(dataSources, getLayers));

export default createSelector([dataSources], dataSources => {
    const sources = getSources(dataSources);
    const layers = getAllLayers(dataSources);
    const result = defaultStyle
        .mergeIn(["sources"], sources)
        .updateIn(["layers"], defaultLayers =>
            defaultLayers.concat(fromJS(layers))
        );
    return result;
});

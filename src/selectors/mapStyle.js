import { createSelector } from "reselect";
import { fromJS } from "immutable";
import mapValues from "lodash/mapValues";
import mapKeys from "lodash/mapKeys";
import map from "lodash/map";
import flatten from "lodash/flatten";

import style from "../style.json";

const defaultStyle = fromJS(style);

const dataSources = state => state.dataSources;

const getSource = (dataSource, dataSources) => ({
    type: "geojson",
    data: dataSource.geoJson
});

const getDataSourceName = dataSource => `ds-${dataSource.id}`;

const getLineLayers = dataSource => {
    if (!dataSource.visible) return [];
    const name = getDataSourceName(dataSource);
    return [
        {
            id: `${name}-fill`,
            source: name,
            type: "fill",
            paint: {
                "fill-color": dataSource.color,
                "fill-opacity": 0.25
            }
        }
    ];
};

const getPointLayers = dataSource => {
    if (!dataSource.visible) return [];
    const name = getDataSourceName(dataSource);
    return [
        {
            id: `${name}-line`,
            source: name,
            type: "line",
            paint: {
                "line-color": dataSource.color,
                "line-opacity": {
                    stops: [[5, 0.1], [15, 0.9]]
                }
            }
        },
        {
            id: `${name}-point`,
            source: name,
            type: "circle",
            paint: {
                "circle-radius": {
                    stops: [[5, 1], [20, 7]]
                },
                "circle-color": dataSource.color,
                "circle-opacity": 0.9
            },
            filter: ["==", "$type", "Point"],
            interactive: true
        }
    ];
};

const getSources = dataSources =>
    mapValues(mapKeys(dataSources, getDataSourceName), ds =>
        getSource(ds, dataSources)
    );

const getAllLineLayers = dataSources =>
    flatten(map(dataSources, getLineLayers));

const getAllPointLayers = dataSources =>
    flatten(map(dataSources, getPointLayers));

const insertAfter = (layerId, newLayers) => layers => {
    const index = layers.findIndex(l => l.get("id") === layerId);
    return layers.splice.apply(
        layers,
        [index, 0].concat(newLayers.map(l => fromJS(l)))
    );
};

export default createSelector([dataSources], dataSources => {
    const sources = getSources(dataSources);
    const lineLayers = getAllLineLayers(dataSources);
    const pointLayers = getAllPointLayers(dataSources);
    const result = defaultStyle
        .mergeIn(["sources"], sources)
        .updateIn(["layers"], insertAfter("building", lineLayers))
        .updateIn(
            ["layers"],
            insertAfter("admin-2-boundaries-dispute", pointLayers)
        );
    return result;
});

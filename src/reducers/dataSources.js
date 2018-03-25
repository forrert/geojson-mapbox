import keys from "lodash/keys";
import max from "lodash/max";
import omit from "lodash/omit";
import isString from "lodash/isString";
import * as turf from "@turf/turf";

import {
    ADD_DATASOURCE,
    UPDATE_DATASOURCE,
    DELETE_DATASOURCE
} from "../actions/dataSources";

const getNextDatasourceId = state =>
    max(keys(state).map(k => parseInt(k, 10) + 1)) || 1;

export default {
    initialState: {},
    [ADD_DATASOURCE]: (state, { record }) => {
        const id = getNextDatasourceId(state);
        return {
            ...state,
            [id]: updateGeoJson({
                ...record,
                id
            })
        };
    },
    [UPDATE_DATASOURCE]: (state, { record }) => ({
        ...state,
        [record.id]: updateGeoJson({
            ...state[record.id],
            ...record
        })
    }),
    [DELETE_DATASOURCE]: (state, { id }) => ({
        ...omit(state, `${id}`)
    })
};

function updateGeoJson(dataSource, dataSources) {
    return {
        ...dataSource,
        geoJson: getGeoJson(dataSource, dataSources)
    };
}

function getGeoJson(dataSource, dataSources) {
    const { type } = dataSource;
    if (type === "geoJson") {
        const { geoJson } = dataSource;
        if (isString(geoJson)) {
            return JSON.parse(geoJson);
        } else {
            return geoJson;
        }
    } else if (type === "mapLayer") {
        try {
            const refDataSource = dataSources[dataSource.refDataSource];
            const functionString = `return ${dataSource.mapLayer}`;
            const fun = new Function("turf", functionString);
            const data = fun(turf)(refDataSource.geoJson);
            return data;
        } catch (e) {
            console.log(e);
            return {};
        }
    }
}

import omit from "lodash/omit";
import isString from "lodash/isString";
import * as turf from "@turf/turf";
import uuid from "uuid/v4";

import {
    ADD_DATASOURCE,
    UPDATE_DATASOURCE,
    DELETE_DATASOURCE
} from "../actions/dataSources";

export default {
    initialState: {},
    [ADD_DATASOURCE]: (state, { record }) => {
        const id = uuid();
        return {
            ...state,
            [id]: updateGeoJson(
                {
                    ...record,
                    id
                },
                state
            )
        };
    },
    [UPDATE_DATASOURCE]: (state, { record }) => {
        let dataSource = { ...state[record.id], ...record };
        if (record.geoJson || record.mapLayer) {
            dataSource = updateGeoJson(dataSource, state);
        }
        return {
            ...state,
            [record.id]: dataSource
        };
    },
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
            const fun = new Function("turf", functionString); // eslint-disable-line no-new-func
            const data = fun(turf)(refDataSource.geoJson);
            return data;
        } catch (e) {
            console.log(e);
            return {};
        }
    }
}

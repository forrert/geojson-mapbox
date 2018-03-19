import keys from "lodash/keys";
import maxBy from "lodash/maxBy";
import omit from "lodash/omit";

import {
    ADD_DATASOURCE,
    UPDATE_DATASOURCE,
    DELETE_DATASOURCE
} from "../actions/dataSources";

const getNextDatasourceId = state =>
    maxBy(keys(state), k => parseInt(k, 10)) + 1 || 1;

export default {
    initialState: {},
    [ADD_DATASOURCE]: (state, { record }) => {
        const id = getNextDatasourceId(state);
        return {
            ...state,
            [id]: { ...record, id }
        };
    },
    [UPDATE_DATASOURCE]: (state, { record }) => ({
        ...state,
        [record.id]: record
    }),
    [DELETE_DATASOURCE]: (state, { id }) => ({
        ...omit(state, [id])
    })
};

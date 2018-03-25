export const ADD_DATASOURCE = "ADD_DATASOURCE";
export const UPDATE_DATASOURCE = "UPDATE_DATASOURCE";
export const DELETE_DATASOURCE = "DELETE_DATASOURCE";

export const addDataSource = record => ({
    type: ADD_DATASOURCE,
    payload: { record }
});

export const updateDataSource = record => ({
    type: UPDATE_DATASOURCE,
    payload: { record }
});

export const deleteDataSource = id => ({
    type: DELETE_DATASOURCE,
    payload: { id }
});

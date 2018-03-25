import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Button } from "reactstrap";

import { updateViewport } from "../actions/map";

const ClearApiTokenButton = ({ mapboxApiAccessToken, updateViewport }) =>
    !mapboxApiAccessToken ? (
        false
    ) : (
        <Button
            size="sm"
            color="danger"
            outline
            onClick={() => updateViewport({ mapboxApiAccessToken: undefined })}
        >
            Clear API Token
        </Button>
    );

const mapStateToProps = state => ({
    mapboxApiAccessToken: get(state, "map.mapboxApiAccessToken")
});

export default connect(mapStateToProps, { updateViewport })(
    ClearApiTokenButton
);

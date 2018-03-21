import React, { Component } from "react";
import { connect } from "react-redux";
import MapGl from "react-map-gl";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import first from "lodash/first";

import { updateViewport } from "../actions/map";
import { selectFeature } from "../actions/feature";
import map from "../selectors/map";
import AccessTokenForm from "../Components/AccessTokenForm";

class MapComponent extends Component {
    render() {
        const {
            viewport,
            updateViewport,
            mapStyle,
            containerWidth
        } = this.props;
        if (!viewport.mapboxApiAccessToken) {
            return <AccessTokenForm />;
        }
        return (
            <MapGl
                {...viewport}
                width={containerWidth}
                mapStyle={mapStyle}
                onClick={this._onClick}
                onViewportChange={updateViewport}
            />
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this._resize);
        this._resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._resize);
    }

    _resize = () => {
        const { updateViewport, containerWidth } = this.props;
        updateViewport({
            width: this.props.width || containerWidth,
            height: this.props.height || window.innerHeight - 56
        });
    };

    _onClick = ({ lngLat, features }) => {
        const userFeatures = features.filter(f =>
            f.layer.source.match(/ds-[0-9]+/)
        );
        const userFeature = first(userFeatures);
        const { history, selectFeature } = this.props;
        if (userFeature) {
            history.push("/Feature");
            selectFeature(userFeature.properties);
        } else {
            history.push("/");
        }
    };
}

const EnhancedMap = withRouter(Dimensions()(MapComponent));

export default connect(map, { updateViewport, selectFeature })(EnhancedMap);

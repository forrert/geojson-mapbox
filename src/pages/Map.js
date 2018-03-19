import React, { Component } from "react";
import { connect } from "react-redux";
import MapGl from "react-map-gl";
import Dimensions from "react-dimensions";

import { updateViewport } from "../actions/map";
import { addPoint } from "../actions/drawing";
import map from "../selectors/map";
import AccessTokenForm from "../Components/AccessTokenForm";

const accessToken =
    "pk.eyJ1IjoiZm9ycmVydCIsImEiOiJjaXJ6NG9yeG4wMDB2MnlvNDR0bzM1ODR4In0.FmtJ79hkxaPnKC5gYgaQMQ";

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

    _onClick = ({ lngLat }) => {
        const { drawing, addPoint } = this.props;
        if (drawing) {
            addPoint(lngLat);
        }
    };
}

const MapWithDimensions = Dimensions()(MapComponent);

export default connect(map, { updateViewport, addPoint })(MapWithDimensions);

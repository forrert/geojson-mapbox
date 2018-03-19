import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Jumbotron, Button } from "reactstrap";

import FormComponent from "./Form";
import { updateViewport } from "../actions/map";

const fields = [
    {
        prop: "mapboxApiAccessToken",
        label: "Enter your Mapbox API Token",
        type: "string"
    }
];

class AccessTokenForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Jumbotron>
                <FormComponent
                    fields={fields}
                    onChange={this.onChange}
                    record={this.getRecord()}
                />
                <Button onClick={this.onSubmit} color="primary">
                    Save
                </Button>
            </Jumbotron>
        );
    }

    getRecord() {
        const { mapboxApiAccessToken } = this.props;
        return { mapboxApiAccessToken, ...this.state };
    }

    onChange = (prop, value) => {
        this.setState({ [prop]: value });
    };

    onSubmit = () => {
        const { updateViewport } = this.props;
        updateViewport(this.state);
    };
}

const mapStateToProps = state => ({
    mapboxApiAccessToken: get(state, "map.mapboxApiAccessToken")
});

export default connect(mapStateToProps, { updateViewport })(AccessTokenForm);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import map from "lodash/map";
import pick from "lodash/pick";
import mapValues from "lodash/mapValues";
import noop from "lodash/noop";
import startCase from "lodash/startCase";

import Form from "../../Components/Form";

const stringify = o => JSON.stringify(o, null, 4);

class FeatureDetail extends Component {
    render() {
        const { feature } = this.props;
        return (
            <div>
                <h3>Feature</h3>
                <Button outline color="primary" onClick={this.onBack}>
                    Back
                </Button>
                <Form
                    fields={this.getFields()}
                    record={feature}
                    onChange={noop}
                    className="form-control-sm"
                />
            </div>
        );
    }

    getRecord() {
        const { feature } = this.props;
        return mapValues(pick(feature, ["properties", "geometry"]), stringify);
    }

    getFields() {
        const { feature } = this.props;
        return map(feature, (val, key) => ({
            prop: key,
            label: startCase(key),
            type: "string"
        }));
    }

    onBack = () => {
        const { history } = this.props;
        history.push("/");
    };
}

const mapStateToProps = state => pick(state, "feature");

export default connect(mapStateToProps)(withRouter(FeatureDetail));

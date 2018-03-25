import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import omit from "lodash/omit";
import map from "lodash/map";

import FormComponent from "../../Components/Form";
import {
    addDataSource,
    updateDataSource,
    deleteDataSource
} from "../../actions/dataSources";
import { option } from "../../Components/FormComponents/DropDown";
import ButtonWithConfirm from "../../Components/ButtonWithConfirm";

class DataSourceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h3>Data Source</h3>
                <Button outline color="primary" onClick={this.onSave} size="sm">
                    Save
                </Button>
                &nbsp;
                <ButtonWithConfirm
                    outline
                    color="danger"
                    onClick={this.onDelete.bind(this)}
                    label="Delete"
                    size="sm"
                />
                <FormComponent
                    fields={this.getFields()}
                    record={this.getRecord()}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    onChange = (prop, value) => {
        this.setState({ [prop]: value });
    };

    getRecord() {
        const { record } = this.props;
        return {
            ...record,
            ...this.state
        };
    }

    getFields() {
        const { dataSources } = this.props;
        const id = this.props.record.id || "";

        return [
            {
                prop: "label",
                label: "Label",
                type: "string"
            },
            {
                prop: "color",
                label: "Color",
                type: "color"
            },
            {
                prop: "type",
                label: "Type",
                type: "select",
                options: [
                    option("geoJson", "GeoJSON"),
                    option("mapLayer", "Transform Layer")
                ]
            },
            {
                prop: "geoJson",
                label: "Data",
                type: "geoJson",
                visible: ({ type }) => type === "geoJson"
            },
            {
                prop: "refDataSource",
                label: "Data Source",
                type: "select",
                visible: ({ type }) =>
                    type === "mapLayer" || type === "mapFeatures",
                options: map(omit(dataSources, id), ds =>
                    option(ds.id, ds.label)
                )
            }
        ];
    }

    onSave = () => {
        const { id, addDataSource, updateDataSource, history } = this.props;
        const record = this.getRecord();
        if (id === "New") {
            addDataSource(record);
        } else {
            updateDataSource(record);
        }
        history.push("/");
    };

    onDelete = () => {
        const { record, deleteDataSource, history } = this.props;
        deleteDataSource(record.id);
        history.push("/");
    };
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    if (id === "New") {
        return {
            record: {
                label: "New Layer",
                geoJson: "{}",
                type: "geoJson",
                visible: true
            },
            id,
            dataSources: state.dataSources
        };
    }
    const record = state.dataSources[id];
    return {
        record: { ...record, geoJson: JSON.stringify(record.geoJson, null, 2) },
        dataSources: state.dataSources
    };
};

export default connect(mapStateToProps, {
    addDataSource,
    updateDataSource,
    deleteDataSource
})(withRouter(DataSourceDetail));
